"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileSchema, type ProfileFormValues } from "../../lib/validations/settingsSchema";
import { useAuthStore } from "../../store/authStore";
import * as userApi from "../../lib/api/user";

export default function ProfileSettings() {
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const token = useAuthStore((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: {
      fullName: user?.fullName ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
    },
  });

  const updateProfile = useMutation({
    mutationFn: (values: ProfileFormValues) =>
      userApi.updateProfile({ fullName: values.fullName, username: values.username }),
    onSuccess: (updatedUser) => {
      if (token) setAuth(updatedUser, token);
      toast.success("Profile updated");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not update profile");
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => updateProfile.mutate(values))}
      className="max-w-md space-y-4 rounded-xl border border-border bg-card p-6"
    >
      <h2 className="text-sm font-semibold text-foreground">Profile</h2>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
        <input
          {...register("fullName")}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
        />
        {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Username</label>
        <input
          {...register("username")}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
        />
        {errors.username && <p className="mt-1 text-xs text-destructive">{errors.username.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
        <input
          {...register("email")}
          disabled
          className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-muted-foreground outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={updateProfile.isPending}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {updateProfile.isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}