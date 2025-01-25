import React from "react";
import { useNavigate } from "react-router-dom";

// hooks

// icons
import { Ellipsis, PencilIcon } from "lucide-react";

// api
import { Reservation } from "@/api/types/reservation";

// ui imports
import { Button } from "@/components/ui/button";

// components dialogs
import AddEditReservationDialog from "./add-edit-reservation";

interface UserReservationTableOptionsProps {
  item: Reservation;
}

export default function UserReservationTableOptions({
  item,
}: UserReservationTableOptionsProps) {
  // const queryClient = useQueryClient();
  // const { toast } = useToast();
  const navigate = useNavigate();

  // states
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  // const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  // const { data: filters } = useQuery<ReservationFilterParams>({
  //   queryKey: ["my-reservations-filters"],
  // });
  // const { data: searchValue } = useQuery<string>({
  //   queryKey: ["my-reservations-search"],
  // });

  // const deleteReservationMutation = useMutation({
  //   mutationFn: ({ id }: { id: string }) => deleteReservation(id),
  //   onSuccess: () => {
  //     queryClient.setQueryData(
  //       ["my-reservations", filters, searchValue],
  //       (oldData: Reservation[] | undefined) => {
  //         if (!oldData) return [];
  //         return oldData.filter((reservation) => reservation.id !== item.id);
  //       }
  //     );
  //     toast({
  //       title: "Deleted Reservation Successfully",
  //     });
  //     setIsDeleteDialogOpen(false);
  //   },
  //   onError: () => {
  //     toast({
  //       title: "Something went wrong try again later",
  //       variant: "destructive",
  //     });
  //   },
  // });

  // Actions
  // const handleDelete = () => {
  //   deleteReservationMutation.mutate({
  //     id: item.id,
  //   });
  // };

  return (
    <>
      <div className="flex items-center gap-4">
        <Button
          title="Edit"
          onClick={() => {
            setIsEditDialogOpen(true);
          }}
          disabled={false}
          className="flex items-center font-medium select-none gap-2 border border-theme-separator !bg-transparent text-yellow-500 hover:!bg-yellow-500 hover:text-white size-8 dark:!bg-transparent dark:hover:!bg-yellow-500 dark:hover:text-white"
        >
          <PencilIcon className="size-5 -mb-1 min-w-4 min-h-4" />
        </Button>
        {/* <Button
          title="Delete"
          disabled={false}
          onClick={() => {
            setIsDeleteDialogOpen(true);
          }}
          className="flex items-center font-medium select-none gap-2 border !bg-transparent hover:!bg-red-500 hover:text-white text-red-500 size-8 dark:!bg-transparent dark:hover:!bg-red-500 dark:hover:text-white"
        >
          {deleteReservationMutation.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4 -mb-1 min-w-4 min-h-4" />
          )}
        </Button> */}
        <Button
          title="Details"
          disabled={false}
          onClick={() => {
            navigate(`/reservations/${item.id}`);
          }}
          className="flex items-center font-medium select-none gap-2 border !bg-transparent !text-theme-background-dark dark:!text-theme-background-main  dark:!bg-transparent size-8 hover:!bg-theme-background-primary hover:!text-theme-background-main"
        >
          <Ellipsis className="size-4 -mb-1 min-w-4 min-h-4 " />
        </Button>
      </div>

      {/* <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <ConfirmDeleteDialog
          handleDelete={handleDelete}
          onCloseModal={() => {
            setIsDeleteDialogOpen(false);
          }}
          isLoading={deleteReservationMutation.isPending}
          title={"Are you sure you want to delete this reservation?"}
          description={"This action cannot be undone."}
        />
      </Dialog> */}

      <AddEditReservationDialog
        item={item}
        isDialogOpen={isEditDialogOpen}
        setIsDialogOpen={setIsEditDialogOpen}
      />
    </>
  );
}
