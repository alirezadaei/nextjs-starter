"use client";

import { Fragment, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useSelf } from "@/hooks/query";
import { useUserStore } from "@/stores/user";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending, isSuccess, isError } = useSelf();
  const {
    login,
    logout,
    user: { isAuthenticated },
  } = useUserStore((state) => state);

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      login(data);
      router.replace("/dashboard");
    }
    if (isError) {
      logout();
      router.replace("/login");
    }
  }, [isSuccess, isError]);

  if (isPending || isAuthenticated === null) {
    return "...loading";
  }

  return <Fragment>{children}</Fragment>;
};
