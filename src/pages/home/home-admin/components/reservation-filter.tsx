import { memo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// assets imports
import FiltersIcon from "@/components/icons/filters-icon";
import { X } from "lucide-react";

// ui imports
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// api imports
import { ReservationFilterParams } from "@/api/types/reservation";
import { ReservationStatus } from "@/api/enums/enums";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

function FilterReservations() {
  const queryClient = useQueryClient();

  const { data: filters } = useQuery<ReservationFilterParams>({
    queryKey: ["all-reservations-filters"],
  });

  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const [checkIn, setCheckIn] = useState<string | null>(
    filters?.check_in ?? null
  );
  const [checkOut, setCheckOut] = useState<string | null>(
    filters?.check_out ?? null
  );
  const [reservationStatus, setReservationStatus] =
    useState<ReservationStatus | null>(filters?.reservation_status ?? null);
  const [hotelName, setHotelName] = useState<string | null>(
    filters?.hotel_name ?? null
  );
  const [name, setName] = useState<string | null>(filters?.name ?? null);

  // pass only setFIlters to the parent
  const handleFiltersApply = () => {
    queryClient.setQueryData(["all-reservations-filters"], {
      ...filters,
      ...(checkIn && { check_in: checkIn }),
      ...(checkOut && { check_out: checkOut }),
      ...(reservationStatus && { reservation_status: reservationStatus }),
      ...(hotelName && { hotel_name: hotelName }),
      ...(name && { name }),
    });
    setFiltersOpen(false);
  };

  const handleFiltersReset = () => {
    setCheckIn(null);
    setCheckOut(null);
    setReservationStatus(null);
    setHotelName(null);
    setName(null);
    queryClient.setQueryData(["all-reservations-filters"], {});
    queryClient.invalidateQueries({
      queryKey: ["all-reservations"],
      exact: false,
    });
    setFiltersOpen(false);
  };

  return (
    <div className="flex  items-center gap-4">
      {/* filter by */}
      <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center text-sm font-medium text-theme-icon-grey gap-2 p-0 h-[44px] w-[115px] border-theme-separating-border rounded-lg"
          >
            <FiltersIcon className="size-4 -mb-1" />
            <span className="-mt-0.5">Filter by</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={"start"}
          className="w-[276px] rounded-lg flex flex-col gap-4 p-4 items-center justify-center px-3"
        >
          <div className="w-full flex items-center justify-between">
            <p> Filter by </p>
            <button onClick={() => setFiltersOpen(false)}>
              <X className="size-4" />
            </button>
          </div>

          <div className="w-full items-center justify-start flex flex-col gap-2  max-h-[35vh] overflow-y-scroll">
            {/* Hotel Name */}
            <div className="w-full flex flex-col gap-2">
              <p className="text-theme-text-fifthTitle font-medium text-sm">
                Hotel Name
              </p>
              <Input
                type="text"
                value={hotelName || ""}
                onChange={(e) => setHotelName(e.target.value)}
                className="w-[95%] h-9"
              />
            </div>

            {/* user name */}
            <div className="w-full flex flex-col gap-2">
              <p className="text-theme-text-fifthTitle font-medium text-sm">
                User Name
              </p>
              <Input
                type="text"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                className="w-[95%] h-9"
              />
            </div>

            {/* reservation status */}
            <div className="w-full flex flex-col gap-2">
              <p className="text-theme-text-fifthTitle font-medium text-sm">
                Reservation Status
              </p>
              <Select
                value={reservationStatus || ""}
                onValueChange={(value) =>
                  setReservationStatus(value as ReservationStatus)
                }
              >
                <SelectTrigger
                  className="w-[95%] h-9"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ReservationStatus.APPROVED}>
                    Approved
                  </SelectItem>
                  <SelectItem value={ReservationStatus.PENDING}>
                    Pending
                  </SelectItem>
                  <SelectItem value={ReservationStatus.CANCELLED}>
                    Cancelled
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* check in */}
            <div className="w-full flex flex-col gap-2">
              <p className="text-theme-text-fifthTitle font-medium text-sm">
                Check In
              </p>
              <Input
                type="date"
                value={checkIn || ""}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>

            {/* check out */}
            <div className="w-full flex flex-col gap-2">
              <p className="text-theme-text-fifthTitle font-medium text-sm">
                Check Out
              </p>
              <Input
                type="date"
                value={checkOut || ""}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-[18px]">
            <Button onClick={handleFiltersApply} className="h-[44px] w-[112px]">
              Apply
            </Button>
            <Button
              variant="outline"
              onClick={handleFiltersReset}
              className="h-[44px] w-[112px]"
            >
              Reset
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default memo(FilterReservations);
