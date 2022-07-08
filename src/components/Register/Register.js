import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import useFormFetch from '../../hooks/useFormFetch';

import './styles.css';

const Register = () => {
  const { token } = useUser();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [onSubmit, loading, success, error] = useFormFetch({
    bodyToUse: { username, email, password },
    methodToUse: 'POST',
    route: 'users/register',
  });

  if (token) navigate('/');

  useEffect(() => {
    if (success) navigate('/login');
  }, [success, navigate]);

  return (
    <main>
      <div className="welcome">
        <h1>Welcome!</h1>
      </div>

      <div className="register-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            name="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button disabled={loading} className="btn">
            Register
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
