import React from "react";
import styles from "./CategorySelect.module.css";
import { Category } from "../types/models";
import { fetchCategories } from "../api/api";

// 食材検索欄のコンポーネント

// 用いる場所：レシピ提案ページ、レシピ追加ページ、レシピ詳細ページ（更新機能）

// 機能要件：
// ・カテゴリを選択するリストを表示する（カテゴリは横一行で表示）
// ・カテゴリを選択すると、選択したカテゴリのIDを返す
// ・デフォルトではすべてのカテゴリを選択した状態にする

//  型定義は ../types/models.ts で定義済み

//  APIは ../api/api.ts で定義済み


// コンポーネントが受け取るpropsの型定義
type CategorySelectProps = {
  value: number | null; // 現在選択中のカテゴリID（未選択ならnull）
  onChange: (categoryId: number | null) => void; // 選択が変わったとき呼ばれる関数 
  // OnChangeは引数がcategoryIdで戻り値はvoid（なし）
};
// voidは　Pythonでいう　returnなしのdef 関数　のイメージ


export default function CategorySelect({
    value,
    onChange,
  }: CategorySelectProps) {
  // CategorySelectPropsのvalue, onChangeを引数にとる

    // APIからカテゴリ一覧を取得して状態に保持
    const [categories, setCategories] = React.useState<Category[]>([]);

    React.useEffect(() => {
      fetchCategories()
        .then((data) => setCategories(data))
        .catch((err) => {
          console.error("カテゴリ一覧の取得に失敗しました", err);
        });
    }, []); // [] にすると最初の1回だけ実行される　

    return (
      <div className={styles.categoryContainer}>
        {/* デフォルトはすべてのカテゴリを選択*/}
        <label key={0} className={styles.categoryLabel}>
          <input
            type="radio"
            name="category"
            value={0}
            checked={value === null} // valueがnullのときにチェックされる
            onChange={() => onChange(null)} // 選択が変わったときにonChangeを呼び出す
          />
          <span>すべて</span>
        </label>
        {/* 取得したカテゴリ一覧を表示 */}
        {categories.map((category) => (
          <label key={category.id} className={styles.categoryLabel}>
            <input
              type="radio"
              name="category"
              value={category.id}
              checked={value === category.id}
              onChange={() => onChange(category.id)} // 選択が変わったときにonChangeを呼び出す
            />
            <span>{category.name}</span>
          </label>
        ))}

      </div>
    )
  }
