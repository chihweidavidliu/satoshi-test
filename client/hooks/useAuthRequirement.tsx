import { IUser } from "../types/IUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserType } from "../types/UserType";

export const useAuthRequirement = (
  currentUser: IUser | null,
  userType: UserType
) => {
  const router = useRouter();

  useEffect(() => {
    if (
      !currentUser ||
      (currentUser && userType && currentUser.type !== userType)
    ) {
      router.push("/signin");
    }
  }, []);
};
