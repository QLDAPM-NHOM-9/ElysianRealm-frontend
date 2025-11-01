import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import './styles/index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'; // <-- IMPORT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)