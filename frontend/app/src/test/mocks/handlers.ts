import { http, HttpResponse } from 'msw';

export const NVDA = '0xd0601ce157db5bdc3162bbac2a2c8af5320d9eec';

export const TSLA = '0x322f0929c4625ed5bad873c95208d54e1c003b2d';

export const handlers = [
  http.get('https://api.dexpaprika.com/networks/robinhood/multi/prices', ({ request }) => {
    const url = new URL(request.url);
    const tokens = (url.searchParams.get('tokens') ?? '').split(',').filter(Boolean);
    const rows = tokens
      .filter(token => token === NVDA || token === TSLA)
      .map(id => ({
        id,
        chain: 'robinhood',
        price_usd: id === NVDA ? 141.88 : 210.5,
      }));
    return HttpResponse.json(rows);
  }),
  http.get('https://api.dexpaprika.com/networks/robinhood/pools/search', () =>
    HttpResponse.json({
      results: [
        {
          id: '0xpool1',
          dex_id: 'uniswap_v3',
          dex_name: 'Uniswap V3',
          chain: 'robinhood',
          volume_usd_24h: 100,
          liquidity_usd: 50,
          transactions_24h: 12,
          tokens: [{ id: NVDA, symbol: 'NVDA' }, { id: '0xusdg', symbol: 'USDG' }],
        },
        {
          id: '0xpool2',
          dex_id: 'uniswap_v2',
          dex_name: 'Uniswap V2',
          chain: 'robinhood',
          volume_usd_24h: 40,
          liquidity_usd: 20,
          transactions_24h: 4,
          tokens: [{ id: TSLA, symbol: 'TSLA' }, { id: NVDA, symbol: 'NVDA' }],
        },
      ],
    })),
  http.get('https://api.dexpaprika.com/networks/robinhood/dexes', () =>
    HttpResponse.json({
      dexes: [
        {
          dex_id: 'uniswap_v3',
          dex_name: 'Uniswap V3',
          chain: 'robinhood',
          volume_usd_24h: 10,
          txns_24h: 3,
          pools_count: 2,
        },
      ],
    })),
  http.get('https://api.dexpaprika.com/networks/robinhood/tokens/:address', () =>
    HttpResponse.json({
      summary: {
        price_usd: 141.88,
        '24h': {
          last_price_usd_change: 1.25,
          volume_usd: 50000,
        },
      },
    })),
  http.get('https://api.dexpaprika.com/networks/robinhood/pools/:pool/ohlcv', () =>
    HttpResponse.json([
      { close: 140 },
      { close: 141 },
      { close: 142 },
    ])),
  http.get('https://api.morpho.org/v1/vaults-v2/:sel/apy', () =>
    HttpResponse.json({ apy: 0.0361 })),
  http.get('https://api.morpho.org/v0/vaults-v2/:sel/apy', () =>
    HttpResponse.json({ apy: 0.0361 })),
  http.post('https://api.morpho.org/graphql', () =>
    HttpResponse.json({
      data: {
        vaultV2ByAddress: {
          address: '0xBeEff033F34C046626B8D0A041844C5d1A5409dd',
          apy: 0.0361,
          netApy: 0.0361,
        },
      },
    })),
];
