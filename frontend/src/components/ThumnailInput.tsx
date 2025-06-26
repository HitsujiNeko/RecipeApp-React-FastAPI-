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

const ThumbnailInput: React.FC<ThumbnailInputProps> = ({ youtubeUrl, onChange }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [uploadUrl, setUploadUrl] = useState<string>("");

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

  // カスタムURL入力時
  const handleCustomUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomUrl(e.target.value);
  };
  const handleCustomUrlApply = () => {
    setThumbnailUrl(customUrl);
    onChange(customUrl);
    setEditMode(false);
  };

  return (
    <div>
      <div>
        <label>サムネイル画像プレビュー:</label>
        <div style={{ margin: "8px 0" }}>
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt="サムネイル" style={{ width: 240, height: "auto" }} />
          ) : (
            <span>サムネイル画像なし</span>
          )}
        </div>
      </div>
      {!editMode && (
        <button type="button" onClick={() => setEditMode(true)}>
          サムネイル画像を変更
        </button>
      )}
      {editMode && (
        <div style={{ marginTop: 8 }}>
          <div>
            <label>
              画像ファイルをアップロード:
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
          <div style={{ marginTop: 8 }}>
            <label>
              画像URLを入力:
              <input type="text" value={customUrl} onChange={handleCustomUrl} placeholder="画像URLを入力" style={{ width: 240 }} />
            </label>
            <button type="button" onClick={handleCustomUrlApply} style={{ marginLeft: 8 }}>
              このURLを使う
            </button>
          </div>
          <button type="button" onClick={() => setEditMode(false)} style={{ marginTop: 8 }}>
            キャンセル
          </button>
        </div>
      )}
    </div>
  );
};

export default ThumbnailInput;

