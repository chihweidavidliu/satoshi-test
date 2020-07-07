import { IUser } from "../types/IUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserType } from "../types/UserType";

export const useAuthRequirement = (
  currentUser: IUser | null,
  userType: UserType
) => {
  const router = useRouter();

  const [isAuthValid, setIsAuthValid] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.push("/signin");
    } else if (currentUser && userType && currentUser.type !== userType) {
      router.push("/dashboard");
    } else {
      setIsAuthValid(true);
    }
  }, []);

  return isAuthValid;
};
