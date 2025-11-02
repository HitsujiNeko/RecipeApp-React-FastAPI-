import React, { useState, useEffect } from "react";
import PlaylistBulkAdd from "../feature/recipeForm/PlaylistBulkAdd";
import { fetchIngredients, fetchCategories, fetchYoutubePlaylist } from "../../api/api";

export default function PlaylistBulkAddSection() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [playlistVideos, setPlaylistVideos] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([fetchIngredients(), fetchCategories()])
      .then(([ingredientsData, categoriesData]) => {
        setIngredients(ingredientsData);
        setCategories(categoriesData);
      })
      .catch((err) => {
        setError("初期データの取得に失敗しました");
      });
  }, []);

  const handleFetchPlaylist = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchYoutubePlaylist(playlistUrl);
      setPlaylistVideos(data);
    } catch (e) {
      setError("再生リストの取得に失敗しました");
    }
    setLoading(false);
  };

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-orange-600">YouTubeプレイリスト一括追加</h2>
      <div className="flex flex-col sm:flex-row items-start gap-2 mt-2 mb-2">
        <input
          type="text"
          value={playlistUrl}
          onChange={e => setPlaylistUrl(e.target.value)}
          placeholder="再生リストのURLを貼り付け"
          className="border rounded px-2 py-1 w-72 text-sm"
        />
        <button
          type="button"
          onClick={handleFetchPlaylist}
          disabled={loading || !playlistUrl}
          className="bg-orange-400 text-white font-bold px-4 py-1 rounded hover:bg-orange-600 disabled:opacity-50 border border-orange-600"
        >
          取得
        </button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <PlaylistBulkAdd videos={playlistVideos} ingredients={ingredients} categories={categories} />
      <p className="text-xs text-gray-700 mt-2">
        再生リストのURLをコピペして「取得」ボタンを押すと、動画一覧を一括で登録できます。<br />
        再生リストは公開に設定しておく必要があります（非公開や限定公開はデータを取得できません）。<br />
        <span className="text-gray-400">＜開発メモ＞再生リストを公開にする方法を画像付きで追加予定</span>
      </p>
    </section>
  );
}