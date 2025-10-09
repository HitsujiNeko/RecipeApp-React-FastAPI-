// 食材
export type IngredientModel = {
  id: number;
  name: string;
  reading: string;
  type: string;
};

// カテゴリ
export type CategoryModel = {
  id: number;
  name: string;
};

// レシピ
export type RecipeModel = {
  id: number;
  name: string;
  url: string;
  thumbnail: string;
  notes: string;
  ingredients: IngredientModel[]; // 詳細取得時
  categories: CategoryModel[]; // 詳細取得時
  created_at?: string; // オプション: 日時
};
