import { createContext, useContext, useState } from 'react';

// Creamos el contexto.
const ModalContext = createContext();

// Hook para poder utilizar el contexto.
export const useModal = () => {
  return useContext(ModalContext);
};

// Creamos un componente que rodeará al resto de componentes de nuestra app.
export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  return (
    <ModalContext.Provider value={[modal, setModal]}>
      {children}
    </ModalContext.Provider>
  );
};
