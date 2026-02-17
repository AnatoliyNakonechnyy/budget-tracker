import { createBrowserRouter } from "react-router";
import Layout from "../layouts";
import NotFound from "../pages/NotFound";
import Transactions from "../pages/Transactions";
import Registration from "../pages/Registration";
import LoginForm from "../features/auth/components/LoginForm";

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout />
    ),
    children: [
      {
        path: '',
        element: <div>Home page</div>,
      },
      {
        path: 'profile',
        element: <div>Profile page</div>,
      },
      {
        path: 'transactions',
        element: <Transactions />,
      },
      {
        path: 'reports',
        element: <div>Reports page</div>,
      },
    ],
  },
  {
    path: 'onboarding',
    element: <div>Onboarding page</div>,
  },
  {
    path: 'login',
    element: <LoginForm />,
  },
  {
    path: 'register',
    element: <Registration />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
