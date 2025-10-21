import React, { useState, useEffect } from "react";
import {
  fetchYoutubePlaylist,
  bulkAddRecipes,
  fetchIngredients,
  fetchCategories,
} from "../api/api";
import { IngredientModel, CategoryModel } from "../types/models";
import IngredientSearch from "./IngredientSearch";
import styles from "./PlaylistBulkAdd.module.css"; // スタイルを適用するためのCSSファイル

const PlaylistBulkAdd: React.FC = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [selected, setSelected] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [rows, setRows] = useState<any[]>([]); // 各動画の編集状態

  // 食材・カテゴリ一覧を取得
  useEffect(() => {
    fetchIngredients().then(setIngredients);
    fetchCategories().then(setCategories);
  }, []);

  // 説明文から食材IDリストを抽出
  function extractIngredientIds(desc: string): number[] {
    const ids: number[] = [];
    for (const ing of ingredients) {
      const re = new RegExp(ing.name + "|" + ing.reading, "g");
      if (desc && re.test(desc)) ids.push(ing.id);
    }
    return ids;
  }

  // プレイリスト取得
  const fetchPlaylist = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchYoutubePlaylist(playlistUrl);
      if (!Array.isArray(data) || data.length === 0 || data[0].error) {
        setError(
          "取得できません。再生リストのプライバシー設定が非公開になっていないか確認してください。"
        );
        setVideos([]);
        setRows([]);
        setSelected([]);
        setLoading(false);
        return;
      }
      setVideos(data);
      setSelected(data.map(() => true));
      setRows(
        data.map((v: any) => {
          // サムネイル画質を1段階上げる
          function upgradeThumbnail(url: string) {
            if (!url) return url;
            if (url.includes("default.jpg")) {
              if (url.includes("mqdefault.jpg")) {
                return url.replace("mqdefault.jpg", "hqdefault.jpg");
              } else if (url.includes("hqdefault.jpg")) {
                return url.replace("hqdefault.jpg", "sddefault.jpg");
              } else if (url.includes("sddefault.jpg")) {
                return url.replace("sddefault.jpg", "maxresdefault.jpg");
              } else if (url.includes("default.jpg")) {
                return url.replace("default.jpg", "mqdefault.jpg");
              }
            }
            return url;
          }
          return {
            name: v.title,
            url: v.url,
            thumbnail: upgradeThumbnail(v.thumbnail),
            notes: "",
            ingredientIds: extractIngredientIds(v.description),
            categoryId: categories[0]?.id || null,
          };
        })
      );
    } catch (e: any) {
      setError(
        "取得できません。再生リストのプライバシー設定が非公開になっていないか確認してください。"
      );
      setVideos([]);
      setRows([]);
      setSelected([]);
    }
    setLoading(false);
  };

  // 編集ハンドラ
  const handleRowChange = (i: number, key: string, value: any) => {
    setRows((prev) =>
      prev.map((row, idx) => (idx === i ? { ...row, [key]: value } : row))
    );
  };

  // 食材選択トグル
  const toggleIngredient = (i: number, ingId: number) => {
    setRows((prev) =>
      prev.map((row, idx) =>
        idx === i
          ? {
              ...row,
              ingredientIds: row.ingredientIds.includes(ingId)
                ? row.ingredientIds.filter((id: number) => id !== ingId)
                : [...row.ingredientIds, ingId],
            }
          : row
      )
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
      }));
    await bulkAddRecipes(recipes);
    alert("一括追加しました");
  };

  return (
    <section>
      <input
        type="text"
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
        placeholder="プレイリストURLを入力"
        style={{ width: 320 }}
      />
      <button onClick={fetchPlaylist} disabled={loading}>
        取得
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        {rows.length > 0 && (
          <>
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
          </>
        )}
      </div>
    </section>
  );
};

export default PlaylistBulkAdd;
