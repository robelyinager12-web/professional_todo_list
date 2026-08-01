"use client";

import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Camera } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import * as userApi from "../../lib/api/user";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/api$/, "");

export default function AvatarUpload() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useMutation({
    mutationFn: (file: File) => userApi.uploadAvatar(file),
    onSuccess: (updatedUser) => {
      if (token) setAuth(updatedUser, token);
      toast.success("Avatar updated");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not upload avatar");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload.mutate(file);
  };

  const avatarSrc = user?.avatarUrl ? `${API_BASE}${user.avatarUrl}` : null;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
      <div className="relative">
        {avatarSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarSrc} alt="Avatar" className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
            {user?.fullName?.charAt(0).toUpperCase() ?? "U"}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Profile Photo</p>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={upload.isPending}
          className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline disabled:opacity-60"
        >
          <Camera size={14} />
          {upload.isPending ? "Uploading..." : "Change photo"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}