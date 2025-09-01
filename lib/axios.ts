import axios from "axios";

// axios instance options
// baseURL: base url for all requests
// withCredentials: send cookies when request cross-origin
export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1`,
  withCredentials: true,
});

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.response.use(
  // if resolved return the response
  (response) => {
    return response;
  },
  // if rejected return the error
  (error) => {
    const responseError = error.response;
    // if error is 401 = unauthorized and remove the token
    if (responseError?.status === 401) {
      localStorage.removeItem("isLoggedIn");
    }
    // error status is not 401 and return the error
    // this will be handled in the components
    // and will show the error message
    return error;
  }
);
