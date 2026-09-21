export const STEAKHOUSE_USDG_VAULT = '0xBeEff033F34C046626B8D0A041844C5d1A5409dd' as const;

export const STEAKHOUSE_USDG_APP_URL
  = `https://app.morpho.org/robinhood-chain/vault/${STEAKHOUSE_USDG_VAULT}/steakhouse-usdg`;

const BASE = import.meta.env.MODE === 'test'
  ? 'https://api.morpho.org'
  : '/morpho-api';

const VAULT_APY_QUERY = `
query VaultApy($address: String!, $chainId: Int!) {
  vaultV2ByAddress(address: $address, chainId: $chainId) {
    apy
    netApy
    avgNetApy
  }
}
`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readApy(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value))
    return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed))
      return parsed;
  }
  return Number.NaN;
}

/** Morpho returns a decimal APY (0.036 = 3.6%). Convert to percent for the UI. */
export function apyToPercent(raw: number): number {
  if (!Number.isFinite(raw))
    return Number.NaN;
  if (raw > 1 || raw < -1)
    return raw;
  return raw * 100;
}

function parseVaultApy(data: unknown): number {
  if (!isRecord(data) || !isRecord(data.data))
    return Number.NaN;
  const vault = data.data.vaultV2ByAddress;
  if (!isRecord(vault))
    return Number.NaN;
  const fromNet = readApy(vault.netApy);
  const fromApy = readApy(vault.apy);
  const chosen = Number.isFinite(fromNet) ? fromNet : fromApy;
  return apyToPercent(chosen);
}

/**
 * Instant net APY excluding rewards for Steakhouse USDG on chain 4663.
 * Uses Morpho public GraphQL (REST /apy is 404 for this vault).
 */
export async function fetchSteakhouseUsdgApy(): Promise<number> {
  try {
    const res = await fetch(`${BASE}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: VAULT_APY_QUERY,
        variables: { address: STEAKHOUSE_USDG_VAULT, chainId: 4663 },
      }),
    });
    if (!res.ok)
      return Number.NaN;
    return parseVaultApy(await res.json());
  }
  catch {
    return Number.NaN;
  }
}
