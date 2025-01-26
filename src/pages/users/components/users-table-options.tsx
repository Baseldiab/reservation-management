import React from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";

// ui imports
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

// api imports
import { deleteUser } from "@/api/routes/user";

// types
import { User } from "@/api/types/user";

// icons
import { Ellipsis, Loader2, Trash2 } from "lucide-react";

// components
import ConfirmDeleteDialog from "@/components/dialogs/confirmDeleteDialog";

// hooks
import { useToast } from "@/hooks/use-toast";

interface UsersTableOptionsProps {
  item: User;
}
export default function UsersTableOptions({ item }: UsersTableOptionsProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const deleteUserMutation = useMutation({
    mutationFn: (id: string | number) => deleteUser(id),
    onSuccess: () => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
        if (oldData) {
          return oldData.filter((user) => user.id !== item.id);
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

  // action
  const handleDeleteUser = (id: string | number) => {
    deleteUserMutation.mutate(id);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Button
          title="Delete"
          disabled={false}
          onClick={() => {
            setIsDeleteDialogOpen(true);
          }}
          className="flex items-center font-medium select-none gap-2 border !bg-transparent hover:!bg-red-500 hover:text-white text-red-500 size-8 dark:!bg-transparent dark:hover:!bg-red-500 dark:hover:text-white"
        >
          {deleteUserMutation.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4 -mb-1 min-w-4 min-h-4" />
          )}
        </Button>
        <Button
          title="Details"
          disabled={false}
          onClick={() => {
            navigate(`/users/${item.id}`);
          }}
          className="flex items-center font-medium select-none gap-2 border !bg-transparent !text-theme-background-dark dark:!text-theme-background-main  dark:!bg-transparent size-8 hover:!bg-theme-background-primary hover:!text-theme-background-main"
        >
          <Ellipsis className="size-4 -mb-1 min-w-4 min-h-4 " />
        </Button>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <ConfirmDeleteDialog
          handleDelete={() => {
            handleDeleteUser(item.id);
          }}
          onCloseModal={() => {
            setIsDeleteDialogOpen(false);
          }}
          isLoading={deleteUserMutation.isPending}
          title={"Are you sure you want to delete this user?"}
          description={"This action cannot be undone."}
        />
      </Dialog>
    </>
  );
}
