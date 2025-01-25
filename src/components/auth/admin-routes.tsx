// react query imports
import { useQuery } from "@tanstack/react-query";

// react router dom imports
import { Navigate, Outlet } from "react-router-dom";

// components imports
import Loading from "@/components/common/loading";
import { User } from "@/api/types/user";
import { UserType } from "@/api/enums/enums";

const AdminRoute = () => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user"],
    retry: 1,
  });
  if (isLoading) return <Loading />;
  return user?.user_type === UserType.ADMIN ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
