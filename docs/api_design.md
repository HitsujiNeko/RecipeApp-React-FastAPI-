# API 設計

## 概要

このアプリケーションで提供される API の設計を以下に示します。

## エンドポイント一覧

### 食材管理

- **PUT /api/ingredients/{id}**
  食材を更新。

  - リクエストボディ:
    ```json
    { "name": "新しい食材名", "reading": "しんしいしょくざい", "type": "肉" }
    ```
  - レスポンス: 更新後の食材オブジェクト

- **DELETE /api/ingredients/{id}**
  食材を削除。

  - 成功時: `{ "ok": true }`
  - 404 時: `{ "detail": "食材が見つかりません" }`

- **GET /api/ingredients**
  食材一覧を取得。

  - レスポンス:
    ```json
    [
      { "id": 1, "name": "鶏むね肉", "reading": "とりむねにく", "type": "肉" },
      { "id": 2, "name": "にんじん", "reading": "にんじん", "type": "野菜" }
    ]
    ```

- **POST /api/ingredients**
  新しい食材を追加。
  - リクエストボディ:
    ```json
    { "name": "鶏むね肉", "reading": "とりむねにく", "type": "肉" }
    ```

### レシピ管理

- **GET /api/recipes**
  レシピ一覧を取得。

  - クエリパラメータ:
    - `ingredients`: 食材 ID の配列（例: `?ingredients=1,2`）
    - `category`: カテゴリ ID（例: `?category=1`）
  - レスポンス:
    ```json
    [
      {
        "id": 1,
        "name": "鶏むね肉の照り焼き",
        "url": "https://youtube.com/example",
        "thumbnail": "https://img.youtube.com/example.jpg",
        "notes": "簡単なレシピです",
        "channel": {
          "id": 1,
          "name": "リュウジのバズレシピ",
          "url": "https://www.youtube.com/channel/UCXXXXXX"
        },
        "tags": [
          { "id": 1, "name": "お手軽" },
          { "id": 2, "name": "お弁当" }
        ]
      }
    ]
    ```

- **POST /api/recipes**
  新しいレシピを追加。

  - リクエストボディ:
    ```json
    {
      "name": "鶏むね肉の照り焼き",
      "url": "https://youtube.com/example",
      "thumbnail": "https://img.youtube.com/example.jpg",
      "notes": "簡単なレシピです",
      "ingredients": [1, 2],
      "categories": [1],
      "channel_id": 1, // null可
      "tag_ids": [1, 2] // null可
    }
    ```
  - バリデーションエラー時:
    - ステータス: 422 Unprocessable Entity
    - レスポンス例:
      ```json
      { "detail": "必須項目が不足しています" }
      ```

- **PUT /api/recipes/{id}**
  指定した ID のレシピを更新。

  - リクエストボディ:
    ```json
    {
      "name": "新しいレシピ名",
      "url": "https://youtube.com/new",
      "thumbnail": "https://img.youtube.com/new.jpg",
      "notes": "更新されたレシピです",
      "ingredients": [1, 3],
      "categories": [2],
      "channel_id": 2, // null可
      "tag_ids": [2, 3] // null可
    }
    ```
  - バリデーションエラー時:
    - ステータス: 422 Unprocessable Entity
    - レスポンス例:
      ```json
      { "detail": "必須項目が不足しています" }
      ```
  - 存在しない ID 指定時:
    - ステータス: 404 Not Found
    - レスポンス例:
      ```json
      { "detail": "指定したレシピが存在しません" }
      ```

- **PATCH /api/recipes/{id}**
  指定した ID のレシピの一部を更新。

  - リクエストボディ例:
    ```json
    { "name": "部分的に更新" }
    ```
  - バリデーションエラー時:
    - ステータス: 422 Unprocessable Entity
    - レスポンス例:
      ```json
      { "detail": "不正な値です" }
      ```
  - 存在しない ID 指定時:
    - ステータス: 404 Not Found
    - レスポンス例:
      ```json
      { "detail": "指定したレシピが存在しません" }
      ```

- **DELETE /api/recipes/{id}**
  指定した ID のレシピを削除。

  - 成功時:
    - ステータス: 204 No Content
  - 存在しない ID 指定時:
    - ステータス: 404 Not Found
    - レスポンス例:
      ```json
      { "detail": "指定したレシピが存在しません" }
      ```

