import { useEffect, useState, useRef } from 'react';
import { useToast } from '../context/ToastContext';
import { useUser } from '../context/UserContext';
import { baseURL } from '../utils/constants';

const useFetch = ({ keyword, update, userId, setUsername }) => {
  const { handleToast } = useToast();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState(null);
  const { token } = useUser();

  console.log(token);

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
        ? `${baseURL}/users/${userId}/`
        : `${baseURL}/posts?query=${keyword}`;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, update, token, setUsername, userId]);

  return [posts, loading, error];
};

export default useFetch;
