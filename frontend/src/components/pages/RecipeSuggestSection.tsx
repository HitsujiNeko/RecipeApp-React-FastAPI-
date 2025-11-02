import React, { useRef, useState } from "react";
import styles from "./RecipeSuggestSection.module.css";
import { fetchRecipes } from "../../api/api";
import IngredientSearch from "../common/IngredientSearch";
import { fetchIngredients } from "../../api/api";
import CategorySelect from "../common/CategorySelect";
import { fetchCategories } from "../../api/api";
import RecipeCard from "../common/RecipeCard";
import { RecipeModel } from "../../types/models";

export default function RecipeSuggestSection({
  onRecipeClick,
}: {
  onRecipeClick: (id: number) => void;
}) {
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [categories, setCategories] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  // 食材一覧を取得
  React.useEffect(() => {
    fetchIngredients()
      .then((data) => setIngredients(data))
      .catch((err) => {
        console.error("食材一覧の取得に失敗しました", err);
      });
  }, []);

  // カテゴリ一覧を取得
  React.useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error("カテゴリ一覧の取得に失敗しました", err);
      });
  }, []);

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
      <div className="">
        <div className="">
          <h2 className="text-lg font-bold">食材をえらぶ</h2>
          <IngredientSearch
            selectedIds={selectedIngredients}
            onChange={setSelectedIngredients}
            ingredients={ingredients}
          />
          <h2 className="text-lg font-bold mt-1">カテゴリをえらぶ</h2>
          <CategorySelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            categories={categories}
          />
          <button
            className="w-full"
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
              <div className="grid grid-cols-2  gap-6">
                {recipes.map((r) => (
                  <RecipeCard
                    key={r.id}
                    recipe={r}
                    displayIngCat={false}
                    onClick={() => onRecipeClick(r.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-xl h-56 item text-center p-3 bg-red-100 text-red-600">検索結果がありません</div>
          )}
        </div>
      </div>
    </section>
  );
}
