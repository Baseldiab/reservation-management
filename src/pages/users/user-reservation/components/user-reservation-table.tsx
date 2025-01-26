import React from "react";

// api
import { getReservationsByUserId } from "@/api/routes/reservation";

// components common
import ReservationTable from "@/components/common/reservation-table";

// components user reservation
import UserFilterReservations from "@/pages/users/user-reservation/components/reservation-filter";
import UserSearchReservations from "@/pages/users/user-reservation/components/reservation-search";
import UserReservationTableOptions from "@/pages/users/user-reservation/components/reservation-table-options";
import UserAddEditReservationDialog from "@/pages/users/user-reservation/components/add-edit-reservation";
import { useParams } from "react-router-dom";

export default function UserReservationsTable() {
  const { id } = useParams();

  // state
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  // Calculate paginated data

  return (
    <>
      <ReservationTable
        title="User Reservations"
        showAddButton={true}
        onAddClick={() => setIsEditDialogOpen(true)}
        customOptions={(item) => <UserReservationTableOptions item={item} />}
        getAllReservationsFn={async () =>
          await getReservationsByUserId({ userId: id as string })
        }
        searchQueryKey="user-reservations-search"
        filterQueryKey="user-reservations-filters"
        dataQueryKey="user-reservations"
        filterComponent={<UserFilterReservations />}
        searchComponent={<UserSearchReservations />}
        isUser={true}
      />

      <UserAddEditReservationDialog
        item={null}
        isDialogOpen={isEditDialogOpen}
        setIsDialogOpen={setIsEditDialogOpen}
      />
    </>
  );
}
