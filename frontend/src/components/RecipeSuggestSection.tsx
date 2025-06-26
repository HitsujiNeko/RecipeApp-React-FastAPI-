import React from "react";

const RecipeSuggestSection: React.FC = () => (
  <section>
    <h2>レシピ提案</h2>
    <div className="suggest-layout">
      <aside className="suggest-left">
        {/* 食材検索フォーム・カテゴリ選択・検索ボタン */}
        <p>食材検索フォーム・カテゴリ選択・検索ボタン</p>
      </aside>
      <main className="suggest-center">
        {/* 検索結果のレシピ一覧（グリッド） */}
        <p>検索結果のレシピ一覧</p>
      </main>
      <aside className="suggest-right">
        {/* 人気のレシピ（ランキング） */}
        <p>人気のレシピ（ランキング）</p>
      </aside>
    </div>
  </section>
);

export default RecipeSuggestSection;
