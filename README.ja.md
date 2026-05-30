# Kitty Blog

マークダウンベースの個人ブログテンプレートです。1つのJSONファイルを設定し、マークダウンでコンテンツを書き、ビルドしてデプロイするだけです。ブログ記事、ポートフォリオ、履歴書、メモ、日記に対応しています。

**使用技術** TypeScript + React 19 + Vite + TailwindCSS v4

🌐 [简体中文](README.zh-CN.md) · [繁體中文（香港）](README.zh-HK.md) · [繁體中文（臺灣）](README.zh-TW.md) · [Español](README.es.md) · [Italiano](README.it.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [文言](README.lzh.md) · [uʍop ǝpᴉsdn ǝuoɥdǝlǝꓕ](README.en-UD.md)

---

## クイックスタート

```bash
git clone https://github.com/haruno-haresora/kitty-blog.git my-blog
cd my-blog
npm install
npm run dev
```

`http://localhost:5173` を開くと、サンプルサイトが表示されます。

---

## AIによるデプロイ（推奨）

このプロジェクトには、あらゆるAIコーディングエージェントがサイトの設定、ビルド、デプロイを自動的に行うための **エージェント指示パック**（`AGENTS.md`）が含まれています。OpenCode、Claude Code、Cursor、Codex、Windsurf、Hermes、KimiCode、OpenClaw などに対応しています。

このプロジェクトをエージェントで開き、次のように指示するだけです：

> *「IPアドレス 1.2.3.4 のVPS上の example.com にブログをデプロイして」*

エージェントは `AGENTS.md` を読み込み、次の処理を行います：
1. サイトの詳細を含む `config.json` の編集を支援
2. マークダウンコンテンツの作成
3. 本番用バンドルのビルド
4. VPSへのアップロード
5. nginx + certbot による HTTPS の設定

手動でのサーバー設定や設定ファイルのコピー＆ペーストは不要です。やりたいことをエージェントに伝えるだけです。

デプロイ手順、設定スキーマ、ビルドコマンド、既知の注意点はすべて `AGENTS.md` に記載されています。

---

## ウェブサイトの設定

すべてはプロジェクトルートにある **`config.json`** という1つのファイルで管理されています。コードの変更は不要で、ビルド前に編集するだけです。

### ステップ1 — サイト基本情報

```json
{
  "websiteTitle": "My Blog",
  "websiteAuthor": "Jane Doe",
  "titleOnTopBar": "Jane's Corner",
  "faviconPath": "./favicon.svg",
  "avatarPath": "./avatar.svg",
  "copyrightInfo": "© 2026 Jane Doe. All rights reserved.",
  "websiteStyle": "catppuccin"
}
```

| フィールド | 説明 |
|-------|-------------|
| `websiteTitle` | ブラウザタブのタイトル |
| `websiteAuthor` | サイドバーのアバター下に表示される名前 |
| `titleOnTopBar` | 上部ヘッダーバーのテキスト |
| `faviconPath` | ブラウザのファビコン（SVG/PNG、`public/` に配置） |
| `avatarPath` | サイドバーのプロフィール画像（JPEG/PNG/GIF/SVG、`public/` に配置） |
| `copyrightInfo` | サイドバー下部のフッターテキスト |
| `websiteStyle` | `"catppuccin"`（サンセリフ、紫のアクセント）または `"oak"`（セリフ、暖かみのある茶色） |

### ステップ2 — テーマの選択

2つのテーマがあり、どちらもダーク/ライトモードの自動切り替えに対応しています：

| テーマ | フォント | 雰囲気 |
|-------|------|------|
| `catppuccin` | Open Sans（サンセリフ） | モダンでクリーン、紫のアクセント |
| `oak` | Source Serif 4（セリフ） | 暖かく心地よい茶系の色調 |

右上のダーク/ライト切り替えボタンは設定を記憶します。デフォルトではシステム設定に従います。

### ステップ3 — サイドバーの構築

サイドバーは **モジュール** のツリー構造です。各モジュールには3つのスタイルがあります：

#### ディレクトリモジュール
他のモジュールを含む折りたたみ可能なフォルダです。コンテンツをグループ化するのに使用します。

```json
{
  "moduleName": "Blog",
  "moduleStyle": "directory",
  "inDirectory": [ ...子モジュール... ]
}
```

#### ファイルモジュール
クリックするとメインの閲覧エリアにマークダウンファイルが読み込まれ、サイドバーが自動的に閉じます。

```json
{
  "moduleName": "About Me",
  "moduleStyle": "file",
  "dir": "./aboutme.md"
}
```

`dir` は `public/` フォルダ内のマークダウンファイルへのパスです。

#### カードモジュール
クリックすると記事カードのグリッドが表示されます。各カードはマークダウンファイルにリンクしています。カードにはカバー画像を付けることもできます（任意）。

```json
{
  "moduleName": "Articles",
  "moduleStyle": "card",
  "inCard": [
    {
      "passageTitle": "Hello World",
      "passageDescription": "My first blog post about starting out.",
      "passageAuthor": "Jane Doe",
      "publishDate": "2026-06-01 Morning",
      "filePath": "./posts/hello-world.md",
      "passageCover": "./posts/covers/hello.svg"
    },
    {
      "passageTitle": "No Cover Card",
      "passageDescription": "This card has no cover image — it uses the plain style.",
      "passageAuthor": "Jane Doe",
      "publishDate": "2026-05-15 Afternoon",
      "filePath": "./posts/no-cover.md"
    }
  ]
}
```

| フィールド | 必須？ | 備考 |
|-------|-----------|-------|
| `passageTitle` | 必須 | カードの見出し |
| `passageDescription` | 必須 | カード上の短い概要 |
| `passageAuthor` | 必須 | カードのフッターに表示 |
| `publishDate` | 必須 | 任意の形式、カードのフッターに表示 |
| `filePath` | 必須 | `public/` 内のマークダウンファイルへのパス |
| `passageCover` | **任意** | カバー画像のパス。カバーなしのカードにする場合は空にするか省略してください。 |

---

## コンテンツの作成

### マークダウンファイル

すべてのマークダウンは `public/` に配置します。サブディレクトリで整理することもできます：

```
public/
├── aboutme.md
├── posts/
│   ├── hello-world.md
│   └── covers/
│       └── hello.svg
└── notes/
    └── diary.md
```

`config.json` 内では `./posts/hello-world.md` のように参照します。

### 対応しているマークダウン記法

レンダラーは **すべての** 標準および拡張マークダウン記法に対応しています：

| 機能 | 記法 |
|---------|-----------|
| **太字**、*斜体*、~~打ち消し線~~ | `**太字**`、`*斜体*`、`~~打ち消し線~~` |
| リンク | `[テキスト](https://...)` |
| 画像 | `![代替テキスト](./image.png)` |
| 見出し | `# H1` 〜 `###### H6` |
| リスト（順序付き、順序なし、ネスト） | `- 項目` または `1. 項目` |
| タスクリスト | `- [x] 完了`、`- [ ] 未完了` |
| テーブル | `| 列 | 列 |` |
| 引用 | `> 引用テキスト` |
| シンタックスハイライト付きコードブロック | ` ```typescript ` |
| インラインコード | `` `コード` `` |
| 数式（LaTeX） | `$E=mc^2$` または `$$...$$` |
| 絵文字 | `:smile:` `:rocket:` |
| 脚注 | `[^1]` の後 `[^1]: 注釈` |
| 下付き / 上付き | `H~2~O` / `x^2^` |
| 定義リスト | `用語` の後 `: 定義` |
| 略語 | `*[HTML]: HyperText Markup Language` |

### 画像

すべての標準フォーマットに対応しています：**JPEG**、**PNG**、**GIF**、**SVG**。画像を `public/` に配置し、マークダウン内で `![代替テキスト](./path/to/image.png)` で参照します。

---

## 外観のカスタマイズ

### 色の変更

`src/themes/catppuccin.css` または `src/themes/oak.css` 内の CSS カスタムプロパティを編集します。各ファイルには2つのセクションがあります — ライトモードの変数と、ダークモード用の `.dark[data-theme="..."]` ブロックです。

例えば、catppuccin ライトモードのアクセントカラーを変更するには：

```css
[data-theme="catppuccin"] {
  --color-accent: #お好みの16進数カラー;
  --color-accent-hover: #より暗いバリエーション;
}
```

### フォント

フォントは `index.html` 内で Google Fonts から読み込まれています。異なるフォントを使用するには：

1. `index.html` 内の Google Fonts の `<link>` を更新
2. テーマCSSの両方の `[data-theme="..."]` ブロック内で `--font-body` を変更
3. コード用フォントを変更したい場合は `--font-mono` も変更

---

## 本番用ビルド

```bash
npm run build
```

これにより、静的ファイル（HTML、CSS、JS、および `public/` の全アセット）を含む `dist/` フォルダが作成されます。このフォルダを任意の静的ホストやウェブサーバーにデプロイしてください。

---

## VPSへのデプロイ

このガイドでは、ドメインが設定された **Linux VPS**（Ubuntu/Debian）があることを前提としています。

### 1. ビルドのアップロード

ローカルマシンから：

```bash
npm run build
scp -r dist/* user@your-server:/tmp/kitty-blog/
```

### 2. サーバー設定

VPSにSSH接続し、nginxをインストールします：

```bash
ssh user@your-server
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y
```

### 3. ファイルをWebルートに移動

```bash
sudo mkdir -p /var/www/kitty-blog
sudo cp -r /tmp/kitty-blog/* /var/www/kitty-blog/
sudo chown -R www-data:www-data /var/www/kitty-blog
```

### 4. Nginx設定

`/etc/nginx/sites-available/kitty-blog` を作成します：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/kitty-blog;
    index index.html;

    # SPA fallback — all routes go to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript text/markdown image/svg+xml;
    gzip_min_length 256;

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

有効化します：

```bash
sudo ln -s /etc/nginx/sites-available/kitty-blog /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default   # デフォルトサイトを削除
sudo nginx -t                               # 設定をテスト
sudo systemctl reload nginx
```

`try_files $uri $uri/ /index.html` の行は重要です — ユーザーが更新やリンク共有をした際に、すべてのルート（`/read/...`、`/cards/...`）が正しく動作するようにします。

### 5. CertbotでSSL設定

```bash
sudo certbot --nginx -d your-domain.com
```

プロンプトに従います。Certbot が自動的に nginx 設定を HTTPS 用に更新し、自動更新を設定します。

自動更新のテスト：

```bash
sudo certbot renew --dry-run
```

### 6. ファイアウォール（ufw を使用している場合）

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 7. 将来のデプロイを自動化

ローカルマシンにデプロイスクリプトを作成します：

```bash
#!/bin/bash
npm run build
rsync -avz --delete dist/ user@your-server:/var/www/kitty-blog/
ssh user@your-server "sudo systemctl reload nginx"
echo "Deployed!"
```

実行可能にします：`chmod +x deploy.sh`。`./deploy.sh` を実行するとデプロイされます。

---

## コンテンツの更新

コンテンツを追加または変更するには、以下の手順だけで済みます：

1. `public/` 内のマークダウンファイルを追加/編集
2. 新しいサイドバー項目を追加する場合は `config.json` を更新
3. `npm run build && ./deploy.sh` を実行

デザイン自体をカスタマイズする場合を除き、React/TypeScript のコードに触れる必要はまったくありません。

---

## プロジェクト構成（参考）

```
./
├── config.json              # ← これを編集します
├── public/                  # ← コンテンツはここに配置します
│   ├── favicon.svg
│   ├── avatar.svg
│   ├── aboutme.md
│   └── posts/
│       ├── hello-world.md
│       └── covers/
│           └── hello.svg
├── src/                     # ← テーマ/コンポーネントのコード（デザイン変更時に編集）
│   ├── themes/
│   │   ├── catppuccin.css
│   │   └── oak.css
│   ├── components/
│   └── pages/
├── vite.config.ts
└── package.json
```

---

## ライセンス

MIT — あらゆる用途にご利用いただけます。
