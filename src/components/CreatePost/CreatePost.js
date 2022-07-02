import React, { useRef, useState } from 'react';
import { useUser } from '../../context/UserContext';
import Button from '../Button/Button';
import './styles.css';

const CreatePost = () => {
  const ref = useRef();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState('');

  const { token } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData(ref.current);

      console.log(ref.current);
      console.log(formData);

      const response = await fetch('http://localhost:4000/posts/newPost', {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.status === 'error') {
        setError(data.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-post-container">
      <form
        ref={ref}
        className="create-post"
        id="postCreate"
        onSubmit={handleSubmit}
      >
        <input type="file" id="caption" name="caption" />
        <textarea
          cols="30"
          rows="10"
          id="image"
          name="image"
          placeholder="Write your caption"
        ></textarea>
        <Button name="Post" disabled={loading} />
      </form>
      {error && <p>{error}</p>}
    </main>
  );
};

export default CreatePost;
