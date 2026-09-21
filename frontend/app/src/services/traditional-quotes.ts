export interface TraditionalQuotesResult {
  quotes: Map<string, number>;
  source: string | null;
  fetchedAt: Date | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Live traditional-market last prices from the serverless `/api/quotes` proxy.
 * 204 / missing key → empty map (Market and Premium stay hidden).
 */
export async function fetchTraditionalQuotes(): Promise<TraditionalQuotesResult> {
  const empty: TraditionalQuotesResult = { quotes: new Map(), source: null, fetchedAt: null };
  try {
    const res = await fetch('/api/quotes');
    if (res.status === 204 || res.status === 404)
      return empty;
    if (!res.ok)
      return empty;
    const data: unknown = await res.json();
    if (!isRecord(data) || !isRecord(data.quotes))
      return empty;
    const quotes = new Map<string, number>();
    for (const [symbol, price] of Object.entries(data.quotes)) {
      if (typeof price === 'number' && Number.isFinite(price) && price > 0)
        quotes.set(symbol, price);
    }
    const source = typeof data.source === 'string' ? data.source : null;
    const fetchedAt = typeof data.fetchedAt === 'string' ? new Date(data.fetchedAt) : new Date();
    return { quotes, source, fetchedAt };
  }
  catch {
    return empty;
  }
}
