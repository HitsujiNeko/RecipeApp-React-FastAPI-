
import React, { useEffect, useState } from 'react';
import { deleteRecipe, fetchRecipeDetail } from '../../api/api';
import { RecipeModel } from '../../types/models';
import IngredientTag from '../common/IngredientTag';
import RecipeTag from '../common/RecipeTag';

type RecipeDetailSectionProps = {
  recipeId: number;
  setNav: (nav: string) => void;
  setSelectedRecipeId: (id: number) => void;
  refetchRecipes?: () => void
};

export default function RecipeDetailSection({ recipeId, setNav, setSelectedRecipeId,refetchRecipes}: RecipeDetailSectionProps) {
  const [recipe, setRecipe] = useState<RecipeModel | null>(null);
  useEffect(() => {
    fetchRecipeDetail(recipeId)
      .then((data: RecipeModel) => {
        setRecipe(data);
      })
      .catch((err) => {
        console.error('レシピ詳細の取得に失敗しました', err);
      });
  }, [recipeId]);

  const handleDelete = async () => {
    if (!window.confirm("本当に削除しますか？")) return;
    await deleteRecipe(recipeId);
    if (refetchRecipes) {
    refetchRecipes();
    }
    setNav("list");
  }


  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">読み込み中...</div>
    );
  }

  return (
    <div>
      <div className="flex justify-end items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setSelectedRecipeId(recipe.id);
            setNav("update");
          }}
        >
          このレシピを編集
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          onClick={handleDelete}>
          削除
        </button>
      </div>
      <div className="max-w-md mx-auto mt-3 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="relative w-full h-56 bg-gray-100 flex items-center justify-center">
          <img
            src={recipe.thumbnail}
            alt={recipe.name}
            className="object-cover w-full h-full"
            style={{ maxHeight: '224px' }}
          />
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-base font-bold px-3 py-1 rounded-full shadow">
            {recipe.category.name}
          </span>
          <div className="absolute top-1 right-1 flex flex-col gap-1 z-10">
              {recipe.tags?.map(tag => ( 
                <RecipeTag key={tag.id} recipeTag={tag} />
              ))
                }
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 flex items-center gap-2">
            {recipe.name}
          </h2>
          <div className="mb-4">
            <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-1">
              材料
            </span>
            <ul className="flex flex-wrap gap-2 mt-1">
              {recipe.ingredients.map((ing) => (
                <li key={ing.id}>
                  <IngredientTag ingredient={ing} />
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-1">
              メモ
            </span>
            <div className="text-gray-700 text-sm mt-1 min-h-[2rem]">
              {recipe.notes === '' ? (
                <span className="text-gray-400">メモは登録されていません</span>
              ) : (
                <span>{recipe.notes}</span>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <a
              href={recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded shadow transition-colors text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m10.5 0v10.125c0 1.243-1.007 2.25-2.25 2.25H7.5a2.25 2.25 0 01-2.25-2.25V9m13.5 0H3.75m17.25 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0v0" />
              </svg>
              YouTubeで見る
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
