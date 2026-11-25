import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { DocumentationPage } from '@/pages/DocumentationPage';

export const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/docs',
    element: <DocumentationPage />,
  },
  {
    path: '*',
    element: <LandingPage />,
  },
];

export const router = createBrowserRouter(routes);
