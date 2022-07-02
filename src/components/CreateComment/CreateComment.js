import React, { useRef, useState } from 'react';
import Button from '../Button/Button';
import './styles.css';

const CreateComment = ({ setShow, setUpdate, setModal, token, id }) => {
  const [comment, setComment] = useState('');

  const ref = useRef();

  const [error, setError] = useState('');

  const handleComment = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:4000/posts/${id}/comment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ comment }),
        }
      );

      const data = await response.json();

      if (data.status === 'error') {
        setError(data.message);
      } else {
        setUpdate((prevState) => !prevState);
        setModal('');
        setShow((prevState) => !prevState);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-comment">
      <textarea
        onChange={(e) => setComment(e.target.value)}
        name="textarea"
        cols="30"
        rows="10"
      ></textarea>
      <Button onClick={handleComment} name="Send" />
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateComment;
