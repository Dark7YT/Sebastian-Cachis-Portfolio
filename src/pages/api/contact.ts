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

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `[Portfolio] ${subject}`,
      replyTo: email,
      text:
        `Nombre: ${name}\n` +
        `Email: ${email}\n` +
        `Locale: ${locale ?? '-'}\n` +
        `---\n${message}`,
    });
    if (error) {
      return json({ error: 'send_failed', detail: error.message }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    return json({ error: 'unexpected', detail: String(err) }, 500);
  }
};
