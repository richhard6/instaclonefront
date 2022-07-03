import React, { useState, useRef } from 'react';
import { useModal } from '../../context/ModalContext';
import { useUser } from '../../context/UserContext';
import Button from '../Button/Button';
import './styles.css';

const UpdateProfile = ({ type, setUpdate }) => {
  const formRef = useRef();

  const { token, setUserRefresh } = useUser();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [, setModal] = useModal();

  const handleForm = async (e) => {
    e.preventDefault();
    const password = { password: formRef.current[0].value };

    const dataToChange =
      type === 'username'
        ? { username: formRef.current[1].value }
        : { newPassword: formRef.current[1].value };

    console.log({ ...password, ...dataToChange });

    try {
      const response = await fetch('http://localhost:4000/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ ...password, ...dataToChange }),
      });

      const data = await response.json();

      if (data.status === 'error') {
        setError(data.message);
      } else {
        setUserRefresh((prevState) => !prevState);
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
    <form
      onSubmit={(e) => handleForm(e)}
      ref={formRef}
      className="update-profile-form"
    >
      <input type="password" placeholder="enter your password..." />
      <input
        type={`${type === 'username' ? 'text' : 'password'}`}
        placeholder={`${
          type === 'username'
            ? 'enter your new username'
            : 'enter your new password'
        }`}
      />
      <Button name="Save" />
      {error && <p>{error}</p>}
    </form>
  );
};

export default UpdateProfile;
