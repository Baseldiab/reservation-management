import { memo, useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import debounce from "lodash.debounce";

// ui imports
import { Input } from "@/components/ui/input";

// icons
import { SearchIcon, X } from "lucide-react";

function Search() {
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState("");

  const debouncedSetQuery = useCallback(
    (value: string) => {
      debounce((searchValue: string) => {
        queryClient.setQueryData(["all-users-search"], searchValue);
      }, 500)(value);
    },
    [queryClient]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSetQuery(value);
  };

  const handleReset = useCallback(() => {
    setSearchValue("");
    queryClient.setQueryData(["all-users-search"], "");
    queryClient.invalidateQueries({
      queryKey: ["all-users"],
      exact: false,
    });
  }, [queryClient]);

  return (
    <div className="flex-1 min-w-[200px] self-start md:max-w-[400px] relative max-md:!w-full">
      <Input
        defaultValue={queryClient.getQueryData(["all-users-search"]) as string}
        value={searchValue}
        onChange={handleSearch}
        className="flex-1 h-[44px] rounded-lg border border-theme-separating-border "
        placeholder="Search User"
      />
      {searchValue !== "" ? (
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
