import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// lib imports
import { ColumnDef } from "@tanstack/react-table";

// asset imports
import { Loader2, PencilIcon } from "lucide-react";
import { Trash2 } from "lucide-react";

// api
import { User } from "@/api/types/user";
import { deleteUser, getAllUsers } from "@/api/routes/user";

// Ui imports
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import ConfirmDeleteDialog from "@/components/dialogs/confirmDeleteDialog";
import Loading from "@/components/common/loading";
import { useToast } from "@/hooks/use-toast";
import SearchUser from "./search-user";
import FilterUsers from "./filter-users";

export default function UsersTable() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  // state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const [itemId, setItemId] = React.useState<string | number | null>(null);

  // Queries
  const { data: allUsers, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string | number) => deleteUser(id),
    onSuccess: () => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
        if (oldData) {
          return oldData.filter((user) => user.id !== itemId);
        }
        return [];
      });

      toast({
        title: "User deleted successfully",
        variant: "success",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error: string) => {
      toast({
        title: "Error deleting user",
        description: error ?? "Something went wrong",
        variant: "destructive",
      });
    },
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
      header: () => <p className="text-start ">#</p>,
      cell: ({ row }) => {
        return <div className="text-start font-medium ">{row.index + 1}</div>;
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
            {row.original.phone ? row.original.phone : "Not found"}
          </p>
        );
      },
    },
    {
      accessorKey: "address",
      header: () => <p className="text-start">Address</p>,
      cell: ({ row }) => {
        return (
          <p className="text-start font-medium ">
            {row.original.address ? row.original.address.city : "Not found"}
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
              onClick={() => {
                handleUpdateUser(row.original);
              }}
              disabled={deleteUserMutation.isPending}
              className="flex items-center font-medium select-none gap-2 border border-theme-separator bg-transparent text-yellow-500 hover:bg-yellow-500 hover:text-white"
            >
              <PencilIcon className="size-5 -mb-1 min-w-4 min-h-4" />
            </Button>
            <Button
              title="Delete"
              disabled={deleteUserMutation.isPending}
              onClick={() => {
                setItemId(row.original.id);
                setIsDeleteDialogOpen(true);
              }}
              className="flex items-center font-medium select-none gap-2 border bg-transparent hover:bg-red-500 hover:text-white text-red-500"
            >
              {deleteUserMutation.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4 -mb-1 min-w-4 min-h-4" />
              )}
            </Button>
          </div>
        );
      },
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateUser = (user: User) => {
    queryClient.setQueryData(["user-item"], user);
  };

  const handleDeleteUser = (id: string | number) => {
    deleteUserMutation.mutate(id);
  };

  if (isUsersLoading || !allUsers) {
    return <Loading />;
  }

  const totalPages = Math.ceil(allUsers.length / itemsPerPage);

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
        data={paginatedUsers}
        headerClasses="!bg-blue-500 dark:!bg-white/50 *:hover:!bg-theme-main-primary  !border-none rounded-xl"
        headerCellClasses="!text-white !font-semibold"
        className="border-2 border-theme-lunar-light border-none shadow-xl rounded-xl"
        rowClasses="dark:!bg-white/5"
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

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <ConfirmDeleteDialog
          handleDelete={() => {
            if (itemId) {
              handleDeleteUser(itemId);
            }
          }}
          onCloseModal={() => {
            setIsDeleteDialogOpen(false);
          }}
          isLoading={deleteUserMutation.isPending}
          title={"Are you sure you want to delete this user?"}
          description={"This action cannot be undone."}
        />
      </Dialog>
    </section>
  );
}
