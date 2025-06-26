import React, { useEffect, useState } from "react";
import { fetchRecipes, fetchCategories } from "../api/api";
import { Recipe, Category } from "../types/models";

const RecipeListSection: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchRecipes()
      .then(setRecipes)
      .finally(() => setLoading(false));
    fetchCategories().then(setCategories);
  }, []);

  const filtered = selectedCategory
    ? recipes.filter((r) =>
        r.categories?.some((c) => c.id === selectedCategory)
      )
    : recipes;

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
      <div
        className="recipe-list-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        {loading ? (
          <p>読み込み中...</p>
        ) : filtered.length === 0 ? (
          <p>レシピがありません</p>
        ) : (
          filtered.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 12,
                background: "#fff",
              }}
            >
              <img
                src={recipe.thumbnail}
                alt={recipe.name}
                style={{
                  width: "100%",
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
              <h3 style={{ margin: "8px 0 4px" }}>{recipe.name}</h3>
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
