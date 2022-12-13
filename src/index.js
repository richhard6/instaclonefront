import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { modules } from './context/index';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
const { UserProvider, ModalProvider, ToastProvider } = modules;

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
