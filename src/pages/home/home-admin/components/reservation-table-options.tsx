import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// hooks
import { useToast } from "@/hooks/use-toast";

// icons
import { Loader2, PencilIcon, Trash2 } from "lucide-react";

// api
import { deleteReservation } from "@/api/routes/reservation";
import { Reservation, ReservationFilterParams } from "@/api/types/reservation";

// ui imports
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

// components dialogs
import ConfirmDeleteDialog from "@/components/dialogs/confirmDeleteDialog";
import AddEditReservationDialog from "./add-edit-reservation";

interface AdminReservationTableOptionsProps {
  item: Reservation;
}

export default function AdminReservationTableOptions({
  item,
}: AdminReservationTableOptionsProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // states
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const { data: filters } = useQuery<ReservationFilterParams>({
    queryKey: ["all-reservations-filters"],
  });

  const deleteReservationMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteReservation(id),
    onSuccess: () => {
      queryClient.setQueryData(
        ["all-reservations", filters],
        (oldData: Reservation[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter((reservation) => reservation.id !== item.id);
        }
      );
      toast({
        title: "Deleted Reservation Successfully",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Something went wrong try again later",
        variant: "destructive",
      });
    },
  });

  // Actions
  const handleDelete = () => {
    deleteReservationMutation.mutate({
      id: item.id,
    });
  };

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
        <Button
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
        </Button>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <ConfirmDeleteDialog
          handleDelete={handleDelete}
          onCloseModal={() => {
            setIsDeleteDialogOpen(false);
          }}
          isLoading={deleteReservationMutation.isPending}
          title={"Are you sure you want to delete this reservation?"}
          description={"This action cannot be undone."}
        />
      </Dialog>

      <AddEditReservationDialog
        item={item}
        isDialogOpen={isEditDialogOpen}
        setIsDialogOpen={setIsEditDialogOpen}
      />
    </>
  );
}
