const NBSP = " ";

export type DurationUnits = { readonly minutos: string; readonly horas: string };

// Espaços não separáveis mantêm "1 h 15 min" e "R$ 180" sempre na mesma linha.
export function formatDuration(total: number, units: DurationUnits): string {
  if (total < 60) return `${total}${NBSP}${units.minutos}`;
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  const hoursText = `${hours}${NBSP}${units.horas}`;
  return minutes ? `${hoursText}${NBSP}${minutes}${NBSP}${units.minutos}` : hoursText;
}

export function formatMinutes(total: number, units: DurationUnits): string {
  return `${total}${NBSP}${units.minutos}`;
}

export function formatPrice(value: number, currency: string): string {
  const grouped = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${currency}${NBSP}${grouped}`;
}
