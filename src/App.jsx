import { NavLink, Outlet } from 'react-router-dom'
import './App.css'

export default function App() {
  return (
    <div className="app">
        <header className="navbar">
            <NavLink to="/" className="nav-logo">
                Thomas Watchman
            </NavLink>

            <nav className="nav-links">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/personal">Personal</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </nav>
        </header>
            <main className="main">
                <Outlet/>
            </main>
        <footer className="footer">
            © {new Date().getFullYear()} Thomas Watchman
        </footer>
    </div>
  )
}
