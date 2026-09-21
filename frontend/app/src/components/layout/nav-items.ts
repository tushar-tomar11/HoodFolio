export interface HoodNavItem {
  label: string;
  href: string;
  external?: boolean;
}

/** Same-origin path as other nav items; opened in a new tab via `<a target="_blank">`. */
export const HOOD_DOCS_URL = '/docs';

export const HOOD_NAV: HoodNavItem[] = [
  { label: 'Overview', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Stocks', href: '/stocks' },
  { label: 'Meme Coins', href: '/memecoins' },
  { label: 'Yield', href: '/yield' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Docs', href: HOOD_DOCS_URL, external: true },
];

export function isNavActive(path: string, href: string): boolean {
  if (href === '/')
    return path === '/';
  return path.startsWith(href);
}
