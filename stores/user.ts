import { create } from "zustand";

import { UserInfoType, UserStateType } from "@/utils/types";

export const useUserStore = create<UserStateType>()((set) => ({
  user: {
    username: "",
    firstname: "",
    lastname: "",
    nationalid: "",
    gender: null,
    nationality: "",
    phoneNumber: "",
    email: "",
    birthdate: "",
    isAuthenticated: null,
    role: null,
  },
  logout: () => {
    set({
      user: {
        username: "",
        firstname: "",
        lastname: "",
        nationalid: "",
        gender: null,
        nationality: "",
        phoneNumber: "",
        email: "",
        birthdate: "",
        isAuthenticated: false,
        role: null,
      },
    });
  },
  login: (user: UserInfoType) =>
    set({
      user: {
        ...user,
        isAuthenticated: true,
      },
    }),
  updateUser: (userInfo: UserInfoType) =>
    set({
      user: {
        ...userInfo,
        isAuthenticated: true,
      },
    }),
}));
