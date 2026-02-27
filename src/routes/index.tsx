import { createBrowserRouter, Navigate } from 'react-router';
import Layout from '../layouts';
import Registration from '../pages/Registration';
import LoginForm from '../features/auth/components/LoginForm';
import Reports from '../pages/Reports';
import Profile from '../pages/Profile';
import ExpenseList from '../pages/ExpenseList';
import Onboarding from '../pages/Onboarding';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Navigate to="/onboarding" replace />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'expenses',
        element: <ExpenseList />,
      },
    ],
  },
  {
    path: 'onboarding',
    element: <Onboarding />,
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
