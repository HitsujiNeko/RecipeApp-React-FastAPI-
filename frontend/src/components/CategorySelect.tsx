import React from "react";
import styles from "./CategorySelect.module.css";
import { Category } from "../types/models";
import { fetchCategories } from "../api/api";

// 食材検索欄のコンポーネント

// 用いる場所：レシピ提案ページ、レシピ追加ページ、レシピ詳細ページ（更新機能）

// 機能要件：
// ・カテゴリを選択するリストを表示する（カテゴリは横一行で表示）
// ・カテゴリを選択すると、選択したカテゴリのIDを返す
// ・

//  型定義は ../types/models.ts で定義済み

//  APIは ../api/api.ts で定義済み

type CategorySelectProps = {
  value: number | null;
  onChange: (categoryId: number) => void;
};

export default function CategorySelect({
  value,
  onChange,
}: CategorySelectProps) {
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error("カテゴリ一覧の取得に失敗しました", err);
      });
  }, []);

  return (
    <div>
      <h2>カテゴリ選択</h2>
      <div className={styles.categoryContainer}>
        {categories.map((category) => (
          <label key={category.id} className={styles.categoryLabel}>
            <input
              type="radio"
              name="category"
              value={category.id}
              checked={value === category.id}
              onChange={() => onChange(category.id)}
            />
            <span>{category.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
