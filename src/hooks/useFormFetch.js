import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { baseURL } from '../utils/constants';

const useFormFetch = ({
  bodyToUse,
  methodToUse,
  route,
  setUpdate,
  setModal,
  setShow,
  formRef,
}) => {
  const { setTokenInLocalStorage, token, setUserRefresh } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const formParsed = formRef ? new FormData(formRef.current) : '';

    const headerToUse = bodyToUse
      ? { 'Content-Type': 'application/json', Authorization: token }
      : { Authorization: token };

    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/${route}`, {
        method: methodToUse,
        headers: headerToUse,
        body: bodyToUse ? JSON.stringify(bodyToUse) : formParsed,
      });

      const data = await response.json();

      if (data.status === 'error') {
        setError(data.message);
      } else {
        if (route === 'users/login') setTokenInLocalStorage(data.data.token);
        if (
          route.includes('comment') ||
          route === 'posts/newPost' ||
          route === 'users/me'
        ) {
          if (route.includes('comment')) setShow(true);
          if (route === 'users/me') setUserRefresh((prevState) => !prevState);
          setUpdate((prevState) => !prevState);
          setModal('');
        }

        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    fetchData();
  };

  return [onSubmit, loading, success, error];
};

export default useFormFetch;
