import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App.jsx'
import Regsitros from './routes/Regsitro.jsx'
import Movimentacoes from './routes/Movimentacoes.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import { Analytics } from "@vercel/analytics/react"

//configs do router awoubfawf

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, 
    children: [
      {
        path: "/movimentacoes",
        element: <Movimentacoes />,
      },
      {
        path: "/registros",
        element: <Regsitros />,
      },
    ],
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
      <Analytics />
  </StrictMode>,
)
