---
mode: agent
---
# 開発方針
スマホアプリとしての運用に切り替えるため、
Web向けのスタイルからスマホ向けのスタイルに変更する。


# アプリ概要

RecipeApp-React-FastAPI- は、React（フロントエンド）とFastAPI（バックエンド）を組み合わせたレシピ管理Webアプリです。
ユーザーはレシピの一覧表示、詳細閲覧、追加、カテゴリー・材料検索、YouTubeプレイリストの一括追加などが可能です。

# ペルソナ
- レシピ本やレシピサイトではなく、YouTubeでレシピ動画を探し、実際に料理を作ることが多いユーザー。
- 料理が得意というよりかは、自炊を頑張りたい初心者層。（レシピ見なくても料理できる人はあまり使わないだろう）

- ストーリー
YouTube上では動画で視聴できるというメリットがあり、私自身もよく利用している。日々新しい動画が更新される、登録者の多い人気YouTuberのレシピ動画を見て料理を作ることが多い。しかし、動画を一つ一つ保存したり、後で見返すのが面倒であるため、レシピを一元管理できるアプリが欲しいと感じた。そこで、アプリを開発し、YouTubeのレシピ動画を簡単に保存・管理できるようにしたい。



# ディレクトリ構造（2025/10/29時点）

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
│   └── __pycache__/
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
│   │   └── robots.txt
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
│       │   │   ├── RecipeCard.module.css
│       │   │   └── RecipeCard.tsx
│       │   ├── feature/
│       │   │   ├── recipeAdd/
│       │   │   │   ├── PlaylistBulkAdd.module.css
│       │   │   │   ├── PlaylistBulkAdd.tsx
│       │   │   │   └── ThumnailInput.tsx
│       │   │   └── recipeDetail/
│       │   ├── layout/
│       │   │   ├── BottomNavigationbar.module.css
│       │   │   ├── BottomNavigationbar.tsx
│       │   │   ├── Header.module.css
│       │   │   └── Header.tsx
│       │   └── pages/
│       │       ├── HomeSection.tsx
│       │       ├── RecipeAddSection.module.css
│       │       ├── RecipeAddSection.tsx
│       │       ├── RecipeDetailSection.module.css
│       │       ├── RecipeDetailSection.tsx
│       │       ├── RecipeListSection.module.css
│       │       ├── RecipeListSection.tsx
│       │       ├── RecipeSuggestSection.module.css
│       │       └── RecipeSuggestSection.tsx
│       └── types/
│           └── models.ts

# 主な機能
- レシピ一覧・詳細表示
- レシピ追加・編集
- カテゴリー・材料による検索
- YouTubeプレイリスト一括追加
- API連携（FastAPIバックエンド）

# 技術スタック
- フロントエンド: React, Tailwind CSS
- バックエンド: FastAPI, SQLite
- ドキュメント: Markdown（docs）

# 設計情報
型定義は models.ts にまとめている
API設計は api_design.md に記載
ER図は er_diagram.md に記載
各コンポーネントは components に配置

# 今後の予定
- CSSをTailwind CSSに移行（AIに指示を出すと勉強にならないため、自分で実装予定）
- モバイルアプリ化（Expo + React Native）
- Youtubeでのレシピ動画により特化した機能追加
- 画像アップロード時に圧縮処理を追加

# AgentMode (Github Copilot)のルール
- 回答は日本語で行う
- 開発者は土木工学専攻で、情報系の専門的な知識に疎いが、Web開発自体は1年経験ほどのレベルであるため、詳しい説明を心がける
- スマホアプリのUI/UXを意識した提案を行う
- 1つのコンポーネントは多くても200行以内に収め、それを超える場合は分割を提案する

