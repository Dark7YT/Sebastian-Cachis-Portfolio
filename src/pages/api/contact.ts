import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import { Resend } from 'resend';
import { rateLimit } from '@lib/rate-limit';

export const prerender = false;

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  subject: z.string().min(2).max(160),
  message: z.string().min(10).max(4000),
  locale: z.enum(['es', 'en']).optional(),
  website: z.string().max(0).optional(),
});

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
  const { allowed, retryAfterSeconds } = rateLimit(`contact:${ip}`);
  if (!allowed) {
    return json({ error: 'rate_limited', retryAfter: retryAfterSeconds }, 429);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return json({ error: 'invalid_input', issues: parsed.error.issues }, 422);
  }

  if (parsed.data.website) {
    return json({ ok: true });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO_EMAIL;
  const from = import.meta.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>';

  if (!apiKey || !to) {
    return json({ error: 'server_misconfigured' }, 500);
  }

  const { name, email, subject, message, locale } = parsed.data;
  const lang = locale === 'en' ? 'English' : 'Español';
  const sentAt = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima', dateStyle: 'full', timeStyle: 'short' });

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Inter',Arial,sans-serif;color:#e5e5e5">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111111;border:1px solid #262626;border-radius:12px;overflow:hidden">
        <!-- Header -->
        <tr>
          <td style="background:#111111;border-bottom:1px solid #262626;padding:28px 36px">
            <p style="margin:0;font-family:'JetBrains Mono',monospace,monospace;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#a78bfa">Portfolio — Sebastian Cachis</p>
            <h1 style="margin:8px 0 0;font-size:20px;font-weight:600;color:#f5f5f5;line-height:1.3">${subject}</h1>
          </td>
        </tr>
        <!-- Meta row -->
        <tr>
          <td style="padding:24px 36px 0">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:14px;width:50%;vertical-align:top">
                  <p style="margin:0;font-family:monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#737373">Remitente</p>
                  <p style="margin:4px 0 0;font-size:14px;color:#f5f5f5">${name}</p>
                  <a href="mailto:${email}" style="font-size:13px;color:#a78bfa;text-decoration:none">${email}</a>
                </td>
                <td style="padding-bottom:14px;width:25%;vertical-align:top">
                  <p style="margin:0;font-family:monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#737373">Idioma</p>
                  <p style="margin:4px 0 0;font-size:14px;color:#f5f5f5">${lang}</p>
                </td>
                <td style="padding-bottom:14px;width:25%;vertical-align:top">
                  <p style="margin:0;font-family:monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#737373">Recibido</p>
                  <p style="margin:4px 0 0;font-size:13px;color:#a3a3a3">${sentAt}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Divider -->
        <tr><td style="padding:0 36px"><hr style="border:none;border-top:1px solid #262626;margin:4px 0 24px"></td></tr>
        <!-- Message -->
        <tr>
          <td style="padding:0 36px 36px">
            <p style="margin:0 0 12px;font-family:monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#737373">Mensaje</p>
            <div style="background:#0a0a0a;border:1px solid #262626;border-radius:8px;padding:20px 24px;font-size:14px;line-height:1.7;color:#d4d4d4;white-space:pre-wrap">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="border-top:1px solid #262626;padding:16px 36px">
            <p style="margin:0;font-family:monospace;font-size:10px;color:#525252;letter-spacing:0.15em">Responde directamente a este email para contactar a ${name}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text =
    `De: ${name} <${email}>\n` +
    `Idioma: ${lang}\n` +
    `Recibido: ${sentAt}\n` +
    `${'─'.repeat(40)}\n\n${message}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `[Portfolio] ${subject}`,
      replyTo: email,
      html,
      text,
    });
    if (error) {
      console.error('[contact] Resend error:', JSON.stringify(error));
      return json({ error: 'send_failed', detail: error.message }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    return json({ error: 'unexpected', detail: String(err) }, 500);
  }
};
