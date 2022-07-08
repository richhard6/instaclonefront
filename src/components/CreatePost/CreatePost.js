import React, { useRef, useState } from 'react';
import { useModal } from '../../context/ModalContext';
import Button from '../Button/Button';
import './styles.css';
import useFormFetch from '../../hooks/useFormFetch';

const CreatePost = ({ setUpdate }) => {
  const ref = useRef();

  const inputRef = useRef();

  const [image, setImage] = useState('');

  const [, setModal] = useModal();

  const [onSubmit, loading, success, error] = useFormFetch({
    methodToUse: 'POST',
    route: `posts/newPost`,
    setUpdate,
    setModal,
    formRef: ref,
  });

  const handleClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <main className="create-post-container">
      <form
        ref={ref}
        className="create-post"
        id="postCreate"
        onSubmit={(e) => onSubmit(e)}
      >
        <Button
          name={image ? 'Select another' : 'Select image'}
          onClick={(e) => handleClick(e)}
        />
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => handleImage(e)}
          ref={inputRef}
          style={{ display: 'none' }}
        />
        {image && <img className="imageToUpload" src={image} alt="to upload" />}
        <textarea
          cols="30"
          rows="5"
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
