// データ取得専用のカスタムフック
import { useEffect, useState } from "react";
import { fetchIngredients, fetchCategories, fetchRecipeTags } from "../api/api";
import {
  IngredientModel,
  CategoryModel,
  RecipeTagModel,
} from "../types/models";

export function useRecipeFormData() {
  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [tags, setTags] = useState<RecipeTagModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchIngredients(), fetchCategories(), fetchRecipeTags()])
      .then(([ingredientsData, categoriesData, tagsData]) => {
        setIngredients(ingredientsData);
        setCategories(categoriesData);
        setTags(tagsData);
      })
      .catch((err) => {
        console.error("初期データの取得に失敗しました", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { ingredients, categories, tags, loading };
}
