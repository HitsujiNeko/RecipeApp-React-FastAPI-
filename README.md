# アイデア

- YouTube チャンネルをレシピのモデルに追加
  → 　チャンネルでレシピをソートできるようにする

- レシピカードのサムネイル画像部分を別コンポーネント化
  →ThumnailInput　プレビュー画像で、タグやチャンネルアイコンも表示できるようにする



# 目標

アプリのリリースを通じて以下の目標を達成する

- 大手 IT 企業に就職

- エンジニアとして必要なスキルを身につける　 → 　 Web 開発を体系的に学ぶ

- アプリ開発を通じて、課題解決の視点を身につける

- デザインの知識を身につける

AI は活用するが、あくまでも目的は自分で理解して考えて実装できるようになること
そのため、クオリティや開発スピードよりもスキル習得を優先して開発する

# MVP
- YouTube上のレシピ動画をURLで簡単に登録できる（食材やレシピ名、レシピカード画像の自動抽出）
- レシピ一覧・詳細表示
- レシピのカテゴリー・材料による検索・絞り込み
この３つができれば、とりあえず MVP としては成立すると考えている。
理由：　
YouTubeプラットフォームの再生リスト機能の代替として、ユーザーが自分好みのレシピ集を簡単に作成・管理できることが主目的であるため。

# 開発用メモ
- バックエンドでモデル定義を変更したら
  alembic でマイグレーションファイルを作成・適用すること
  ```bash
  alembic revision --autogenerate -m "Add youtube channel to Recipe"
  alembic upgrade head
  ```


### 起動方法

- バックエンド
  初回のみ： pip install -r requirements.txt

uvicorn main:app --reload

- フロントエンド
  初回のみ： npm install

npm start

### 検証用 YouTube プレイリスト

https://youtube.com/playlist?list=PL1QpUQswXWtBuQY9WuGLts5Ce003wBxIj&si=HefULTbnN384qSmO

###　開発方針

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
