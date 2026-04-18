import type { Locale } from '@lib/i18n';

const MONTHS: Record<Locale, string[]> = {
  es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export function formatMonthYear(value: string, locale: Locale): string {
  const [yearStr, monthStr] = value.split('-');
  const year = Number(yearStr);
  const monthIdx = Math.max(0, Math.min(11, Number(monthStr) - 1));
  return `${MONTHS[locale][monthIdx]} ${year}`;
}

export function formatPeriod(
  start: string,
  end: string | undefined,
  locale: Locale,
  presentLabel: string,
): string {
  const startLabel = formatMonthYear(start, locale);
  const endLabel = end ? formatMonthYear(end, locale) : presentLabel;
  return `${startLabel} — ${endLabel}`;
}
