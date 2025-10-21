import React, { useEffect, useState } from 'react'
import { fetchRecipeDetail } from '../../api/api'
import { RecipeModel } from '../../types/models'



type RecipeDetailSectionProps = {
  recipeId: number;
}

export default function RecipeDetailSection({ recipeId }: RecipeDetailSectionProps) {
  const [recipe, setRecipe] = useState<RecipeModel | null>(null);
  useEffect(() => {
    fetchRecipeDetail(recipeId)
      .then((data: RecipeModel) => {
        setRecipe(data);
        console.log('レシピ', data);
      })
      .catch((err) => {
        console.error("レシピ詳細の取得に失敗しました", err);
      });
  }, [recipeId]);


  if (!recipe) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <img src={recipe.thumbnail} alt={recipe.name} style={{ maxWidth: '400px' }} />
      <p>カテゴリ: {recipe.category.name}</p>
      <h3>材料:</h3>
      <ul>
        {recipe.ingredients.map((ing) => (
          <li key={ing.id}>{ing.name} ({ing.type})</li>
        ))}
      </ul>
      <h3>メモ:</h3>
      <p>{recipe.notes}</p>
      <a href={recipe.url} target="_blank" rel="noopener noreferrer">
        YouTubeで見る
      </a>
      

    </div>
  );
}
