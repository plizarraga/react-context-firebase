import { logout } from '../config';
import { useUserContext } from '../context';
import { Button } from '@mui/material';

const Navbar = () => {
  const { user } = useUserContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user && (
        <Button onClick={handleLogout} variant="contained">
          Logout
        </Button>
      )}
    </>
  );
};

export default Navbar;
