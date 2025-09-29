import React, { useEffect, useState } from "react";
import styles from "./RecipeDetailSection.module.css";
import {
  fetchRecipeDetail,
  updateRecipe,
  deleteRecipe,
  fetchIngredients,
  fetchCategories,
} from "../../api/api";
import { Recipe, Ingredient, Category } from "../../types/models";
import IngredientSearch from "../IngredientSearch";
import CategorySelect from "../CategorySelect";

interface RecipeDetailSectionProps {
  recipeId: number;
  onBack: () => void;
}

const RecipeDetailSection: React.FC<RecipeDetailSectionProps> = ({
  recipeId,
  onBack,
}) => {
  // Recipe型を拡張してcategoryを許容
  const [recipe, setRecipe] = useState<
    (Recipe & { category?: { id: number; name: string } }) | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Partial<Recipe>>({});
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  // 編集用
  const [editIngredients, setEditIngredients] = useState<number[]>([]);
  const [editCategory, setEditCategory] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchRecipeDetail(recipeId)
      .then((data) => {
        setRecipe(data);
        setForm({
          name: data.name,
          url: data.url,
          thumbnail: data.thumbnail,
          notes: data.notes,
        });
      })
      .catch(() => setError("詳細取得に失敗しました"))
      .finally(() => setLoading(false));
  }, [recipeId]);

  useEffect(() => {
    fetchIngredients().then(setIngredients);
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (recipe) {
      setEditIngredients(recipe.ingredients?.map((i) => i.id) || []);
      setEditCategory(recipe.category?.id ?? null);
    }
  }, [recipe]);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // updateRecipeの型拡張
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipe) return;
    try {
      const updated = await updateRecipe(recipe.id, {
        ...form,
        ingredient_ids: editIngredients,
        category_id: editCategory,
      } as any); // 型エラー回避
      setRecipe({
        ...updated,
        ingredients: ingredients.filter((i) => editIngredients.includes(i.id)),
        category: categories.find((c) => c.id === editCategory),
      });
      setEditMode(false);
    } catch {
      alert("更新に失敗しました");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("本当に削除しますか？")) return;
    try {
      await deleteRecipe(recipeId);
      onBack();
    } catch {
      alert("削除に失敗しました");
    }
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>レシピが見つかりません</div>;

  return (
    <section>
      <h2>レシピ詳細</h2>
      <button onClick={onBack}>一覧に戻る</button>
      <div className={styles.detailLayout}>
        <div className={styles.detailImage}>
          <img src={recipe.thumbnail} alt={recipe.name} />
        </div>
        <div className={styles.detailInfo}>
          {editMode ? (
            <form onSubmit={handleUpdate}>
              <div>
                <label className={styles.title}>レシピ名:</label>
                <input
                  name="name"
                  value={form.name || ""}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              <div>
                <label className={styles.title}>YouTube動画リンク:</label>
                <input
                  name="url"
                  value={form.url || ""}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              <div>
                <label className={styles.title}>サムネイルURL:</label>
                <input
                  name="thumbnail"
                  value={form.thumbnail || ""}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              <div>
                <label className={styles.title}>使用する食材:</label>
                <IngredientSearch
                  selectedIds={editIngredients}
                  onChange={setEditIngredients}
                />
              </div>
              <div>
                <label className={styles.title}>カテゴリ:</label>
                <CategorySelect
                  value={editCategory}
                  onChange={setEditCategory}
                />
              </div>
              <div>
                <label className={styles.title}>備考:</label>
                <textarea
                  name="notes"
                  value={form.notes || ""}
                  onChange={handleChange}
                  className={styles.textarea}
                />
              </div>
              <button type="submit">保存</button>
              <button type="button" onClick={handleCancel}>
                キャンセル
              </button>
            </form>
          ) : (
            <>
              <p>レシピ名: {recipe.name}</p>
              <p>
                YouTube動画リンク:{" "}
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  リンク
                </a>
              </p>
              <p>
                使用する食材:{" "}
                {recipe.ingredients?.map((i) => i.name).join(", ")}
              </p>
              <p>カテゴリ: {recipe.category ? recipe.category.name : ""}</p>
              <p>備考: {recipe.notes}</p>
              <button onClick={handleEdit}>編集</button>
              <button onClick={handleDelete}>削除</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecipeDetailSection;
