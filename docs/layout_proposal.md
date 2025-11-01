| [レシピ名]        [カテゴリ]|
|  ┌─────────────┐           |
|  |             |           |
|  |  サムネイル  |  [タグ]   |
|  └─────────────┘  [タグ]   |
| [食材タグ][食材タグ]        |
# レシピカードのデザイン
レシピ一覧やレシピ提案の画面で表示されるレシピカードのデザイン案を以下に示します。
-----------------------------
| [レシピ名]        [カテゴリ]|
|  ┌─────────────┐           |
|  |             |           |
|  |  サムネイル  |  [タグ]   |
|  └─────────────┘  [タグ]   |
| [食材タグ][食材タグ]        |
-----------------------------
- チャンネルアイコンはサムネイルの右下に小さく重ねる

---

## レシピタグのデザイン案（カード上表示）

### 1. シンプルバッジ型
```jsx
<span className="bg-orange-200 text-orange-800 text-xs px-2 py-0.5 rounded shadow">
	お気に入り
</span>
```
- 温かみのあるオレンジ系。丸みと影でボタン風・バッジ感。

### 2. カラーバリエーション型（タグ内容で色分け）
```jsx
<span className="bg-pink-200 text-pink-800 text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">
	ヘルシー
</span>
<span className="bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">
	節約
</span>
<span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">
	時短
</span>
```
- タグごとに色分けし、直感的に内容が伝わる。
- `rounded-full`でpill型、`font-bold`で視認性UP。

### 3. アイコン付き型
```jsx
<span className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full shadow">
	<svg className="w-3 h-3" ...>★</svg>
	お気に入り
</span>
```
- アイコン（SVGや絵文字）を先頭に配置し、意味を強調。

### 4. 複数タグ横並び・折返し対応
```jsx
<div className="absolute top-1 right-1 flex flex-row flex-wrap gap-1 z-10">
	{tags.map(tag => (
		<span key={tag.id} className="bg-orange-200 text-orange-800 text-xs px-2 py-0.5 rounded shadow">
			{tag.name}
		</span>
	))}
</div>
```
- サムネイル右上に横並び、タグ数が多い場合は折返し。

---

### UI/UXポイント
- クリック/タップ非対応なら`cursor-default`、押せる場合は`cursor-pointer hover:opacity-80`等で明示
- タグの色・形は「意味」「重要度」「数」に応じて調整
- スマホUIでは`text-xs`や`px-2 py-0.5`でコンパクトに

---

【おすすめ】