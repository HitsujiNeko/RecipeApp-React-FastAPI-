import React from "react";
import { CategoryModel } from "../../types/models";
import { fetchCategories } from "../../api/api";

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
  enableSelectAll?: boolean; // すべて選択オプションを有効にするかどうか（デフォルトはtrue）
  // OnChangeは引数がcategoryIdで戻り値はvoid（なし）
};
// voidは　Pythonでいう　returnなしのdef 関数　のイメージ

export default function CategorySelect({
  value,
  onChange,
  enableSelectAll = true,
}: CategorySelectProps) {
  // CategorySelectPropsのvalue, onChangeを引数にとる

  // APIからカテゴリ一覧を取得して状態に保持
  const [categories, setCategories] = React.useState<CategoryModel[]>([]);

  React.useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error("カテゴリ一覧の取得に失敗しました", err);
      });
  }, []); // [] にすると最初の1回だけ実行される

  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      {enableSelectAll !== false && ( // enableSelectAllがfalseでない場合に「すべて」オプションを表示
      <label
        key={0}
        className={`flex flex-col items-center justify-center py-2 px-4 rounded-full border-2 cursor-pointer shadow-sm transition
        ${
          value === null
            ? "bg-orange-300 border-orange-500 text-orange-700 scale-105"
            : "bg-white border-gray-300 text-gray-700 hover:border-orange-400"
        }
      `}
      >
        <input
          type="radio"
          name="category"
          className="hidden"
          value={0}
          checked={value === null} // valueがnullのときにチェックされる
          onChange={() => onChange(null)} // 選択が変わったときにonChangeを呼び出す
        />
        <span className="text-sm">すべて</span>
      </label>
      )}
      {categories.map((category) => (
        <label
          key={category.id}
          className={`flex flex-col items-center justify-center py-2 px-4 rounded-full border-2 cursor-pointer shadow-sm transition
          ${
            value === category.id
              ? "bg-orange-300 border-orange-500 text-orange-700 scale-105"
              : "bg-white border-gray-300 text-gray-700 hover:border-orange-400"
          }
        `}
        >
          <input
            type="radio"
            name="category"
            className="hidden"
            value={category.id}
            checked={value === category.id}
            onChange={() => onChange(category.id)} // 選択が変わったときにonChangeを呼び出す
          />
          <span className="text-sm">{category.name}</span>
        </label>
      ))}
    </div>
  );
}
