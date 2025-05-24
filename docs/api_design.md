# API 設計

## 概要

このアプリケーションで提供される API の設計を以下に示します。

## エンドポイント一覧

### 食材管理

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
        "notes": "簡単なレシピです"
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
      "categories": [1]
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
      "categories": [2]
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
      "categories": [{ "id": 1, "name": "主菜" }]
    }
    ```
  - 存在しない ID 指定時:
    - ステータス: 404 Not Found
    - レスポンス例:
      ```json
      { "detail": "指定したレシピが存在しません" }
      ```

### カテゴリ管理

- **GET /api/categories**  
  カテゴリ一覧を取得。
  - レスポンス:
    ```json
    [
      { "id": 1, "name": "主菜" },
      { "id": 2, "name": "副菜" }
    ]
    ```
