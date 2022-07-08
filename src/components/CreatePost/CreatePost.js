import React, { useRef, useState } from 'react';
import { useModal } from '../../context/ModalContext';
import Button from '../Button/Button';
import './styles.css';
import useFormFetch from '../../hooks/useFormFetch';

const CreatePost = ({ setUpdate }) => {
  const ref = useRef();

  const [, setModal] = useModal();

  const [onSubmit, loading, success, error] = useFormFetch({
    methodToUse: 'POST',
    route: `posts/newPost`,
    setUpdate,
    setModal,
    formRef: ref,
  });

  return (
    <main className="create-post-container">
      <form
        ref={ref}
        className="create-post"
        id="postCreate"
        onSubmit={(e) => onSubmit(e)}
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
    </main>
  );
};

export default CreatePost;
