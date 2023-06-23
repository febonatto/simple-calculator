// React imports
import React from 'react'

// React dom imports
import ReactDOM from 'react-dom/client'

// Styles imports
import './assets/styles/globals.css';

// Components imports
import App from './components/App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
