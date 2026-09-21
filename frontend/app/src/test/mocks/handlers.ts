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
];
