import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Root } from './Root'
import { RouterProvider } from 'react-router-dom'
import { MainRouter } from './components/routers/MainRouter'
import { ALLContextProvider } from './ContextProviders/AllContextProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ALLContextProvider>
      <RouterProvider router={MainRouter}>
        <Root />
      </RouterProvider>
    </ALLContextProvider>
  </StrictMode>,
)
