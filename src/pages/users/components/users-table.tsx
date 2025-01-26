import React from "react";
import { useQuery } from "@tanstack/react-query";

// lib imports
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";

// asset imports

// api
import { User, UserFilterParams } from "@/api/types/user";
import { getAllUsers } from "@/api/routes/user";
import { UserType } from "@/api/enums/enums";

// Ui imports
import { DataTable } from "@/components/ui/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// components dialogs

import SearchUser from "@/pages/users/components/search-user";
import FilterUsers from "@/pages/users/components/filter-users";
import UsersTableOptions from "@/pages/users/components/users-table-options";

export default function UsersTable() {
  console.log(formatDate(new Date().toISOString()));

  // state
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const { data: filters } = useQuery<UserFilterParams>({
    queryKey: ["all-users-filters"],
  });

  const { data: searchValue } = useQuery<string>({
    queryKey: ["all-users-search"],
  });

  // Queries
  const { data: allUsers, isLoading: isUsersLoading } = useQuery({
    queryKey: ["all-users", filters, searchValue],
    queryFn: () =>
      getAllUsers({ ...filters, ...(searchValue && { search: searchValue }) }),
  });

  // Calculate pagination
  const paginatedUsers = React.useMemo(() => {
    if (!allUsers) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allUsers.slice(startIndex, endIndex);
  }, [allUsers, currentPage]);

  // table columns
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "_id",
      header: () => <p className="text-start ">id</p>,
      cell: ({ row }) => {
        return <div className="text-start font-medium ">#{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "name",
      header: () => <p className="text-start">Username</p>,
      cell: ({ row }) => {
        return (
          <div className="text-start font-medium ">
            {row.original.name ? row.original.name : "Not found"}
          </div>
        );
      },
    },
    {
      accessorKey: "user_type",
      header: () => <p className="text-start">User Type</p>,
      cell: ({ row }) => {
        return (
          <div className="text-start font-medium ">
            {row.original.user_type
              ? row.original.user_type === UserType.USER
                ? "User"
                : "Admin"
              : "Not found"}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => <p className="text-start">Email</p>,
      cell: ({ row }) => {
        return (
          <p className="text-start font-medium ">
            {row.original.email ? row.original.email : "Not found"}
          </p>
        );
      },
    },
    {
      accessorKey: "phone",
      header: () => <p className="text-start">Phone</p>,
      cell: ({ row }) => {
        return (
          <p className="text-start font-medium ">
            {row.original.phone_number
              ? row.original.phone_number
              : "Not found"}
          </p>
        );
      },
    },
    {
      accessorKey: "address",
      header: () => <p className="text-start">Address city</p>,
      cell: ({ row }) => {
        return (
          <p className="text-start font-medium ">
            {row.original.address_city
              ? row.original.address_city
              : "Not found"}
          </p>
        );
      },
    },

    {
      accessorKey: "options",
      header: () => <div className="text-start">Actions</div>,
      cell: ({ row }) => {
        return <UsersTableOptions item={row.original} />;
      },
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil((allUsers?.length || 0) / itemsPerPage);

  return (
    <section className="w-full bg-transparent rounded-3xl p-6 flex flex-col gap-6 container">
      <article className="flex max-md:flex-col max-md:items-start items-center gap-6 !w-full justify-between">
        <h1 className="font-bold font-sans -mt-2 text-2xl max-md:w-full">
          All Users
        </h1>

        <div className="flex max-md:!w-full max-md:flex-col max-md:items-start md:flex-1 justify-end items-center gap-4">
          <FilterUsers />
          <SearchUser />
        </div>
      </article>

      <DataTable
        columns={columns}
        data={paginatedUsers || []}
        headerClasses="!bg-blue-500 dark:!bg-white/50 *:hover:!bg-theme-main-primary  !border-none rounded-xl"
        headerCellClasses="!text-white !font-semibold"
        className="border-2 border-theme-lunar-light border-none shadow-xl rounded-xl"
        rowClasses="dark:!bg-white/5"
        emptyMessage="No Users Found"
        isLoading={isUsersLoading}
      />

      {totalPages > 1 && (
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                  currentPage === totalPages
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
