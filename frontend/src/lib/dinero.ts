export function dolaresACentavos(valor: string): number {
  if (!valor) return 0;
  return Math.round(parseFloat(valor) * 100);
}