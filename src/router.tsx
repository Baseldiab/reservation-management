import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "@/pages/home/home-page";
import ErrorElement from "@/components/error/error";
import LoginPage from "@/pages/login/login-page";

// Components
import Layout from "@/components/layout/layout";

// components auth
import AuthedRoute from "@/components/auth/authed-route";

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
      path: "*",
      element: <ErrorElement />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
