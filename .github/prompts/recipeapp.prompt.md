---
mode: agent
---
# 開発方針
スマホアプリとしての運用に切り替えるため、
Web向けのスタイルからスマホ向けのスタイルに変更する。


# アプリ概要

RecipeApp-React-FastAPI- は、React（フロントエンド）とFastAPI（バックエンド）を組み合わせたレシピ管理Webアプリです。
ユーザーはレシピの一覧表示、詳細閲覧、追加、カテゴリー・材料検索、YouTubeプレイリストの一括追加などが可能です。

# 実装予定
ボトムナビゲーションバーの追加

# ディレクトリ構造　

RecipeApp-React-FastAPI-/
├── README.md　　　# Github用のREADMEファイル
├── start_all.bat  # フロントエンドとバックエンドを同時に起動するバッチファイル
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
│   ├── README.md
│   ├── tsconfig.json
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── api/
│   │   │   └── api.ts
│   │   ├── components/
│   │   │   ├── CategorySelect.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── IngredientSearch.tsx
│   │   │   ├── PlaylistBulkAdd.tsx
│   │   │   ├── ThumnailInput.tsx
│   │   │   └── pages/
│   │   │       ├── HomeSection.tsx
│   │   │       ├── RecipeAddSection.tsx
│   │   │       ├── RecipeDetailSection.tsx
│   │   │       ├── RecipeListSection.tsx
│   │   │       └── RecipeSuggestSection.tsx
│   │   └── types/
│   │       └── models.ts


# 主な機能
- レシピ一覧・詳細表示
- レシピ追加・編集
- カテゴリー・材料による検索
- YouTubeプレイリスト一括追加
- API連携（FastAPIバックエンド）

# 技術スタック
- フロントエンド: React, TypeScript
- バックエンド: FastAPI, SQLite
- ドキュメント: Markdown（docs）

# 設計情報
型定義は models.ts にまとめている
API設計は api_design.md に記載
ER図は er_diagram.md に記載
各コンポーネントは components に配置