import api from "./axios";
import type { CategoryWithMembers, CategoryMember } from "../../types/category";

export interface CategoryInput {
  name: string;
  color?: string;
}

export async function fetchCategories(): Promise<CategoryWithMembers[]> {
  const { data } = await api.get<{ categories: CategoryWithMembers[] }>("/categories");
  return data.categories;
}

export async function createCategory(input: CategoryInput): Promise<CategoryWithMembers> {
  const { data } = await api.post<{ category: CategoryWithMembers }>("/categories", input);
  return data.category;
}

export async function updateCategory(id: string, input: Partial<CategoryInput>): Promise<CategoryWithMembers> {
  const { data } = await api.patch<{ category: CategoryWithMembers }>(`/categories/${id}`, input);
  return data.category;
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`/categories/${id}`);
}

export async function shareCategory(categoryId: string, email: string): Promise<CategoryMember> {
  const { data } = await api.post<{ member: CategoryMember }>(`/categories/${categoryId}/share`, { email });
  return data.member;
}

export async function removeMember(categoryId: string, userId: string): Promise<void> {
  await api.delete(`/categories/${categoryId}/members/${userId}`);
}