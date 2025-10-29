import { Link } from 'react-router-dom'

export default function Projects() {
  return (
    <>
      <div className="view">
        <h1>Projects</h1>
        <ul>
          <li><strong>Personal Website</strong> — Vite + React on GitHub Pages.</li>
          <li><strong>Portfolio Visualizer</strong> — My Portfolio broken down{' '}<Link to="./portfolio">Open</Link></li>
        </ul>
      </div>
    </>
  )
}
