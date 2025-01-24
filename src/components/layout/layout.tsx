import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

// components
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>Reservation Management</title>
        <meta
          name="description"
          content="Reservation ManagementReservation Management System is a web application that enables users to book and manage hotel reservations, while administrators oversee and control all bookings. Users can create, view, and cancel reservations, while admins can filter, approve, or cancel bookings via a dashboard. The system integrates with a mock API for data management and offers a clean, responsive UI."
        />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Helmet>

      <main className="min-h-screen m-0 flex flex-col">
        <Navbar />
        <div className="h-full w-full flex-1">
          <Outlet />
        </div>

        <Footer />
      </main>
    </>
  );
}
