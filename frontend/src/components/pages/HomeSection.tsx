import React from "react";



export default function HomeSection( { setNav }: { setNav: (nav: string) => void }) {

  return (
      <div className="px-1">
        <h1 className="text-2xl font-bold mb-1">YouTubeレシピ管理アプリ</h1>
        <p className="text-orange-500 mb-4">動画で見つけて、すぐ作れる！</p>
        <p>
          選んだ食材やカテゴリ（主菜、副菜、スープなど）から、YouTubeレシピ動画を提案するアプリです。
          <br />
          食材や作りたいジャンルから、最適なレシピを簡単に探せます。
        </p>
        <section>
          <button onClick={() => setNav("list")}>レシピ一覧ページへ</button>
          <button onClick={() => setNav("admin")}>管理ダッシュボードへ</button>
        </section>
        <div className="w-full bg-orange-50 rounded-lg p-3 mb-4">
          <h2 className="text-base font-semibold mb-1">アプリの特徴</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            <li>YouTube動画から自動でレシピ情報取得</li>
            <li>食材・カテゴリで絞り込み検索</li>
            <li>お気に入り管理・タグ付け</li>
          </ul>
        </div>
        <details className="my-3 bg-orange-50 rounded-lg p-3 shadow">
          <summary className="cursor-pointer font-semibold text-orange-600 text-base">
            作成経緯（クリックで開く）
          </summary>
          <div className="mt-2 text-sm text-gray-700">
            YouTubeの再生リストが200を超えるってくらい料理が好きで、アプリをつくってみました。
            <br />
            作成経緯は、YouTubeの料理動画再生リストが膨大になりすぎたためです。
            <br />
            最近は、レシピも本からクックパッドなどのWebサイト、YouTubeなどいろんな情報元があると思います。中でもYouTubeは料理の手元を見ながらYouTuberのトークも楽しめるっていう点が唯一で、私はYouTubeを見ながら料理を楽しんでいます。
            <br />
            しかし、冷蔵庫にある食材でレシピを考えるとき、レシピを再生リストから探すのが難しくなってきました。一応、再生リストを料理のカテゴリなどで分ける工夫はしていますが、結局毎回「食材名 レシピ」で検索しなおしたり、検索するのが面倒で同じ料理ばっかりになってしまったり・・・
            <br />
            <ul className="list-disc pl-5 my-2">
              <li>使う食材やカテゴリ、タグでレシピを簡単に検索したい</li>
              <li>動画を開かなくても使う食材を把握したい</li>
              <li>おしゃれなデザインでレシピを管理したい</li>
            </ul>
            こんな機能があればなと思い、つくろうとおもったのがこのアプリです。
          </div>
        </details>

        <footer className="mt-6 text-base text-gray-500">
          リンク：
          <a href="https://github.com/HitsujiNeko/RecipeApp-React-FastAPI-" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {" | "}
          <a href="https://siip.hateblo.jp/about" target="_blank" rel="noopener noreferrer">
            開発者ブログ
          </a>
        </footer>
      </div>
);

}

