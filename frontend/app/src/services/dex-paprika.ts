export interface DexPaprikaPrice {
  id: string;
  chain: string;
  price_usd: number;
}

export interface DexPaprikaPoolToken {
  id: string;
  symbol?: string;
  name?: string;
  price_usd?: number;
}

export interface DexPaprikaPool {
  id: string;
  dex_id: string;
  dex_name?: string;
  chain: string;
  volume_usd_24h: number;
  liquidity_usd: number;
  transactions_24h: number;
  tokens: DexPaprikaPoolToken[];
}

export interface DexPaprikaDex {
  dex_id: string;
  dex_name: string;
  chain: string;
  volume_usd_24h: number;
  liquidity_usd?: number;
  transactions_24h?: number;
  txns_24h?: number;
  pools_count: number;
}

const BASE = import.meta.env.MODE === 'test'
  ? 'https://api.dexpaprika.com'
  : '/dexpaprika';
const BATCH_LIMIT = 10;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function readNumber(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function unwrapList(value: unknown): unknown[] {
  if (Array.isArray(value))
    return value;
  if (!isRecord(value))
    return [];
  if (Array.isArray(value.dexes))
    return value.dexes;
  if (Array.isArray(value.results))
    return value.results;
  if (Array.isArray(value.pools))
    return value.pools;
  return [];
}

function parsePrice(value: unknown): DexPaprikaPrice | undefined {
  if (!isRecord(value))
    return undefined;
  const id = readString(value.id);
  const price = value.price_usd;
  if (!id || typeof price !== 'number' || !Number.isFinite(price))
    return undefined;
  return {
    id,
    chain: readString(value.chain),
    price_usd: price,
  };
}

function parsePoolToken(value: unknown): DexPaprikaPoolToken | undefined {
  if (!isRecord(value))
    return undefined;
  const id = readString(value.id);
  if (!id)
    return undefined;
  return {
    id,
    symbol: typeof value.symbol === 'string' ? value.symbol : undefined,
    name: typeof value.name === 'string' ? value.name : undefined,
    price_usd: typeof value.price_usd === 'number' ? value.price_usd : undefined,
  };
}

function parsePool(value: unknown): DexPaprikaPool | undefined {
  if (!isRecord(value))
    return undefined;
  const id = readString(value.id);
  if (!id)
    return undefined;
  const tokensRaw = value.tokens;
  const tokens: DexPaprikaPoolToken[] = [];
  if (Array.isArray(tokensRaw)) {
    for (const token of tokensRaw) {
      const parsed = parsePoolToken(token);
      if (parsed)
        tokens.push(parsed);
    }
  }
  return {
    id,
    dex_id: readString(value.dex_id),
    dex_name: typeof value.dex_name === 'string' ? value.dex_name : undefined,
    chain: readString(value.chain),
    volume_usd_24h: readNumber(value.volume_usd_24h),
    liquidity_usd: readNumber(value.liquidity_usd),
    transactions_24h: readNumber(value.transactions_24h ?? value.txns_24h),
    tokens,
  };
}

function parseDex(value: unknown): DexPaprikaDex | undefined {
  if (!isRecord(value))
    return undefined;
  const dexId = readString(value.dex_id);
  if (!dexId)
    return undefined;
  return {
    dex_id: dexId,
    dex_name: readString(value.dex_name),
    chain: readString(value.chain),
    volume_usd_24h: readNumber(value.volume_usd_24h),
    liquidity_usd: typeof value.liquidity_usd === 'number' ? value.liquidity_usd : undefined,
    transactions_24h: typeof value.transactions_24h === 'number' ? value.transactions_24h : undefined,
    txns_24h: typeof value.txns_24h === 'number' ? value.txns_24h : undefined,
    pools_count: readNumber(value.pools_count),
  };
}

export async function fetchTokenPrices(addresses: string[]): Promise<Map<string, number>> {
  if (addresses.length === 0)
    return new Map();
  if (addresses.length > BATCH_LIMIT)
    throw new Error('DexPaprika batch limit is 10 tokens per call');

  const params = addresses.map(item => item.toLowerCase()).join(',');
  const res = await fetch(`${BASE}/networks/robinhood/multi/prices?tokens=${params}`);
  if (!res.ok)
    throw new Error(`DexPaprika price fetch failed: ${res.status} ${res.statusText}`);

  const data: unknown = await res.json();
  const map = new Map<string, number>();
  if (!Array.isArray(data))
    return map;
  for (const item of data) {
    const parsed = parsePrice(item);
    if (parsed)
      map.set(parsed.id.toLowerCase(), parsed.price_usd);
  }
  return map;
}

export async function fetchAllStockPrices(tokenAddresses: Record<string, string>): Promise<Map<string, number>> {
  const entries = Object.entries(tokenAddresses);
  const result = new Map<string, number>();
  if (entries.length === 0)
    return result;

  let lastError: unknown;
  let anyOk = false;

  for (let i = 0; i < entries.length; i += BATCH_LIMIT) {
    const chunk = entries.slice(i, i + BATCH_LIMIT);
    const addrToSymbol = new Map(chunk.map(([symbol, address]) => [address.toLowerCase(), symbol]));
    try {
      const priceMap = await fetchTokenPrices(chunk.map(([, address]) => address));
      anyOk = true;
      for (const [addr, price] of priceMap) {
        const symbol = addrToSymbol.get(addr);
        if (symbol)
          result.set(symbol, price);
      }
    }
    catch (error: unknown) {
      lastError = error;
      console.error('[HoodFolio] DexPaprika batch failed:', error);
    }
  }

  if (!anyOk && lastError instanceof Error)
    throw lastError;
  if (!anyOk)
    throw new Error('Failed to fetch prices from DexPaprika');
  return result;
}

export async function fetchTopPools(limit = 20): Promise<DexPaprikaPool[]> {
  const res = await fetch(
    `${BASE}/networks/robinhood/pools/search?order_by=volume_usd_24h&sort=desc&limit=${limit}`,
  );
  if (!res.ok)
    throw new Error(`DexPaprika pool fetch failed: ${res.status}`);
  const data: unknown = await res.json();
  const pools: DexPaprikaPool[] = [];
  for (const item of unwrapList(data)) {
    const parsed = parsePool(item);
    if (parsed)
      pools.push(parsed);
  }
  return pools;
}

export async function fetchChainDexStats(): Promise<DexPaprikaDex[]> {
  const res = await fetch(`${BASE}/networks/robinhood/dexes`);
  if (!res.ok)
    throw new Error(`DexPaprika DEX fetch failed: ${res.status}`);
  const data: unknown = await res.json();
  const dexes: DexPaprikaDex[] = [];
  for (const item of unwrapList(data)) {
    const parsed = parseDex(item);
    if (parsed)
      dexes.push(parsed);
  }
  return dexes;
}

export interface DexPaprikaTokenSummary {
  address: string;
  priceUsd: number;
  change24hPct: number;
  volumeUsd24h: number;
}

export interface DexPaprikaOhlcvPoint {
  close: number;
  time?: string;
}

function parseChange24h(summary: unknown): number {
  if (!isRecord(summary))
    return Number.NaN;
  const window = summary['24h'];
  if (!isRecord(window))
    return Number.NaN;
  const change = window.last_price_usd_change;
  return typeof change === 'number' && Number.isFinite(change) ? change : Number.NaN;
}

function parseTokenSummary(address: string, data: unknown): DexPaprikaTokenSummary | undefined {
  if (!isRecord(data))
    return undefined;
  const summary = data.summary;
  const priceUsd = isRecord(summary)
    ? (typeof summary.price_usd === 'number' ? summary.price_usd : Number.NaN)
    : Number.NaN;
  const volumeUsd24h = isRecord(summary) && isRecord(summary['24h'])
    ? readNumber(summary['24h'].volume_usd)
    : 0;
  return {
    address: address.toLowerCase(),
    priceUsd,
    change24hPct: parseChange24h(summary),
    volumeUsd24h,
  };
}

export async function fetchTokenData(address: string): Promise<unknown> {
  const res = await fetch(`${BASE}/networks/robinhood/tokens/${address.toLowerCase()}`);
  if (!res.ok)
    throw new Error(`DexPaprika token fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchTokenSummary(address: string): Promise<DexPaprikaTokenSummary> {
  const data = await fetchTokenData(address);
  const parsed = parseTokenSummary(address, data);
  if (!parsed)
    throw new Error('DexPaprika token summary missing');
  return parsed;
}

export async function fetchTokenSummaries(
  tokenAddresses: Record<string, string>,
): Promise<Map<string, DexPaprikaTokenSummary>> {
  const result = new Map<string, DexPaprikaTokenSummary>();
  const entries = Object.entries(tokenAddresses);
  const CONCURRENCY = 4;
  for (let i = 0; i < entries.length; i += CONCURRENCY) {
    const chunk = entries.slice(i, i + CONCURRENCY);
    const settled = await Promise.allSettled(
      chunk.map(async ([symbol, address]) => {
        const summary = await fetchTokenSummary(address);
        return { symbol, summary };
      }),
    );
    for (const item of settled) {
      if (item.status === 'fulfilled')
        result.set(item.value.symbol, item.value.summary);
    }
  }
  return result;
}

function parseOhlcvClose(row: unknown): number {
  if (typeof row === 'number' && Number.isFinite(row))
    return row;
  if (!isRecord(row))
    return Number.NaN;
  if (typeof row.close === 'number' && Number.isFinite(row.close))
    return row.close;
  if (typeof row.c === 'number' && Number.isFinite(row.c))
    return row.c;
  if (typeof row.price === 'number' && Number.isFinite(row.price))
    return row.price;
  return Number.NaN;
}

export async function fetchPoolOhlcvCloses(poolId: string, limit = 24): Promise<number[]> {
  const params = new URLSearchParams({
    interval: '1h',
    limit: String(limit),
  });
  const res = await fetch(
    `${BASE}/networks/robinhood/pools/${encodeURIComponent(poolId)}/ohlcv?${params.toString()}`,
  );
  if (!res.ok)
    throw new Error(`DexPaprika OHLCV fetch failed: ${res.status}`);
  const data: unknown = await res.json();
  const rows = Array.isArray(data)
    ? data
    : isRecord(data) && Array.isArray(data.ohlcv)
      ? data.ohlcv
      : isRecord(data) && Array.isArray(data.data)
        ? data.data
        : [];
  const closes: number[] = [];
  for (const row of rows) {
    const close = parseOhlcvClose(row);
    if (Number.isFinite(close))
      closes.push(close);
  }
  return closes;
}

export function primaryPoolIdBySymbol(
  pools: DexPaprikaPool[],
  tokenAddresses: Record<string, string>,
): Map<string, string> {
  const addrToSymbol = new Map(
    Object.entries(tokenAddresses).map(([symbol, address]) => [address.toLowerCase(), symbol]),
  );
  const best = new Map<string, { id: string; volume: number }>();
  for (const pool of pools) {
    for (const token of pool.tokens) {
      const symbol = addrToSymbol.get(token.id.toLowerCase());
      if (!symbol)
        continue;
      const prev = best.get(symbol);
      if (!prev || pool.volume_usd_24h > prev.volume)
        best.set(symbol, { id: pool.id, volume: pool.volume_usd_24h });
    }
  }
  return new Map([...best].map(([symbol, row]) => [symbol, row.id]));
}
