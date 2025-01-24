import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

// components
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>Todo App</title>
        <meta
          name="description"
          content="A modern React application with  TypeScript, Tailwind CSS, and more"
        />
        <link rel="icon" type="image/png" href="/public/favicon.ico" />
      </Helmet>

      <main className="min-h-screen m-0 flex flex-col">
        <Navbar />
        <div className="h-full w-full">
          <Outlet />
        </div>

        <Footer />
      </main>
    </>
  );
}
