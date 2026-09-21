export interface HoodNavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const HOOD_DOCS_URL = 'https://docs.hoodfolio.xyz';

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
