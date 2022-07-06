export const handleLike = async (token, postId, setUpdate) => {
  try {
    const response = await fetch(`http://localhost:4000/posts/${postId}/like`, {
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
