import React, { useState } from 'react';
import useFormFetch from '../../hooks/useFormFetch';
import Button from '../Button/Button';
import './styles.css';

const CreateComment = ({ setShow, setUpdate, setModal, id }) => {
  const [comment, setComment] = useState('');

  const [onSubmit, loading, success, error] = useFormFetch({
    bodyToUse: { comment },
    methodToUse: 'POST',
    route: `posts/${id}/comment`,
    setUpdate,
    setModal,
    setShow,
  });

  return (
    <form className="modal-comment" onSubmit={(e) => onSubmit(e)}>
      <textarea
        onChange={(e) => setComment(e.target.value)}
        name="textarea"
        value={comment}
        placeholder="add your comment here..."
        cols="30"
        rows="10"
      ></textarea>
      <Button name="Send" disabled={loading} />
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateComment;
