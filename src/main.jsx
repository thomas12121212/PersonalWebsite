import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import TfsaPortfolio from './tfsa/TfsaPortfolio.jsx'
import QuickCash from './quickCash/QuickCash.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import Personal from './pages/Personal.jsx'
import './index.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'projects', element: <Projects /> },
        { path: "projects/tfsa", element: <TfsaPortfolio /> },
          { path: "projects/quickcash", element: <QuickCash /> },
          { path: 'contact', element: <Contact /> },
        { path: 'personal', element: <Personal /> }
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
)

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
     <RouterProvider router={router} />
   </React.StrictMode>
)

