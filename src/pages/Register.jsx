import React, { useState } from 'react';
import { register } from '../config';
import { useRedirectActiveUser } from '../hooks';
import { useUserContext } from '../context';

const Register = () => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123123');
  const { user } = useUserContext();
  useRedirectActiveUser(user);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await register({ email, password });
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
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
