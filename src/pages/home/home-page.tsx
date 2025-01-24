// components home page
import UsersTable from "@/pages/home/components/users-table";
import UserForm from "./components/user-form";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <>
      <UserForm />

      <Separator className="my-4 shadow-2xl" />
      <UsersTable />
    </>
  );
}
