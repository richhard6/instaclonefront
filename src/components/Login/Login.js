import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useUser } from '../../context/UserContext';

const Login = () => {
  const { setTokenInLocalStorage, token } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.status === 'error') {
        setError(data.message);
      } else {
        setTokenInLocalStorage(data.data.token);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (token) return <Navigate to="/" />;

  return (
    <main className="Login">
      <form onSubmit={handleSubmit}>
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

        <button disabled={loading}>Log In</button>
      </form>
      {error && <p className="Error">{error}</p>}
    </main>
  );
};

export default Login;
