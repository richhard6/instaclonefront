import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        {user && <h3>@{user.username}</h3>}

        <Link to="/" className="intaclone-name">
          <h2>Instaclone</h2>
        </Link>

        {!user && (
          <div className="log-container">
            <Button onClick={() => navigate('/login')} name="Log In" />
            <Button onClick={() => navigate('/register')} name="Register" />
          </div>
        )}
        {user && (
          <p onClick={() => setShow((prevState) => !prevState)}>
            <div className="hamburguer">
              <span className="bar1"></span>
              <span className="bar2"></span>
              <span className="bar3"></span>
            </div>
          </p>
        )}
      </header>
      {show && (
        <div className="hamburguer-nav">
          <ul>
            <Link to="/" onClick={() => setShow(false)}>
              <li>Feed</li>
            </Link>
            <Link to={`/profile/${user.id}`} onClick={() => setShow(false)}>
              <li>Profile</li>
            </Link>

            <li onClick={handleLogOut}>Log Out</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavHeader;
