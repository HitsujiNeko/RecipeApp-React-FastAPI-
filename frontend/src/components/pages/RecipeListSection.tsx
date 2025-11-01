import React, { useEffect, useState } from "react";
import { fetchRecipes, fetchCategories, deleteRecipe } from "../../api/api";
import { RecipeModel, CategoryModel } from "../../types/models";
import RecipeCard from "../common/RecipeCard";  




export default function RecipeListSection({onRecipeClick}: {onRecipeClick: (id: number) => void}) {

  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipes()
      .then((data) => {
        setRecipes(data);
      })
      .catch((err) => {
        setError("レシピ一覧の取得に失敗しました");
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <div>読み込み中</div>;
  }
  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {recipes.length === 0 ? (
        <div>レシピが登録されていません</div>
      ) : (
        <div>
          <p className="mb-2">レシピ数：{recipes.length} 件</p>
          <div className="grid grid-cols-2  gap-4">
            {recipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe}
                displayIngCat={true}  
                onClick={() => onRecipeClick(recipe.id)} 
                />
            ))}
          </div>
        </div>
      )}
            
    </div>
  );
}

