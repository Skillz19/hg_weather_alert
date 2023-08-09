import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import * as React from 'react';
import HomePage from './pages/Homepage';
import DetailsPage from './pages/DetailsPage';
import RootLayout from './components/RootLayout';
import NotFoundPage from './pages/NotFoundPage';
//import MainRouter from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'details/:index', element: <DetailsPage /> }
    ]
  },
  {
    path: '/*', element: <NotFoundPage />
  }
]);
const App: React.FC = () => {
  //const locations = useSelector((state: LocationsState) => state);

  return (
    <RouterProvider router={router} />
  );
};

export default App;