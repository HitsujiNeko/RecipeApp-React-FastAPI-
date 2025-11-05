---
mode: agent
---
# リポジトリのURL
https://github.com/HitsujiNeko/RecipeApp-React-FastAPI-

# 現在の開発状況＆方針

- レシピ追加機能をフォームと親コンポーネントに分割する
- 分割したフォームを用いてレシピ編集機能を追加する

# 現在の開発状況＆方針

- レシピ追加機能をフォームと親コンポーネントに分割する
- 分割したフォームを用いてレシピ編集機能を追加する
- 11/4までにポートフォリオとして公開できる状態にすることを目標（現在10/31）

## 開発の具体的な方針（レシピ編集画面）

- レシピ編集はレシピ詳細画面から遷移する想定
- 編集画面は RecipeForm を流用し、初期値を既存レシピデータで埋める
- バリデーションやYouTube URLの自動取得も追加画面と同様に行う
frontend\src\utils\validation.ts, frontend\src\utils\youtubeData.ts に共通関数を実装済み
- 既存レシピデータの取得は RecipeDetailSection で行い、編集画面に渡す


---
# 公開方法

## 使用するDB
- **PostgreSQL（クラウドDB）**
  - Supabase（無料枠）

## 使用するサービス
- **バックエンド（FastAPI）**: Render（無料枠あり）またはRailway/Supabase Functions
- **フロントエンド（React）**: Vercel（無料枠あり）またはNetlify
- **DB**: Supabase PostgreSQL（無料枠）

## 公開までの流れ
1. **SupabaseでPostgreSQLインスタンスを作成**
  - サインアップし、プロジェクトを作成。DB接続情報を取得
2. **FastAPIのDB接続設定をPostgreSQL用に変更**
  - `.env`や`alembic.ini`のDB URLをSupabaseのものに書き換え
3. **Alembicでマイグレーションを実行**
  - `alembic upgrade head`でDBスキーマを反映　



4. **バックエンド（FastAPI）をRender等にデプロイ**
  - GitHub連携で自動デプロイ可。環境変数でDB URLを設定

  現在、ここまで完了済み　（Render ,supabaseで公開したが、DBの接続が不安定なことがあるため、改善予定）
  
5. **フロントエンド（React）をVercel等にデプロイ**
  - GitHub連携で自動デプロイ可。APIエンドポイントをRenderのURLに合わせる
6. **動作確認・データ投入**
  - 必要に応じてseed_data.pyで初期データ投入

※全て無料枠で運用可能（アクセス数・容量に制限あり）

# アプリ概要

RecipeApp-React-FastAPI- は、React（フロントエンド）と FastAPI（バックエンド）を組み合わせたレシピ管理 Web アプリです。
ユーザーはレシピの一覧表示、詳細閲覧、追加、カテゴリー・材料検索、YouTube プレイリストの一括追加などが可能です。

# ペルソナ

- レシピ本やレシピサイトではなく、YouTube でレシピ動画を探し、実際に料理を作ることが多いユーザー。
- 料理が得意というよりかは、自炊を頑張りたい初心者層。（レシピ見なくても料理できる人はあまり使わないだろう）

- ストーリー
  YouTube 上では動画で視聴できるというメリットがあり、私自身もよく利用している。日々新しい動画が更新される、登録者の多い人気 YouTuber のレシピ動画を見て料理を作ることが多い。しかし、動画を一つ一つ保存したり、後で見返すのが面倒であるため、レシピを一元管理できるアプリが欲しいと感じた。そこで、アプリを開発し、YouTube のレシピ動画を簡単に保存・管理できるようにしたい。

# MVP
- YouTube上のレシピ動画をURLで簡単に登録できる（食材やレシピ名、レシピカード画像の自動抽出）
- レシピ一覧・詳細表示
- レシピのカテゴリー・材料による検索・絞り込み
この３つができれば、とりあえず MVP としては成立すると考えている。
理由：　
YouTubeプラットフォームの再生リスト機能の代替として、ユーザーが自分好みのレシピ集を簡単に作成・管理できることが主目的であるため。

