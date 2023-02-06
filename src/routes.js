import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import BlogPage from './pages/BlogPage';
import Zayavka2 from './pages/Zayavka2';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Zapros from './pages/Zapros2';
import Main from './pages/Main';
import Chat from './pages/Chat';
import Xodim from './pages/Hodim';
import MainChat from './pages/MainChat';
import Main4 from './pages/Main4';
import AllUsers from './pages/AllUsers';

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
        { path: 'user', element: <Zapros /> },
        { path: 'products', element: <Zayavka2 /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'chat', element: <Chat /> },
        { path: 'xodim', element: <Xodim /> },
        { path: 'mainChat', element: <MainChat /> },
        { path: 'main4', element: <Main4 /> },
        { path: 'allUsers', element: <AllUsers /> },
      ],
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return routes;
}
