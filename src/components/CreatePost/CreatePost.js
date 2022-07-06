import React, { useRef, useState } from 'react';
import { useModal } from '../../context/ModalContext';
import { useUser } from '../../context/UserContext';
import Button from '../Button/Button';

import './styles.css';
import '../../animations/slideIn.css';

const CreatePost = ({ setUpdate }) => {
  const ref = useRef();

  const [loading, setLoading] = useState(false);

  const [, setModal] = useModal();

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState('');

  const { token } = useUser();

  const [animation, setAnimation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData(ref.current);

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
        setUpdate((prevState) => !prevState);
        setModal(null);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='create-post-container'>
      <form
        ref={ref}
        className="create-post"
        id="postCreate"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input type="file" id="image" name="image" />
        <textarea
          cols="30"
          rows="10"
          id="caption"
          name="caption"
          placeholder="Write your caption"
        ></textarea>
        <Button name="Post" disabled={loading} />
      </form>
      {error && <p>{error}</p>}
    </main>
  );
};

export default CreatePost;
