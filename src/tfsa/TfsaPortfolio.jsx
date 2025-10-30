import { useEffect, useMemo, useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import "./TfsaPortfolio.css";

const INITIAL_HOLDINGS = [
  { symbol: "BNS.TO", shares: 20 },
  { symbol: "VCN.TO", shares: 15 },
  { symbol: "VFV.TO", shares: 25 },
  { symbol: "XIC.TO", shares: 40 },
];

export default function TfsaPortfolio() {
  const [holdings] = useState(INITIAL_HOLDINGS);
  const [prices, setPrices] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  async function loadFromBackend() {
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/tfsa");              // <- Flask
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      // json: { timestamp, holdings:[{symbol,shares,price,value}], total_value }
      const priceMap = Object.fromEntries(json.holdings.map(h => [h.symbol, h.price]));
      setPrices(priceMap);
      setLastUpdated(json.timestamp);
    } catch (e) {
      setError(e.message || "Failed to load TFSA data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadFromBackend(); }, []);

  const enriched = useMemo(() => {
    const list = holdings.map(h => {
      const price = prices[h.symbol];
      const value = (price ?? 0) * h.shares;
      return { ...h, price, value };
    });
    const total = list.reduce((s, r) => s + r.value, 0);
    return { list, total };
  }, [holdings, prices]);

  const history = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now); d.setMonth(d.getMonth() - (5 - i));
      return { date: d.toISOString().slice(0, 7), total: enriched.total * (0.9 + Math.random() * 0.2) };
    });
  }, [enriched.total]);

  const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#14b8a6"];

  return (
    <div className="pf-wrap">
      <h1>My TFSA Portfolio</h1>
      {error && <div className="pf-alert">{error}</div>}
      <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "8px 0" }}>
        <button onClick={loadFromBackend} disabled={loading} style={{ padding: "6px 10px", border: "1px solid #ddd", borderRadius: 8, background:"#fff" }}>
          {loading ? "Refreshing…" : "Refresh data"}
        </button>
        <span style={{ opacity:.7, fontSize:13 }}>{lastUpdated ? `Last updated: ${lastUpdated}` : "—"}</span>
      </div>

      <section className="pf-summary">
        <div className="pf-card"><div className="pf-card-label">Total Value (CAD)</div>
          <div className="pf-card-value">${enriched.total.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
        </div>
        <div className="pf-card"><div className="pf-card-label">Holdings</div>
          <div className="pf-card-value">{enriched.list.length}</div>
        </div>
        <div className="pf-card"><div className="pf-card-label">Status</div>
          <div className="pf-card-value">{loading ? "Loading…" : "Ready"}</div>
        </div>
      </section>

      <div className="pf-chart-section">
        <h2>Current Allocation</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={enriched.list} dataKey="value" nameKey="symbol" cx="50%" cy="50%" outerRadius={110}
                 label={({symbol,value}) => `${symbol}: $${value.toFixed(0)}`}>
              {enriched.list.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={v => `$${Number(v).toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="pf-chart-section">
        <h2>Portfolio Growth</h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={v => `$${(v/1000).toFixed(1)}k`} />
            <Tooltip formatter={v => `$${Number(v).toLocaleString()}`} />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
