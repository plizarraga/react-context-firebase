import { Link } from 'react-router-dom';
import { logout } from '../config';
import { useUserContext } from '../context';

const Navbar = () => {
  const { user } = useUserContext();

  const handleLogout = async () => {
    try {
      const reponse = await logout();
      console.log(reponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      {user ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
