import React from 'react'
import ReactDOM from 'react-dom/client'
import Game from './components/Game.jsx'
import Root from './components/Root.jsx'
import Root from './components/ErrorPage.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/game",
        element: <App />
      }
      ]
  }
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
