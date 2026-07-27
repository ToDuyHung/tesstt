import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MsalAuthProvider } from './AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MsalAuthProvider>
      <App />
    </MsalAuthProvider>
  </React.StrictMode>,
)
