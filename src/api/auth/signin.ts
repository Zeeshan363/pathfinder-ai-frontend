import { api } from "../../services/api";
import { AuthApisResponse, LoginFormData } from "../../types/user";

export const signinApi = (payload: LoginFormData) => {
  return api.post<AuthApisResponse, AuthApisResponse>("/auth/login", payload);
};
