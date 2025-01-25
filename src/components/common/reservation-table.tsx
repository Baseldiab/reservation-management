import React from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";
import { ColumnDef, Row } from "@tanstack/react-table";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Reservation,
  ReservationFilterParams,
  ReservationParams,
} from "@/api/types/reservation";
import { DataTable } from "@/components/ui/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface ReservationTableProps {
  title: string;
  showAddButton: boolean;
  onAddClick: () => void;
  customOptions: (item: Reservation) => React.ReactNode;
  getAllReservationsFn: (params: ReservationParams) => Promise<Reservation[]>;
  searchQueryKey: string;
  filterQueryKey: string;
  dataQueryKey: string;
  filterComponent: React.ReactNode;
  searchComponent: React.ReactNode;
  isUser?: boolean;
}

export default function ReservationTable({
  title = "Reservations",
  showAddButton = true,
  onAddClick,
  customOptions,
  getAllReservationsFn,
  searchQueryKey,
  filterQueryKey,
  dataQueryKey,
  filterComponent,
  searchComponent,
  isUser = false,
}: ReservationTableProps) {
  // state
  const [currentPage, setCurrentPage] = React.useState(1);
  const PER_PAGE = 5;

  // Queries
  const { data: filters } = useQuery<ReservationFilterParams>({
    queryKey: [filterQueryKey],
  });

  const { data: searchValue } = useQuery<string>({
    queryKey: [searchQueryKey],
  });

  const { data: allReservations, isLoading: isReservationsLoading } = useQuery({
    queryKey: [dataQueryKey, filters, searchValue],
    queryFn: () =>
      getAllReservationsFn({
        ...filters,
        ...(searchValue && { search: searchValue }),
      }),
    retry: 1,
    enabled: !!dataQueryKey,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
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
  const columns: ColumnDef<Reservation>[] = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: () => <p className="text-start ">Id</p>,
        cell: ({ row }) => {
          return (
            <div className="text-start font-medium ">#{row.original.id}</div>
          );
        },
      },
      // Only include the User name column if isUser is false
      ...(!isUser
        ? [
            {
              accessorKey: "User name",
              header: () => <p className="text-start">Name</p>,
              cell: ({ row }: { row: Row<Reservation> }) => {
                return (
                  <div className="text-start font-medium ">
                    {row.original.name ? row.original.name : "Not found"}
                  </div>
                );
              },
            },
          ]
        : []),
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
          return customOptions ? customOptions(row.original) : null;
        },
      },
    ],
    [customOptions, isUser]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // if (isReservationsLoading) {
  //   return <Loading />;
  // }

  return (
    <section className="w-full bg-transparent rounded-3xl p-6 flex flex-col gap-6 container">
      <h1 className="font-bold font-sans -mt-2 text-2xl max-md:w-full">
        {title}
      </h1>
      <article className="flex max-md:flex-col max-md:items-start items-center gap-6 !w-full justify-between">
        {showAddButton && (
          <Button
            onClick={onAddClick}
            className="flex items-center font-medium select-none gap-2 h-[44px] w-[170px]"
          >
            <PlusIcon className="size-4 -mb-1 min-w-4 min-h-4" />
            Add Reservation
          </Button>
        )}

        <div className="flex max-md:!w-full max-md:flex-col max-md:items-start md:flex-1 justify-end items-center gap-4">
          {filterComponent}
          {searchComponent}
        </div>
      </article>

      <DataTable
        isLoading={isReservationsLoading}
        columns={columns}
        data={paginatedData.data}
        headerClasses="!bg-theme-background-primary dark:!bg-theme-button-primary/90 *:hover:bg-theme-background-primary !border-none rounded-xl"
        headerCellClasses="!text-white !font-semibold bg-theme-background-primary"
        className="border-2 border-theme-lunar-light border-none shadow-xl rounded-xl"
        rowClasses="dark:!bg-white/5"
        emptyMessage="No Reservations Found"
      />

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
