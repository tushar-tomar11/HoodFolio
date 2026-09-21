/**
 * NYSE/NASDAQ reference prices at last check.
 * Used only for premium/discount vs on-chain DexPaprika prices — never as live USD value.
 */
export const REFERENCE_MARKET_PRICES: Record<string, number> = {
  TSLA: 211.42,
  NVDA: 142.18,
  AAPL: 189.73,
  MSFT: 415.66,
  AMZN: 194.89,
  GOOGL: 179.23,
  META: 558.34,
  COIN: 187.45,
  SPY: 568.12,
  QQQ: 490.23,
  USDG: 1,
};

export function calcPremium(onChainPrice: number, traditionalPrice: number): number {
  if (!traditionalPrice)
    return Number.NaN;
  return ((onChainPrice - traditionalPrice) / traditionalPrice) * 100;
}
