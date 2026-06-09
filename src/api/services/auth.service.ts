import type {
  AuthResponse,
  LoginDto,
  RegisterDto,
} from "../../types/auth.types";
import { api } from "../axios";

export const authService = {
  login: async (data: LoginDto) => {
    const response = await api.post("/auth/login", data);

    return response.data;
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    try {
      const response = await api.post("/auth/register", data);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },
};
