export interface DailyVolumePoint {
  date: string;
  volumeUSD: number;
}

export interface MemeCoinRow {
  rank: number;
  symbol: string;
  name: string;
  marketCapUSD: number;
  volume24hUSD: number;
  change24hPct: number;
  holders: number;
  tokenAddress: `0x${string}`;
  trending: boolean;
}

export interface TopWalletRow {
  rank: number;
  address: `0x${string}`;
  label: string;
  totalValueUSD: number;
}

export interface RecentLaunch {
  symbol: string;
  name: string;
  launchedAt: number;
  hoursLive: number;
  marketCapUSD: number;
}

export interface ChainStats {
  tvlUSD: number;
  tvlChangePct: number;
  volume24hUSD: number;
  activeWallets: number;
  tx24h: number;
  dailyVolume: DailyVolumePoint[];
  topMemeCoins: MemeCoinRow[];
  topWallets: TopWalletRow[];
  recentLaunches: RecentLaunch[];
}

function hoursAgo(hours: number): number {
  return Date.now() - hours * 60 * 60 * 1000;
}

const DAILY_VOLUME: DailyVolumePoint[] = [
  { date: '2026-09-03', volumeUSD: 98_400_000 },
  { date: '2026-09-04', volumeUSD: 104_200_000 },
  { date: '2026-09-05', volumeUSD: 111_800_000 },
  { date: '2026-09-06', volumeUSD: 89_600_000 },
  { date: '2026-09-07', volumeUSD: 121_300_000 },
  { date: '2026-09-08', volumeUSD: 133_700_000 },
  { date: '2026-09-09', volumeUSD: 128_100_000 },
  { date: '2026-09-10', volumeUSD: 140_400_000 },
  { date: '2026-09-11', volumeUSD: 118_900_000 },
  { date: '2026-09-12', volumeUSD: 109_500_000 },
  { date: '2026-09-13', volumeUSD: 96_200_000 },
  { date: '2026-09-14', volumeUSD: 124_800_000 },
  { date: '2026-09-15', volumeUSD: 137_600_000 },
  { date: '2026-09-16', volumeUSD: 145_200_000 },
  { date: '2026-09-17', volumeUSD: 138_400_000 },
  { date: '2026-09-18', volumeUSD: 151_000_000 },
  { date: '2026-09-19', volumeUSD: 142_000_000 },
];

export const MOCK_CHAIN_STATS: ChainStats = {
  tvlUSD: 315_000_000,
  tvlChangePct: 2.14,
  volume24hUSD: 142_000_000,
  activeWallets: 48_220,
  tx24h: 892_400,
  dailyVolume: DAILY_VOLUME,
  topMemeCoins: [
    {
      rank: 1,
      symbol: 'PEPE',
      name: 'Pepe',
      marketCapUSD: 18_400_000,
      volume24hUSD: 6_120_000,
      change24hPct: 18.4,
      holders: 12440,
      tokenAddress: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
      trending: true,
    },
    {
      rank: 2,
      symbol: 'WIF',
      name: 'dogwifhat',
      marketCapUSD: 11_200_000,
      volume24hUSD: 3_880_000,
      change24hPct: -6.2,
      holders: 8310,
      tokenAddress: '0x0000000000000000000000000000000000000001',
      trending: false,
    },
    {
      rank: 3,
      symbol: 'BONK',
      name: 'Bonk',
      marketCapUSD: 9_760_000,
      volume24hUSD: 4_410_000,
      change24hPct: 9.8,
      holders: 15120,
      tokenAddress: '0x0000000000000000000000000000000000000002',
      trending: true,
    },
    {
      rank: 4,
      symbol: 'DOGE',
      name: 'Dogecoin',
      marketCapUSD: 7_150_000,
      volume24hUSD: 2_040_000,
      change24hPct: 3.1,
      holders: 6220,
      tokenAddress: '0x0000000000000000000000000000000000000003',
      trending: false,
    },
    {
      rank: 5,
      symbol: 'MOG',
      name: 'Mog Coin',
      marketCapUSD: 4_880_000,
      volume24hUSD: 2_760_000,
      change24hPct: 22.6,
      holders: 4180,
      tokenAddress: '0x0000000000000000000000000000000000000004',
      trending: true,
    },
    {
      rank: 6,
      symbol: 'BRETT',
      name: 'Brett',
      marketCapUSD: 3_420_000,
      volume24hUSD: 1_510_000,
      change24hPct: -11.4,
      holders: 2990,
      tokenAddress: '0x0000000000000000000000000000000000000005',
      trending: false,
    },
    {
      rank: 7,
      symbol: 'FLOKI',
      name: 'Floki',
      marketCapUSD: 2_910_000,
      volume24hUSD: 980_000,
      change24hPct: 1.4,
      holders: 3540,
      tokenAddress: '0x0000000000000000000000000000000000000006',
      trending: false,
    },
    {
      rank: 8,
      symbol: 'SHIB',
      name: 'Shiba Inu',
      marketCapUSD: 2_440_000,
      volume24hUSD: 1_220_000,
      change24hPct: -2.8,
      holders: 5710,
      tokenAddress: '0x0000000000000000000000000000000000000007',
      trending: false,
    },
  ],
  topWallets: [
    {
      rank: 1,
      address: '0x1111111111111111111111111111111111111111',
      label: 'MM Prime',
      totalValueUSD: 6_420_000,
    },
    {
      rank: 2,
      address: '0x2222222222222222222222222222222222222222',
      label: 'Steakhouse',
      totalValueUSD: 4_180_000,
    },
    {
      rank: 3,
      address: '0x3333333333333333333333333333333333333333',
      label: 'Arb Desk',
      totalValueUSD: 2_960_000,
    },
    {
      rank: 4,
      address: '0x4444444444444444444444444444444444444444',
      label: 'Retail cluster',
      totalValueUSD: 1_740_000,
    },
    {
      rank: 5,
      address: '0x5555555555555555555555555555555555555555',
      label: 'Yield vault',
      totalValueUSD: 1_210_000,
    },
  ],
  recentLaunches: [
    { symbol: 'MOG', name: 'Mog Coin', launchedAt: hoursAgo(4), hoursLive: 4, marketCapUSD: 4_880_000 },
    { symbol: 'BRETT', name: 'Brett', launchedAt: hoursAgo(9), hoursLive: 9, marketCapUSD: 3_420_000 },
    { symbol: 'WIF', name: 'dogwifhat', launchedAt: hoursAgo(14), hoursLive: 14, marketCapUSD: 11_200_000 },
    { symbol: 'FLOKI', name: 'Floki', launchedAt: hoursAgo(21), hoursLive: 21, marketCapUSD: 2_910_000 },
    { symbol: 'SHIB', name: 'Shiba Inu', launchedAt: hoursAgo(28), hoursLive: 28, marketCapUSD: 2_440_000 },
  ],
};

export const YIELD_COMPARISON = [
  { protocol: 'Robinhood Earn (Morpho)', apy: 7.2, risk: 'Medium', lockup: 'None' },
  { protocol: 'Aave USDC (Ethereum)', apy: 3.8, risk: 'Low', lockup: 'None' },
  { protocol: 'US Treasury 4-week bill', apy: 5.1, risk: 'Very Low', lockup: '4 weeks' },
  { protocol: 'Compound USDC', apy: 4.2, risk: 'Low', lockup: 'None' },
] as const;

export const MORPHO_VAULT_URL = 'https://app.morpho.org';

export const MORPHO_HOME_URL = 'https://morpho.org';
