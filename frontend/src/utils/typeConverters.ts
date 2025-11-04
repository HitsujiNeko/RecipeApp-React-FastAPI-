import { RecipeModel, RecipeCreateRequest } from "../types/models";


// RecipeModelをRecipeCreateRequestに変換するユーティリティ関数
export function toRecipeCreateRequest(recipe: RecipeModel): RecipeCreateRequest {
  return {
    name: recipe.name,
    url: recipe.url,
    thumbnail: recipe.thumbnail,
    notes: recipe.notes,
    ingredient_ids: recipe.ingredients.map((ing) => ing.id),
    category_id: recipe.category.id,
    tag_ids: recipe.tags ? recipe.tags.map((tag) => tag.id) : [],
    youtube_channel_id: recipe.youtube_channel ? recipe.youtube_channel.id : null,
  };
}