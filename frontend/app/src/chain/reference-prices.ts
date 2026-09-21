/**
 * Premium vs a live traditional quote (Finnhub / Twelve Data when configured).
 * Never use a frozen snapshot as NYSE/NASDAQ.
 */
export function calcPremium(onChainPrice: number, traditionalPrice: number): number {
  if (!Number.isFinite(onChainPrice) || !Number.isFinite(traditionalPrice) || traditionalPrice <= 0)
    return Number.NaN;
  return ((onChainPrice - traditionalPrice) / traditionalPrice) * 100;
}
