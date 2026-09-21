import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { apyToPercent, fetchSteakhouseUsdgApy } from '@/services/morpho';
import { server } from '../mocks/server';

describe('morpho APY', () => {
  it('treats 0.0361 as 3.61 percent', () => {
    expect(apyToPercent(0.0361)).toBeCloseTo(3.61);
  });

  it('leaves values already in percent as percent', () => {
    expect(apyToPercent(3.61)).toBeCloseTo(3.61);
  });

  it('returns live net APY from Morpho GraphQL', async () => {
    const pct = await fetchSteakhouseUsdgApy();
    expect(pct).toBeCloseTo(3.61);
  });

  it('returns NaN when Morpho is down', async () => {
    server.use(
      http.post('https://api.morpho.org/graphql', () =>
        HttpResponse.json({}, { status: 503 })),
    );
    const pct = await fetchSteakhouseUsdgApy();
    expect(Number.isFinite(pct)).toBe(false);
  });
});
