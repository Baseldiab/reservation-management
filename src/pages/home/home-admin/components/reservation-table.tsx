import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// lib imports
import { ColumnDef } from "@tanstack/react-table";

// asset imports

// api

// Ui imports
import { DataTable } from "@/components/ui/data-table";

// components dialogs
import Loading from "@/components/common/loading";
import { useToast } from "@/hooks/use-toast";
import FilterReservations from "./reservation-filter";
import { getAllReservations } from "@/api/routes/reservation";
import { Reservation, ReservationFilterParams } from "@/api/types/reservation";
import { formatDate } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { PencilIcon } from "lucide-react";

export default function ReservationsTable() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // state
  const [currentPage, setCurrentPage] = React.useState(1);
  const PER_PAGE = 5;

  // Queries
  const { data: filters } = useQuery<ReservationFilterParams>({
    queryKey: ["all-reservations-filters"],
  });

  const { data: allReservations, isLoading: isReservationsLoading } = useQuery({
    queryKey: ["all-reservations", filters],
    queryFn: () => getAllReservations(filters),
  });

  // Calculate paginated data
  const paginatedData = React.useMemo(() => {
    if (!allReservations) return { data: [], pagination: { totalPages: 0 } };

    const startIndex = (currentPage - 1) * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    const totalPages = Math.ceil(allReservations.length / PER_PAGE);

    return {
      data: allReservations.slice(startIndex, endIndex),
      pagination: {
        totalPages,
        currentPage,
        totalItems: allReservations.length,
      },
    };
  }, [allReservations, currentPage]);

  // table columns
  const columns: ColumnDef<Reservation>[] = [
    {
      accessorKey: "_id",
      header: () => <p className="text-start ">#</p>,
      cell: ({ row }) => {
        return <div className="text-start font-medium ">{row.original.id}</div>;
      },
    },
    {
      accessorKey: "name",
      header: () => <p className="text-start">Name</p>,
      cell: ({ row }) => {
        return (
          <div className="text-start font-medium ">
            {row.original.name ? row.original.name : "Not found"}
          </div>
        );
      },
    },
    {
      accessorKey: "hotel_name",
      header: () => <p className="text-start">Hotel Name</p>,
      cell: ({ row }) => {
        return (
          <p className="text-start font-medium ">
            {row.original.hotel_name ? row.original.hotel_name : "Not found"}
          </p>
        );
      },
    },
    {
      accessorKey: "check_in",
      header: () => <p className="text-start">Check In</p>,
      cell: ({ row }) => {
        return (
          <p className="text-start font-medium ">
            {row.original.check_in
              ? formatDate(row.original.check_in)
              : "Not found"}
          </p>
        );
      },
    },
    {
      accessorKey: "check_out",
      header: () => <p className="text-start">Check Out</p>,
      cell: ({ row }) => {
        return (
          <p className="text-start font-medium ">
            {row.original.check_out
              ? formatDate(row.original.check_out)
              : "Not found"}
          </p>
        );
      },
    },

    {
      accessorKey: "options",
      header: () => <div className="text-start">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4">
            <Button
              title="Edit"
              onClick={() => {}}
              disabled={false}
              className="flex items-center font-medium select-none gap-2 border border-theme-separator !bg-transparent text-yellow-500 hover:!bg-yellow-500 hover:text-white size-8"
            >
              <PencilIcon className="size-5 -mb-1 min-w-4 min-h-4" />
            </Button>
            <Button
              title="Delete"
              disabled={false}
              onClick={() => {}}
              className="flex items-center font-medium select-none gap-2 border !bg-transparent hover:!bg-red-500 hover:text-white text-red-500 size-8"
            >
              {/* { ? (
                <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4 -mb-1 min-w-4 min-h-4" />
                  )} */}
              <Trash2 className="size-4 -mb-1 min-w-4 min-h-4" />
              <Loader2 className="size-4 animate-spin" />
            </Button>
          </div>
        );
      },
    },
  ];

  // Add handlePageChange function
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isReservationsLoading) {
    return <Loading />;
  }

  return (
    <section className="w-full bg-transparent rounded-3xl p-6 flex flex-col gap-6 container">
      <article className="flex max-md:flex-col max-md:items-start items-center gap-6 !w-full justify-between">
        <h1 className="font-bold font-sans -mt-2 text-2xl max-md:w-full">
          All Reservations
        </h1>

        <div className="flex max-md:!w-full max-md:flex-col max-md:items-start md:flex-1 justify-end items-center gap-4">
          <FilterReservations />
          {/* <SearchUser /> */}
        </div>
      </article>

      <DataTable
        columns={columns}
        data={paginatedData.data}
        headerClasses="!bg-theme-background-primary dark:!bg-white/50 *:hover:!bg-theme-background-primary !border-none rounded-xl"
        headerCellClasses="!text-white !font-semibold"
        className="border-2 border-theme-lunar-light border-none shadow-xl rounded-xl"
        rowClasses="dark:!bg-white/5"
        emptyMessage="No Reservations Found"
      />

      {/* Replace the NumberedPagination component with this new pagination */}
      {paginatedData.pagination.totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from(
              { length: paginatedData.pagination.totalPages },
              (_, i) => i + 1
            ).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === paginatedData.pagination.totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}
