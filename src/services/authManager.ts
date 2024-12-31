import { AUTH_MANAGER_KEYS } from "@/config/constants";

export const authManager = {
  set: async (user: any) => {
    try {
      sessionStorage.setItem(
        AUTH_MANAGER_KEYS.USER,
        JSON.stringify(user || "")
      );
      return true;
    } catch {
      return false;
    }
  },

  get: () => {
    const user = sessionStorage.getItem(AUTH_MANAGER_KEYS.USER);
    return { user };
  },

  clear: async () => {
    sessionStorage.removeItem(AUTH_MANAGER_KEYS.USER);
  },
};
