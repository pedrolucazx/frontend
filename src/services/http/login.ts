import { api } from ".";
import { ENDPOINTS } from "./endpoints";

export interface LoginRequest {
  email: string;
  password: string;
}
export const login = async ({
  email,
  password,
}: LoginRequest): Promise<any> => {
  const response = await api.post(ENDPOINTS.login, {
    email,
    password,
  });
  return response?.data;
};

export const passwordRecovery = async (email: string) => {
  const response = await api.post(ENDPOINTS.passwordRecovery, {
    email,
  });
  return response?.data;
};
