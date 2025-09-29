import React, { useState } from "react";
import styles from "./RecipeSuggestSection.module.css";
import { fetchRecipes } from "../../api/api";
import IngredientSearch from ".././IngredientSearch";
import CategorySelect from ".././CategorySelect";

const RecipeSuggestSection: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchRecipes(selectedIngredients, selectedCategory);
      setRecipes(data);
    } catch (e: any) {
      setError("検索に失敗しました");
    }
    setLoading(false);
  };

  return (
    <section>
      <h1>レシピ提案</h1>
      <p>
        食材を選択して、レシピを提案します。複数選択可能です。
        <br />
        カテゴリで絞り込むこともできます。
        <br />
      </p>
      <h2>食材を選択</h2>
      <div className={styles.suggestLayout}>
        <aside className={styles.suggestLeft}>
          <IngredientSearch
            selectedIds={selectedIngredients}
            onChange={setSelectedIngredients}
          />
          <CategorySelect
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <button
            className={styles.searchButton}
            onClick={handleSearch}
            disabled={loading}
          >
            検索
          </button>
        </aside>
        <main className={styles.suggestCenter}>
          {loading && <p>検索中...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {recipes.length > 0 ? (
            <div className={styles.recipeGrid}>
              {recipes.map((r) => (
                <div key={r.id} className={styles.recipeCard}>
                  <img src={r.thumbnail} alt={r.name} width={120} />
                  <div>{r.name}</div>
                  <div>
                    {r.categories &&
                      r.categories.map((c: any) => c.name).join(", ")}
                  </div>
                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                    詳細を見る
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResult}>検索結果がありません</div>
          )}
        </main>
        <aside className={styles.suggestRight}>
          {/* 人気のレシピ（ランキング）: 今後実装 */}
        </aside>
      </div>
    </section>
  );
};

export default RecipeSuggestSection;