# ディレクトリ構造（2025/11/2 時点・最新）

RecipeApp-React-FastAPI-/
├── README.md
├── start_all.bat
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── seed_data.py
│   ├── test.db
│   └── alembic/
│       ├── env.py
│       ├── README
│       ├── script.py.mako
│       └── versions/
│           └── f262b2fa9ba6_更新.py
├── docs/
│   ├── api_design.md
│   ├── er_diagram.md
│   ├── layout_proposal.md
│   ├── requirements.md
│   └── youtube_playlist_bulk_add.md
├── frontend/
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── app_icon.png
│   └── src/
│       ├── App.css
│       ├── App.test.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── index.tsx
│       ├── react-app-env.d.ts
│       ├── reportWebVitals.ts
│       ├── setupTests.ts
│       ├── api/
│       │   └── api.ts
│       ├── components/
│       │   ├── App.module.css
│       │   ├── admin/
│       │   │   ├── AdminDashboard.module.css
│       │   │   └── AdminDashboard.tsx
│       │   ├── common/
│       │   │   ├── CategorySelect.tsx
│       │   │   ├── IngredientSearch.module.css
│       │   │   ├── IngredientSearch.tsx
│       │   │   ├── IngredientTag.tsx
│       │   │   ├── RecipeCard.tsx
│       │   │   ├── RecipeTag.tsx
│       │   │   └── TagSelect.tsx
│       │   ├── feature/
│       │   │   ├── recipeForm/
│       │   │   │   ├── PlaylistBulkAdd.tsx
│       │   │   │   ├── RecipeForm.tsx
│       │   │   │   └── ThumbnailInput.tsx
│       │   ├── layout/
│       │   │   ├── BottomNavigationbar.tsx
│       │   │   └── Header.tsx
│       │   └── pages/
│       │       ├── HomeSection.tsx
│       │       ├── PlaylistBulkAddSection.tsx
│       │       ├── RecipeAddSection.tsx
│       │       ├── RecipeDetailSection.tsx
│       │       ├── RecipeListSection.tsx
│       │       ├── RecipeSuggestSection.tsx
│       │       └── RecipeUpdateSection.tsx
│       ├── hooks/
│       │   └── useRecipeFormData.ts
│       ├── types/
│       │   └── models.ts
│       └── utils/
│           ├── typeConverters.ts
│           ├── validation.ts
│           └── youtubeData.ts
# 主な機能

- レシピ一覧・詳細表示
- レシピ追加・編集
- カテゴリー・材料による検索
- YouTube プレイリスト一括追加
- API 連携（FastAPI バックエンド）

# 技術スタック

- フロントエンド: React, Tailwind CSS
- バックエンド: Python(FastAPI, alembic), supabase (PostgreSQL)
- デプロイ: Vercel (フロントエンド), Render (バックエンド)
- バージョン管理: GitHub
- ドキュメント: Markdown（docs）

# 設計情報

型定義は models.ts にまとめている
API 設計は api_design.md に記載
ER 図は er_diagram.md に記載
各コンポーネントは components に配置

# 今後の予定

- CSS を Tailwind CSS に移行（AI に指示を出すと勉強にならないため、自分で実装予定）
- モバイルアプリ化（Expo + React Native）
- Youtube でのレシピ動画により特化した機能追加
- 画像アップロード時に圧縮処理を追加

# AgentMode (Github Copilot)のルール

- 回答は日本語で行う
- 開発者は土木工学専攻で、情報系の専門的な知識に疎いが、Web 開発自体は 1 年経験ほどのレベルであるため、詳しい説明を心がける
- スマホアプリの UI/UX を意識した提案を行う
- 1 つのコンポーネントは多くても 200 行以内に収め、それを超える場合は分割を提案する
- 現状、CSSファイルによるスタイリングが残っているが、提案時はすべて Tailwind CSS に置き換えることを前提とする
