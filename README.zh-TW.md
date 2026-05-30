# Kitty Blog

一個基於 Markdown 的個人部落格範本。只需編輯一個 JSON 設定檔，用 Markdown 撰寫內容，接著建置並部署即可。支援部落格文章、作品集、履歷、筆記、日記等多種用途。

**建置技術** TypeScript + React 19 + Vite + TailwindCSS v4

🌐 [简体中文](README.zh-CN.md) · [繁體中文（香港）](README.zh-HK.md) · [繁體中文（臺灣）](README.zh-TW.md) · [Español](README.es.md) · [Italiano](README.it.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [文言](README.lzh.md) · [uʍop ǝpᴉsdn ǝuoɥdǝlǝꓕ](README.en-UD.md)

---

## 快速開始

```bash
git clone https://github.com/haruno-haresora/kitty-blog.git my-blog
cd my-blog
npm install
npm run dev
```

開啟 `http://localhost:5173`，你會看到範例網站。

---

## AI 驅動部署（建議使用）

此專案內含一份 **AI 代理指令集**（`AGENTS.md`），可供任何 AI 編碼代理讀取，自動設定、建置並部署你的網站。相容於 OpenCode、Claude Code、Cursor、Codex、Windsurf、Hermes、KimiCode、OpenClaw 等工具。

只要在你的代理中開啟此專案，然後說：

> *「幫我把部落格部署到 example.com，VPS 位址是 1.2.3.4」*

代理會讀取 `AGENTS.md`，然後：
1. 協助你編輯 `config.json`，填入網站詳細資訊
2. 撰寫你的 Markdown 內容
3. 建置正式環境套件
4. 上傳到你的 VPS
5. 設定 nginx + 透過 certbot 啟用 HTTPS

無需手動設定伺服器，不用複製貼上設定檔，只要告訴代理你想要什麼即可。

完整的部署流程、設定檔結構、建置指令以及所有已知的注意事項，都記錄在 `AGENTS.md` 中。

---

## 設定你的網站

所有設定都由專案根目錄下的單一檔案控制：**`config.json`**。在建置之前編輯它即可 — 不需要修改任何程式碼。

### 步驟 1 — 網站基本資訊

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

| 欄位 | 用途說明 |
|-------|-------------|
| `websiteTitle` | 瀏覽器分頁標題 |
| `websiteAuthor` | 側邊欄頭像下方顯示的名稱 |
| `titleOnTopBar` | 頂部導覽列中的文字 |
| `faviconPath` | 瀏覽器 favicon（SVG/PNG，放在 `public/`） |
| `avatarPath` | 側邊欄中的個人頭像（JPEG/PNG/GIF/SVG，放在 `public/`） |
| `copyrightInfo` | 側邊欄底部的頁尾文字 |
| `websiteStyle` | `"catppuccin"`（無襯線體、紫色點綴）或 `"oak"`（襯線體、溫暖棕色調） |

### 步驟 2 — 選擇主題樣式

提供兩種主題，均支援自動深色／淺色模式切換：

| 主題 | 字型 | 風格感受 |
|-------|------|------|
| `catppuccin` | Open Sans（無襯線體） | 現代、簡潔、紫色點綴 |
| `oak` | Source Serif 4（襯線體） | 溫暖、舒適、棕色調 |

右上角的深色／淺色切換按鈕會記住你的偏好，預設會跟隨系統設定。

### 步驟 3 — 建立側邊欄

側邊欄是一個由**模組**組成的樹狀結構。每個模組可使用以下三種樣式之一：

#### 目錄模組
一個可收合展開的資料夾，用於容納其他模組。適合用來分類你的內容。

```json
{
  "moduleName": "Blog",
  "moduleStyle": "directory",
  "inDirectory": [ ...child modules... ]
}
```

#### 檔案模組
點擊後會在主閱讀區載入 Markdown 檔案，並自動關閉側邊欄。

```json
{
  "moduleName": "About Me",
  "moduleStyle": "file",
  "dir": "./aboutme.md"
}
```

`dir` 是你 Markdown 檔案在 `public/` 目錄中的路徑。

#### 卡片模組
點擊後會顯示文章卡片網格，每張卡片連結到一個 Markdown 檔案。卡片可以選擇性地加入封面圖片。

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

| 欄位 | 是否必填 | 備註 |
|-------|-----------|-------|
| `passageTitle` | 必填 | 卡片標題 |
| `passageDescription` | 必填 | 卡片上的簡短摘要 |
| `passageAuthor` | 必填 | 顯示於卡片頁尾 |
| `publishDate` | 必填 | 任意格式，顯示於卡片頁尾 |
| `filePath` | 必填 | Markdown 檔案在 `public/` 中的路徑 |
| `passageCover` | **選填** | 封面圖片路徑。留空或省略則為無封面卡片。 |

---

## 撰寫內容

### Markdown 檔案

所有 Markdown 檔案都放在 `public/` 中。你可以使用子目錄來組織：

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

在 `config.json` 中以 `./posts/hello-world.md` 這樣的路徑來引用。

### 支援的 Markdown 語法

渲染器支援**所有**標準及擴充 Markdown 語法：

| 功能 | 寫法 |
|---------|-----------|
| **粗體**、*斜體*、~~刪除線~~ | `**粗體**`、`*斜體*`、`~~刪除線~~` |
| 連結 | `[文字](https://...)` |
| 圖片 | `![替代文字](./image.png)` |
| 標題 | `# H1` 到 `###### H6` |
| 清單（無序、有序、巢狀） | `- 項目` 或 `1. 項目` |
| 任務清單 | `- [x] 已完成`、`- [ ] 待辦` |
| 表格 | `\| 欄位 \| 欄位 \|` |
| 引用區塊 | `> 引用文字` |
| 帶語法高亮的程式碼區塊 | ` ```typescript ` |
| 行內程式碼 | `` `程式碼` `` |
| 數學公式（LaTeX） | `$E=mc^2$` 或 `$$...$$` |
| 表情符號 | `:smile:` `:rocket:` |
| 註腳 | `[^1]` 然後 `[^1]: 註解` |
| 下標／上標 | `H~2~O` / `x^2^` |
| 定義清單 | `詞彙` 然後 `: 定義` |
| 縮寫 | `*[HTML]: HyperText Markup Language` |

### 圖片

所有常見格式均支援：**JPEG**、**PNG**、**GIF**、**SVG**。將圖片放入 `public/`，並在 Markdown 中使用 `![替代文字](./path/to/image.png)` 引用。

---

## 自訂外觀

### 變更顏色

編輯 `src/themes/catppuccin.css` 或 `src/themes/oak.css` 中的 CSS 自訂屬性。每個檔案包含兩個部分 — 淺色模式的變數，以及用於深色模式的 `.dark[data-theme="..."]` 區塊。

例如，要變更 catppuccin 淺色模式的主題色：

```css
[data-theme="catppuccin"] {
  --color-accent: #你的十六進位色碼;
  --color-accent-hover: #較深的變體;
}
```

### 字型

字型是從 Google Fonts 載入，設定在 `index.html` 中。若要使用不同的字型：

1. 更新 `index.html` 中的 Google Fonts `<link>`
2. 在主題 CSS 的兩個 `[data-theme="..."]` 區塊中，變更 `--font-body`
3. 如果需要不同的等寬字型，變更 `--font-mono`

---

## 建置正式版本

```bash
npm run build
```

這會建立一個 `dist/` 目錄，內含靜態檔案 — HTML、CSS、JS 以及 `public/` 中的全部資源。將這個目錄部署到任何靜態託管服務或網頁伺服器即可。

---

## 部署到 VPS

本指南假設你有一台 **Linux VPS**（Ubuntu/Debian），且已將網域名稱指向該主機。

### 1. 上傳建置成果

從你的本機執行：

```bash
npm run build
scp -r dist/* user@your-server:/tmp/kitty-blog/
```

### 2. 伺服器設定

透過 SSH 連入你的 VPS 並安裝 nginx：

```bash
ssh user@your-server
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y
```

### 3. 將檔案移至網頁根目錄

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

啟用設定：

```bash
sudo ln -s /etc/nginx/sites-available/kitty-blog /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default   # 移除預設網站設定
sudo nginx -t                               # 測試設定檔
sudo systemctl reload nginx
```

`try_files $uri $uri/ /index.html` 這行非常重要 — 它確保所有路由（`/read/...`、`/cards/...`）在使用者重新整理頁面或分享連結時都能正常運作。

### 5. 使用 Certbot 設定 SSL

```bash
sudo certbot --nginx -d your-domain.com
```

依照提示操作即可。Certbot 會自動更新你的 nginx 設定以使用 HTTPS，並設定自動續期。

測試自動續期：

```bash
sudo certbot renew --dry-run
```

### 6. 防火牆（若使用 ufw）

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 7. 自動化後續部署

在本機建立部署腳本：

```bash
#!/bin/bash
npm run build
rsync -avz --delete dist/ user@your-server:/var/www/kitty-blog/
ssh user@your-server "sudo systemctl reload nginx"
echo "Deployed!"
```

將其設為可執行：`chmod +x deploy.sh`。執行 `./deploy.sh` 即可部署。

---

## 更新內容

若要新增或修改內容，你只需要：

1. 在 `public/` 中新增／編輯 Markdown 檔案
2. 若新增了側邊欄項目，則更新 `config.json`
3. 執行 `npm run build && ./deploy.sh`

除非你要自訂設計本身，否則永遠不需要碰 React/TypeScript 程式碼。

---

## 專案結構（參考用）

```
./
├── config.json              # ← 編輯這個檔案
├── public/                  # ← 內容放在這裡
│   ├── favicon.svg
│   ├── avatar.svg
│   ├── aboutme.md
│   └── posts/
│       ├── hello-world.md
│       └── covers/
│           └── hello.svg
├── src/                     # ← 主題／元件程式碼（需要自訂設計時才編輯）
│   ├── themes/
│   │   ├── catppuccin.css
│   │   └── oak.css
│   ├── components/
│   └── pages/
├── vite.config.ts
└── package.json
```

---

## 授權條款

MIT — 可自由用於任何用途。
