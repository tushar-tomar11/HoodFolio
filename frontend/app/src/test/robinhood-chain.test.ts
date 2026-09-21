import { describe, expect, it } from 'vitest';
import { STOCK_TOKENS } from '@/chain/robinhood-chain';
import { fetchTokenPrices } from '@/services/dex-paprika';

describe('robinhood Chain token config', () => {
  it('uSDG is configured as 6 decimals (not 18)', () => {
    expect(STOCK_TOKENS.USDG.decimals).toBe(6);
  });
});

const live = process.env.HOODFOLIO_LIVE === '1';

describe.skipIf(!live)('robinhood Chain connectivity (integration only)', () => {
  it('nVDA token contract exists on chain 4663', async () => {
    const { erc20Abi, publicClient } = await import('@/chain/robinhood-chain');
    const nvda = STOCK_TOKENS.NVDA;
    const name = await publicClient.readContract({
      address: nvda.address,
      abi: erc20Abi,
      functionName: 'name',
    });
    expect(typeof name).toBe('string');
    expect(String(name).length).toBeGreaterThan(0);
  });

  it('uSDG has 6 decimals on-chain', async () => {
    const { erc20Abi, publicClient } = await import('@/chain/robinhood-chain');
    const decimals = await publicClient.readContract({
      address: STOCK_TOKENS.USDG.address,
      abi: erc20Abi,
      functionName: 'decimals',
    });
    expect(Number(decimals)).toBe(6);
  });

  it('can read ETH balance of a known wallet', async () => {
    const { publicClient } = await import('@/chain/robinhood-chain');
    const balance = await publicClient.getBalance({
      address: '0x0000000000000000000000000000000000000001',
    });
    expect(typeof balance).toBe('bigint');
  });

  it('multicall reads all stock token balances in one call without error', async () => {
    const { erc20Abi, publicClient } = await import('@/chain/robinhood-chain');
    const testAddress = '0x0000000000000000000000000000000000000001' as const;
    const calls = Object.values(STOCK_TOKENS).map(token => ({
      address: token.address,
      abi: erc20Abi,
      functionName: 'balanceOf' as const,
      args: [testAddress] as const,
    }));
    const results = await publicClient.multicall({ contracts: calls, allowFailure: true });
    expect(results).toHaveLength(Object.keys(STOCK_TOKENS).length);
    for (const result of results)
      expect(result.status).toBe('success');
  });

  it('dexPaprika returns a price for NVDA address', async () => {
    const prices = await fetchTokenPrices([STOCK_TOKENS.NVDA.address]);
    expect(prices.has(STOCK_TOKENS.NVDA.address.toLowerCase())).toBe(true);
    const price = prices.get(STOCK_TOKENS.NVDA.address.toLowerCase()) ?? 0;
    expect(price).toBeGreaterThan(50);
    expect(price).toBeLessThan(1000);
  });
});
