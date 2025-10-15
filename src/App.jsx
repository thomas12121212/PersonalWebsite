import { NavLink, Outlet } from 'react-router-dom'

export default function App() {
  const link = ({ isActive }) =>
    (isActive ? { fontWeight: 700 } : undefined)

  return (
    <div style={{ fontFamily: 'system-ui,sans-serif', maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <a href="/" style={{ fontWeight: 800, textDecoration: 'none', color: '#111' }}>Thomas Watchman</a>
        <nav style={{ display: 'flex', gap: 12 }}>
          <NavLink to="/" end style={link}>Home</NavLink>
          <NavLink to="/projects" style={link}>Projects</NavLink>
          <NavLink to="/contact" style={link}>Contact</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer style={{ marginTop: 32, borderTop: '1px solid #eee', paddingTop: 16, color: '#777' }}>
        © {new Date().getFullYear()} Thomas Watchman
      </footer>
    </div>
  )
}

