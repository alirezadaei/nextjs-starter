"use client";

import { AntDesignProvider } from "./ant-design";
import { ReactQueryProvider } from "./react-query";
import { UserProvider } from "./user-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AntDesignProvider>
      <ReactQueryProvider>
        <UserProvider>{children}</UserProvider>
      </ReactQueryProvider>
    </AntDesignProvider>
  );
};
