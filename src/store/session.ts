// stores/session.ts
import { defineStore } from "pinia";
import { authManager } from "../services/authManager";

export const useSessionStore = defineStore("session", {
  state: () => ({
    session: null as any | null,
    isAuth: false,
  }),

  actions: {
    loadSession() {
      try {
        const { user } = authManager.get();
        if (user) {
          this.session = JSON.parse(user);
          this.isAuth = true;
        }
      } catch {
        this.session = null;
        this.isAuth = false;
      }
    },

    async setSession(sessionData: any) {
      await authManager.set(sessionData);
      this.session = sessionData;
      this.isAuth = true;
    },

    async clearSession() {
      await authManager.clear();
      this.session = null;
      this.isAuth = false;
    },
  },
});
