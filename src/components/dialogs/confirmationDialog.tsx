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
import { Loader2 } from "lucide-react";

interface Props {
  handleAction: () => void;
  onCloseModal: () => void;
  isLoading?: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ConfirmationDialog({
  handleAction,
  onCloseModal,
  isLoading,
  title,
  description,
  icon,
}: Props) {
  const onClickAction = () => {
    handleAction();
  };

  return (
    <DialogContent
      onInteractOutside={onCloseModal}
      onEscapeKeyDown={onCloseModal}
      className=" flex-row-reverse "
    >
      <DialogHeader className="mt-5">
        <section className="flex flex-col items-center justify-center mt-5">
          <div className="flex items-center justify-center mb-4">{icon}</div>
          <DialogTitle className=" text-theme-3xl max-sm:text-theme-2xl font-bold text-center container leading-theme-xl  text-theme-text-main dark:text-theme-text-dark/90 tracking-tight mb-4">
            {title}
          </DialogTitle>
          <DialogDescription className="text-theme-text-Body dark:text-theme-text-second text-center">
            {description}
          </DialogDescription>
        </section>
      </DialogHeader>
      <DialogFooter className="flex justify-center gap-3">
        <div className="flex justify-center items-center flex-wrap !w-full gap-3">
          <Button
            disabled={isLoading}
            onClick={onClickAction}
            color="#fff"
            className="bg-theme-button-primary text-white hover:bg-theme-button-primary/90 min-w-20"
          >
            Yes
            {isLoading && <Loader2 className="size-4 animate-spin" />}
          </Button>
          <Button
            disabled={isLoading}
            onClick={onCloseModal}
            className=" text-theme-text-main dark:text-theme-text-dark  !bg-transparent dark:!bg-transparent hover:!bg-white/95 hover:dark:!bg-white/10 mainBorder border-theme-icon-grey/20 border min-w-20"
          >
            No
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}
