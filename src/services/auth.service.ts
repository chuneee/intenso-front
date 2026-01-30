import type { User } from "@/types";
import { http } from "@/services/http";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  token?: string;
};

export const authService = {
  // Placeholder para la integracion real
  // Cuando conectemos el backend, esto debe apuntar a /auth/login (o similar)
  login(payload: LoginRequest) {
    return http.post<LoginResponse>("/auth/login", payload);
  },

  me() {
    return http.get<User>("/auth/me");
  },
} as const;
