import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context';

const Home = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    setUser({ name: 'John Doe', email: 'john.doe@example.com' });
    navigate('/dashboard');
  };

  return (
    <>
      <h2>Home</h2>
      {!user && <button onClick={handleLogin}>Login</button>}
    </>
  );
};

export default Home;
