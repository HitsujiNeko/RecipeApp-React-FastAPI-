# アプリ概要
## アプリ名 もこもこきっちん（仮）
- URL: https://recipe-app-frontend-kappa.vercel.app

無料デプロイのため、バックエンドの起動に時間がかかります。


## アプリ概要
YouTube のレシピ動画を簡単に登録・整理・検索できるアプリ

ユーザーは、YouTube のレシピ動画の URL を入力するだけで、レシピ名、使用食材、サムネイル画像などの情報を自動抽出して保存できます。
保存したレシピは、食材やカテゴリで絞り込み・検索でき、必要なレシピを素早く見つけられます。

# 目標

アプリの開発を通じて以下の目標を達成する

- 長期インターンシップでの開発業務で開発効率を上げるためにReact, FastAPI, Tailwind CSS のスキルを身につける

- 課題を解決できるプロダクトを自分の力で作り上げる経験を積む

- アプリ開発を通じて、課題解決の視点を身につける

- デザインの知識を身につける

AI は活用するが、あくまでも目的は自分で理解して考えて実装できるようになること
そのため、クオリティや開発スピードよりもスキル習得を優先して開発する

# 解決する課題
YouTube のレシピ動画の強みと弱み
強み：
- 豊富なレシピ動画が無料で視聴可能
- 動画で調理手順がわかりやすい
- YouTube というプラットフォームの利便性（リュウジのバズレシピなど再生数の多い動画が多い）
弱み：
- レシピ管理が難しい（再生リスト機能はあるが、レシピ検索や食材別の整理ができない）
- 動画の中で使用されている食材を把握しづらい（開かないとわからない、概要欄に書かれていないことも多い）
- レシピ動画の保存・整理が手間

解決する課題：
- レシピ管理や食材別のレシピ提案を通じてYouTube のレシピ動画の利便性を向上させること
- YouTube 上のレシピ動画を簡単に登録・整理できる仕組みを提供すること
- 食材やカテゴリに基づいてレシピを提案することで、ユーザーが必要なレシピを素早く見つけられるようにすること

# MVP
- YouTube上のレシピ動画をURLで簡単に登録できる（食材やレシピ名、レシピカード画像の自動抽出）
- レシピ一覧・詳細表示
- レシピのカテゴリー・材料による検索・絞り込み

この３つができれば、とりあえず MVP としては成立すると考えている。

理由：
YouTubeプラットフォームの再生リスト機能の代替として、ユーザーが自分好みのレシピ集を簡単に作成・管理できることが主目的であるため。

# 今後の開発アイデア

- YouTube チャンネルをレシピのモデルに追加
  → 　チャンネルでレシピをソートできるようにする

- レシピカードのサムネイル画像部分を別コンポーネント化
  →ThumnailInput　プレビュー画像で、タグやチャンネルアイコンも表示できるようにする

- 食材自動抽出機能を改善（現状は、説明文からの部分一致で抽出している）
  →　AI を活用して、より精度の高い食材抽出を実現する

# 開発用メモ
- バックエンドでモデル定義を変更したら
  alembic でマイグレーションファイルを作成・適用すること
  ```bash
  alembic revision --autogenerate -m "Add youtube channel to Recipe"
  alembic upgrade head
  ```


### 起動方法

- バックエンド
  初回のみ： 
  1. ライブラリインストール
  
  pip install -r requirements.txt

  2. env ファイルを作成し、必要な環境変数を設定
  YOU_TUBE_API_KEY=<Your YouTube API Key>
  DATABASE_URL=<Your Supabase Database URL>

  起動：
  ```bash
  cd backend
  ```

  ```bash
  uvicorn main:app --reload
  ```

- フロントエンド
  初回のみ：
  1. ライブラリインストール
  ```bash
  npm install
  ```
  2. env ファイルを作成し、必要な環境変数を設定
  REACT_APP_API_BASE_URL=http://localhost:8000

  ```bash
  REACT_APP_API_BASE_URL=http://localhost:8000
  ```

起動：
  ```bash
  cd frontend
  ```
  ```bash
  npm start
  ```


### 検証用 YouTube プレイリスト

https://youtube.com/playlist?list=PL1QpUQswXWtBuQY9WuGLts5Ce003wBxIj&si=HefULTbnN384qSmO


### 開発方針


1. MVP を Web で完成

- FastAPI ＋ React でバックエンド・フロントを形にする
- モバイル対応の UI を意識してレスポンシブに作る

2. モバイルアプリ化

- Expo（React Native の開発環境）をセットアップ
- 既存の React コンポーネントを React Native 用に移植
- FastAPI と通信（API 利用）

3. テスト

- Expo Go アプリで実機テスト
- iOS/Android 両方で挙動確認

4. リリース準備

- Apple Developer Program（年間約 12,000 円）登録
- Google Play Developer（買い切り 25 ドル）登録
- アイコン・スクショ・説明文を準備

5. ストア申請

- iOS は審査が厳しい（1 週間前後）
- Android は比較的早い（1 日程度）

## 😀 アプリ概要

## 🌐 ポートフォリオサイト

[ポートフォリオはこちら](https://takumid0419.pythonanywhere.com/)

## 📕 ブログ

日々の学習内容を時々、ブログにアウトプットしています。
[ブログはこちら](https://siip.hateblo.jp/about)

## 🛠 スキルセット

<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/QGIS-589632?style=flat&logo=qgis&logoColor=white"/>
</p>
