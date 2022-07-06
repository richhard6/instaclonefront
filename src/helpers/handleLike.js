import { baseURL } from '../utils/constants';

export const handleLike = async (token, postId, setUpdate) => {
  try {
    const response = await fetch(`${baseURL}/posts/${postId}/like`, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    if (data.status === 'ok') {
      setUpdate((prev) => !prev);
    }
  } catch (err) {
    console.error(err);
  }
};
