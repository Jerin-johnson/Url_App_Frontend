import { create } from "zustand";
import type { User } from "../types/auth.types";

interface AuthState {
  user: User | null;
  accessToken: string | null;

  login: (user: User, accessToken: string) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken"),

  login: (user, accessToken) => {
    console.log("Storing access token:", accessToken, user);
    localStorage.setItem("accessToken", accessToken);

    set({
      user,
      accessToken,
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");

    set({
      user: null,
      accessToken: null,
    });
  },
}));
