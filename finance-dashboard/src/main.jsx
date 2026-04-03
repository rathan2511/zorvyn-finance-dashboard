import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FinanceProvider } from './FinanceContext.jsx' // Import the provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FinanceProvider> {/* Wrap the App inside the provider */}
      <App />
    </FinanceProvider>
  </React.StrictMode>,
)