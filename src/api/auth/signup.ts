import { api } from "../../services/api";
import { AuthApisResponse, SignupFormData } from "../../types/user";

export const signupApi = (payload: SignupFormData) => {
  return api.post<AuthApisResponse, AuthApisResponse>(
    "/auth/register/",
    payload
  );
};
