import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';

const MIME: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function isInside(root: string, file: string): boolean {
  const rel = normalize(file).toLowerCase();
  const base = normalize(root).toLowerCase();
  return rel === base || rel.startsWith(`${base}\\`) || rel.startsWith(`${base}/`);
}

function resolveDocsFile(docsDist: string, urlPath: string): string | undefined {
  const stripped = urlPath.replace(/^\/docs\/?/, '') || 'index.html';
  const safe = normalize(stripped).replace(/^(\.\.(\/|\\|$))+/, '');
  const candidates = [
    join(docsDist, safe),
    join(docsDist, safe, 'index.html'),
    `${join(docsDist, safe)}.html`,
  ];
  for (const candidate of candidates) {
    if (!isInside(docsDist, candidate) || !existsSync(candidate))
      continue;
    if (statSync(candidate).isFile())
      return candidate;
  }
  const fallback = join(docsDist, '404.html');
  if (existsSync(fallback) && statSync(fallback).isFile())
    return fallback;
  const index = join(docsDist, 'index.html');
  if (existsSync(index) && statSync(index).isFile())
    return index;
  return undefined;
}

function serveHoodDocs(docsDist: string) {
  return (req: IncomingMessage, res: ServerResponse, next: () => void): void => {
    const url = req.url?.split('?')[0] ?? '';
    if (url !== '/docs' && !url.startsWith('/docs/')) {
      next();
      return;
    }
    const file = resolveDocsFile(docsDist, url === '/docs' ? '/docs/' : url);
    if (!file) {
      next();
      return;
    }
    res.setHeader('Content-Type', MIME[extname(file)] ?? 'application/octet-stream');
    createReadStream(file).pipe(res);
  };
}

/**
 * Serves the built VitePress site at /docs so the navbar new-tab link matches
 * the original docs layout instead of the in-app stub.
 */
export function hoodDocsStaticPlugin(projectRoot: string): Plugin {
  const docsDist = resolve(projectRoot, 'docs-site/.vitepress/dist');
  const middleware = serveHoodDocs(docsDist);
  return {
    name: 'hood-docs-static',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
