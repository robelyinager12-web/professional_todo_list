"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as userApi from "../../lib/api/user";
import { useAuthStore } from "../../store/authStore";

export default function DeleteAccount() {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const deleteAccount = useMutation({
    mutationFn: userApi.deleteAccount,
    onSuccess: () => {
      clearAuth();
      toast.success("Account deleted");
      router.push("/");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not delete account");
    },
  });

  return (
    <div className="max-w-md rounded-xl border border-destructive/30 bg-destructive/5 p-6">
      <h2 className="text-sm font-semibold text-destructive">Delete Account</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        This permanently deletes your account and all your tasks. This cannot be undone.
      </p>

      {confirming ? (
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => deleteAccount.mutate()}
            disabled={deleteAccount.isPending}
            className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {deleteAccount.isPending ? "Deleting..." : "Yes, delete my account"}
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="mt-4 rounded-lg border border-destructive/40 px-4 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/10"
        >
          Delete my account
        </button>
      )}
    </div>
  );
}