- **GET /api/recipes/{id}**
  指定した ID のレシピ詳細を取得。

  - レスポンス:
    ```json
    {
      "id": 1,
      "name": "鶏むね肉の照り焼き",
      "url": "https://youtube.com/example",
      "thumbnail": "https://img.youtube.com/example.jpg",
      "notes": "簡単なレシピです",
      "ingredients": [
        { "id": 1, "name": "鶏むね肉" },
        { "id": 2, "name": "にんじん" }
      ],
      "categories": [{ "id": 1, "name": "主菜" }],
      "channel": {
        "id": 1,
        "name": "リュウジのバズレシピ",
        "url": "https://www.youtube.com/channel/UCXXXXXX"
      },
      "tags": [
        { "id": 1, "name": "お手軽" },
        { "id": 2, "name": "お弁当" }
      ]
    }
    ```
  - 存在しない ID 指定時:
    - ステータス: 404 Not Found
    - レスポンス例:
      ```json
      { "detail": "指定したレシピが存在しません" }
      ```

### カテゴリ管理

- **PUT /api/categories/{id}**
  カテゴリを更新。

  - リクエストボディ:
    ```json
    { "name": "新しいカテゴリ名" }
    ```
  - レスポンス: 更新後のカテゴリオブジェクト

- **DELETE /api/categories/{id}**
  カテゴリを削除。

  - 成功時: `{ "ok": true }`
  - 404 時: `{ "detail": "カテゴリーが見つかりません" }`

- **POST /api/recipes/bulk**
  複数レシピを一括追加。

  - リクエストボディ: レシピデータの配列
  - レスポンス: `{ "count": 追加件数 }`

- **PUT /api/recipes/{id}**
  レシピを更新。

  - リクエストボディ: レシピオブジェクト
  - レスポンス: 更新後のレシピオブジェクト

- **DELETE /api/recipes/{id}**
  レシピを削除。
  - 成功時: `{ "ok": true }`
  - 404 時: `{ "detail": "レシピが見つかりません" }`

### YouTube 動画情報取得

- **POST /api/youtube/video**
  YouTube 動画 URL から動画情報を取得。
  - リクエストボディ:
    ```json
    { "video_url": "https://www.youtube.com/watch?v=xxxx" }
    ```
  - レスポンス:
    ```json
    {
      "videoId": "xxxx",
      "title": "動画タイトル",
      "description": "説明文",
      "thumbnail": "https://img.youtube.com/xxxx.jpg",
      "url": "https://www.youtube.com/watch?v=xxxx"
    }
    ```

### YouTube プレイリスト情報取得

- **POST /api/youtube/playlist**
  YouTube プレイリスト URL から動画リストを取得。
  - リクエストボディ:
    ```json
    { "playlist_url": "https://www.youtube.com/playlist?list=xxxx" }
    ```
  - レスポンス: 動画情報の配列
    ```json
    [
      {
        "videoId": "xxxx",
        "title": "動画タイトル",
        "description": "説明文",
        "thumbnail": "https://img.youtube.com/xxxx.jpg",
        "url": "https://www.youtube.com/watch?v=xxxx"
      }
    ]
    ```

### YouTube チャンネル管理

- **GET /api/channels**
  チャンネル一覧を取得。
  - レスポンス:
    ```json
    [
      {
        "id": 1,
        "name": "リュウジのバズレシピ",
        "url": "https://www.youtube.com/channel/UCXXXXXX"
      }
    ]
    ```
- **POST /api/channels**
  新しいチャンネルを追加。
  - リクエストボディ:
    ```json
    {
      "name": "リュウジのバズレシピ",
      "url": "https://www.youtube.com/channel/UCXXXXXX"
    }
    ```

### レシピタグ管理

- **GET /api/tags**
  タグ一覧を取得。
  - レスポンス:
    ```json
    [
      { "id": 1, "name": "お手軽" },
      { "id": 2, "name": "お弁当" }
    ]
    ```
- **POST /api/tags**
  新しいタグを追加。

  - リクエストボディ:
    ```json
    { "name": "お手軽" }
    ```

- **GET /api/categories**
  カテゴリ一覧を取得。
  - レスポンス:
    ```json
    [
      { "id": 1, "name": "主菜" },
      { "id": 2, "name": "副菜" }
    ]
    ```
