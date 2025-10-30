---
mode: agent
---

# 現在の開発状況＆方針

- レシピにタグ付け＆YouTube チャンネル紐づけ機能を追加する
- API 設計、ER 図、要件定義を更新済み

# アプリ概要

RecipeApp-React-FastAPI- は、React（フロントエンド）と FastAPI（バックエンド）を組み合わせたレシピ管理 Web アプリです。
ユーザーはレシピの一覧表示、詳細閲覧、追加、カテゴリー・材料検索、YouTube プレイリストの一括追加などが可能です。

# ペルソナ

- レシピ本やレシピサイトではなく、YouTube でレシピ動画を探し、実際に料理を作ることが多いユーザー。
- 料理が得意というよりかは、自炊を頑張りたい初心者層。（レシピ見なくても料理できる人はあまり使わないだろう）

- ストーリー
  YouTube 上では動画で視聴できるというメリットがあり、私自身もよく利用している。日々新しい動画が更新される、登録者の多い人気 YouTuber のレシピ動画を見て料理を作ることが多い。しかし、動画を一つ一つ保存したり、後で見返すのが面倒であるため、レシピを一元管理できるアプリが欲しいと感じた。そこで、アプリを開発し、YouTube のレシピ動画を簡単に保存・管理できるようにしたい。

# ディレクトリ構造（2025/10/29 時点）

RecipeApp-React-FastAPI-/
├── README.md
├── start_all.bat
├── backend/
│ ├── app.py
│ ├── database.py
│ ├── main.py
│ ├── models.py
│ ├── requirements.txt
│ ├── seed_data.py
│ ├── test.db
│ └── **pycache**/
├── docs/
│ ├── api_design.md
│ ├── er_diagram.md
│ ├── layout_proposal.md
│ ├── requirements.md
│ └── youtube_playlist_bulk_add.md
├── frontend/
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ ├── tsconfig.json
│ ├── public/
│ │ ├── index.html
│ │ ├── manifest.json
│ │ └── robots.txt
│ └── src/
│ ├── App.css
│ ├── App.test.tsx
│ ├── App.tsx
│ ├── index.css
│ ├── index.tsx
│ ├── react-app-env.d.ts
│ ├── reportWebVitals.ts
│ ├── setupTests.ts
│ ├── api/
│ │ └── api.ts
│ ├── components/
│ │ ├── App.module.css
│ │ ├── admin/
│ │ │ ├── AdminDashboard.module.css
│ │ │ └── AdminDashboard.tsx
│ │ ├── common/
│ │ │ ├── CategorySelect.tsx
│ │ │ ├── IngredientSearch.module.css
│ │ │ ├── IngredientSearch.tsx
│ │ │ ├── IngredientTag.tsx
│ │ │ ├── RecipeCard.module.css
│ │ │ └── RecipeCard.tsx
│ │ ├── feature/
│ │ │ ├── recipeAdd/
│ │ │ │ ├── PlaylistBulkAdd.module.css
│ │ │ │ ├── PlaylistBulkAdd.tsx
│ │ │ │ └── ThumnailInput.tsx
│ │ │ └── recipeDetail/
│ │ ├── layout/
│ │ │ ├── BottomNavigationbar.module.css
│ │ │ ├── BottomNavigationbar.tsx
│ │ │ ├── Header.module.css
│ │ │ └── Header.tsx
│ │ └── pages/
│ │ ├── HomeSection.tsx
│ │ ├── RecipeAddSection.module.css
│ │ ├── RecipeAddSection.tsx
│ │ ├── RecipeDetailSection.module.css
│ │ ├── RecipeDetailSection.tsx
│ │ ├── RecipeListSection.module.css
│ │ ├── RecipeListSection.tsx
│ │ ├── RecipeSuggestSection.module.css
│ │ └── RecipeSuggestSection.tsx
│ └── types/
│ └── models.ts

# 主な機能

- レシピ一覧・詳細表示
- レシピ追加・編集
- カテゴリー・材料による検索
- YouTube プレイリスト一括追加
- API 連携（FastAPI バックエンド）

# 技術スタック

- フロントエンド: React, Tailwind CSS
- バックエンド: FastAPI, SQLite
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
