

// 食材
export type Ingredient = {
  id: number;
  name: string;
  reading: string;
  type: string;
};

// カテゴリ
export type Category = {
  id: number;
  name: string;
};

// レシピ
export type Recipe = {
  id: number;
  name: string;
  url: string;
  thumbnail: string;
  notes: string;
  ingredients: Ingredient[]; // 詳細取得時
  categories: Category[];    // 詳細取得時
  created_at?: string;       // オプション: 日時
};