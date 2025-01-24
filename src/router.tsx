import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import Layout from "@/components/layout/layout";

// components auth
import AuthedRoute from "@/components/auth/authed-route";

// Pages
import ErrorElement from "@/components/error/error";
// pages auth
import LoginPage from "@/pages/login/login-page";
import SignUpPage from "@/pages/signUp/singup-page";

// pages home
import HomePage from "@/pages/home/home-page";

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
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
    {
      path: "*",
      element: <ErrorElement />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
