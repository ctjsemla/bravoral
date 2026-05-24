const TZ = "America/Sao_Paulo";

export function timeBRT(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

let useDecimal = true;

export function setOddsFormat(decimal: boolean) {
  useDecimal = decimal;
}

export function formatPrice(decimal: number) {
  if (useDecimal) return decimal.toFixed(2);
  return frac(decimal);
}

export function frac(decimal: number) {
  const x = decimal - 1;
  if (x <= 0) return "EVS";
  const num = Math.round(x * 8);
  const den = 8;
  const g = (a: number, b: number): number => (b ? g(b, a % b) : a);
  const d = g(num, den);
  return `${num / d}/${den / d}`;
}
