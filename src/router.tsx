import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/home/home-page";
import ErrorElement from "./components/error/error";

// Components
import Layout from "./components/layout/layout";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorElement />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },

        {
          path: "*",
          element: <ErrorElement />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
