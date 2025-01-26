// lib imports
import React from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

// hook imports
import { useToast } from "@/hooks/use-toast";

// zod imports
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddNewReservationSchemaForAdmin } from "@/components/rules/rules";

// api imports
import {
  Reservation,
  ReservationFilterParams,
  UpdateReservationDto,
} from "@/api/types/reservation";
import { getAllUsers } from "@/api/routes/user";
import { addReservation, updateReservation } from "@/api/routes/reservation";

// enum
import { ReservationStatus, RoomType } from "@/api/enums/enums";

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// asset imports
import { Loader2 } from "lucide-react";

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
  // Remove useState hooks
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // states

  // Add form hook
  const form = useForm<AddNewReservationSchemaForAdminValues>({
    resolver: zodResolver(AddNewReservationSchemaForAdmin),
    defaultValues: {
      userId: "",
      hotel_name: "",
      check_in: "",
      check_out: "",
      reservation_status: ReservationStatus.PENDING,
      room_type: RoomType.SINGLE,
      guests: 1,
      name: "",
    },
  });

  // Quireis
  const { data: filters } = useQuery<ReservationFilterParams>({
    queryKey: ["all-reservations-filters"],
  });

  const { data: allUsers, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  const addReservationMutation = useMutation({
    mutationKey: ["addReservation"],
    mutationFn: (data: AddNewReservationSchemaForAdminValues) =>
      addReservation({
        name: data.name,
        userId: data.userId,
        hotel_name: data.hotel_name,
        check_in: data.check_in,
        check_out: data.check_out,
        reservation_status: data.reservation_status,
        room_type: data.room_type,
        guests: data.guests,
      }),
    onSuccess: (data) => {
      toast({
        description: "successfully added reservation",
        variant: "success",
      });
      queryClient.setQueryData(
        ["all-reservations", filters],
        (oldData: Reservation[] | undefined) => {
          if (!oldData) return [data];
          return [...oldData, data];
        }
      );
      setIsDialogOpen(false);
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

  const updateReservationMutation = useMutation({
    mutationKey: ["updateReservation"],
    mutationFn: (data: Partial<AddNewReservationSchemaForAdminValues>) =>
      updateReservation(item?.id || "", data),
    onSuccess: (data) => {
      toast({
        description: "successfully added reservation",
        variant: "success",
      });
      queryClient.setQueryData(
        ["all-reservations", filters],
        (oldData: Reservation[] | undefined) => {
          if (!oldData) return [];
          return oldData.map((reservation) =>
            reservation.id === item?.id ? data : reservation
          );
        }
      );
      setIsDialogOpen(false);
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
  const onSubmit = (data: AddNewReservationSchemaForAdminValues) => {
    if (item) {
      const payload: UpdateReservationDto = {};
      if (data.name === "" || data.name !== item.name) {
        payload.name = data.name;
      }
      if (data.check_in === "" || data.check_in !== item.check_in) {
        payload.check_in = data.check_in;
      }
      if (data.check_out === "" || data.check_out !== item.check_out) {
        payload.check_out = data.check_out;
      }
      if (data.reservation_status !== item.reservation_status) {
        payload.reservation_status = data.reservation_status;
      }
      if (data.room_type !== item.room_type) {
        payload.room_type = data.room_type;
      }
      if (data.guests !== item.guests) {
        payload.guests = data.guests;
      }

      if (data.hotel_name === "" || data.hotel_name === item.hotel_name) {
        payload.hotel_name = data.hotel_name;
      }
      if (data.userId !== item.userId) {
        payload.userId = data.userId;
      }
      if (Object.keys(payload).length > 0) {
        updateReservationMutation.mutate(payload as UpdateReservationDto);
      }

      //   updateReservationMutation.mutate(data);
    } else {
      addReservationMutation.mutate(data);
    }
  };

  React.useEffect(() => {
    if (item) {
      // Find the user in allUsers that matches the item's userId
      const selectedUser = allUsers?.find((user) => user.id === item.userId);

      form.reset({
        userId: item.userId ?? "",
        hotel_name: item.hotel_name ?? "",
        check_in: item.check_in ?? "",
        check_out: item.check_out ?? "",
        reservation_status:
          item.reservation_status ?? ReservationStatus.PENDING,
        room_type: item.room_type ?? RoomType.SINGLE,
        guests: item.guests ?? 1,
        name: selectedUser?.name ?? item.name ?? "",
      });
    } else {
      form.reset({
        userId: "",
        hotel_name: "",
        check_in: "",
        check_out: "",
        reservation_status: ReservationStatus.PENDING,
        room_type: RoomType.SINGLE,
        guests: 1,
        name: "",
      });
    }
  }, [item, form, allUsers]);

  // States

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-xl w-full max-w-[812px] *:text-white  *:!opacity-100 bg-white dark:bg-black z-50 border">
          <DialogTitle className="flex bg-theme-background-primary dark:bg-theme-background-primary/80 h-[72px] px-8 py-5 items-start w-full absolute z-1 -top-0 text-xl">
            {item ? "Edit Reservation" : "Add New Reservation"}
          </DialogTitle>

          <div className="w-full sm:px-4 px-2  min-h-[300px] !text-theme-text-Body flex flex-col gap-6 mt-[72px] overflow-auto max-h-[80vh] my-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-6 items-start mt-4"
              >
                <div className="flex max-md:flex-col gap-4 items-center justify-center w-full">
                  {/* name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Label
                          htmlFor="name"
                          className="text-theme-inputField-label dark:text-white/90"
                        >
                          Name
                          <span className="text-theme-inputField-error mx-1">
                            *
                          </span>
                        </Label>
                        <FormControl>
                          <Select
                            disabled={isUsersLoading}
                            onValueChange={(userId) => {
                              const selectedUser = allUsers?.find(
                                (user) => user.id === userId
                              );
                              if (selectedUser) {
                                field.onChange(selectedUser.name);
                                form.setValue("userId", selectedUser.id);
                              }
                            }}
                            value={item?.userId || undefined}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select User" />
                            </SelectTrigger>
                            <SelectContent>
                              {allUsers?.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* hotel name */}
                  <FormField
                    control={form.control}
                    name="hotel_name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Label
                          htmlFor="hotel_name"
                          className="text-theme-inputField-label dark:text-white/90"
                        >
                          Hotel name
                          <span className="text-theme-inputField-error mx-1">
                            *
                          </span>
                        </Label>
                        <FormControl>
                          <Input
                            id="hotel_name"
                            type="text"
                            className="form-input rtl:pl-16"
                            placeholder="Enter your hotel name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex max-md:flex-col gap-4 items-center justify-center w-full">
                  {/* check in */}
                  <FormField
                    control={form.control}
                    name="check_in"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Label
                          htmlFor="check_in"
                          className="text-theme-inputField-label dark:text-white/90"
                        >
                          Check in
                        </Label>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* check out */}
                  <FormField
                    control={form.control}
                    name="check_out"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Label
                          htmlFor="check_out"
                          className="text-theme-inputField-label dark:text-white/90"
                        >
                          Check out
                        </Label>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {item && (
                  <div className="flex max-md:flex-col gap-4 items-center justify-start w-full">
                    {/* reservation status */}
                    <FormField
                      control={form.control}
                      name="reservation_status"
                      render={({ field }) => (
                        <FormItem className="w-full md:basis-1/2">
                          <Label
                            htmlFor="reservation_status"
                            className="text-theme-inputField-label"
                          >
                            Reservation status
                            <span className="text-theme-inputField-error mx-1">
                              *
                            </span>
                          </Label>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select reservation status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={ReservationStatus.PENDING}>
                                  Pending
                                </SelectItem>
                                <SelectItem value={ReservationStatus.APPROVED}>
                                  Approved
                                </SelectItem>
                                <SelectItem value={ReservationStatus.CANCELLED}>
                                  Cancelled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="flex max-md:flex-col gap-4 items-center justify-center w-full">
                  {/* room type */}
                  <FormField
                    control={form.control}
                    name="room_type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Label
                          htmlFor="room_type"
                          className="text-theme-inputField-label"
                        >
                          Room type
                          <span className="text-theme-inputField-error mx-1">
                            *
                          </span>
                        </Label>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select room type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={RoomType.SINGLE}>
                                Single
                              </SelectItem>
                              <SelectItem value={RoomType.DOUBLE}>
                                Double
                              </SelectItem>
                              <SelectItem value={RoomType.TRIPLE}>
                                Triple
                              </SelectItem>
                              <SelectItem value={RoomType.SUITE}>
                                Suite
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* guests */}
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Label
                          htmlFor="guests"
                          className="text-theme-inputField-label"
                        >
                          Guests
                          <span className="text-theme-inputField-error mx-1">
                            *
                          </span>
                        </Label>
                        <FormControl>
                          <Input
                            id="guests"
                            type="number"
                            className="form-input rtl:pl-16"
                            placeholder="Enter your guests"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  disabled={
                    addReservationMutation.isPending ||
                    updateReservationMutation.isPending
                  }
                  type="submit"
                  className="w-full h-[56px] font-medium text-base flex items-center gap-2"
                  variant="default"
                >
                  {item ? "Update" : "Add"} Reservation
                  {addReservationMutation.isPending ||
                    (updateReservationMutation.isPending && (
                      <Loader2 className="size-4 animate-spin -mb-1" />
                    ))}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditReservationDialog;
