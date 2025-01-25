// ui imports

// api imports
import { useQuery } from "@tanstack/react-query";
import { User } from "@/api/types/user";

// enum imports
import { UserType } from "@/api/enums/enums";

// components home page
import AdminReservationsTable from "@/pages/home/home-admin/components/reservation-table";
import UserReservationsTable from "@/pages/home/home-user/components/reservation-table";

export default function HomePage() {
  const { data: user } = useQuery<User>({
    queryKey: ["user"],
  });

  return (
    <>
      {/* <UserForm /> */}

      {user?.user_type === UserType.ADMIN || user?.user_type === "admin" ? (
        <>
          <AdminReservationsTable />
        </>
      ) : (
        <>
          <UserReservationsTable />
        </>
      )}
    </>
  );
}
