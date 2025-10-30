// src/tfsa/priceService.js
const API_BASE = import.meta.env.VITE_QUOTES_API || "http://localhost:3001";

// tiny in-memory cache so route changes / re-mounts don't spam the server
const _cache = new Map(); // key -> { ts, data }
const DEFAULT_TTL = 15_000; // 15s

export async function fetchStockPrices(symbols, { cacheMs = DEFAULT_TTL, retries = 1 } = {}) {
  const list = (Array.isArray(symbols) ? symbols : [symbols])
    .map(s => s.trim().toUpperCase())
    .filter(Boolean);

  if (list.length === 0) return {};

  const key = list.slice().sort().join(",");
  const now = Date.now();
  const hit = _cache.get(key);
  if (hit && now - hit.ts < cacheMs) return hit.data;

  const url = `${API_BASE}/api/quotes?symbols=${encodeURIComponent(key)}`;

  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const { quotes } = await resp.json(); // [{symbol, price, ...}]
      const map = Object.fromEntries(
        (quotes || []).map(q => [q.symbol?.toUpperCase(), Number(q.price)])
      );
      // Ensure all requested symbols exist in the map (undefined if missing)
      for (const s of list) if (!(s in map)) map[s] = undefined;

      _cache.set(key, { ts: now, data: map });
      return map;
    } catch (e) {
      lastErr = e;
      // small backoff on retry
      if (attempt < retries) await new Promise(r => setTimeout(r, 300 * (attempt + 1)));
    }
  }
  throw new Error(`Failed to fetch quotes: ${lastErr?.message || "unknown error"}`);
}
