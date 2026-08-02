"use client";

import { useState } from "react";
import { Plus, Trash2, Users, FolderOpen } from "lucide-react";
import { useCategories, useCreateCategory, useDeleteCategory } from "../../../../hooks/useCategories";
import { useAuthStore } from "../../../../store/authStore";
import ShareCategoryModal from "../../../../components/categories/ShareCategoryModal";
import ConfirmDialog from "../../../../components/shared/ConfirmDialog";
import EmptyState from "../../../../components/shared/EmptyState";
import type { CategoryWithMembers } from "../../../../types/category";

const PRESET_COLORS = ["#6366f1", "#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();
  const currentUser = useAuthStore((state) => state.user);

  const [name, setName] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [sharingCategory, setSharingCategory] = useState<CategoryWithMembers | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<CategoryWithMembers | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createCategory.mutate(
      { name: name.trim(), color },
      { onSuccess: () => setName("") }
    );
  };

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-foreground">Categories</h1>

      <form onSubmit={handleCreate} className="mb-8 flex flex-wrap items-center gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
        />

        <div className="flex items-center gap-1.5">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`h-6 w-6 rounded-full transition ${color === c ? "ring-2 ring-offset-2 ring-primary" : ""}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={createCategory.isPending}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          <Plus size={16} />
          Add
        </button>
      </form>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : categories && categories.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const isOwner = category.userId === currentUser?.id;

            return (
              <div
                key={category.id}
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <div>
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                    {!isOwner && <p className="text-xs text-muted-foreground">Shared with you</p>}
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                  {isOwner && (
                    <>
                      <button
                        onClick={() => setSharingCategory(category)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Users size={14} />
                      </button>
                      <button
                        onClick={() => setDeletingCategory(category)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={FolderOpen}
          title="No categories yet"
          description="Add your first category above to start organizing tasks."
        />
      )}

      <ShareCategoryModal category={sharingCategory} onClose={() => setSharingCategory(null)} />

      <ConfirmDialog
        open={!!deletingCategory}
        title="Delete this category?"
        description={
          deletingCategory
            ? `"${deletingCategory.name}" will be deleted. Tasks in it will become uncategorized, not deleted.`
            : ""
        }
        confirmLabel="Delete"
        isLoading={deleteCategory.isPending}
        onConfirm={() => {
          if (!deletingCategory) return;
          deleteCategory.mutate(deletingCategory.id, {
            onSuccess: () => setDeletingCategory(null),
          });
        }}
        onCancel={() => setDeletingCategory(null)}
      />
    </div>
  );
}