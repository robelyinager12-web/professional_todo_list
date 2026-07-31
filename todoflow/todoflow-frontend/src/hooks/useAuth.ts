import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginRequest, registerRequest } from "../lib/api/auth";
import type { LoginPayload, RegisterPayload } from "../lib/api/auth";
import { useAuthStore } from "../store/authStore";

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginRequest(payload),
    onSuccess: ({ token, user }) => {
      setAuth(user, token);
      toast.success(`Welcome back, ${user.fullName}!`);
      router.push("/dashboard");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Login failed. Check your email and password.");
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerRequest(payload),
    onSuccess: ({ token, user }) => {
      setAuth(user, token);
      toast.success(`Welcome to TodoFlow, ${user.fullName}!`);
      router.push("/dashboard");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    },
  });
}