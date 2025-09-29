import React, { useEffect, useState } from "react";
import styles from "./RecipeListSection.module.css";
import { fetchRecipes, fetchCategories, deleteRecipe } from "../../api/api";
import { Recipe, Category } from "../../types/models";

interface RecipeListSectionProps {
  onRecipeClick: (id: number) => void;
}

const RecipeListSection: React.FC<RecipeListSectionProps> = ({
  onRecipeClick,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchRecipes(selectedCategory ? undefined : undefined, selectedCategory)
      .then(setRecipes)
      .finally(() => setLoading(false));
    fetchCategories().then(setCategories);
  }, [selectedCategory]);

  const handleCardClick = (id: number) => {
    if (deleteMode) {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    } else {
      onRecipeClick(id);
    }
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm("選択したレシピを削除しますか？")) return;
    for (const id of selectedIds) {
      try {
        await deleteRecipe(id);
      } catch {}
    }
    setRecipes((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
    setSelectedIds([]);
    setDeleteMode(false);
  };

  return (
    <section>
      <h2>レシピ一覧</h2>
      <div>
        <label>
          カテゴリ
          <select
            value={selectedCategory ?? ""}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value ? Number(e.target.value) : null
              )
            }
          >
            <option value="">カテゴリ選択</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        onClick={() => setDeleteMode((v) => !v)}
        style={{ margin: "12px 0" }}
      >
        {deleteMode ? "選択解除" : "削除"}
      </button>
      {deleteMode && (
        <button
          onClick={handleDeleteSelected}
          disabled={selectedIds.length === 0}
          style={{ marginLeft: 8, background: "#d32f2f", color: "#fff" }}
        >
          選択したレシピを削除する
        </button>
      )}
      <div className={styles.listGrid}>
        {loading ? (
          <p>読み込み中...</p>
        ) : recipes.length === 0 ? (
          <p>レシピがありません</p>
        ) : (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className={
                selectedIds.includes(recipe.id)
                  ? `${styles.card} ${styles.selected}`
                  : styles.card
              }
              onClick={() => handleCardClick(recipe.id)}
            >
              <img
                src={recipe.thumbnail}
                alt={recipe.name}
                className={styles.cardImg}
              />
              <h3 className={styles.cardTitle}>{recipe.name}</h3>
              <div style={{ fontSize: 12, color: "#666" }}>
                {recipe.categories?.map((c) => c.name).join(", ")}
              </div>
              <div style={{ fontSize: 12, color: "#999", margin: "4px 0" }}>
                {recipe.created_at &&
                  new Date(recipe.created_at).toLocaleDateString()}
              </div>
              <a
                href={recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 13, color: "#1976d2" }}
                onClick={(e) => e.stopPropagation()}
              >
                YouTubeを見る
              </a>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default RecipeListSection;
