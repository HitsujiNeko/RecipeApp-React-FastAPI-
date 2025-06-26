import React, { useState } from "react";
import { fetchYoutubePlaylist, bulkAddRecipes } from "../api/api";

const PlaylistBulkAdd: React.FC = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [selected, setSelected] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPlaylist = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchYoutubePlaylist(playlistUrl);
      setVideos(data);
      setSelected(data.map(() => true));
    } catch (e: any) {
      setError("取得に失敗しました");
    }
    setLoading(false);
  };

  const handleBulkAdd = async () => {
    const recipes = videos
      .filter((_, i) => selected[i])
      .map((v) => ({
        name: v.title,
        url: v.url,
        thumbnail: v.thumbnail,
        notes: v.description,
        // ingredients, category_id などは後で編集可能
      }));
    await bulkAddRecipes(recipes);
    alert("一括追加しました");
  };

  return (
    <section>
      <h2>YouTubeプレイリスト一括追加</h2>
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
        {videos.length > 0 && (
          <>
            <table border={1} cellPadding={4} style={{ marginTop: 16 }}>
              <thead>
                <tr>
                  <th>選択</th>
                  <th>サムネイル</th>
                  <th>タイトル</th>
                  <th>説明</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((v, i) => (
                  <tr key={v.videoId}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected[i]}
                        onChange={() => {
                          setSelected((sel) =>
                            sel.map((s, idx) => (idx === i ? !s : s))
                          );
                        }}
                      />
                    </td>
                    <td>
                      <img src={v.thumbnail} alt="thumb" width={80} />
                    </td>
                    <td>{v.title}</td>
                    <td>{v.description}</td>
                    <td>
                      <a href={v.url} target="_blank" rel="noopener noreferrer">
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
