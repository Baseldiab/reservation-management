import React from "react";

// api
import { getAllReservations } from "@/api/routes/reservation";

// components home admin
import FilterReservations from "@/pages/home/home-admin/components/reservation-filter";
import SearchReservations from "@/pages/home/home-admin/components/reservation-search";
import AdminReservationTableOptions from "@/pages/home/home-admin/components/reservation-table-options";
import AddEditReservationDialog from "@/pages/home/home-admin/components/add-edit-reservation";
import ReservationTable from "@/components/common/reservation-table";

export default function ReservationsTable() {
  // state
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  // Calculate paginated data

  return (
    <>
      <ReservationTable
        title="All Reservations"
        showAddButton={true}
        onAddClick={() => setIsEditDialogOpen(true)}
        customOptions={(item) => <AdminReservationTableOptions item={item} />}
        getAllReservationsFn={getAllReservations}
        searchQueryKey="all-reservations-search"
        filterQueryKey="all-reservations-filters"
        dataQueryKey="all-reservations"
        filterComponent={<FilterReservations />}
        searchComponent={<SearchReservations />}
      />

      <AddEditReservationDialog
        item={null}
        isDialogOpen={isEditDialogOpen}
        setIsDialogOpen={setIsEditDialogOpen}
      />
    </>
  );
}
