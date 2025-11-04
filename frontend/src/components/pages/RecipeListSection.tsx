import React, { useEffect, useState } from "react";
import { fetchRecipes, fetchCategories, deleteRecipe } from "../../api/api";
import { RecipeModel, CategoryModel } from "../../types/models";
import RecipeCard from "../common/RecipeCard";  

interface RecipeListSectionProps {
  recipes: RecipeModel[];
  loading: boolean;
  error: string | null;
  onRecipeClick: (id: number) => void;
}


export default function RecipeListSection({recipes, loading, error, onRecipeClick}: RecipeListSectionProps) {
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

