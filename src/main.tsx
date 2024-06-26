import React from 'react'
import ReactDOM from 'react-dom/client'

import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import './index.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>,
)
