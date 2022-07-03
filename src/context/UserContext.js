import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [userRefresh, setUserRefresh] = useState(!false);

  const setTokenInLocalStorage = (newToken) => {
    if (!newToken) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', newToken);
    }

    setToken(newToken);
  };

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch('http://localhost:4000/users/me/profile', {
        headers: {
          Authorization: token,
        },
      });
      const { data } = await response.json();
      setUser(data.user[0]);
    };
    if (token) {
      getUserData();
    }
  }, [token, userRefresh]);

  const values = {
    token,
    setTokenInLocalStorage,
    user,
    setUser,
    setUserRefresh,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
