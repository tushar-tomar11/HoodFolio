import type { IncomingMessage, ServerResponse } from 'node:http';
import { createRequire } from 'node:module';
import type { Plugin } from 'vite';

const require = createRequire(import.meta.url);
const quotesPath = require.resolve('../../../api/quotes.js');

function quotesMiddleware(req: IncomingMessage, res: ServerResponse, next: () => void): void {
  const url = req.url?.split('?')[0] ?? '';
  if (url !== '/api/quotes') {
    next();
    return;
  }
  delete require.cache[quotesPath];
  const handler = require(quotesPath) as (
    req: IncomingMessage,
    res: ServerResponse,
  ) => void | Promise<void>;
  void handler(req, res);
}

export function hoodQuotesPlugin(): Plugin {
  return {
    name: 'hood-quotes',
    configureServer(server) {
      server.middlewares.use(quotesMiddleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(quotesMiddleware);
    },
  };
}
