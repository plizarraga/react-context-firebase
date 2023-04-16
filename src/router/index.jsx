import { createBrowserRouter } from 'react-router-dom';
import { LayoutPrivate, LayoutRoot } from '../layouts';
import { Home, Dashboard } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutRoot />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'dashboard',
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
