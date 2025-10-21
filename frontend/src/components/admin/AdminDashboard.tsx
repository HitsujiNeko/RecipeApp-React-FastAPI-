import React, { useEffect, useState } from "react";
import { 
  fetchIngredients, 
  fetchCategories, 
  fetchRecipes, 
  updateCategory,
  deleteRecipe 
  } from "../../api/api";
import { IngredientModel, CategoryModel, RecipeModel } from "../../types/models";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetchIngredients(),
      fetchCategories(),
      fetchRecipes()
    ])
      .then(([ings, cats, recs]) => {
        setIngredients(ings);
        setCategories(cats);
        setRecipes(recs);
      })
      .catch(() => setError("データ取得に失敗しました"))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteRecipe = async (id: number) => {
    if (!window.confirm("本当に削除しますか？")) return;
    await deleteRecipe(id);
    setRecipes(recipes.filter(r => r.id !== id));
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <section className={styles.adminContainer}>
      <h2>管理ダッシュボード</h2>
      <div className={styles.section}>
        <h3>食材一覧</h3>
        <ul>
          {ingredients.map(ing => (
            <li key={ing.id}>{ing.name}（{ing.type}）</li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h3>カテゴリ一覧</h3>
        <ul>
          {categories.map(cat => (
            <li key={cat.id}>
              <input
                type="text"
                value={cat.name}
                onChange={(e) => {
                  const updatedCategories = categories.map(c =>
                    c.id === cat.id ? { ...c, name: e.target.value } : c
                  );
                  setCategories(updatedCategories);
                }}
              />
              <button
                onClick={() => updateCategory(cat.id, { name: cat.name })}
                style={{ marginLeft: 8 }}>更新</button>
            </li>
          ))}
        </ul>

      </div>
      <div className={styles.section}>
        <h3>レシピ一覧</h3>
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id}>
              {recipe.name}（{recipe.category ? recipe.category.name : ""}）
              <button onClick={() => handleDeleteRecipe(recipe.id)} style={{ marginLeft: 8 }}>削除</button>
            </li>
          ))}
        </ul>
      </div>
      {/* 追加・編集フォームは必要に応じて拡張可能 */}
    </section>
  );
}
