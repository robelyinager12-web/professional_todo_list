"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema, type RegisterFormValues } from "../../lib/validations/authSchema";
import { useRegister } from "../../hooks/useAuth";

export default function RegisterForm() {
  const registerUser = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, acceptTerms, ...payload } = data;
    registerUser.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
      <div>
        <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-foreground">
          Full Name
        </label>
        <input
          id="fullName"
          placeholder="Jane Doe"
          {...register("fullName")}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:ring-2"
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-foreground">
          Username
        </label>
        <input
          id="username"
          placeholder="janedoe"
          {...register("username")}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:ring-2"
        />
        {errors.username && (
          <p className="mt-1 text-xs text-destructive">{errors.username.message}</p>
        )}
      </div>

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
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
          Password
        </label>
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

      <div>
        <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-foreground">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:ring-2"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input type="checkbox" {...register("acceptTerms")} className="mt-0.5 rounded border-border" />
        <span>
          I agree to the{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </span>
      </label>
      {errors.acceptTerms && (
        <p className="text-xs text-destructive">{errors.acceptTerms.message}</p>
      )}

      <button
        type="submit"
        disabled={registerUser.isPending}
        className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {registerUser.isPending ? "Creating account..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}