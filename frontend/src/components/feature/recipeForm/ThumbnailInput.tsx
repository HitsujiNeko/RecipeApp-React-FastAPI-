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

  // YouTube URLからサムネイル自動生成（初回とyoutubeUrl変更時のみ）
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
    // eslint-disable-next-line
  }, [youtubeUrl]);

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
      <div className="flex justify-between items-center ">
        <label className="block font-bold ">サムネイル画像プレビュー</label>
        {!uploadMode && (
          <button
            type="button"
            onClick={() => setUploadMode(true)}
            className="ml-3 px-3  py-1 rounded-full bg-orange-500 text-white text-sm font-semibold shadow hover:bg-orange-600 transition-colors"
          >
            画像を自分で追加
          </button>
        )}
    </div>
        {uploadMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-5 w-11/12 max-w-xs mx-auto flex flex-col gap-4 relative animate-fadeIn">
              <button
                type="button"
                onClick={() => setUploadMode(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg font-bold focus:outline-none w-7 h-7 flex items-center justify-center p-0"
                aria-label="閉じる"
                style={{lineHeight: 1}}
              >
                ×
              </button>
              <div className="text-center mb-1">
                <span className="block text-base font-semibold text-orange-500">画像ファイルをアップロード</span>
                <span className="block text-xs text-gray-500">サムネイル画像を選択してください</span>
              </div>
              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    handleFileChange(e);
                    setUploadMode(false); // 画像選択時に自動で閉じる
                  }}
                  className="hidden"
                />
                <div className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-orange-300 bg-orange-50 text-orange-500 text-center hover:bg-orange-100 transition-colors cursor-pointer">
                  画像を選択
                </div>
              </label>
              <button
                type="button"
                onClick={() => setUploadMode(false)}
                className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-300 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
        <div className="mb-2">
          {thumbnailUrl ? (
            <div className="flex items-center gap-3 bg-white rounded-xl border border-orange-200 shadow-sm p-2">
              <span className="text-sm text-gray-600 flex-1">このまま登録すると右の画像がサムネイル画像になります</span>
              <img
                src={thumbnailUrl}
                alt="サムネイル"
                className="w-56 h-auto rounded-lg border border-gray-200 object-cover bg-gray-50 shadow"
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
                className="w-56 aspect-video rounded-lg border border-dashed border-gray-300 object-cover bg-gray-100"
              />
            </div>
          )}
        </div>
    </div>
  );
};

