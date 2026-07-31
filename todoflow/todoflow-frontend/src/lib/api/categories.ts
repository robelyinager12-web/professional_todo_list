import api from "./axios";
import type { Category } from "../../types/task";

export interface CategoryInput {
  name: string;
  color?: string;
}

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get<{ categories: Category[] }>("/categories");
  return data.categories;
}

export async function createCategory(input: CategoryInput): Promise<Category> {
  const { data } = await api.post<{ category: Category }>("/categories", input);
  return data.category;
}

export async function updateCategory(id: string, input: Partial<CategoryInput>): Promise<Category> {
  const { data } = await api.patch<{ category: Category }>(`/categories/${id}`, input);
  return data.category;
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`/categories/${id}`);
}