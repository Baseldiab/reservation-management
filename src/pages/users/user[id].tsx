import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// api
import { getUserById } from "@/api/routes/user";
import { User } from "@/api/types/user";

// components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import UserReservationsTable from "@/pages/users/user-reservation/components/user-reservation-table";

export default function UserDetailsPage() {
  const { id } = useParams();

  const { data: user } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id,
  });

  return (
    <>
      <section className="w-full bg-transparent rounded-3xl p-6 flex flex-col gap-6 container">
        <h1 className="font-bold font-sans -mt-2 text-2xl max-md:w-full">
          {user?.name}
        </h1>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <DetailsItem label={"Username"} value={user?.name ?? "Not set"} />
          <DetailsItem label={"Email"} value={user?.email || "Not set"} />
          <DetailsItem
            label={"Phone"}
            value={user?.phone_number || "Not set"}
          />
          <DetailsItem label={"Status"} value={user?.gender || "Not set"} />
          <DetailsItem
            label={"Address City"}
            value={user?.address_city || "Not set"}
          />
          <DetailsItem
            label={"Address Country"}
            value={user?.address_country || "Not set"}
          />
        </div>
      </section>

      <Separator className="my-4 shadow-2xl" />
      <UserReservationsTable />
    </>
  );
}

const DetailsItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="email" className="text-theme-inputField-label">
        {label}
        <span className="text-theme-inputField-error mx-1">*</span>
      </Label>
      <Input
        type="text"
        className="form-input rtl:pl-16"
        value={value}
        disabled
      />
    </div>
  );
};
