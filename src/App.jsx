export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 900, margin: '0 auto', padding: '24px' }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 36, margin: 0 }}>Thomas Watchman</h1>
        <p style={{ color: '#555', marginTop: 8 }}>CS student @ Dalhousie • React & data</p>
      </header>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, marginBottom: 8 }}>About</h2>
        <p style={{ color: '#333' }}>
          I build small, fast React apps and simple data tools. This site is deployed with GitHub Pages.
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, marginBottom: 8 }}>Projects</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
          <li style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
            <strong>Personal Website</strong>
            <p style={{ margin: '6px 0', color: '#555' }}>
              Vite + React, deployed via GitHub Actions.
            </p>
            <a href="https://github.com/thomas12121212/PersonalWebsite" target="_blank" rel="noopener noreferrer">
              View repo
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: 24, marginBottom: 8 }}>Contact</h2>
        <p>
          Email: <a href="mailto:thomas@example.com">thomas@example.com</a> ·
          {' '}GitHub: <a href="https://github.com/thomas12121212" target="_blank" rel="noopener noreferrer">@thomas12121212</a>
        </p>
      </section>

      <footer style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid #eee', color: '#777' }}>
        © {new Date().getFullYear()} Thomas Watchman
      </footer>
    </div>
  )
}

