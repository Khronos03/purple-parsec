/** Formato de precio en pesos colombianos: 100000 → "$100.000". */
export const formatCOP = (value: number): string =>
  '$' + value.toLocaleString('es-CO', { maximumFractionDigits: 0 });
