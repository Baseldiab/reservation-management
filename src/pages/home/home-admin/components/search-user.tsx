import { memo, useCallback, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import debounce from "lodash.debounce";

// ui imports
import { Input } from "@/components/ui/input";

// icons
import { SearchIcon, X } from "lucide-react";

// api imports
import { User } from "@/api/types/user";

function Search() {
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState("");

  const { data: allUsers = [] } = useQuery<User[]>({
    queryKey: ["users"],
  });

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const filteredUsers = allUsers.filter((user: User) => {
          const searchTerm = value.toLowerCase();
          return (
            user.name?.toLowerCase().includes(searchTerm) ||
            user.email?.toLowerCase().includes(searchTerm)
          );
        });
        queryClient.setQueryData(["users"], filteredUsers);
      }, 300),
    [queryClient, allUsers]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);

      if (!value) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        return;
      }
      debouncedSearch(value);
    },
    [debouncedSearch, queryClient]
  );

  const handleReset = useCallback(() => {
    setSearchValue("");
    queryClient.invalidateQueries({ queryKey: ["users"] });
  }, [queryClient]);

  return (
    <div className="flex-1 min-w-[200px] self-start md:max-w-[400px] relative max-md:!w-full">
      <Input
        value={searchValue}
        onChange={handleSearch}
        className="flex-1 h-[44px] rounded-lg border border-theme-separating-border"
        placeholder="Search User By Name or Email"
      />
      {searchValue ? (
        <button
          onClick={handleReset}
          className="absolute end-10 top-1/2 -translate-y-1/2 hover:opacity-70"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      ) : null}
      <SearchIcon className="absolute end-3 top-1/2 -translate-y-1/2 size-4" />
    </div>
  );
}

export default memo(Search);
