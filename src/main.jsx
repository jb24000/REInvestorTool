if (-not (Test-Path "C:\Code\REInvestor\src\main.jsx")) {
@"
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
createRoot(document.getElementById('root')).render(<App />)
"@ | Set-Content -Path "C:\Code\REInvestor\src\main.jsx" -Encoding UTF8
}
