const fs = require('node:fs');
const path = require('node:path');

const STOCK_SYMBOLS = ['TSLA', 'NVDA', 'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'COIN', 'SPY', 'QQQ'];

function loadEnvFile(file) {
  if (!fs.existsSync(file))
    return;
  const text = fs.readFileSync(file, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#'))
      continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1)
      continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"'))
      || (val.startsWith("'") && val.endsWith("'"))
    )
      val = val.slice(1, -1);
    if (process.env[key] === undefined || process.env[key] === '')
      process.env[key] = val;
  }
}

function loadLocalEnv() {
  const root = path.resolve(__dirname, '..');
  const cwd = process.cwd();
  const files = [
    path.join(cwd, '.env.local'),
    path.join(cwd, '.env'),
    path.join(cwd, 'frontend', 'app', '.env.local'),
    path.join(cwd, 'frontend', 'app', '.env'),
    path.join(root, 'frontend', 'app', '.env.local'),
    path.join(root, 'frontend', 'app', '.env'),
    path.join(root, '.env'),
  ];
  for (const file of files)
    loadEnvFile(file);
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

async function fetchFinnhub(key) {
  const quotes = {};
  const rows = await Promise.all(STOCK_SYMBOLS.map(async (symbol) => {
    const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${encodeURIComponent(key)}`;
    const res = await fetch(url);
    if (!res.ok)
      return null;
    const data = await res.json();
    const last = isRecord(data) && typeof data.c === 'number' ? data.c : Number.NaN;
    if (!Number.isFinite(last) || last <= 0)
      return null;
    return [symbol, last];
  }));
  for (const row of rows) {
    if (row)
      quotes[row[0]] = row[1];
  }
  return quotes;
}

async function fetchTwelve(key) {
  const quotes = {};
  const rows = await Promise.all(STOCK_SYMBOLS.map(async (symbol) => {
    const url = `https://api.twelvedata.com/price?symbol=${encodeURIComponent(symbol)}&apikey=${encodeURIComponent(key)}`;
    const res = await fetch(url);
    if (!res.ok)
      return null;
    const data = await res.json();
    const last = isRecord(data) ? Number(data.price) : Number.NaN;
    if (!Number.isFinite(last) || last <= 0)
      return null;
    return [symbol, last];
  }));
  for (const row of rows) {
    if (row)
      quotes[row[0]] = row[1];
  }
  return quotes;
}

async function loadTraditionalQuotes() {
  loadLocalEnv();
  const finnhub = process.env.FINNHUB_API_KEY;
  const twelve = process.env.TWELVE_DATA_API_KEY;
  if (!finnhub && !twelve)
    return { ok: false, status: 204, body: null };

  let quotes = {};
  let source = '';
  try {
    if (finnhub) {
      quotes = await fetchFinnhub(finnhub);
      source = 'finnhub-delayed';
    }
    if (Object.keys(quotes).length === 0 && twelve) {
      quotes = await fetchTwelve(twelve);
      source = 'twelve-data-delayed';
    }
  }
  catch {
    return { ok: false, status: 204, body: null };
  }

  if (Object.keys(quotes).length === 0)
    return { ok: false, status: 204, body: null };

  return {
    ok: true,
    status: 200,
    body: {
      quotes,
      source,
      fetchedAt: new Date().toISOString(),
    },
  };
}

async function handler(req, res) {
  if (req.method && req.method !== 'GET') {
    res.statusCode = 405;
    res.end();
    return;
  }
  const result = await loadTraditionalQuotes();
  res.statusCode = result.status;
  if (result.body) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.end(JSON.stringify(result.body));
    return;
  }
  res.end();
}

module.exports = handler;
module.exports.loadTraditionalQuotes = loadTraditionalQuotes;
