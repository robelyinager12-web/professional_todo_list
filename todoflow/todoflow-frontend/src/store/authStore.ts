import { create } from "zustand";
import type { AuthUser } from "../lib/api/auth";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("todoflow_token", token);
    }
    set({ user, token });
  },
  clearAuth: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("todoflow_token");
    }
    set({ user: null, token: null });
  },
}));