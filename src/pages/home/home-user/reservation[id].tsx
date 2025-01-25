import { useParams } from "react-router-dom";
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
import {
  getReservationById,
  updateReservation,
} from "@/api/routes/reservation";

// enum
import { ReservationStatus, RoomType } from "@/api/enums/enums";

// ui imports
import { Button } from "@/components/ui/button";
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
import { CircleX, Loader2 } from "lucide-react";
import Loading from "@/components/common/loading";
import NoData from "@/components/common/noData";

type AddNewReservationSchemaForAdminValues = z.infer<
  typeof AddNewReservationSchemaForAdmin
>;

const AdminReservationDetailsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { data: item, isLoading: isReservationLoading } = useQuery({
    queryKey: ["reservation", id],
    queryFn: () => getReservationById(id as string),
    enabled: !!id,
  });

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

  const updateReservationMutation = useMutation({
    mutationKey: ["updateReservation"],
    mutationFn: (data: Partial<AddNewReservationSchemaForAdminValues>) =>
      updateReservation(item?.id || "", data),
    onSuccess: (data) => {
      toast({
        description: "successfully added reservation",
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
      const payload: UpdateReservationDto = {
        name: item.name,
        userId: item.userId,
      };

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

      if (Object.keys(payload).length > 0) {
        updateReservationMutation.mutate(payload as UpdateReservationDto);
      }
    }
  };

  React.useEffect(() => {
    if (item) {
      form.reset({
        userId: item.userId,
        hotel_name: item.hotel_name,
        check_in: item.check_in,
        check_out: item.check_out,
        reservation_status: item.reservation_status,
        room_type: item.room_type,
        guests: item.guests,
        name: item.name,
      });
    }
  }, [item, form]);

  // States
  if (isReservationLoading) return <Loading />;

  return (
    <div className="w-full min-h-screen p-6">
      <div className="w-full max-w-[812px] mx-auto bg-white dark:bg-black rounded-xl border p-6">
        {!item ? (
          <>
            <NoData
              title="Reservation not found"
              icon={<CircleX className="size-10" />}
            />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-6">Reservation Details</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-6 items-start"
              >
                <div className="flex max-md:flex-col gap-4 items-center justify-center w-full">
                  {/* name */}
                  <h3 className="text-lg font-semibold">{item.name}</h3>

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
                              disabled={
                                field.value !== ReservationStatus.PENDING
                              }
                            >
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select reservation status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  value={ReservationStatus.PENDING}
                                  disabled={
                                    field.value !== ReservationStatus.PENDING
                                  }
                                >
                                  Pending
                                </SelectItem>
                                <SelectItem
                                  value={ReservationStatus.CANCELLED}
                                  disabled={
                                    field.value !== ReservationStatus.PENDING
                                  }
                                >
                                  Cancelled
                                </SelectItem>
                                <SelectItem
                                  value={ReservationStatus.APPROVED}
                                  disabled={true}
                                >
                                  Approved
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

                {/* Update Submit Button */}
                <Button
                  disabled={updateReservationMutation.isPending}
                  type="submit"
                  className="w-full h-[56px] font-medium text-base flex items-center gap-2"
                  variant="default"
                >
                  Update Reservation
                  {updateReservationMutation.isPending && (
                    <Loader2 className="size-4 animate-spin -mb-1" />
                  )}
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminReservationDetailsPage;
