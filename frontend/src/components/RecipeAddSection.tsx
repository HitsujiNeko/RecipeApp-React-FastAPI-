import React, { useState } from "react";
import IngredientSearch from "./IngredientSearch";
import CategorySelect from "./CategorySelect";
import ThumbnailInput from "./ThumnailInput";

const RecipeAddSection: React.FC = () => {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  // IngredientSearchの選択状態は本来propsで受け取るべきだが、今回は土台なので省略

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでAPI送信処理を実装
    alert("レシピ追加処理（ダミー）");
  };

  return (
    <section>
      <h2>レシピ追加</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            レシピ名
            <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            YouTube URL
            <input
              type="text"
              name="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <ThumbnailInput youtubeUrl={youtubeUrl} onChange={setThumbnailUrl} />
        </div>
        <div>
          <IngredientSearch />
        </div>
        <div>
          <CategorySelect value={categoryId} onChange={setCategoryId} />
        </div>
        <div>
          <label>
            メモ<textarea name="notes"></textarea>
          </label>
        </div>
        <button type="submit">追加</button>
      </form>
    </section>
  );
};

export default RecipeAddSection;
