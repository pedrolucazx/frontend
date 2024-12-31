import { reactive, toRefs } from "vue";
import { authManager } from "@/services/authManager";

export function useSession() {
  const state = reactive({
    session: null as any | null,
    isAuth: false,
  });

  try {
    const { user } = authManager.get();

    if (user) {
      state.session = JSON.parse(user);
      state.isAuth = true;
    }
  } catch (error) {
    console.error(error);
    state.isAuth = false;
  }

  return toRefs(state);
}

export function getSession() {
  try {
    const { user } = authManager.get();

    if (user) {
      return {
        session: JSON.parse(user),
        isAuth: true,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return { session: null, isAuth: false };
}
