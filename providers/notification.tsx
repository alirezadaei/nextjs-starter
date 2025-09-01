"use client";

import React, { createContext, useContext } from "react";
import { notification } from "antd";

import type { NotificationInstance } from "antd/es/notification/interface";
const NotificationContext = createContext<NotificationInstance | null>(null);

type NotificationProviderProps = {
  children: React.ReactNode;
};

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [api, contextHolder] = notification.useNotification();
  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};
