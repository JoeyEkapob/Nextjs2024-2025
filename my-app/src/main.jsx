import { React } from 'react'
import { createRoot } from 'react-dom/client'
/*  import './index.css'  */
import App from './App.jsx'
import Hello from './index.jsx'

import { createBrowserRouter,RouterProvider,} from "react-router-dom";

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path:"/hello",
    element: <Hello />
  }
])

const root = createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
)
