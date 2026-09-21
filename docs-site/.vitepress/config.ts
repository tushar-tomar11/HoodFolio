import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'HoodFolio',
  description: 'The first portfolio dashboard for Robinhood Chain. Track tokenized stocks, USDG yield, and meme coin positions. Non-custodial, open source, reads directly from Chain 4663.',
  lang: 'en-US',
  base: '/docs/',
  srcDir: '.',
  outDir: './.vitepress/dist',
  lastUpdated: true,
  cleanUrls: true,
  srcExclude: ['README.md'],
  ignoreDeadLinks: [
    /^https?:\/\/localhost/,
  ],
  head: [
    ['link', { rel: 'icon', href: '/docs/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#00C805' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'HoodFolio Documentation' }],
    ['meta', { property: 'og:description', content: 'Documentation for HoodFolio — portfolio tracking for Robinhood Chain' }],
  ],
  themeConfig: {
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
      alt: 'HoodFolio',
    },
    siteTitle: 'HoodFolio',
    nav: [
      { text: 'Documentation', link: '/' },
      { text: 'App', link: 'https://hoodfolio.xyz', target: '_blank' },
      {
        text: 'v1.0',
        items: [
          { text: 'v1.0 (Current)', link: '/' },
          { text: 'Changelog', link: '/changelog' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/hoodfolio' },
      { icon: 'x', link: 'https://x.com/hoodfolio' },
    ],
    search: {
      provider: 'local',
      options: {
        placeholder: 'Search HoodFolio docs...',
        translations: {
          button: { buttonText: 'Search', buttonAriaLabel: 'Search docs' },
          modal: {
            noResultsText: 'No results for',
            resetButtonTitle: 'Clear search',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close',
            },
          },
        },
      },
    },
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is HoodFolio?', link: '/' },
          { text: 'Why Robinhood Chain?', link: '/introduction/why-robinhood-chain' },
          { text: 'How it works', link: '/introduction/how-it-works' },
        ],
      },
      {
        text: '🚀 Getting Started',
        collapsed: false,
        items: [
          { text: 'Quick Start', link: '/getting-started/quick-start' },
          { text: 'Connect Your Wallet', link: '/getting-started/connect-wallet' },
          { text: 'Add Robinhood Chain to MetaMask', link: '/getting-started/add-chain' },
          { text: 'Bridge ETH to Robinhood Chain', link: '/getting-started/bridge' },
        ],
      },
      {
        text: '📊 Portfolio',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/portfolio/overview' },
          { text: 'Stock Token Holdings', link: '/portfolio/stock-holdings' },
          { text: 'Premium & Discount Explained', link: '/portfolio/premium-discount' },
          { text: 'USDG Yield Position', link: '/portfolio/usdg-yield' },
          { text: 'Meme Coin Holdings', link: '/portfolio/meme-coins' },
        ],
      },
      {
        text: '📈 Stock Tokens',
        collapsed: false,
        items: [
          { text: 'What are Stock Tokens?', link: '/stocks/what-are-stock-tokens' },
          { text: 'Supported Tokens', link: '/stocks/supported-tokens' },
          { text: 'Token Contract Addresses', link: '/stocks/contract-addresses' },
          { text: 'Trading on Uniswap', link: '/stocks/trading' },
          { text: 'Premium vs Discount', link: '/stocks/premium-discount' },
        ],
      },
      {
        text: '💰 Yield',
        collapsed: true,
        items: [
          { text: 'USDG & Morpho Earn', link: '/yield/usdg-morpho' },
          { text: 'Current APY', link: '/yield/current-apy' },
          { text: 'How to Deposit', link: '/yield/how-to-deposit' },
          { text: 'Withdraw USDG', link: '/yield/withdraw' },
        ],
      },
      {
        text: '🔍 Analytics',
        collapsed: true,
        items: [
          { text: 'Chain Overview', link: '/analytics/chain-overview' },
          { text: 'Pool Explorer', link: '/analytics/pools' },
          { text: 'Meme Coin Leaderboard', link: '/analytics/meme-coins' },
          { text: 'Top Wallets', link: '/analytics/top-wallets' },
        ],
      },
      {
        text: '🔌 Data Sources',
        collapsed: true,
        items: [
          { text: 'DexPaprika API', link: '/data-sources/dexpaprika' },
          { text: 'Viem & RPC Reads', link: '/data-sources/viem-rpc' },
          { text: 'Blockscout Explorer', link: '/data-sources/blockscout' },
          { text: 'Reference Prices (NYSE/NASDAQ)', link: '/data-sources/reference-prices' },
        ],
      },
      {
        text: '⛓️ Robinhood Chain',
        collapsed: true,
        items: [
          { text: 'Chain Overview', link: '/robinhood-chain/overview' },
          { text: 'Network Details', link: '/robinhood-chain/network' },
          { text: 'Contract Addresses', link: '/robinhood-chain/contracts' },
          { text: 'Uniswap V4 on HOOD', link: '/robinhood-chain/uniswap' },
          { text: 'Morpho on HOOD', link: '/robinhood-chain/morpho' },
        ],
      },
      {
        text: 'FAQ',
        collapsed: true,
        items: [
          { text: 'General Questions', link: '/faq#general' },
          { text: 'Wallet & Connection', link: '/faq#wallet' },
          { text: 'Stock Tokens', link: '/faq#stock-tokens' },
          { text: 'Premium & Discount', link: '/faq#premium-discount' },
          { text: 'Yield & Morpho', link: '/faq#yield' },
          { text: 'Data & Privacy', link: '/faq#privacy' },
        ],
      },
      {
        text: '🤝 Contributing',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/contributing/overview' },
          { text: 'Bug Reports', link: '/contributing/bug-reports' },
          { text: 'Feature Requests', link: '/contributing/feature-requests' },
          { text: 'Development Setup', link: '/contributing/dev-setup' },
          { text: 'Adding Stock Tokens', link: '/contributing/adding-tokens' },
        ],
      },
      {
        text: 'Changelog',
        items: [
          { text: 'v1.0.0', link: '/changelog' },
        ],
      },
    ],
    editLink: {
      pattern: 'https://github.com/yourusername/hoodfolio/edit/main/docs-site/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Forked from <a href="https://github.com/rotki/rotki" target="_blank">rotki</a> (AGPL-3.0). Not financial advice.',
      copyright: '© 2026 HoodFolio. Built for Robinhood Chain (Chain ID 4663).',
    },
    lastUpdated: {
      text: 'Last updated',
      formatOptions: { dateStyle: 'medium' },
    },
    docFooter: {
      prev: 'Previous page',
      next: 'Next page',
    },
    outline: {
      level: [2, 3],
      label: 'On this page',
    },
  },
});
