import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from '../../frontend/src/App.jsx'
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../frontend/src/context/AppContext.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
   
)
