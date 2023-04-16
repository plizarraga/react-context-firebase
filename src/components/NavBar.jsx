import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context';

const Navbar = () => {
  const { user, setUser } = useUserContext();
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {user && (
        <>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
