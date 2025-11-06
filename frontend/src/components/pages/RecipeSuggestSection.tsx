import { useRef, useState } from "react";
import { fetchRecipes } from "../../api/api";
import IngredientSearch from "../common/IngredientSearch";
import CategorySelect from "../common/CategorySelect";
import RecipeCard from "../common/RecipeCard";
import { RecipeModel } from "../../types/models";
import { useRecipeFormData } from "../../hooks/useRecipeFormData";
import TagSelect from "../common/TagSelect";
import RecipeTag from "../common/RecipeTag";
import Loading from "../common/Loading";

export default function RecipeSuggestSection({
  onRecipeClick,
}: {
  onRecipeClick: (id: number) => void;
}) {
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<number[] | null>(null);
  const [tagSelectOpen, setTagSelectOpen] = useState(false);
  const [searched, setSearched] = useState(false); // 検索済みフラグ

  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  // フォーム用初期データ取得
  const { ingredients, categories, tags, loading } = useRecipeFormData();

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleTagToggle = (id: number) => {
    setSelectedTag((prev) => {
      if (prev) {
        if (prev.includes(id)) {
          // すでに選択されている場合は、そのIDを除外（＝選択解除）
          return prev.filter((tagId) => tagId !== id);
        } else {
          // まだ選択されていない場合は、IDを追加（＝選択）
          return [...prev, id];
        }
      } else {
        // まだ何も選択されていない場合は、新しく配列を作ってIDを追加
        return [id];
      }
    });
  };

  const handleSearch = async () => {
    setSearchLoading(true);
    setError("");
    setSearched(true);
    try {
      const data = await fetchRecipes(
        selectedIngredients,
        selectedCategory,
        selectedTag ?? undefined
      );
      setRecipes(data);
      if (data.length > 0 && resultsRef.current) {
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100); // レンダリング後にスクロール
      }
    } catch (e: any) {
      setError("検索に失敗しました");
    }
    setSearchLoading(false);
  };
  if (loading) return <Loading />;
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
          <h2 className="text-lg font-bold mt-1">タグをえらぶ</h2>
          <div className="flex items-center flex-wrap gap-2 mt-2 mb-2">
            <button
              type="button"
              onClick={() => setTagSelectOpen(true)}
              className=""
            >
              タグを選ぶ
            </button>
            <div className="flex items-center flex-wrap gap-1">
              <span className="font-bold mr-1">選択中：</span>
              {selectedTag ? (
                tags
                  .filter((tag) => selectedTag?.includes(tag.id))
                  .map((tag) => <RecipeTag key={tag.id} recipeTag={tag} />)
              ) : (
                <span className="text-gray-400">未選択</span>
              )}
            </div>
          </div>
          <button className="w-full" onClick={handleSearch} disabled={loading}>
            検索
          </button>
        </div>
        <div className="mt-4" ref={resultsRef}>
          {searchLoading && <p>検索中...</p>}
          {error && <p style={{ color: "red", font: "bold" }}>{error}</p>}
          {searched ? (
            recipes.length > 0 ? (
              // 検索結果表示
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
              // 検索済みで0件
              <div className="flex flex-col items-center justify-center h-56 bg-orange-50 rounded-lg border border-orange-200 shadow-inner">
                <svg
                  className="w-12 h-12 text-orange-300 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                  />
                </svg>
                <div className="text-lg font-semibold text-orange-600 mb-1">
                  検索結果がありません
                </div>
                <div className="text-sm text-orange-400">
                  条件を変えて再度お試しください
                </div>
              </div>
            )
          ) : (
            // 未検索時
            <div className="text-gray-400 text-center py-8">
              条件を選んで「検索」してください
            </div>
          )}
        </div>
        <TagSelect
          open={tagSelectOpen}
          tags={tags}
          selectedTagIds={selectedTag ?? []}
          onToggle={handleTagToggle}
          onClose={() => setTagSelectOpen(false)}
        />
      </div>
    </section>
  );
}
