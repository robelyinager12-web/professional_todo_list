import api from "./axios";
import type { AuthUser } from "./auth";

export interface UpdateProfilePayload {
  fullName?: string;
  username?: string;
  darkMode?: boolean;
  language?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<AuthUser> {
  const { data } = await api.patch<{ user: AuthUser }>("/users/me", payload);
  return data.user;
}

export async function changePassword(payload: ChangePasswordPayload): Promise<void> {
  await api.patch("/users/me/password", payload);
}

export async function uploadAvatar(file: File): Promise<AuthUser> {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await api.post<{ user: AuthUser }>("/users/me/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.user;
}

export async function deleteAccount(): Promise<void> {
  await api.delete("/users/me");
}