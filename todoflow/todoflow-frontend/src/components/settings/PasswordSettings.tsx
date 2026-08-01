"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { passwordSchema, type PasswordFormValues } from "../../lib/validations/settingsSchema";
import * as userApi from "../../lib/api/user";

export default function PasswordSettings() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const changePassword = useMutation({
    mutationFn: (values: PasswordFormValues) =>
      userApi.changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword }),
    onSuccess: () => {
      toast.success("Password updated");
      reset();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not update password");
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => changePassword.mutate(values))}
      className="max-w-md space-y-4 rounded-xl border border-border bg-card p-6"
    >
      <h2 className="text-sm font-semibold text-foreground">Password</h2>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Current Password</label>
        <input
          type="password"
          {...register("currentPassword")}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
        />
        {errors.currentPassword && (
          <p className="mt-1 text-xs text-destructive">{errors.currentPassword.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">New Password</label>
        <input
          type="password"
          {...register("newPassword")}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
        />
        {errors.newPassword && <p className="mt-1 text-xs text-destructive">{errors.newPassword.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Confirm New Password</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={changePassword.isPending}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {changePassword.isPending ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}