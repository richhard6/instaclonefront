import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { baseURL } from '../utils/constants';

const useFetch = ({ keyword, update, userId, setUsername }) => {
  const { token } = useUser();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState(null);

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

        if (data.status === 'error') {
          setError(data.message);
          setTimeout(() => {
            setError('');
          }, 2000);
        } else {
          if (userId) {
            setPosts(data.data.posts);
            setUsername(data.data.user.username);
          } else {
            setPosts(data.data);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading((prevState) => (prevState = false));
      }
    };

    fetchPosts();
  }, [keyword, update, token, setUsername, userId]);

  return [posts, loading, error];
};

export default useFetch;
