import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from './context/UserContext';

import { ModalProvider } from './context/ModalContext';

import { ToastProvider } from './context/ToastContext';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ModalProvider>
      <UserProvider>
        <ToastProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ToastProvider>
      </UserProvider>
    </ModalProvider>
  </React.StrictMode>
);

reportWebVitals();
