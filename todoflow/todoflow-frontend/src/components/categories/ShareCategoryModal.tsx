"use client";

import { useState } from "react";
import { X, Users, Trash2 } from "lucide-react";
import { useShareCategory, useRemoveMember } from "../../hooks/useCategories";
import type { CategoryWithMembers } from "../../types/category";

interface ShareCategoryModalProps {
  category: CategoryWithMembers | null;
  onClose: () => void;
}

export default function ShareCategoryModal({ category, onClose }: ShareCategoryModalProps) {
  const [email, setEmail] = useState("");
  const shareCategory = useShareCategory();
  const removeMember = useRemoveMember();

  if (!category) return null;

  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    shareCategory.mutate(
      { categoryId: category.id, email: email.trim() },
      { onSuccess: () => setEmail("") }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Users size={18} />
            Share &ldquo;{category.name}&rdquo;
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleShare} className="mb-5 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="teammate@example.com"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
          />
          <button
            type="submit"
            disabled={shareCategory.isPending}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            Invite
          </button>
        </form>

        <p className="mb-2 text-xs font-medium text-muted-foreground">People with access</p>
        <div className="space-y-2">
          {category.user && (
            <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
              <span className="text-sm text-foreground">{category.user.fullName}</span>
              <span className="text-xs text-muted-foreground">Owner</span>
            </div>
          )}

          {category.members?.map((member) => (
            <div key={member.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
              <div>
                <p className="text-sm text-foreground">{member.user.fullName}</p>
                <p className="text-xs text-muted-foreground">{member.user.email}</p>
              </div>
              <button
                onClick={() => removeMember.mutate({ categoryId: category.id, userId: member.user.id })}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          {(!category.members || category.members.length === 0) && (
            <p className="text-sm text-muted-foreground">Not shared with anyone yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}