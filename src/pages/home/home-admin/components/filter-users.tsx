import { memo, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// ui imports
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// api imports
import { User } from "@/api/types/user";

function FilterUsers() {
  const queryClient = useQueryClient();

  const { data: allUsers = [] } = useQuery<User[]>({
    queryKey: ["users"],
  });

  const handleSort = useCallback(
    (value: string) => {
      const sortedUsers = [...allUsers].sort((a, b) => {
        const aValue =
          value === "name" ? a.name?.toLowerCase() : a.email?.toLowerCase();
        const bValue =
          value === "name" ? b.name?.toLowerCase() : b.email?.toLowerCase();
        return aValue && bValue ? aValue.localeCompare(bValue) : 0;
      });
      queryClient.setQueryData(["users"], sortedUsers);
    },
    [allUsers, queryClient]
  );

  return (
    <div className="flex gap-4 flex-1 min-w-[200px] self-start md:max-w-[400px] relative max-md:!w-full">
      <Select onValueChange={handleSort}>
        <SelectTrigger className="flex-1 h-[44px]">
          <SelectValue placeholder="Sort by Name or Email" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="email">Email</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default memo(FilterUsers);
