export type UserInfoType = {
  username: string;
  firstname: string;
  lastname: string;
  nationalid: string;
  gender: number | null;
  nationality: string;
  phoneNumber: string;
  email: string;
  birthdate: string;
  role: string | null;
};

export type UserStateType = {
  user: UserInfoType & { isAuthenticated: null | boolean };
  logout: () => void;
  login: (user: UserInfoType) => void;
  updateUser: (userInfo: UserInfoType) => void;
};
