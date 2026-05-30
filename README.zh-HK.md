# Kitty Blog

一個基於 Markdown 嘅個人網誌範本。設定一個 JSON 檔案，用 Markdown 寫內容，然後建置同部署。支援網誌文章、作品集、履歷、筆記同日記。

**使用** TypeScript + React 19 + Vite + TailwindCSS v4 **建構**

🌐 [简体中文](README.zh-CN.md) · [繁體中文（香港）](README.zh-HK.md) · [繁體中文（臺灣）](README.zh-TW.md) · [Español](README.es.md) · [Italiano](README.it.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [文言](README.lzh.md) · [uʍop ǝpᴉsdn ǝuoɥdǝlǝꓕ](README.en-UD.md)

---

## 快速開始

```bash
git clone https://github.com/haruno-haresora/kitty-blog.git my-blog
cd my-blog
npm install
npm run dev
```

打開 `http://localhost:5173` — 你會見到示範網站。

---

## AI 驅動部署（建議）

呢個專案內附一個 **Agent 指令包**（`AGENTS.md`），任何 AI 編碼助手都可以用佢自動設定、建置同部署你嘅網站。兼容 OpenCode、Claude Code、Cursor、Codex、Windsurf、Hermes、Kimicode、OpenClaw 等等。

只需要喺你嘅 Agent 度打開呢個專案，然後講：

> *「將我嘅網誌部署到 example.com，VPS IP 係 1.2.3.4」*

Agent 會讀取 `AGENTS.md`，然後：
1. 幫你編輯 `config.json` 填寫網站詳情
2. 撰寫你嘅 Markdown 內容
3. 建置生產環境套件
4. 上載到你嘅 VPS
5. 設定 nginx + 透過 certbot 啟用 HTTPS

唔使手動設定伺服器，唔使複製貼上設定檔。只需同 Agent 講你想點就得。

完整嘅部署流程、設定檔 Schema、建置指令同所有已知陷阱都記錄喺 `AGENTS.md` 入面。

---

## 設定你嘅網站

所有嘢都由一個檔案驅動：專案根目錄嘅 **`config.json`**。建置前編輯佢就得——唔使改程式碼。

### 第一步 — 網站身份

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

| 欄位 | 用途 |
|-------|-------------|
| `websiteTitle` | 瀏覽器分頁標題 |
| `websiteAuthor` | 側欄頭像下方顯示嘅名 |
| `titleOnTopBar` | 頂部標題欄嘅文字 |
| `faviconPath` | 瀏覽器網頁圖示（SVG/PNG，放喺 `public/`） |
| `avatarPath` | 側欄嘅個人頭像（JPEG/PNG/GIF/SVG，放喺 `public/`） |
| `copyrightInfo` | 側欄底部嘅版權資訊文字 |
| `websiteStyle` | `"catppuccin"`（無襯線字體、紫色點綴）或 `"oak"`（襯線字體、暖啡色調） |

### 第二步 — 選擇主題

兩個主題，都支援自動深色/淺色模式：

| 主題 | 字體 | 風格 |
|-------|------|------|
| `catppuccin` | Open Sans（無襯線） | 現代、簡潔、紫色點綴 |
| `oak` | Source Serif 4（襯線） | 溫暖、舒適、啡色調 |

右上角嘅深色/淺色切換按鈕會記住你嘅偏好。預設跟隨系統設定。

### 第三步 — 建立側欄

側欄係一個由**模組**組成嘅樹狀結構。每個模組有三種樣式可以揀：

#### 目錄模組

一個可摺疊嘅資料夾，入面可以裝其他模組。用嚟分類你嘅內容。

```json
{
  "moduleName": "Blog",
  "moduleStyle": "directory",
  "inDirectory": [ ...child modules... ]
}
```

#### 檔案模組

點擊佢會喺主閱讀區域載入 Markdown 檔案，側欄會自動關閉。

```json
{
  "moduleName": "About Me",
  "moduleStyle": "file",
  "dir": "./aboutme.md"
}
```

`dir` 係 Markdown 檔案喺 `public/` 資料夾入面嘅路徑。

#### 卡片模組

點擊佢會顯示文章卡片網格。每張卡片連結到一個 Markdown 檔案。卡片可以選擇性加入封面圖片。

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

| 欄位 | 必須？ | 備註 |
|-------|-----------|-------|
| `passageTitle` | 係 | 卡片標題 |
| `passageDescription` | 係 | 卡片上嘅摘要 |
| `passageAuthor` | 係 | 顯示喺卡片底部 |
| `publishDate` | 係 | 任何格式，顯示喺卡片底部 |
| `filePath` | 係 | `public/` 入面嘅 Markdown 檔案路徑 |
| `passageCover` | **唔係** | 封面圖片路徑。留空或省略即係冇封面嘅卡片。 |

---

## 撰寫內容

### Markdown 檔案

所有 Markdown 檔案放喺 `public/`。你可以分類到子目錄：

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

喺 `config.json` 入面以 `./posts/hello-world.md` 形式引用佢哋。

### 支援嘅 Markdown 語法

渲染器支援**所有**標準同擴展 Markdown 語法：

| 功能 | 寫法 |
|---------|-----------|
| **粗體**、*斜體*、~~刪除線~~ | `**bold**`、`*italic*`、`~~strike~~` |
| 連結 | `[text](https://...)` |
| 圖片 | `![alt](./image.png)` |
| 標題 | `# H1` 至 `###### H6` |
| 清單（有序、無序、巢狀） | `- item` 或 `1. item` |
| 工作清單 | `- [x] done`、`- [ ] todo` |
| 表格 | `| Col | Col |` |
| 引用 | `> quoted text` |
| 程式碼區塊（含語法高亮） | ` ```typescript ` |
| 行內程式碼 | `` `code` `` |
| 數學公式（LaTeX） | `$E=mc^2$` 或 `$$...$$` |
| 表情符號 | `:smile:` `:rocket:` |
| 註腳 | `[^1]` 然後 `[^1]: note` |
| 下標 / 上標 | `H~2~O` / `x^2^` |
| 定義清單 | `Term` 然後 `: Definition` |
| 縮寫 | `*[HTML]: HyperText Markup Language` |

### 圖片

支援所有標準格式：**JPEG**、**PNG**、**GIF**、**SVG**。將圖片放喺 `public/`，然後喺 Markdown 入面用 `![alt](./path/to/image.png)` 引用。

---

## 自訂外觀

### 修改顏色

編輯 `src/themes/catppuccin.css` 或 `src/themes/oak.css` 入面嘅 CSS 自訂屬性。每個檔案都有兩個部分——淺色模式嘅變數同深色模式嘅 `.dark[data-theme="..."]` 區塊。

例如，想修改 catppuccin 淺色模式嘅點綴顏色：

```css
[data-theme="catppuccin"] {
  --color-accent: #your-hex-color;
  --color-accent-hover: #darker-variant;
}
```

### 字體

字體係透過 `index.html` 入面嘅 Google Fonts 載入。想用其他字體：

1. 更新 `index.html` 入面嘅 Google Fonts `<link>`
2. 喺主題 CSS 嘅兩個 `[data-theme="..."]` 區塊入面修改 `--font-body`
3. 想換程式碼字體就修改 `--font-mono`

---

## 建置生產版本

```bash
npm run build
```

呢個指令會建立一個 `dist/` 資料夾，入面有靜態檔案——HTML、CSS、JS 同 `public/` 嘅所有資源。將呢個資料夾部署到任何靜態主機或網頁伺服器就得。

---

## 部署到 VPS

呢個指南假設你有一個 **Linux VPS**（Ubuntu/Debian），並且已經有域名指向佢。

### 1. 上載建置檔案

喺你嘅本機執行：

```bash
npm run build
scp -r dist/* user@your-server:/tmp/kitty-blog/
```

### 2. 伺服器設定

用 SSH 登入你嘅 VPS 然後安裝 nginx：

```bash
ssh user@your-server
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y
```

### 3. 移動檔案到網頁根目錄

```bash
sudo mkdir -p /var/www/kitty-blog
sudo cp -r /tmp/kitty-blog/* /var/www/kitty-blog/
sudo chown -R www-data:www-data /var/www/kitty-blog
```

### 4. Nginx 設定

建立 `/etc/nginx/sites-available/kitty-blog`：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/kitty-blog;
    index index.html;

    # SPA 後備路由——所有路由都導向 index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip 壓縮
    gzip on;
    gzip_types text/css application/javascript text/markdown image/svg+xml;
    gzip_min_length 256;

    # 快取靜態資源
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

啟用佢：

```bash
sudo ln -s /etc/nginx/sites-available/kitty-blog /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default   # 移除預設網站
sudo nginx -t                               # 測試設定檔
sudo systemctl reload nginx
```

`try_files $uri $uri/ /index.html` 呢行好重要——佢確保所有路由（`/read/...`、`/cards/...`）喺使用者重整頁面或分享連結時都正常運作。

### 5. 用 Certbot 設定 SSL

```bash
sudo certbot --nginx -d your-domain.com
```

跟住指示做。Certbot 會自動更新你嘅 nginx 設定以使用 HTTPS，並設定自動續期。

測試自動續期：

```bash
sudo certbot renew --dry-run
```

### 6. 防火牆（如果使用 ufw）

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 7. 自動化日後部署

喺你嘅本機建立部署指令稿：

```bash
#!/bin/bash
npm run build
rsync -avz --delete dist/ user@your-server:/var/www/kitty-blog/
ssh user@your-server "sudo systemctl reload nginx"
echo "Deployed!"
```

賦予執行權限：`chmod +x deploy.sh`。執行 `./deploy.sh` 就可以部署。

---

## 更新內容

想新增或修改內容，你只需要：

1. 喺 `public/` 入面新增/編輯 Markdown 檔案
2. 如果有新增側欄項目就更新 `config.json`
3. 執行 `npm run build && ./deploy.sh`

除非你要自訂設計本身，否則完全唔使掂 React/TypeScript 程式碼。

---

## 專案結構（參考）

```
./
├── config.json              # ← 你編輯呢個
├── public/                  # ← 你嘅內容放喺呢度
│   ├── favicon.svg
│   ├── avatar.svg
│   ├── aboutme.md
│   └── posts/
│       ├── hello-world.md
│       └── covers/
│           └── hello.svg
├── src/                     # ← 主題/組件程式碼（修改設計時編輯呢度）
│   ├── themes/
│   │   ├── catppuccin.css
│   │   └── oak.css
│   ├── components/
│   └── pages/
├── vite.config.ts
└── package.json
```

---

## 授權

MIT — 隨便點用都得。
