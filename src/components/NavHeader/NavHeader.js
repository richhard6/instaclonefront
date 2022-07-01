import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Button from '../Button/Button';
import './style.css';

const NavHeader = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const { user, setTokenInLocalStorage, setUser } = useUser();

  const handleLogOut = () => {
    setTokenInLocalStorage(null);
    setUser(null);
    setShow(false);
    navigate('/');
  };

  return (
    <div className="container">
      <header>
        {user && <p>@{user.username}</p>}
        <h2>Instaclone</h2>
        {!user && (
          <div>
            <Button onClick={() => navigate('/login')} name="Log In" />
            <Button onClick={() => navigate('/register')} name="Register" />
          </div>
        )}
        {user && (
          <p onClick={() => setShow((prevState) => !prevState)}>hamburger</p>
        )}
      </header>
      {show && (
        <div className="hamburguer-nav">
          <ul>
            <li>Profile</li>
            <li>Feed</li>
            <li>Create Post</li>
            <li onClick={handleLogOut}>Log Out</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavHeader;
