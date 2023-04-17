import { useUserContext } from '../context';

const Dashboard = () => {
  const { user } = useUserContext();
  return (
    <>
      <h1>Dashboard</h1>
      <h2>Private route</h2>
      {/* <h2>Welcome, {user.name}</h2> */}
    </>
  );
};

export default Dashboard;
