import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { ContextProvider } from './contexts/ContextProvider';
import { GlobalTramaContextProvider } from './contexts/TramaProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <ContextProvider>
<GlobalTramaContextProvider>
  <App/>
</GlobalTramaContextProvider>
</ContextProvider>
  </React.StrictMode>,
);




