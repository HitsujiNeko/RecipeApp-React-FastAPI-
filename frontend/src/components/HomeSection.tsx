import React from "react";

const HomeSection: React.FC = () => (
  <section>
    <div className="container mt-5">
      <h1 className="text-center mb-4">レシピ提案アプリへようこそ</h1>
      <section className="mb-5">
        <h2 className="h4">アプリの概要</h2>
        <p>
          選んだ食材やカテゴリ（主菜、副菜、スープなど）から、YouTubeレシピ動画を提案するアプリです。
          <br />
          食材や作りたいジャンルから、最適なレシピを簡単に探せます。
        </p>
      </section>
      <section className="mb-5">
        <h2 className="h4">アプリの使い方</h2>
        <ul>
          <li>「レシピ提案」から食材やカテゴリを選択してレシピを検索</li>
          <li>「レシピ追加」から新しいレシピ（YouTube動画）を登録</li>
          <li>「レシピ一覧」から登録済みレシピを画像付きで一覧表示</li>
          <li>レシピ詳細ページで内容の確認・編集・削除が可能</li>
        </ul>
      </section>
      <section className="mb-5">
        <h2 className="h4">作成経緯</h2>
        <p>
          YouTubeの再生リストが200を超えるってくらい料理が好きで、アプリをつくってみました。
          <br />
          作成経緯は、YouTubeの料理動画再生リストが膨大になりすぎたためです。
          <br />
          最近は、レシピも本からクックパッドなどのWebサイト、YouTubeなどいろんな情報元があると思います。中でもYouTubeは料理の手元を見れるっていう点が唯一で、私はほとんどYouTubeをレシピの参考にしています。
          <br />
          しかし、冷蔵庫にある食材でレシピを考えるとき、レシピを再生リストから探すのが難しくなってきました。一応、再生リストを料理のカテゴリなどで分ける工夫はしていますが、結局毎回「食材名
          レシピ」で検索しなおしたり、検索するが面倒で同じ料理ばっかりになってしまったり・・・
          <br />
          <ul>
            <li>
              画像一覧表示でスクロールしなくても、レシピが視覚的に選択しやすい
            </li>
            <li>選択した食材でレシピをフィルターする</li>
          </ul>
          こんな機能があればなと思い、つくろうとおもったのがこのアプリです。
        </p>
      </section>
      <section className="mb-5">
        <h2 className="h4">機能の追加予定</h2>
        <ul>
          <li>
            YouTube URLからタイトル・概要欄・サムネイル自動取得(PyTubeによる)
          </li>
          <li>YouTube概要欄から食材名を自動抽出</li>
          <li>レシピ一覧でのカテゴリによる絞り込み</li>
          <li>デザインの改善</li>
        </ul>
      </section>
      <section className="mb-5">
        <h2 className="h4">技術スタック・工夫ポイント</h2>
        <ul>
          <li>
            <b>Django</b>（Python）で構築
          </li>
          <li>
            <b>Render</b>でデプロイ・CI/CD
          </li>
          <li>
            <b>JavaScript</b>で動的なUI・検索機能
          </li>
          <li>
            <b>Docker</b>で開発・本番環境を統一
          </li>
          <li>
            <b>GitHub</b>でバージョン管理・公開
          </li>
          <li>DjangoRestFrameworkによるAPI設計</li>
          <li>
            食材検索機能の工夫（食材モデルにreading：読み方を追加し、JavaScriptにより、使いやすい設計にしました）
          </li>
        </ul>
      </section>
      <div className="text-center mt-4"></div>
    </div>
  </section>
);

export default HomeSection;
