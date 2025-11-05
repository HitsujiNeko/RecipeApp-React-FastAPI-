import React, { useState, useEffect } from "react";
import { bulkAddRecipes } from "../../../api/api";
import { IngredientModel, CategoryModel ,RecipeTagModel, RecipeModel, RecipeCreateRequest } from "../../../types/models";
import PlaylistBulkAddRow from "./PlaylistBulkAddRow";
import { validateRecipeForm } from "../../../utils/validation";

type VideoData = {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  channelTitle?: string;
  channelIcon?: string;
  channelId?: string;
  dbChannelId?: number | null;
};

type PlaylistBulkAddProps = {
  videos: VideoData[];
  ingredients: IngredientModel[];
  categories: CategoryModel[];
  tags: RecipeTagModel[];
  existingRecipes : RecipeModel[];
};

export default function PlaylistBulkAdd({ videos, ingredients, categories ,tags, existingRecipes}: PlaylistBulkAddProps) {
  const [rows, setRows] = useState<any[]>([]);
  const [selected, setSelected] = useState<boolean[]>([]);
  const [errors, setErrors] = useState<{[key: number]: string}>({});

  // 説明文から食材IDリストを抽出する関数
  function extractIngredientIds(desc: string): number[] {
    const ids: number[] = [];
    for (const ing of ingredients) {
      const re = new RegExp(ing.name + "|" + ing.reading, "g");
      if (desc && re.test(desc)) ids.push(ing.id);
    }
    return ids;
  }
  // 1行分の編集ハンドラ
  const handleRowChange = (i: number, key: string, value: any) => {
    setRows((prev) =>
      prev.map((row, idx) => (idx === i ? { ...row, [key]: value } : row))
    );
  };

  

  // videosが変わったら編集用rows/selectedを初期化
  useEffect(() => {
    if (!videos || videos.length === 0) {
      setRows([]);
      setSelected([]);
      return;
    }
    setRows(
      videos.map((v) => ({
        name: v.title,
        url: v.url,
        thumbnail: v.thumbnail,
        notes: "",
        ingredientIds: extractIngredientIds(v.description),
        categoryId: categories[0]?.id || null,
        tagIds : [],
        youtube_channel_id: v.dbChannelId || null,
      }))
    );
    setSelected(videos.map(() => true));
  }, [videos, categories]);

  // 一括追加
  const handleBulkAdd = async () => {
    // 既存レシピ一覧を取得
    // バリデーション
    const newErrors: {[key: number]: string} = {};
    const validRecipes: RecipeCreateRequest[] = [];
    rows.forEach((row, i) => {
      if (!selected[i]) return;
      const req: RecipeCreateRequest = {
        name: row.name,
        url: row.url,
        thumbnail: row.thumbnail,
        notes: row.notes,
        ingredient_ids: row.ingredientIds,
        category_id: row.categoryId,
        tag_ids: row.tagIds,
        youtube_channel_id: row.youtube_channel_id || null,
      };

      const err = validateRecipeForm(req, existingRecipes);
      if (Object.keys(err).length > 0) {
        // エラー内容をまとめて表示
        newErrors[i] = Object.values(err).join("、");
      } else {
        validRecipes.push(req);
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      alert("入力エラーのある行があります。内容を確認してください。");
      return;
    }
    if (validRecipes.length === 0) {
      alert("追加可能なレシピがありません。");
      return;
    }
    await bulkAddRecipes(validRecipes);
    alert("一括追加しました");
  };

  if (!rows.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {rows.map((row, i) => (
        <div key={i} className="relative ">
          <div className="absolute right-0 top-0">
            <input
              type="checkbox"
              checked={selected[i]}
              onChange={e => {
                const newSelected = [...selected];
                newSelected[i] = e.target.checked;
                setSelected(newSelected);
              }}
              className="w-6 h-6 accent-orange-500 mt-4 mr-2"
            />
          </div>
          <div className="p-1">
            <PlaylistBulkAddRow
              row={row}
              index={i}
              categories={categories}
              ingredients={ingredients}
              tags={tags}
              onChange={handleRowChange}
            />
          </div>
        </div>
      ))}
      <button
        onClick={handleBulkAdd}
        className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg mt-4 text-lg"
      >
        一括追加
      </button>
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
          <h3 className="font-bold mb-2">エラー一覧</h3>
          <ul className="list-disc list-inside">
            {Object.entries(errors).map(([index, message]) => (
              <li key={index}>
                {`行 ${Number(index) + 1}: ${message}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
