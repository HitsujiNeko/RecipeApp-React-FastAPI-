# アプリ概要

## アプリ名 もこもこきっちん（仮）

- URL: https://recipe-app-frontend-kappa.vercel.app

無料デプロイのため、バックエンドの起動に時間がかかります。

デプロイ先クラウドサービス
- フロントエンド: Vercel
- バックエンド: Render 　（起動に 10~20 秒）
- データベース: Supabase

## アプリ概要

YouTube のレシピ動画を簡単に登録・整理・検索できるアプリ

ユーザーは、YouTube のレシピ動画の URL を入力するだけで、レシピ名、使用食材、サムネイル画像などの情報を自動抽出して保存できます。
保存したレシピは、食材やカテゴリで絞り込み・検索でき、必要なレシピを素早く見つけられます。

# デモ・スクリーンショット
- ホーム画面
<img width="400" height="736" alt="image" src="https://github.com/user-attachments/assets/2ecfb879-2eb6-4507-acbb-07de917620b1" />

- デモ①：URLを入力するだけで簡単にレシピを登録できる！

https://github.com/user-attachments/assets/1756cd68-ed0b-4e40-84e2-d1771db46216

- デモ②： 食材・カテゴリで簡単に検索！

https://github.com/user-attachments/assets/d3562fb4-28db-4c21-9034-4f1d1d1b587a



# 目標

アプリの開発を通じて以下の目標を達成する

- 長期インターンシップでの開発業務で開発効率を上げるために React, FastAPI, Tailwind CSS のスキルを身につける

→ 　開発におけるベストプラクティス（ファイルの配置やコンポーネントの設計、効率的なコーディング手法）を学ぶことができた。

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
<img width="640" height="210" alt="image" src="https://github.com/user-attachments/assets/373c051f-ddea-4399-b4dc-3fdc53d20ad4" />


- 

解決する課題：

- レシピ管理や食材別のレシピ提案を通じて YouTube のレシピ動画の利便性を向上させること
- YouTube 上のレシピ動画を簡単に登録・整理できる仕組みを提供すること
- 食材やカテゴリに基づいてレシピを提案することで、ユーザーが必要なレシピを素早く見つけられるようにすること

# MVP

- YouTube 上のレシピ動画を URL で簡単に登録できる（食材やレシピ名、レシピカード画像の自動抽出）
- レシピ一覧・詳細表示
- レシピのカテゴリー・材料による検索・絞り込み

この３つができれば、とりあえず MVP としては成立すると考えている。

理由：
YouTube プラットフォームの再生リスト機能の代替として、ユーザーが自分好みのレシピ集を簡単に作成・管理できることが主目的であるため。

# 今後の開発アイデア

- YouTube チャンネルをレシピのモデルに追加
  → 　チャンネルでレシピをソートできるようにする

- レシピカードのサムネイル画像部分を別コンポーネント化
  →ThumnailInput 　プレビュー画像で、タグやチャンネルアイコンも表示できるようにする

- 食材自動抽出機能を改善（現状は、説明文からの部分一致で抽出している）
  → 　 AI を活用して、より精度の高い食材抽出を実現する

### 起動方法

#### バックエンド

<details>
<summary>セットアップ・起動手順（クリックで展開）</summary>

1. ライブラリインストール

```bash
pip install -r requirements.txt
```

2. `.env` ファイルを作成し、必要な環境変数を設定

```env
YOUTUBE_API_KEY=あなたのYouTube APIキー
DATABASE_URL=あなたのSupabase DB URL
```

3. 初期データ投入（食材マスタなど）

```bash
python seed_data.py
```

4. マイグレーション実行（モデル変更時のみ）

```bash
alembic upgrade head
```

5. サーバー起動

```bash
cd backend
uvicorn main:app --reload
```

</details>

#### フロントエンド

<details>
<summary>セットアップ・起動手順（クリックで展開）</summary>

1. ライブラリインストール

```bash
npm install
```

2. `.env` ファイルを作成し、API エンドポイントを設定

```env
REACT_APP_API_BASE_URL=http://localhost:8000
```

3. サーバー起動

```bash
cd frontend
npm start
```

</details>

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

## 📕 ブログ

日々の学習内容を時々、ブログにアウトプットしています。

[ブログはこちら](https://siip.hateblo.jp/about)

## 🛠 使用技術

<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white"/>
  <img src="https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white"/>
  <img src="https://img.shields.io/badge/Markdown-000000?style=flat&logo=markdown&logoColor=white"/>
</p>
