import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import TestApp from './TestApp.tsx'
import './index.css'

// Import test Firebase để debug
import './test-firebase.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
