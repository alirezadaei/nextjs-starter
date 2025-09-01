"use client";

import { App as AntdApp, ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import faIR from "antd/locale/fa_IR";
import "@ant-design/v5-patch-for-react-19";
import { NotificationProvider } from "./notification";

export const AntDesignProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ConfigProvider
      direction={"rtl"}
      locale={faIR}
      theme={{
        hashed: false,
        token: {
          colorPrimary: "#06b6d4",
        },
      }}
    >
      <AntdRegistry>
        <AntdApp>
          <NotificationProvider>{children}</NotificationProvider>
        </AntdApp>
      </AntdRegistry>
    </ConfigProvider>
  );
};
