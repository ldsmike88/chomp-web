import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import Layout from './Layout';
import MenuBar from './MenuBar';
import Planner from './Planner';
import ShoppingList from './ShoppingList';

const ErrorPage = () => {
  const error = useRouteError();
  // console.error(error);

  return (
    <>
      <MenuBar />
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Planner /> },
      { path: '/Planner', element: <Planner /> },
      { path: '/Shopping_List', element: <ShoppingList /> },
    ],
  },
]);

const Router = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default Router;
