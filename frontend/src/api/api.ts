import { Ingredient, Category, Recipe } from "../types/models";

// GET

// 食材一覧を取得
export async function fetchIngredients(): Promise<Ingredient[]> {
  const res = await fetch("http://localhost:8000/api/ingredients");
  if (!res.ok) throw new Error("食材一覧の取得に失敗しました");
  return await res.json();
}

// カテゴリ一覧を取得
export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("http://localhost:8000/api/categories");
  if (!res.ok) throw new Error("カテゴリ一覧の取得に失敗しました");
  return await res.json();
}

// レシピ一覧を取得
export async function fetchRecipes(): Promise<Recipe[]> {
  const res = await fetch("http://localhost:8000/api/recipes");
  if (!res.ok) throw new Error("レシピ一覧の取得に失敗しました");
  return await res.json();
}

//

// POST