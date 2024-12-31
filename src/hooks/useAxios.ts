import Axios, { type AxiosInstance } from "axios";
import { authManager } from "@/services/authManager";

export default function useAxios(baseURL: string): AxiosInstance {
  const axios = Axios.create({
    baseURL,
  });

  axios.interceptors.request.use(
    (config) => {
      const { user } = authManager.get();
      const token = user ? JSON.parse(user)?.token : null;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return axios;
}
