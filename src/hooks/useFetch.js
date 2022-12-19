import { useEffect, useState } from 'react';
import { modules } from '../context/index';
import { baseURL } from '../utils/constants';
const { useToast, useUser } = modules;

const useFetch = ({ keyword, update, userId, setUsername }) => {
  const { handleToast } = useToast();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const { token } = useUser();

  useEffect(() => {
    const params = token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : {};

    const fetchPosts = async () => {
      setLoading((prevState) => (prevState = true));

      const endpointToGo = userId
        ? `${baseURL}users/${userId}/`
        : `${baseURL}posts?query=${keyword}`;

      try {
        const response = await fetch(endpointToGo, params);
        const data = await response.json();

        if (data.status === 'error' && keyword) {
          handleToast('error', data.message);
        } else {
          if (userId) {
            setPosts(data.data.posts);
            setUsername(data.data.user.username);
          } else {
            setPosts(data.data);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading((prevState) => (prevState = false));
      }
    };

    fetchPosts();
  }, [keyword, update, token, setUsername, userId, handleToast]);

  return [posts, loading, error];
};

export default useFetch;
