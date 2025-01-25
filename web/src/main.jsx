import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './AppRoutes.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Analytics />
    <AppRoutes />
  </BrowserRouter>,
)
