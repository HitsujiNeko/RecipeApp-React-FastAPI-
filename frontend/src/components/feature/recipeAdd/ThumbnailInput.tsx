import React, { useState, useEffect, ChangeEvent } from "react";

// props: youtubeUrl（親から受け取る or 内部で管理）, onChange（サムネイルURLが変わった時に親へ通知）
type ThumbnailInputProps = {
  youtubeUrl: string;
  onChange: (url: string) => void;
};

const extractYoutubeId = (url: string): string | null => {
  // 通常URL, ショートURL両対応
  const regExp =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

export default function ThumbnailInput({ youtubeUrl, onChange }: ThumbnailInputProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(""); // サムネイルURLの状態
  const [uploadMode, setUploadMode] = useState(false); // 編集モードの状態
  const [uploadUrl, setUploadUrl] = useState<string>(""); // アップロード画像用

  // YouTube URLからサムネイル自動生成
  useEffect(() => {
    const id = extractYoutubeId(youtubeUrl);
    if (id) {
      const url = `https://img.youtube.com/vi/${id}/0.jpg`;
      setThumbnailUrl(url);
      onChange(url);
    } else {
      setThumbnailUrl("");
      onChange("");
    }
  }, [youtubeUrl, onChange]);

  // 画像アップロード時
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadUrl(url);
      setThumbnailUrl(url);
      onChange(url);
    }
  };
  return (
    <div>
      <div>
        <label className="block font-bold mb-2">サムネイル画像プレビュー</label>
        <div className="mb-2">
          {thumbnailUrl ? (
            <div className="flex items-center gap-3 bg-white rounded-xl border border-orange-200 shadow-sm p-2">
              <span className="text-sm text-gray-600 flex-1">このまま登録すると右の画像がサムネイル画像になります</span>
              <img
                src={thumbnailUrl}
                alt="サムネイル"
                className="w-44 h-auto rounded-lg border border-gray-200 object-cover bg-gray-50 shadow"
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 shadow-sm p-2">
              <span className="text-sm text-gray-500 flex-1">
                YouTubeURLを入力すると　右にサムネイル画像が自動表示されます
              </span>
              <img
                src="/no-thumbnail.jpg"
                alt="ダミーサムネイル"
                className="w-44 h-auto rounded-lg border border-dashed border-gray-300 object-cover bg-gray-100"
              />
            </div>
          )}
        </div>
      </div>
      {!uploadMode && (
        <button type="button" onClick={() => setUploadMode(true)}>
          画像を自分で追加
        </button>
      )}
      {uploadMode && (
        <div className="mt-2">
          <div>
            <label>
              画像ファイルをアップロード:
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
          <button type="button" onClick={() => setUploadMode(false)} style={{ marginTop: 8 }}>
            キャンセル
          </button>
        </div>
      )}
    </div>
  );
};

