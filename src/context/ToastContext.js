import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(false);

  const [severity, setSeverity] = useState('');

  const [message, setMessage] = useState('');

  const handleToast = (sev, message) => {
    setToast(true);
    setSeverity(sev);
    setMessage(message);
  };

  const values = {
    toast,
    severity,
    message,
    handleToast,
    setToast,
  };

  return (
    <ToastContext.Provider value={values}>{children}</ToastContext.Provider>
  );
};
