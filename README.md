# 伴走サポート HTML WP template

node version：18._._
npm version：10.8.2
gulp version：4.0.2

## How to use

`npm install`
`npx gulp` or `gulp`

### 静的サイトと WordPress サイトに対応

`--wp`のオプションを指定することで WordPress サイトとしてのビルド実施。  
静的サイトを開発する場合：`npx gulp`  
WordPress サイトを開発する場合：`npx gulp --wp`  
※ただし WordPress の場合は gulpfile からテーマ名、出力するパスを確認のこと

## 解説

src フォルダで開発を進める。  
静的サイトの場合、生成物は dist フォルダに生成される。（dist フォルダがなければ作成される）  
dist フォルダは直接編集しても上書きされる。  
また、gulp を走らせた時に最初に削除される

### WP サイトの場合

local での開発を前提とする。  
local で作成されたフォルダ直下、app, conf, logs などのフォルダと同階層にこのフォルダを設置する。  
以下の図の「開発用フォルダ」をこのフォルダとする

```
localにより生成したフォルダ
  ┗ app ━━━━━━━━━━ public ━ wp-content ━ themes ━ 出力先テーマフォルダ
  ┃              ┗ sql
  ┗ conf ━━━━━━━━━ ...
  ┗ logs ━━━━━━━━━ ...
  ┗ 開発用フォルダ ━ src ━ ..
                 ┗ gulpfile
                 ┗ ...
```

### HTML テンプレートエンジン

HTML のテンプレートエンジンは ejs を使用する。  
ただし素の HTML も使用可能。（gulpfile にて isMarkupEjs の値を変更する）

### css

css は scss の記法で src>sass フォルダ内で記述。

### Javascript

src/js フォルダ直下にある js ファイルはビルド後は結合されて一つの js ファイルになる

### image

画像ファイルは圧縮する。  
同時に webp への変換、svg sprite の変換も行う。  
svg sprite に変換する場合は src/img/sprite フォルダに入れる

### copy フォルダ

copy フォルダはそのまま dist や WordPress の場合はテーマフォルダに出力する  
何も処理しないが、サイト用のデータとしては必要なものを入れておく  
例）PDF, 動画、ライブラリの JS や CSS、既存サイトデータなど

### PHP

WordPress サイトの場合、php フォルダを編集する。  
基本的には PHP ファイルはそのまま出力先（テーマフォルダ）にコピーする。  
ただし、先頭に \_（アンダースコア）がついたファイルは出力しない。  
Contact form 7 の管理画面に貼り付けるコードなどをストックするのに使用するといい
# gulp_templete
# gulp_templete_hidekazu
# gulp_templete_hidekazu
# gulp_templete_hidekazu
# gulp_templete_hidekazu
