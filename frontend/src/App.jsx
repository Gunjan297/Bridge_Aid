import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import './App.css'
import Navbar from './components/shared/Navbar.jsx';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Schemes from './components/Schemes';
import Browse from './components/Browse';
import Profile from './components/Profile';
import Details from './components/Details';
import Organizations from './components/admin/Organizations';
import OrganizationCreate from './components/admin/OrganizationCreate';
import OrganizationSetup from './components/admin/OrganizationSetup';
import AdminSchemes from "./components/admin/AdminSchemes";
import PostScheme from './components/admin/PostScheme';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/schemes",
    element: <Schemes />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },

  //Routes for admin
  {
    path: "/admin/organizations",
    element: (
      <ProtectedRoute>
        <Organizations />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/organizations/create",
    element: (
      <ProtectedRoute>
        <OrganizationCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/organizations/:id",
    element: (
      <ProtectedRoute>
        <OrganizationSetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/schemes",
    element: (
      <ProtectedRoute>
        <AdminSchemes />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/schemes/create",
    element: (
      <ProtectedRoute>
        <PostScheme />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/schemes/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App
