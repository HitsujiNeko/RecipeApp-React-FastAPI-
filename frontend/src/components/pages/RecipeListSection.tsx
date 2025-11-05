import { useState, useEffect } from "react";
import { deleteRecipe } from "../../api/api";
import { RecipeModel, CategoryModel } from "../../types/models";
import Loading from "../common/Loading";
import RecipeCard from "../common/RecipeCard";  

interface RecipeListSectionProps {
  recipes: RecipeModel[];
  loading: boolean;
  error: string | null;
  onRecipeClick: (id: number) => void;
  refetchRecipes?: () => void;
}

// 選択ボタンを押すと、レシピを選択（複数可能）できるようにする
// 選択されたレシピは、まとめて削除やタグ付けができるようにする


export default function RecipeListSection({recipes, loading, error, onRecipeClick, refetchRecipes}: RecipeListSectionProps) {

  const [selectRecipe, setSelectRecipe] = useState<number[]>([]);
  const [selectMode, setSelectMode] = useState<boolean>(false);

  const handleSelect = (id: number) => {
    if (selectRecipe.includes(id)) {
      setSelectRecipe(selectRecipe.filter(rid => rid !== id));
    } else {
      setSelectRecipe([...selectRecipe, id]);
    }
  };

  const deleteSelectedRecipes = async () => {
    if (selectRecipe.length === 0) {
      alert("削除するレシピが選択されていません");
      return;
    }
    if (!window.confirm(`選択された ${selectRecipe.length} 件のレシピを本当に削除しますか？`)) return;
    for (const id of selectRecipe) {
      await deleteRecipe(id);
    }
    setSelectRecipe([]);
    if (refetchRecipes) {
      refetchRecipes();
    }
    // 削除後は選択モードを終了し、削除メッセージを表示
    setSelectMode(false);
    alert("選択されたレシピを削除しました");
  };
  
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {recipes.length === 0 ? (
        <div>レシピが登録されていません</div>
      ) : (
        <div>
          <p className="mb-2">レシピ数：{recipes.length} 件</p>
          <div>
            {/* 選択機能を追加 */}
            <button onClick= {() => { setSelectMode(!selectMode); setSelectRecipe([]);}}>
              {selectMode ? "選択モード終了" : "レシピ選択モードへ"}
            </button> 
            {selectMode && (
              <div className="my-2">
                <span>選択中のレシピ数: {selectRecipe.length} 件</span>
                <button
                  onClick={deleteSelectedRecipes}
                  className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  選択レシピを削除
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2  gap-4">
            {recipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe}
                displayIngCat={true}  
                onClick={() => {
                  if (selectMode) {
                    handleSelect(recipe.id);
                  } else {
                  onRecipeClick(recipe.id)} 
                }}
                selected={selectRecipe.includes(recipe.id)}
                />
            ))}
          </div>
        </div>
      )}
            
    </div>
  );
}

