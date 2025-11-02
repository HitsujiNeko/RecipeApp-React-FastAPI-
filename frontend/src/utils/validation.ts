import { RecipeCreateRequest, RecipeModel } from "../types/models";

// 戻り値型を明示
export type RecipeFormErrors = { [key: string]: string };

export function validateRecipeForm(
  values: RecipeCreateRequest,
  existingRecipes: RecipeModel[]
): RecipeFormErrors {
  const errors: RecipeFormErrors = {};
	// 必須チェック
  if (!values.name) errors.name = "レシピ名を入力してください";
  if (!values.url) errors.youtubeUrl = "YouTube URLを入力してください";
  if (!values.thumbnail) errors.thumbnail = "サムネイル画像を設定してください";
  if (!values.ingredient_ids || values.ingredient_ids.length === 0) errors.ingredients = "最低1つ以上の食材を選択してください";
  if (!values.category_id) errors.category = "カテゴリを選択してください";
	
	// 重複チェック
  if (existingRecipes.some(r => r.name === values.name)) {
    errors.name = "同じレシピ名のレシピが既に存在します";
  }
  if (existingRecipes.some(r => r.url === values.url)) {
    errors.youtubeUrl = "同じYouTube URLのレシピが既に存在します";
  }
  return errors;
}