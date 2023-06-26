import axios from "axios";
import { getToken } from "@/utils/auth";
// create an axios instance
const service = axios.create({
  baseURL: "/interface/",
  timeout: 1000,
});
// Add a request interceptor
service.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["x-user-token"] = getToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default service;
