import React, { useState, useRef } from 'react';
import { useModal } from '../../context/ModalContext';
import useFormFetch from '../../hooks/useFormFetch';
import Button from '../Button/Button';
import './styles.css';

const UpdateProfile = ({ type, setUpdate }) => {
  const formRef = useRef();

  const [, setModal] = useModal();

  const [onSubmit, loading, success, error] = useFormFetch({
    methodToUse: 'PUT',
    route: `users/me`,
    setUpdate,
    setModal,
    formRef: formRef,
  });

  return (
    <div className="update-container">
      <form
        onSubmit={(e) => onSubmit(e)}
        ref={formRef}
        className="update-profile-form"
      >
        <input
          type="password"
          placeholder="enter your password..."
          id="password"
          name="password"
        />
        <input
          className="second-input"
          id={`${type === 'username' ? 'username' : 'newPassword'}`}
          name={`${type === 'username' ? 'username' : 'newPassword'}`}
          type={`${type === 'username' ? 'text' : 'password'}`}
          placeholder={`${
            type === 'username'
              ? 'enter your new username'
              : 'enter your new password'
          }`}
        />
        <Button name="Save" disabled={loading} />
      </form>
    </div>
  );
};

export default UpdateProfile;
