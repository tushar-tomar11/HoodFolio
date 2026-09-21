export type PremiumKind = 'premium' | 'discount' | 'par';

export interface PremiumFormat {
  text: string;
  type: PremiumKind;
}

const EXPLORER_BASE = import.meta.env.VITE_BLOCK_EXPLORER ?? 'https://robinhoodchain.blockscout.com';

const USD_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function compactSuffix(abs: number): { value: number; suffix: string } | null {
  if (abs >= 1_000_000_000)
    return { value: abs / 1_000_000_000, suffix: 'B' };
  if (abs >= 1_000_000)
    return { value: abs / 1_000_000, suffix: 'M' };
  if (abs >= 1_000)
    return { value: abs / 1_000, suffix: 'K' };
  return null;
}

/** "$84,210.47" */
export function formatUSD(n: number, decimals = 2): string {
  if (!Number.isFinite(n))
    return '—';
  if (decimals === 2)
    return USD_FORMATTER.format(n);

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

/** "$315M", "$84.2K", "$1.4B" */
export function formatUSDCompact(n: number): string {
  if (!Number.isFinite(n))
    return '—';

  const sign = n < 0 ? '-' : '';
  const compact = compactSuffix(Math.abs(n));
  if (!compact)
    return formatUSD(n);

  const formatted = compact.value >= 10
    ? compact.value.toFixed(0)
    : compact.value.toFixed(1).replace(/\.0$/, '');

  return `${sign}$${formatted}${compact.suffix}`;
}

/** "+1.62%", "-0.43%" */
export function formatPercent(n: number, showSign = true): string {
  if (!Number.isFinite(n))
    return '—';

  const abs = `${Math.abs(n).toFixed(2)}%`;
  if (!showSign)
    return abs;
  if (n < 0)
    return `-${abs}`;
  return `+${abs}`;
}

/** Human-readable token amount from on-chain bigint units. */
export function formatTokenAmount(n: bigint, decimals = 18): string {
  const negative = n < 0n;
  const value = negative ? -n : n;
  const base = 10n ** BigInt(decimals);
  const whole = value / base;
  const frac = value % base;
  const shown = decimals <= 6 ? 2 : 4;
  const fracStr = frac.toString().padStart(decimals, '0').slice(0, shown).padEnd(shown, '0');
  const wholeStr = whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const body = `${wholeStr}.${fracStr}`;
  return negative ? `-${body}` : body;
}

/**
 * Premium vs a delayed traditional quote when a quote API is configured.
 * Values above 0.1 are PREMIUM (on-chain more expensive).
 * Values below -0.1 are DISCOUNT (on-chain cheaper).
 * Everything else is AT PAR.
 */
export function formatPremium(premium: number): PremiumFormat {
  if (!Number.isFinite(premium) || Math.abs(premium) <= 0.1) {
    return { text: 'AT PAR', type: 'par' };
  }

  const n = Math.abs(premium).toFixed(2);
  if (premium > 0.1)
    return { text: `▲${n}% PREMIUM`, type: 'premium' };

  return { text: `▼${n}% DISCOUNT`, type: 'discount' };
}

/** "0x1234...abcd" */
export function truncateAddress(addr: string, chars = 4): string {
  if (!addr)
    return '';
  if (addr.length <= chars * 2 + 2)
    return addr;
  return `${addr.slice(0, chars + 2)}...${addr.slice(-chars)}`;
}

export type ExplorerPath = 'address' | 'tx' | 'token' | 'block';

export function explorerUrl(addr: string, type: ExplorerPath = 'address'): string {
  const base = EXPLORER_BASE.replace(/\/$/, '');
  return `${base}/${type}/${addr}`;
}

/** "2h ago", "3d ago", "just now" */
export function timeAgo(timestamp: number | Date, nowMs = Date.now()): string {
  const ms = timestamp instanceof Date ? timestamp.getTime() : timestamp;
  const normalized = ms < 1e12 ? ms * 1000 : ms;
  const delta = nowMs - normalized;

  if (!Number.isFinite(delta) || delta < 60_000)
    return 'just now';

  const minutes = Math.floor(delta / 60_000);
  if (minutes < 60)
    return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24)
    return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30)
    return `${days}d ago`;

  if (days < 365)
    return `${Math.floor(days / 30)}mo ago`;

  return `${Math.floor(days / 365)}y ago`;
}

export { USD_FORMATTER };
