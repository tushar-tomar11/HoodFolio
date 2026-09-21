import { describe, expect, it } from 'vitest';
import { HOME_FAQ, HOME_FEATURES, HOME_STEPS, NETWORK_RECIPE, STOCK_TOKEN_COUNT } from '@/chain/home-content';

describe('home content', () => {
  it('lists six feature cards that deep-link inside the app', () => {
    expect(HOME_FEATURES).toHaveLength(6);
    for (const feature of HOME_FEATURES)
      expect(feature.to.startsWith('/')).toBe(true);
  });

  it('documents ten stock tokens and USDG six decimals in FAQ', () => {
    expect(STOCK_TOKEN_COUNT).toBe(10);
    expect(HOME_FAQ.some(item => item.a.includes('6'))).toBe(true);
    expect(HOME_FAQ.some(item => item.a.includes('rpc.robinhood.com') || item.a.toLowerCase().includes('rpc'))).toBe(true);
    expect(HOME_FAQ.some(item => item.q.toLowerCase().includes('tax'))).toBe(true);
  });

  it('has four how-it-works steps and chain 4663 in the network recipe', () => {
    expect(HOME_STEPS).toHaveLength(4);
    expect(NETWORK_RECIPE.chainId).toBe(4663);
    expect(NETWORK_RECIPE.rpc).toContain('robinhood');
  });
});
