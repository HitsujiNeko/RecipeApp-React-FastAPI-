import React from "react";

const RecipeDetailSection: React.FC = () => (
  <section>
    <h2>レシピ詳細</h2>
    <div className="detail-layout">
      <div className="detail-image">
        {/* サムネイル画像 */}
        <img src="#" alt="サムネイル" />
      </div>
      <div className="detail-info">
        <p>レシピ名: 〇〇</p>
        <p>YouTube動画リンク: <a href="#">リンク</a></p>
        <p>使用する食材: 〇〇</p>
        <p>備考: 〇〇</p>
        <button>編集</button>
        <button>削除</button>
      </div>
    </div>
  </section>
);

export default RecipeDetailSection;
