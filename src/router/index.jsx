import { createBrowserRouter } from 'react-router-dom';
import { LayoutPrivate, LayoutRoot } from '../layouts';
import { Login, Register, Dashboard } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutRoot />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '/dashboard',
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

export default router;
