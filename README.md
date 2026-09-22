# 湯川大悟 個人ホームページ

HTML / CSS / JavaScript だけで作ったサイトです。`index.html` をブラウザで開けば表示でき、フォルダごと GitHub Pages に置けば公開できます。

```
index.html          … 文章・業績はすべてここに書く
css/variables.css   … 色・フォント・文字サイズ・余白・動きの速さ
css/base.css        … 要素の基本スタイル
css/layout.css      … ヘッダー・メニュー・セクションの配置
css/components.css  … キーワード・業績リスト・図版などの部品
css/motion.css      … ホバーやメニューなどの動き
js/main.js          … メニュー開閉・読み進み線・図版の拡大表示
images/             … 図版（SVG）
```

## 文章の直し方

1. `index.html` を開き、`<!-- ===== 研究内容 ここから ===== -->` のようなコメントを目印に、直したいセクションを探します。
2. タグ（`<p class="research-text">` など）はそのままにして、中の文章だけを書き換えます。
3. 段落を増やすときは `<p class="research-text">…</p>` を 1 行コピーします。
4. 図版を差し替えるときは、`images/` に画像を置いて `<img>` の `src` と `alt`（画像の説明文）、`<figcaption>` の文章を書き換えます。

## 日本語と英語の書き方

初期表示は日本語で、右上の **JA / EN** で英語に切り替わります（選んだ言語はブラウザに記憶され、URL に `?lang=en` を付けると英語で開きます）。

- `lang="ja"` を付けた要素は日本語表示のときだけ、`lang="en"` を付けた要素は英語表示のときだけ見えます。
- 両方の言語で同じ内容（発表タイトル・学会名など）は、`lang` を付けずに 1 つだけ書きます。

```html
<!-- 短い語句：同じ行に日本語と英語を並べる -->
<li class="keyword-item"><span lang="ja">凝集</span><span lang="en">Agglomeration</span></li>
```

- **研究内容** は、日本語の文章をまとめた `<div class="section-body" lang="ja">` と、英語の文章をまとめた `<div class="section-body" lang="en">` に分かれています。片方を直したら、もう片方も同じように直してください。

## 業績の追加方法

各リストの中の `<li>` を **1 つコピーして貼り付け、中身を書き換える** だけです。

- **学会発表**: `<li class="presentation-item">` から `</li>` までをコピーします。1 行目の `presentation-title` に発表タイトル、2 行目の `presentation-venue` に学会名を書きます（学会名は自動で薄い色になります）。
- **原著論文**: `<li class="paper-item">` をコピーします。最初の論文を追加したら「未出版」の行は削除してください。
- **経歴**: `<li class="biography-item">` をコピーし、`biography-period` に年、`biography-detail` に所属を書きます。
- **キーワード**: `<li class="keyword-item">` を 1 行コピーします。

新しい順に並べたい場合は、コピーした `<li>` をリストの先頭に貼り付けてください。

**セクションを増やす場合**: `<section class="section">` ブロックをまるごとコピーして `id` を変え、ヘッダーのメニューに `<li><a class="nav-link" href="#新しいid">…</a></li>` を追加します（スマホ用メニューの時間差は `css/motion.css` の `nth-child` の行で 6 項目まで設定済みです）。

## 色やフォントの変え方

すべて `css/variables.css` の値を書き換えれば、サイト全体に反映されます。ほかの CSS ファイルに数値を直接書く必要はありません。

| 変えたいもの | 変数 |
|---|---|
| 背景色・文字色 | `--color-background` / `--color-text` |
| 学会名・日付などの薄い文字 | `--color-text-muted` |
| 区切り線の濃さ | `--color-line` |
| フォント | `--font-family-base`（別のフォントを使う場合は、`index.html` の Google Fonts の `<link>` も変更） |
| 名前の大きさ | `--font-size-name` |
| 本文の大きさ・行間 | `--font-size-body` / `--line-height-body` |
| 1 行の長さ | `--measure` |
| セクション同士の間隔 | `--section-spacing` |
| 動きの速さ | `--duration-fast` / `--duration-base` / `--duration-slow` |
| 名前が 1 文字ずつ現れる間隔 | `--name-char-delay` |

補足: スマホ表示に切り替わる幅（768px）は、CSS の仕様上変数にできないため `css/layout.css` と `css/motion.css` の `@media` の行に直接書いています。変える場合は両方を同じ値にしてください（`js/main.js` の `769px` も合わせて変更します）。

## 手元での確認

`index.html` をダブルクリックすればブラウザで表示できます。
