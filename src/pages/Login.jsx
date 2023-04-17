import React, { useState } from 'react';
import { login } from '../config';
import { useUserContext } from '../context/UserContext';
import { useRedirectActiveUser } from '../hooks';


const Login = () => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123123');
  const { user } = useUserContext();
  useRedirectActiveUser(user)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await login({ email, password });
      console.log(userCredentials);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Username"
          value={email}
          onChange={handleChangeInput}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChangeInput}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
