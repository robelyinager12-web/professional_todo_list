"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema, type LoginFormValues } from "../../lib/validations/authSchema";
import { useLogin } from "../../hooks/useAuth";

export default function LoginForm() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:ring-2"
        />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password
          </label>
          <Link href="/forgot-password" className="text-xs text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:ring-2"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <input type="checkbox" className="rounded border-border" />
        Remember me
      </label>

      <button
        type="submit"
        disabled={login.isPending}
        className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {login.isPending ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}