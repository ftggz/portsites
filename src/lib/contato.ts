const PENDENTE = /\[A CONFIRMAR\]/i;

export function isConfirmed(value: string): boolean {
  return value.trim().length > 0 && !PENDENTE.test(value);
}

// Aceita o número com ou sem DDI e com qualquer pontuação; devolve só dígitos no formato do wa.me.
export function whatsappNumber(value: string): string | null {
  if (!isConfirmed(value)) return null;
  const digits = value.replace(/\D/g, "");
  const withCountry = digits.length === 10 || digits.length === 11 ? `55${digits}` : digits;
  return /^55\d{10,11}$/.test(withCountry) ? withCountry : null;
}

export function whatsappUrl(number: string, text: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export type ContactKind = "whatsapp" | "email";

export function contactHref(kind: ContactKind, value: string): string | null {
  if (!isConfirmed(value)) return null;
  if (kind === "whatsapp") {
    const number = whatsappNumber(value);
    return number ? `https://wa.me/${number}` : null;
  }
  return `mailto:${value.trim()}`;
}
