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
  category: CategoryModel; // 詳細取得時
  created_at?: string; // オプション: 日時
};

// 追加用（APIリクエスト用）
// 追加APIの引数は「idなし・ingredientsはid配列・categoryもidのみ」で送る必要があるため、新たに型を定義

export type RecipeCreateRequest = {
  name: string;
  url: string;
  thumbnail: string;
  notes?: string;
  ingredient_ids: number[];
  category_id?: number | null;
};