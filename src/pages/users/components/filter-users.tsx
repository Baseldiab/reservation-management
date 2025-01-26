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
import { Gender, UserType } from "@/api/enums/enums";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { UserFilterParams } from "@/api/types/user";

function FilterUsers() {
  const queryClient = useQueryClient();

  const { data: filters } = useQuery<UserFilterParams>({
    queryKey: ["all-users-filters"],
  });

  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const [name, setName] = useState<string | null>(filters?.name ?? null);
  const [addressCity, setAddressCity] = useState<string | null>(
    filters?.address_city ?? null
  );
  const [addressCountry, setAddressCountry] = useState<string | null>(
    filters?.address_country ?? null
  );

  const [gender, setGender] = useState<Gender | null>(filters?.gender ?? null);
  const [userType, setUserType] = useState<UserType | null>(
    filters?.user_type ?? null
  );

  // pass only setFIlters to the parent
  const handleFiltersApply = () => {
    queryClient.setQueryData(["all-users-filters"], {
      ...filters,
      ...(name && { name }),
      ...(gender && { gender }),
      ...(addressCity && { address_city: addressCity }),
      ...(addressCountry && { address_country: addressCountry }),
      ...(userType && { user_type: userType }),
    });
    setFiltersOpen(false);
  };

  const handleFiltersReset = () => {
    setGender(null);
    setAddressCity(null);
    setAddressCountry(null);
    setUserType(null);
    setName(null);
    queryClient.setQueryData(["all-users-filters"], {});
    queryClient.invalidateQueries({
      queryKey: ["all-users"],
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
            {/*  Name */}
            <div className="w-full flex flex-col gap-2">
              <p className="text-theme-text-fifthTitle font-medium text-sm">
                Name
              </p>
              <Input
                type="text"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                className="w-[95%] h-9"
              />
            </div>

            {/* Address City */}
            <div className="w-full flex flex-col gap-2">
              <p className="text-theme-text-fifthTitle font-medium text-sm">
                Address City
              </p>
              <Input
                type="text"
                value={addressCity || ""}
                onChange={(e) => setAddressCity(e.target.value)}
                className="w-[95%] h-9"
              />
            </div>

            {/* Address Country */}
            <div className="w-full flex flex-col gap-2">
              <p className="text-theme-text-fifthTitle font-medium text-sm">
                Address Country
              </p>
              <Input
                type="text"
                value={addressCountry || ""}
                onChange={(e) => setAddressCountry(e.target.value)}
                className="w-[95%] h-9"
              />
            </div>

            {/* User Type */}
            <div className="w-full flex flex-col gap-2">
              <p className="text-theme-text-fifthTitle font-medium text-sm">
                User Type
              </p>
              <Select
                value={userType || ""}
                onValueChange={(value) => setUserType(value as UserType)}
              >
                <SelectTrigger className="w-[95%] h-9">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserType.ADMIN}>Admin</SelectItem>
                  <SelectItem value={UserType.USER}>User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div className="w-full flex flex-col gap-2">
              <p className="text-theme-text-fifthTitle font-medium text-sm">
                Gender
              </p>
              <Select
                value={gender || ""}
                onValueChange={(value) => setGender(value as Gender)}
              >
                <SelectTrigger className="w-[95%] h-9">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Gender.MALE}>Male</SelectItem>
                  <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                </SelectContent>
              </Select>
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

export default memo(FilterUsers);
