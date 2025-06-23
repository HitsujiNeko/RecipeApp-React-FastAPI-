// 食材検索欄のコンポーネント

// 用いる場所：レシピ提案ページ、レシピ追加ページ、レシピ詳細ページ（更新機能）

// 機能要件：
// ・食材テーブルは100件以上のデータを持つため、検索機能を実装する
// ・食材名を入力すると、食材名の部分一致で検索結果を表示する
// ・食材テーブルでは name（例：鶏むね肉） と reading（例：とりむねにく）があり、どちらでも検索できるようにする
// ・複数の食材を選択できるようにする
// ・食材テーブルは typeを持っているので、typeで絞り込むことができるようにする

//  型定義は ../types/models.ts で定義済み

//  APIは ../api/api.ts で定義済み
import React, { useState, useEffect } from "react";
import { Ingredient } from "../types/models";
import { fetchIngredients } from "../api/api";
import styles from "./IngredientSearch.module.css";

export default function IngredientSearch() {
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    fetchIngredients()
      .then((data) => {
        setAllIngredients(data);
        setIngredients(data);
      })
      .catch((err) => {
        console.error("食材一覧の取得に失敗しました", err);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setIngredients(
      allIngredients.filter(
        (ing) => ing.name.includes(value) || ing.reading.includes(value)
      )
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>食材検索</h2>
      <input
        type="text"
        placeholder="食材名・読みで検索"
        value={search}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <div className={styles.selected}>
        <strong>選択中：</strong>
        {allIngredients
          .filter((ing) => selectedIds.includes(ing.id))
          .map((ing) => ing.name)
          .join(", ") || "なし"}
      </div>
      <div className={styles.listArea}>
        <ul className={styles.list}>
          {ingredients.map((ing) => (
            <li key={ing.id} className={styles.listItem}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(ing.id)}
                  onChange={() => {
                    if (selectedIds.includes(ing.id)) {
                      setSelectedIds(selectedIds.filter((id) => id !== ing.id));
                    } else {
                      setSelectedIds([...selectedIds, ing.id]);
                    }
                  }}
                />
                <span className={styles.ingredientName}>{ing.name}</span>
                <span className={styles.ingredientType}>（{ing.type}）</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
