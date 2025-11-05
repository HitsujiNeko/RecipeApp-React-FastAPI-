import { useState, useEffect, useCallback } from "react";
import { fetchRecipes } from "../api/api";
import { RecipeModel } from "../types/models";

export function useRecipes() {
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetchRecipes = useCallback(() => {
    setLoading(true);
    fetchRecipes()
      .then((data) => setRecipes(data))
      .catch(() => setError("レシピ一覧の取得に失敗しました"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetchRecipes();
  }, [refetchRecipes]);

  return { recipes, loading, error, refetchRecipes };
}
