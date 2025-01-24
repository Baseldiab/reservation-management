// ui imports
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// asset imports
import { Trash2 as RecycleBin } from "lucide-react";
import { Loader2 } from "lucide-react";

interface Props {
  handleDelete: () => void;
  onCloseModal: () => void;
  isLoading: boolean;
  title: string;
  description: string;
}

export default function ConfirmDeleteDialog({
  handleDelete,
  onCloseModal,
  isLoading,
  title,
  description,
}: Props) {
  const handleDeleteAction = () => {
    handleDelete();
  };

  return (
    <DialogContent
      onInteractOutside={onCloseModal}
      onEscapeKeyDown={onCloseModal}
      className=" flex-row-reverse "
    >
      <DialogHeader className="mt-5">
        <section className="flex flex-col items-center justify-center mt-5">
          <div className="flex items-center justify-center mb-4">
            <RecycleBin className="text-red-600 sm:size-10 size-6" />
          </div>
          <DialogTitle className=" text-theme-3xl max-sm:text-theme-2xl font-bold text-center container leading-theme-xl  text-theme-inputField-error tracking-tight mb-4">
            {title}
          </DialogTitle>
          <DialogDescription className="text-theme-text-Body text-center">
            {description}
          </DialogDescription>
        </section>
      </DialogHeader>
      <DialogFooter className="flex justify-center gap-3">
        <div className="flex justify-center items-center flex-wrap !w-full gap-3">
          <Button
            disabled={isLoading}
            onClick={handleDeleteAction}
            color="#fff"
            className="bg-red-600 text-white hover:bg-theme-inputField-error min-w-20"
          >
            Yes
            {isLoading && <Loader2 className="size-4 animate-spin" />}
          </Button>
          <Button
            disabled={isLoading}
            onClick={onCloseModal}
            className=" text-theme-text-Body bg-transparent hover:bg-white/95 mainBorder border-theme-icon-grey/20 border min-w-20"
          >
            No
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}
