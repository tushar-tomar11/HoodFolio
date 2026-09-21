import type { Component } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const base = import.meta.env.VITE_PUBLIC_PATH ? window.location.pathname : '/';

async function loadOverview(): Promise<Component> {
  return (await import('@/views/OverviewView.vue')).default;
}

async function loadPortfolio(): Promise<Component> {
  return (await import('@/views/PortfolioView.vue')).default;
}

async function loadStocks(): Promise<Component> {
  return (await import('@/views/StocksView.vue')).default;
}

async function loadMemecoins(): Promise<Component> {
  return (await import('@/views/MemecoinsView.vue')).default;
}

async function loadYield(): Promise<Component> {
  return (await import('@/views/YieldView.vue')).default;
}

async function loadAnalytics(): Promise<Component> {
  return (await import('@/views/AnalyticsView.vue')).default;
}

async function loadDocs(): Promise<Component> {
  return (await import('@/views/DocsView.vue')).default;
}

async function loadNotFound(): Promise<Component> {
  return (await import('@/views/NotFoundView.vue')).default;
}

export const router = createRouter({
  history: createWebHistory(base),
  routes: [
    { path: '/', name: 'overview', component: loadOverview, meta: { title: 'Overview' } },
    { path: '/portfolio', name: 'portfolio', component: loadPortfolio, meta: { title: 'Portfolio' } },
    { path: '/stocks', name: 'stocks', component: loadStocks, meta: { title: 'Stocks' } },
    { path: '/memecoins', name: 'memecoins', component: loadMemecoins, meta: { title: 'Meme Coins' } },
    { path: '/yield', name: 'yield', component: loadYield, meta: { title: 'Yield' } },
    { path: '/analytics', name: 'analytics', component: loadAnalytics, meta: { title: 'Analytics' } },
    { path: '/docs', name: 'docs', component: loadDocs, meta: { title: 'Documentation' } },
    { path: '/:pathMatch(.*)*', name: '404', component: loadNotFound, meta: { title: 'Not found' } },
  ],
  scrollBehavior: (to) => {
    if (to.hash)
      return { el: to.hash, top: 72 };
    return { left: 0, top: 0 };
  },
});

router.beforeEach((to) => {
  const titles: Record<string, string> = {
    overview: 'HoodFolio — Robinhood Chain Portfolio Dashboard',
    portfolio: 'My Portfolio | HoodFolio',
    stocks: 'Stock Token Markets | HoodFolio',
    memecoins: 'Meme Coin Leaderboard | HoodFolio',
    yield: 'USDG Yield | HoodFolio',
    analytics: 'Chain Analytics | HoodFolio',
    docs: 'Documentation | HoodFolio',
    404: '404 — Page Not Found | HoodFolio',
  };
  const name = typeof to.name === 'string' ? to.name : 'overview';
  document.title = titles[name] ?? 'HoodFolio';
  return true;
});
