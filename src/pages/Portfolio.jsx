import { useMemo, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { Link } from 'react-router-dom'

const mockSnapshots = [
  { date: '2025-07-01', value: 10000, allocations: { Stocks: 70, Bonds: 20, Cash: 10 } },
  { date: '2025-08-01', value: 10450, allocations: { Stocks: 72, Bonds: 18, Cash: 10 } },
  { date: '2025-09-01', value: 10120, allocations: { Stocks: 69, Bonds: 21, Cash: 10 } },
  { date: '2025-10-01', value: 10930, allocations: { Stocks: 74, Bonds: 16, Cash: 10 } },
]

const mockPositions = [
  { symbol: 'AAPL', shares: 12, price: 230.12, sector: 'Tech' },
  { symbol: 'VTI', shares: 20, price: 256.70, sector: 'Index' },
  { symbol: 'BND', shares: 15, price: 73.40, sector: 'Bonds' },
  { symbol: 'CASH', shares: 1, price: 1093.00, sector: 'Cash' }, // cash balance
]

export default function Portfolio() {
  const [range, setRange] = useState('all') // '3m' | 'all'

  const lineData = useMemo(() => {
    if (range === '3m' && mockSnapshots.length > 3) {
      return mockSnapshots.slice(-3)
    }
    return mockSnapshots
  }, [range])

  const latest = mockSnapshots[mockSnapshots.length - 1]
  const pieData = useMemo(
    () => Object.entries(latest.allocations).map(([k, v]) => ({ name: k, value: v })),
    []
  )

  const allocationColors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a78bfa']

  const totalValue = latest.value
  const positionsRows = mockPositions.map(p => ({
    ...p,
    marketValue: p.symbol === 'CASH' ? p.price : p.price * p.shares
  }))

  return (
    <div className="view" style={{ display: 'grid', gap: 24 }}>
      <div>
        <h1>Portfolio Visualizer</h1>
        <p style={{ opacity: 0.8 }}>
          A clean snapshot of value over time and current allocation.{' '}
          <Link to="/projects">Back to Projects</Link>
        </p>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ opacity: 0.8 }}>Range:</span>
          <button
            onClick={() => setRange('3m')}
            style={btnStyle(range === '3m')}
          >3M</button>
          <button
            onClick={() => setRange('all')}
            style={btnStyle(range === 'all')}
          >All</button>
        </div>
        <div style={{ opacity: 0.8 }}>Total Value: <strong>${totalValue.toLocaleString()}</strong></div>
      </div>

      {/* Line chart */}
      <div style={{ width: '100%', height: 320, background: 'white', padding: 16, borderRadius: 12, boxShadow: '0 1px 8px rgba(0,0,0,0.08)' }}>
        <div style={{ marginBottom: 8, fontWeight: 700 }}>Portfolio Value Over Time</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(v) => `$${v/1000}k`} />
            <Tooltip formatter={(v) => `$${Number(v).toLocaleString()}`} />
            <Line type="monotone" dataKey="value" stroke="#111827" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Allocation + Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ width: '100%', height: 320, background: 'white', padding: 16, borderRadius: 12, boxShadow: '0 1px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ marginBottom: 8, fontWeight: 700 }}>Current Allocation</div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>
                {pieData.map((_, i) => <Cell key={i} fill={allocationColors[i % allocationColors.length]} />)}
              </Pie>
              <Legend />
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'white', padding: 16, borderRadius: 12, boxShadow: '0 1px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ marginBottom: 8, fontWeight: 700 }}>Positions</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
              <tr>
                <th style={thtd}>Symbol</th>
                <th style={thtd}>Shares</th>
                <th style={thtd}>Price</th>
                <th style={thtd}>Market Value</th>
                <th style={thtd}>Sector</th>
              </tr>
              </thead>
              <tbody>
              {positionsRows.map(row => (
                <tr key={row.symbol}>
                  <td style={thtd}>{row.symbol}</td>
                  <td style={thtd}>{row.shares}</td>
                  <td style={thtd}>${row.price.toLocaleString()}</td>
                  <td style={thtd}>${row.marketValue.toLocaleString()}</td>
                  <td style={thtd}>{row.sector ?? '—'}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ opacity: 0.8, fontSize: 16 }}>
        <strong>Next steps:</strong> Load data from CSV/JSON, add filters (account, symbol), and show an
        overlay “projection” line (your future ML model) on the same chart.
      </div>
    </div>
  )
}

const thtd = { borderBottom: '1px solid #eee', padding: '8px 10px', textAlign: 'left' }

function btnStyle(active) {
  return {
    padding: '6px 10px',
    borderRadius: 8,
    border: '1px solid #ddd',
    background: active ? '#111827' : 'white',
    color: active ? 'white' : 'black',
    cursor: 'pointer'
  }
}
