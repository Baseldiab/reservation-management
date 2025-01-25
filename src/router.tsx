import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import Layout from "@/components/layout/layout";

// components auth
import AuthedRoute from "@/components/auth/authed-route";
import UnauthedRoute from "@/components/auth/unauthed-route";
import AdminRoute from "@/components/auth/admin-routes";

// Pages
import ErrorElement from "@/components/error/error";

// pages auth
import LoginPage from "@/pages/login/login-page";
import SignUpPage from "@/pages/signUp/singup-page";

// pages home
import HomePage from "@/pages/home/home-page";
import ProfilePage from "@/pages/profile/profile-page";

// pages reservation
import AdminReservationDetailsPage from "@/pages/home/home-admin/reservation[id]";
import UserReservationDetailsPage from "@/pages/home/home-user/reservation[id]";

// pages users
import UsersPage from "@/pages/users/users-page";
import UserDetailsPage from "@/pages/users/[id]";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorElement />,
      element: <AuthedRoute />,
      children: [
        {
          path: "",
          element: <Layout />,
          children: [
            {
              path: "",
              element: <HomePage />,
            },
            {
              path: "/admin/reservations/:id",
              element: <AdminRoute />,
              children: [
                { path: "", element: <AdminReservationDetailsPage /> },
              ],
            },
            {
              path: "/reservations/:id",
              element: <UserReservationDetailsPage />,
            },
            {
              path: "/profile",
              element: <ProfilePage />,
            },
            {
              path: "/users",
              element: <AdminRoute />,
              children: [
                { path: "", element: <UsersPage /> },
                { path: ":id", element: <UserDetailsPage /> },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <UnauthedRoute />,
      children: [{ index: true, element: <LoginPage /> }],
    },
    {
      path: "/signup",
      element: <UnauthedRoute />,
      children: [{ index: true, element: <SignUpPage /> }],
    },
    {
      path: "*",
      element: <ErrorElement />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
