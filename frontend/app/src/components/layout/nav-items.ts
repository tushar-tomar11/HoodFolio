export interface HoodNavItem {
  label: string;
  href: string;
}

export const HOOD_NAV: HoodNavItem[] = [
  { label: 'Overview', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Stocks', href: '/stocks' },
  { label: 'Meme Coins', href: '/memecoins' },
  { label: 'Yield', href: '/yield' },
  { label: 'Analytics', href: '/analytics' },
];

export function isNavActive(path: string, href: string): boolean {
  if (href === '/')
    return path === '/';
  return path.startsWith(href);
}
