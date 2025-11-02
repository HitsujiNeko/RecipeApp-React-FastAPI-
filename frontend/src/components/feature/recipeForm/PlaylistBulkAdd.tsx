import React, { useState, useEffect } from "react";
import { bulkAddRecipes } from "../../../api/api";
import { IngredientModel, CategoryModel } from "../../../types/models";
import IngredientSearch from "../../common/IngredientSearch";

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
};

export default function PlaylistBulkAdd({ videos, ingredients, categories }: PlaylistBulkAddProps) {
  const [rows, setRows] = useState<any[]>([]);
  const [selected, setSelected] = useState<boolean[]>([]);

  // 説明文から食材IDリストを抽出する関数
  function extractIngredientIds(desc: string): number[] {
    const ids: number[] = [];
    for (const ing of ingredients) {
      const re = new RegExp(ing.name + "|" + ing.reading, "g");
      if (desc && re.test(desc)) ids.push(ing.id);
    }
    return ids;
  }

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
        youtube_channel_id: v.dbChannelId || null,
      }))
    );
    setSelected(videos.map(() => true));
  }, [videos, categories]);

  // 編集ハンドラ
  const handleRowChange = (i: number, key: string, value: any) => {
    setRows((prev) =>
      prev.map((row, idx) => (idx === i ? { ...row, [key]: value } : row))
    );
  };

  // 一括追加
  const handleBulkAdd = async () => {
    const recipes = rows
      .filter((_, i) => selected[i])
      .map((row) => ({
        name: row.name,
        url: row.url,
        thumbnail: row.thumbnail,
        notes: row.notes,
        ingredient_ids: row.ingredientIds,
        category_id: row.categoryId,
        youtube_channel_id: row.youtube_channel_id || null,
      }));
    await bulkAddRecipes(recipes);
    alert("一括追加しました");
  };

  if (!rows.length) return null;

  return (
    <div>
      <table
        border={1}
        cellPadding={4}
        style={{ marginTop: 16, minWidth: 900 }}
      >
        <thead>
          <tr>
            <th>選択</th>
            <th>レシピ名</th>
            <th>サムネイル</th>
            <th>食材</th>
            <th>カテゴリ</th>
            <th>メモ</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={videos[i]?.videoId || i}>
              <td>
                <input
                  type="checkbox"
                  checked={selected[i]}
                  onChange={() =>
                    setSelected((sel) =>
                      sel.map((s, idx) => (idx === i ? !s : s))
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) =>
                    handleRowChange(i, "name", e.target.value)
                  }
                  style={{ width: 160 }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.thumbnail}
                  onChange={(e) =>
                    handleRowChange(i, "thumbnail", e.target.value)
                  }
                  style={{ width: 180 }}
                />
                <div>
                  <img src={row.thumbnail} alt="thumb" width={80} />
                </div>
              </td>
              <td style={{ minWidth: 180 }}>
                <IngredientSearch
                  selectedIds={row.ingredientIds}
                  onChange={(ids) =>
                    handleRowChange(i, "ingredientIds", ids)
                  }
                  ingredients={ingredients}
                />
              </td>
              <td>
                <select
                  value={row.categoryId || ""}
                  onChange={(e) =>
                    handleRowChange(
                      i,
                      "categoryId",
                      Number(e.target.value)
                    )
                  }
                >
                  <option value="">選択</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <textarea
                  value={row.notes}
                  onChange={(e) =>
                    handleRowChange(i, "notes", e.target.value)
                  }
                  style={{ width: 140 }}
                />
              </td>
              <td>
                <a
                  href={row.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  動画
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleBulkAdd} style={{ marginTop: 16 }}>
        一括追加
      </button>
    </div>
  );
}
