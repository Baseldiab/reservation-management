import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CircleX } from "lucide-react";

// api
import { getReservationsByUserId } from "@/api/routes/reservation";
import { User } from "@/api/types/user";

// components common
import NoData from "@/components/common/noData";
import ReservationTable from "@/components/common/reservation-table";

// components home admin
import UserFilterReservations from "@/pages/home/home-user/components/reservation-filter";
import UserSearchReservations from "@/pages/home/home-user/components/reservation-search";
import UserReservationTableOptions from "@/pages/home/home-user/components/reservation-table-options";
import UserAddEditReservationDialog from "@/pages/home/home-user/components/add-edit-reservation";

export default function UserReservationsTable() {
  // state
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  const { data: user } = useQuery<User>({
    queryKey: ["user"],
  });

  // Calculate paginated data

  return (
    <>
      {user && user.id ? (
        <ReservationTable
          title="My Reservations"
          showAddButton={true}
          onAddClick={() => setIsEditDialogOpen(true)}
          customOptions={(item) => <UserReservationTableOptions item={item} />}
          getAllReservationsFn={async () =>
            await getReservationsByUserId({ userId: user?.id as string })
          }
          searchQueryKey="my-reservations-search"
          filterQueryKey="my-reservations-filters"
          dataQueryKey="my-reservations"
          filterComponent={<UserFilterReservations />}
          searchComponent={<UserSearchReservations />}
          isUser={true}
        />
      ) : (
        <NoData
          title="Reservation not found"
          icon={<CircleX className="size-10" />}
        />
      )}

      <UserAddEditReservationDialog
        item={null}
        isDialogOpen={isEditDialogOpen}
        setIsDialogOpen={setIsEditDialogOpen}
      />
    </>
  );
}
