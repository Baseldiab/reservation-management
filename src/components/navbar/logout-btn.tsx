import React from "react";
import { secureStorage } from "@/utils/secure-storage";
import { cn } from "@/lib/utils";

// ui components
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// components dialogs
import ConfirmationDialog from "@/components/dialogs/confirmationDialog";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

// icons
import { LogOut } from "lucide-react";

interface LogoutBtnProps {
  className?: string;
}

export default function LogoutBtn({ className }: LogoutBtnProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  // Actions
  const handleLogout = () => {
    secureStorage.remove();
    queryClient.invalidateQueries({ queryKey: ["user"] });
    navigate("/login");
  };

  return (
    <>
      <Button
        className={cn(
          "rounded-xl p-2 h-10 w-fit  !bg-gray-200 dark:!bg-gray-800 !border-none focus:outline-none flex justify-center items-center gap-2 text-slate-900 dark:text-white ",
          className
        )}
        title="Logout"
        onClick={() => setIsDeleteDialogOpen(true)}
      >
        <LogOut className="size-5 text-slate-900 dark:text-white" />
        logout
      </Button>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <ConfirmationDialog
          handleAction={handleLogout}
          onCloseModal={() => {
            setIsDeleteDialogOpen(false);
          }}
          icon={
            <LogOut className="text-theme-button-primary sm:size-10 size-6" />
          }
          isLoading={false}
          title={"Are you sure you want to logout ?"}
          description={"See you soon!"}
        />
      </Dialog>
    </>
  );
}
