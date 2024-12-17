export enum UserRole {
  STUDENT = "STUDENT",
  PROFESSIONAL = "PROFESSIONAL",
  COUNSELOR = "COUNSELOR",
}

export interface User {
  id?: number;
  email: string;
  name?: string;
  role: UserRole;
}

export interface SignupFormData {
  email: string;
  password: string;
  name?: string;
  role: UserRole;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthApisResponse {
  accessToken: string;
  data: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}
