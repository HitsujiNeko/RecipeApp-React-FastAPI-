import React, { useState, useEffect } from "react";
import IngredientSearch from "../common/IngredientSearch";
import CategorySelect from "../common/CategorySelect";
import ThumbnailInput from "../feature/recipeAdd/ThumnailInput";
import { fetchYoutubePlaylist, fetchIngredients } from "../../api/api";
import PlaylistBulkAdd from "../feature/recipeAdd/PlaylistBulkAdd";

export default function RecipeAddSection() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [ingredientIds, setIngredientIds] = useState<number[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // YouTube説明文から食材自動抽出
  useEffect(() => {
    if (!youtubeUrl) return;
    const fetchDescAndExtract = async () => {
      try {
        const data = await fetchYoutubePlaylist(youtubeUrl);
        if (Array.isArray(data) && data.length > 0 && data[0].description) {
          // 食材一覧取得
          let allIngredients = ingredients;
          if (ingredients.length === 0) {
            allIngredients = await fetchIngredients();
            setIngredients(allIngredients);
          }
          const desc = data[0].description;
          // 説明文から食材ID抽出
          const ids: number[] = [];
          for (const ing of allIngredients) {
            const re = new RegExp(ing.name + "|" + ing.reading, "g");
            if (desc && re.test(desc)) ids.push(ing.id);
          }
          setIngredientIds(ids);
        }
      } catch (e) {
        // 何もしない
      }
    };
    fetchDescAndExtract();
    // eslint-disable-next-line
  }, [youtubeUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          url: youtubeUrl,
          thumbnail: thumbnailUrl,
          notes,
          ingredient_ids: ingredientIds,
          category_id: categoryId,
        }),
      });
      if (!res.ok) throw new Error("登録に失敗しました");
      alert("レシピを追加しました");
      setName("");
      setYoutubeUrl("");
      setThumbnailUrl("");
      setIngredientIds([]);
      setCategoryId(null);
      setNotes("");
    } catch (e) {
      alert("登録に失敗しました");
    }
    setLoading(false);
  };

  return (
    <section>
      <details>
        <summary>YouTubeプレイリスト一括追加</summary>
        <PlaylistBulkAdd />
        <p>
          再生リストのURLをコピペして、一括で登録することもできます。
          <br />
          1件ずつ追加する場合は、以下のフォームに入力して「追加」ボタンを押してください。
          <br />
          再生リストは公開に設定しておく必要があります。（非公開や限定公開はデータを取得できません）
          ＜開発メモ＞再生リストを公開にする方法を追加する。（画像付きで）
        </p>
      </details>
      <form
        onSubmit={handleSubmit}
        className="bg-orange-100 p-4 rounded-lg border-2 common-border-orange outline-none mt-4 mb-8 max-w-lg"
      >
        <div>
          <label className="block font-bold mb-2">
            YouTube URL
            <input
              type="text"
              name="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              required
              className="bg-white rounded-md w-full mt-1 p-2 common-border-orange outline-none"
            />
          </label>
        </div>
        <div>
          <label className="block font-bold mb-2">
            レシピ名
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white rounded-md w-full mt-1 p-2 border common-border-orange outline-none"
            />
          </label>
        </div>
        <div>
          <ThumbnailInput youtubeUrl={youtubeUrl} onChange={setThumbnailUrl} />
        </div>
        <IngredientSearch
          selectedIds={ingredientIds}
          onChange={setIngredientIds}
        />
        <CategorySelect value={categoryId} onChange={setCategoryId} />
        <div>
          <label className="block font-bold mb-2 mt-2">
            メモ
            <textarea
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-24 p-3 rounded-lg mt-1 resize-none common-border-orange outline-none"
              placeholder="🖊調理時間や必要な調味料などを自由に記述"
            ></textarea>
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-400 w-full text-white font-bold py-2 px-4 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          追加
        </button>
      </form>
    </section>
  );
}
