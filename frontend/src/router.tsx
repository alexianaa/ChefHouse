import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { ReactNode } from 'react';

// Componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export const router = createBrowserRouter(
  
  [
    {
      path: '/',
      element: <Navigate to="/login" replace />,
      // errorElement: <ErrorPage /> // Descomente quando criar
    },
    {
      path: '/login',
      element: <Login />,
    },
    // {
    //   path: '/cadastro',
    //   element: <Cadastro />, // Descomente quando criar
    // },
    {
      path: '/home',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
  ]);