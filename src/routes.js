import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import BlogPage from './pages/BlogPage';
import Zayavka from './pages/Zayavka';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Zapros from './pages/Zapros';
import Main from './pages/Main';
import Chat from './pages/Chat';
import Xodim from './pages/Hodim';
import MainChat from './pages/MainChat';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <Main /> },
        { path: 'user', element: <Zayavka /> },
        { path: 'products', element: <Zapros /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'chat', element: <Chat /> },
        { path: 'xodim', element: <Xodim /> },
        { path: 'mainChat', element: <MainChat /> },
      ],
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return routes;
}
