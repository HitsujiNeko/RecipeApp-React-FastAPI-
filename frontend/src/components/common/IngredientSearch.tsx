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
import { IngredientModel } from "../../types/models";
import { fetchIngredients } from "../../api/api";
import IngredientTag from "./IngredientTag";
import styles from "./IngredientSearch.module.css";

interface IngredientSearchProps {
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

const IngredientSearch: React.FC<IngredientSearchProps> = ({
  selectedIds,
  onChange,
}) => {
  const [allIngredients, setAllIngredients] = useState<IngredientModel[]>([]);
  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);
  const [search, setSearch] = useState("");

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

  const handleToggle = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="🔍：食材をさがす"
        value={search}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <div className={styles.selected}>
        <strong>選択中：</strong>
        {selectedIds.length === 0
          ? "未選択"
          : allIngredients
              .filter((ing) => selectedIds.includes(ing.id))
              .map((ing) => (
                <IngredientTag key={ing.id} ingredient={ing} />
              ))}
      </div>
      <div className={styles.listArea}>
        <ul className={styles.list}>
          {ingredients.map((ing) => (
            <li key={ing.id} className={styles.listItem}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(ing.id)}
                  onChange={() => handleToggle(ing.id)}
                />
                <span className={styles.ingredientName}>{ing.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientSearch;
