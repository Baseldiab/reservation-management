// lib imports
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

// api imports
import { Blog, CreateBlogSchema, UpdateBlogSchema } from "@/api/types/blogs";

// ui imports
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// asset imports
import { ImagePlus, Loader2, Pencil, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/components/rules/rules";
import { useTheme } from "@/hooks/use-theme";
import { useNavigate } from "react-router-dom";
import { AddNewReservationSchemaForAdmin } from "./../../../../components/rules/rules";
import { Reservation } from "@/api/types/reservation";
import { useForm } from "react-hook-form";
import { Gender, ReservationStatus, RoomType } from "@/api/enums/enums";
import { z } from "zod";

interface AddEditReservationProps {
  item: Reservation | null;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
}

type AddNewReservationSchemaForAdminValues = z.infer<
  typeof AddNewReservationSchemaForAdmin
>;

const AddEditReservationDialog = ({
  item,
  isDialogOpen = false,
  setIsDialogOpen,
}: AddEditReservationProps) => {
  const { theme } = useTheme();
  // Remove useState hooks
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedCode, setSelectedCode] = useState<string>("+20");

  // Add form hook
  const form = useForm<AddNewReservationSchemaForAdminValues>({
    resolver: zodResolver(AddNewReservationSchemaForAdmin),
    defaultValues: {
      userId: "",
      hotel: "",
      check_in: "",
      check_out: "",
      reservation_status: ReservationStatus.PENDING,
      room_type: RoomType.SINGLE,
      guests: 1,
      name: "",
    },
  });

  const signUpMutation = useMutation({
    mutationKey: ["signUp"],
    mutationFn: (data: SignUpFormValues) =>
      signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        gender: data.gender,
        phone_number: `${selectedCode}${data.phone_number}`,
        address_city: data.address_city,
        address_country: data.address_country,
      }),
    onSuccess: (data) => {
      secureStorage.set(data);
      toast({
        description: "successfully signed up",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });

      navigate("/");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title:
          "Something went wrong please try again or check your internet connection",
        description: error.message,
      });
    },
  });

  // Update handle login
  const onSubmit = (data: SignUpFormValues) => {
    signUpMutation.mutate(data);
  };

  // States

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-xl w-full max-w-[812px] !border-none *:text-white  *:!opacity-100 ">
          <DialogTitle className="flex bg-theme-main-primary h-[72px] px-8 py-5 items-start w-full absolute z-1 -top-0 text-xl">
            {item
              ? t(
                  "settings-page.banners-and-images.app-presentation.edit-image"
                )
              : t(
                  "settings-page.banners-and-images.app-presentation.add-image"
                )}
          </DialogTitle>

          <div className="w-full sm:px-4 px-2  min-h-[300px] !text-theme-text-Body flex flex-col gap-6 mt-[72px] overflow-auto max-h-[80vh] my-3">
            <div className="flex justify-start items-center gap-4 ">
              <Button
                onClick={handleSubmit}
                className="h-11 flex items-center gap-2 w-[170px]"
                disabled={
                  createBlogMutation.isPending || updateBlogMutation.isPending
                }
              >
                {t("settings-page.update-account.save")}
                {(createBlogMutation.isPending ||
                  updateBlogMutation.isPending) && (
                  <Loader2 className="size-4 animate-spin" />
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditReservationDialog;
