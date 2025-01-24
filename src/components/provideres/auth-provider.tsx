//  * @fileoverview AuthProvider component
import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/common/loading";
import { getCurrentProfile } from "@/api/routes/user";
import { secureStorage } from "@/utils/secure-storage";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const storedData = secureStorage.get();
      if (!storedData?.email || !storedData?.password) {
        return null;
      }

      return getCurrentProfile({
        email: storedData.email,
        password: storedData.password,
      })
        .then((data) => {
          return data[0];
        })
        .catch(() => {
          secureStorage.remove();
          return null;
        });
    },

    initialData: () => {
      return secureStorage.get();
    },
    retry: 1,
  });

  if (isLoading) return <Loading />;

  return <>{children}</>;
};

export default AuthProvider;
