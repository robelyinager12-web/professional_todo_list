import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as categoryApi from "../lib/api/categories";
import type { CategoryInput } from "../lib/api/categories";

const CATEGORIES_KEY = ["categories"];

export function useCategories() {
  return useQuery({
    queryKey: CATEGORIES_KEY,
    queryFn: categoryApi.fetchCategories,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CategoryInput) => categoryApi.createCategory(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      toast.success("Category created");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not create category");
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<CategoryInput> }) =>
      categoryApi.updateCategory(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      toast.success("Category updated");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not update category");
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      toast.success("Category deleted");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not delete category");
    },
  });
}

export function useShareCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, email }: { categoryId: string; email: string }) =>
      categoryApi.shareCategory(categoryId, email),
    onSuccess: (member) => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      toast.success(`Shared with ${member.user.fullName}`);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not share category");
    },
  });
}

export function useRemoveMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, userId }: { categoryId: string; userId: string }) =>
      categoryApi.removeMember(categoryId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
      toast.success("Access removed");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not remove access");
    },
  });
}