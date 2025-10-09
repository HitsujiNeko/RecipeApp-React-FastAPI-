import { useRef, useState } from "react";
import styles from "./RecipeSuggestSection.module.css";
import { fetchRecipes } from "../../api/api";
import IngredientSearch from ".././IngredientSearch";
import CategorySelect from ".././CategorySelect";
import RecipeCard from "../common/RecipeCard";

export default function RecipeSuggestSection() {
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resultsRef = useRef<HTMLDivElement>(null);
  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchRecipes(selectedIngredients, selectedCategory);
      setRecipes(data);
      if (data.length > 0 && resultsRef.current) {
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100); // レンダリング後にスクロール
      }
    } catch (e: any) {
      setError("検索に失敗しました");
    }
    setLoading(false);
  };

  return (
    <section>
      <div className={styles.suggestLayout}>
        <div className={styles.suggestInput}>
          <h2>食材をえらぶ</h2>
          <IngredientSearch
            selectedIds={selectedIngredients}
            onChange={setSelectedIngredients}
          />
          <h2>カテゴリをえらぶ</h2>
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
        </div>
        <div className={styles.suggestResults} ref={resultsRef}>
          {loading && <p>検索中...</p>}
          {error && <p style={{ color: "red", font: "bold" }}>{error}</p>}
          {recipes.length > 0 ? (
            <div>
              <h2>検索結果: {recipes.length}件</h2>
              <div className={styles.recipeGrid}>
                {recipes.map((r) => (
                  <RecipeCard
                    key={r.id}
                    recipe={r}
                    displayIngredients={false}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.noResult}>検索結果がありません</div>
          )}
        </div>
      </div>
    </section>
  );
}
