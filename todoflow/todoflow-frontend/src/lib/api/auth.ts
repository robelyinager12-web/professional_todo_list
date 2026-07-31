import api from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatarUrl?: string | null;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export async function loginRequest(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function registerRequest(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function fetchMe(): Promise<{ user: AuthUser }> {
  const { data } = await api.get<{ user: AuthUser }>("/auth/me");
  return data;
}