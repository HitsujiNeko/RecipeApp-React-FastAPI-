import React from "react";




export default function HomeSection({ setNav }: { setNav: (nav: string) => void }) {
  return (
    <div className="px-2 py-4 max-w-md mx-auto">
      {/* ヒーローセクション */}
      <div className="flex flex-col items-center py-4">
        <img src="/app_icon.png" alt="App Icon" className="w-16 h-16 mb-2" />
        <h1 className="text-3xl font-bold text-orange-600 mb-2">YouTubeレシピ管理アプリ</h1>
        <p className="text-lg text-gray-700 mb-2">動画で見つけて、すぐ作れる！</p>
        <p className="text-sm text-gray-500 mb-2 text-center">
          食材やカテゴリから、YouTubeレシピ動画を提案<br />
          最適なレシピを簡単に探せます
        </p>
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex gap-4 justify-center mb-6">
        <button
          className="bg-orange-500 text-white rounded-lg shadow px-4 py-2 font-semibold hover:bg-orange-600 transition"
          onClick={() => setNav("list")}
        >
          レシピ一覧
        </button>
      </div>

      {/* アプリの特徴 */}
      <div className="bg-orange-50 rounded-lg p-4 mb-4 shadow">
        <h2 className="text-base font-semibold mb-2 text-orange-700">アプリの特徴</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>動画からレシピ情報を簡単に取得！！</li>
          <li>食材・カテゴリで絞り込み検索</li>
          <li>お気に入り管理・タグ付け</li>
        </ul>
      </div>

      {/* 作成経緯 */}
      <details className="my-3 bg-orange-50 rounded-lg p-4 shadow">
        <summary className="cursor-pointer font-semibold text-orange-600 text-base">
          作成経緯（クリックで開く）
        </summary>
        <div className="mt-2 text-sm text-gray-700">
          YouTubeの再生リストが200を超えるほど料理が好きで、アプリをつくりました。<br />
          冷蔵庫の食材からレシピを探すとき、再生リストや検索が面倒になり、
          <span className="font-bold text-orange-600">「食材・カテゴリ・タグで簡単に検索できる」</span>アプリが欲しくなったのがきっかけです。<br />
          <ul className="list-disc pl-5 my-2">
            <li>使う食材やカテゴリ、タグでレシピを簡単に検索したい</li>
            <li>動画を開かなくても使う食材を把握したい</li>
            <li>おしゃれなデザインでレシピを管理したい</li>
          </ul>
        </div>
      </details>

      {/* フッター */}
      <footer className="mt-8 text-base text-gray-500 text-center">
        <span>リンク：</span>
        <a
          href="https://github.com/HitsujiNeko/RecipeApp-React-FastAPI-"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 underline"
        >
          GitHub
        </a>
        {" | "}
        <a
          href="https://siip.hateblo.jp/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 underline"
        >
          開発者ブログ
        </a>
      </footer>
    </div>
  );
}

