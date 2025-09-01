import { createBaseQuery, apiCall } from "@/utils/api";
import { UserInfoType } from "@/utils/types";

// ======================= GET REQUESTS =======================

/**
 * get current user data
 * * used for checking if user is logged in when the app is booting
 * @returns user data query result
 */
export const useSelf = createBaseQuery<UserInfoType, undefined>({
  queryKeyFn: () => ["get-user-details"],
  queryFn: () =>
    apiCall({
      endpoint: "/user/getUserDetails",
      method: "get",
    }),
  options: {
    showToastOnError: true,
  },
});
