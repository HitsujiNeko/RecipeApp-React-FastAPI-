import {
  IngredientModel,
  CategoryModel,
  YouTubeChannelModel,
  RecipeTagModel,
  RecipeModel,
  RecipeCreateRequest,
} from "../types/models";

// GET

// 食材一覧を取得
export async function fetchIngredients(): Promise<IngredientModel[]> {
  const res = await fetch("http://localhost:8000/api/ingredients");
  if (!res.ok) throw new Error("食材一覧の取得に失敗しました");
  return await res.json();
}

// カテゴリ一覧を取得
export async function fetchCategories(): Promise<CategoryModel[]> {
  const res = await fetch("http://localhost:8000/api/categories");
  if (!res.ok) throw new Error("カテゴリ一覧の取得に失敗しました");
  return await res.json();
}
// チャンネル一覧を取得
export async function fetchYouTubeChannels(): Promise<YouTubeChannelModel[]> {
  const res = await fetch("http://localhost:8000/api/youtube_channels");
  if (!res.ok) throw new Error("チャンネル一覧の取得に失敗しました");
  return await res.json();
}
// タグ一覧を取得
export async function fetchRecipeTags(): Promise<RecipeTagModel[]> {
  const res = await fetch("http://localhost:8000/api/recipe_tags");
  if (!res.ok) throw new Error("タグ一覧の取得に失敗しました");
  return await res.json();
}

// レシピ一覧を取得（クエリ対応）
export async function fetchRecipes(
  ingredientIds?: number[],
  categoryId?: number | null
): Promise<RecipeModel[]> {
  const params = new URLSearchParams();
  if (ingredientIds && ingredientIds.length > 0) {
    params.append("ingredients", ingredientIds.join(","));
  }
  if (categoryId) {
    params.append("category", String(categoryId));
  }
  const url =
    "http://localhost:8000/api/recipes" +
    (params.toString() ? `?${params.toString()}` : "");
  const res = await fetch(url);
  if (!res.ok) throw new Error("レシピ一覧の取得に失敗しました");
  return await res.json();
}

// レシピ詳細を取得
export async function fetchRecipeDetail(id: number): Promise<RecipeModel> {
  const res = await fetch(`http://localhost:8000/api/recipes/${id}`);
  if (!res.ok) throw new Error("レシピ詳細の取得に失敗しました");
  return await res.json();
}

// YouTube動画から動画情報を取得
export async function fetchYoutubeVideo(videoUrl: string): Promise<any> {
    const res = await fetch("http://localhost:8000/api/youtube/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ video_url: videoUrl }),
    });
    if (!res.ok) throw new Error("動画情報の取得に失敗しました");
    return await res.json();
}

// YouTubeプレイリストから動画情報を取得
export async function fetchYoutubePlaylist(
  playlistUrl: string
): Promise<any[]> {
  const res = await fetch("http://localhost:8000/api/youtube/playlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playlist_url: playlistUrl }),
  });
  if (!res.ok) throw new Error("プレイリスト取得に失敗しました");
  return await res.json();
}

//
// POST
//

// 食材追加
export async function addIngredient(
  data: Partial<IngredientModel>
): Promise<IngredientModel> {
  const res = await fetch("http://localhost:8000/api/ingredients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("食材追加に失敗しました");
  return await res.json();
}
// カテゴリー追加
export async function addCategory(
  data: Partial<CategoryModel>
): Promise<CategoryModel> {
  const res = await fetch("http://localhost:8000/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("カテゴリ追加に失敗しました");
  return await res.json();
}

// 単体追加
export async function addRecipe(recipe: RecipeCreateRequest): Promise<any> {
  const res = await fetch("http://localhost:8000/api/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });
  if (!res.ok) throw new Error("登録に失敗しました");
  return await res.json();
}

// レシピ一括追加
export async function bulkAddRecipes(
  recipes: RecipeCreateRequest[]
): Promise<any> {
  const res = await fetch("http://localhost:8000/api/recipes/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipes),
  });
  if (!res.ok) throw new Error("一括追加に失敗しました");
  return await res.json();
}

//
// PUT
//

// 食材編集
export async function updateIngredient(
  id: number,
  data: Partial<IngredientModel>
): Promise<IngredientModel> {
  const res = await fetch(`http://localhost:8000/api/ingredients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("食材編集に失敗しました");
  return await res.json();
}

// カテゴリー編集
export async function updateCategory(
  id: number,
  data: Partial<CategoryModel>
): Promise<CategoryModel> {
  const res = await fetch(`http://localhost:8000/api/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("カテゴリ編集に失敗しました");
  return await res.json();
}

// レシピ編集
export async function updateRecipe(
  id: number,
  data: Partial<RecipeModel>
): Promise<RecipeModel> {
  const res = await fetch(`http://localhost:8000/api/recipes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("レシピ編集に失敗しました");
  return await res.json();
}

//
// DELETE
//

// 食材削除
export async function deleteIngredient(id: number): Promise<void> {
  const res = await fetch(`http://localhost:8000/api/ingredients/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("食材削除に失敗しました");
}

// カテゴリ削除
export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`http://localhost:8000/api/categories/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("カテゴリ削除に失敗しました");
}

// レシピ削除
export async function deleteRecipe(id: number): Promise<void> {
  const res = await fetch(`http://localhost:8000/api/recipes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("レシピ削除に失敗しました");
}
