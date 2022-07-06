import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useUser } from '../../context/UserContext';
import Button from '../Button/Button';
import './styles.css';
import useFormFetch from '../../hooks/useFormFetch';
const Login = () => {
  const { token } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [onSubmit, loading, , error] = useFormFetch({
    bodyToUse: { email, password },
    methodToUse: 'POST',
    route: 'users/login',
  });

  if (token) return <Navigate to="/" />;

  return (
    <main className="Login">
      <div className="welcome">
        <h1>Glad to see you again...</h1>
      </div>

      <div className="login-container">
        <form onSubmit={onSubmit}>
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
          <Button name="Log in" disabled={loading} />
        </form>
      </div>
      {error && <p className="Error">{error}</p>}
    </main>
  );
};

export default Login;
