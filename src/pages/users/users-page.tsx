// components home page
import UsersTable from "@/pages/users/components/users-table";
import { Separator } from "@/components/ui/separator";

export default function UsersPage() {
  return (
    <>
      {/* <UserForm /> */}

      <Separator className="my-4 shadow-2xl" />
      <UsersTable />
    </>
  );
}
