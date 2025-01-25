// react query imports
import { useQuery } from "@tanstack/react-query";

// react router dom imports
import { Navigate, Outlet } from "react-router-dom";

// components imports
import Loading from "@/components/common/loading";

const UnauthedRoute = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    retry: 1,
  });
  if (isLoading) return <Loading />;
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default UnauthedRoute;
