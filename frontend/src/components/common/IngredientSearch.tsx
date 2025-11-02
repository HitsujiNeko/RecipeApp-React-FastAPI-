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
import React, { useState } from "react";
import { IngredientModel } from "../../types/models";
import IngredientTag from "./IngredientTag";

interface IngredientSearchProps {
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  ingredients: IngredientModel[];
}



const IngredientSearch: React.FC<IngredientSearchProps> = ({
  selectedIds,
  onChange,
  ingredients
}) => {
  const [search, setSearch] = useState("");

  // 検索フィルタリングはpropsのingredientsに対して行う
  const filteredIngredients = ingredients.filter(
    (ing) =>
      ing.name.includes(search) ||
      ing.reading.includes(search)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleToggle = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-orange-50 rounded-xl shadow-md  border-2 border-orange-400">
      <input
        type="text"
        placeholder="🔍 食材をさがす (例: たまご, とりむね)"
        value={search}
        onChange={handleSearch}
        className="w-full px-4 py-2 mb-3 rounded-lg common-border-orange  text-base bg-white"
        inputMode="search"
        autoComplete="off"
      />
      <div className="flex flex-wrap items-center gap-2 mb-2 text-sm">
        <span className="ml-2 font-semibold">選択中：</span>
        {selectedIds.length === 0 ? (
          <span className="text-gray-400">未選択</span>
        ) : (
          ingredients
            .filter((ing) => selectedIds.includes(ing.id))
            .map((ing) => (
              <IngredientTag key={ing.id} ingredient={ing} />
            ))
        )}
      </div>
      <div className="max-h-40 overflow-y-auto bg-white border border-orange-100 rounded-lg p-1">
        <ul className="divide-y divide-orange-100">
          {filteredIngredients.length === 0 ? (
            <li className="py-3 text-center text-gray-400">該当する食材がありません</li>
          ) : (
            filteredIngredients.map((ing) => (
              <li
                key={ing.id}
                className="flex items-center px-2 py-2 hover:bg-orange-50 transition-colors cursor-pointer"
                onClick={() => handleToggle(ing.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(ing.id)}
                  onChange={() => handleToggle(ing.id)}
                  className="accent-orange-500 w-4 h-4 mr-2"
                  tabIndex={-1}
                  readOnly
                />
                <span className="ml-1 text-sm text-gray-800">{ing.name}</span>
                {ing.type && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-100 text-orange-500 text-xs font-medium">
                    {ing.type}
                  </span>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default IngredientSearch;
