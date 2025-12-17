import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {QueryClientProvider,QueryClient} from '@tanstack/react-query'; 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from './Context/Context.jsx'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
<AuthProvider>
<BrowserRouter>
<StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
   <ReactQueryDevtools initialIsOpen={false} /> {/* Open/close by default */}
</AuthProvider>
  </QueryClientProvider>
)
