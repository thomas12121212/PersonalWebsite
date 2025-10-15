import { NavLink, Outlet } from 'react-router-dom'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <a href="/" className="logo">Thomas Watchman</a>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Thomas Watchman
      </footer>
    </div>
  )
}

