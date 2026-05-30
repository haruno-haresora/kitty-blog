# Kitty Blog

以 Markdown 為基之個人網誌模版也。但修一 JSON 之檔，以 Markdown 書汝文，構建而部署之。博文、作品集、履歷、筆記、日記，皆可為之。

**所用之技** TypeScript + React 19 + Vite + TailwindCSS v4

🌐 [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文（香港）](README.zh-HK.md) · [繁體中文（臺灣）](README.zh-TW.md) · [Español](README.es.md) · [Italiano](README.it.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [uʍop ǝpᴉsdn ǝuoɥdǝlǝꓕ](README.en-UD.md)

---

## 速啓

```bash
git clone https://github.com/haruno-haresora/kitty-blog.git my-blog
cd my-blog
npm install
npm run dev
```

啓 `http://localhost:5173`，即可見示例之站焉。

---

## AI 驅動部署（薦）

此項包含一 **Agent 指南方畧**（`AGENTS.md`），諸 AI 編程代理皆可用之，以自動配置、構建、部署汝之網站，與 OpenCode、Claude Code、Cursor、Codex、Windsurf、Hermes、KimiCode、OpenClaw 等工具兼容也。

但開此項於代理之中，語之曰：

> *「部署吾之博客至 example.com，VPS 之址乃 1.2.3.4」*

代理讀 `AGENTS.md` 而後：
1. 助汝編輯 `config.json` 以定網站之詳情
2. 書寫 Markdown 之內容
3. 構建生產所用之包
4. 上傳至於 VPS
5. 配置 nginx 兼以 certbot 設 HTTPS

无須手動設伺服器、无須複製粘貼配置文件。但告代理汝所欲求者可也。

完整之部署流程、配置模式、構建命令及一切已知之陷阱，悉載於 `AGENTS.md` 中。

---

## 配置汝之網站

萬事皆由一檔所驅：**`config.json`** 在項目根目之下。構建前先修之，不須改代碼也。

### 步驟一 — 站點身份

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

| 字段 | 其用 |
|-------|-------------|
| `websiteTitle` | 瀏覽器頁籤之標題 |
| `websiteAuthor` | 側欄頭像之下所示之名 |
| `titleOnTopBar` | 頂欄所顯示之文 |
| `faviconPath` | 瀏覽器之網站圖標（SVG/PNG，置於 `public/` 中） |
| `avatarPath` | 側欄中之頭像圖（JPEG/PNG/GIF/SVG，置於 `public/` 中） |
| `copyrightInfo` | 側欄底部之頁尾文字 |
| `websiteStyle` | `"catppuccin"`（无襯線體，紫色點綴）或 `"oak"`（襯線體，暖棕色調） |

### 步驟二 — 擇定主題

二主題，皆具自動晝夜模式：

| 主題 | 字體 | 氣韻 |
|-------|------|------|
| `catppuccin` | Open Sans（无襯線體） | 現代、簡潔、紫色點綴 |
| `oak` | Source Serif 4（襯線體） | 溫暖、愜意、棕色色調 |

右上角之晝夜切換按鈕，能記汝之偏好。默認則從系統之設定。

### 步驟三 — 構建側欄

側欄者，模組所成之樹也。每模組有三式之一：

#### 目錄模組

可折疊之文件夾，其中容納他模組。以此歸類汝之內容。

```json
{
  "moduleName": "Blog",
  "moduleStyle": "directory",
  "inDirectory": [ ...子模組... ]
}
```

#### 文件模組

點之則於主閱讀區加載 Markdown 文件，且自動關閉側欄。

```json
{
  "moduleName": "About Me",
  "moduleStyle": "file",
  "dir": "./aboutme.md"
}
```

`dir` 乃 Markdown 文件在 `public/` 文件夾內之路徑也。

#### 卡片模組

點之則示篇章卡片之網格。每卡片鏈接至一 Markdown 文件。卡片可選配封面之圖。

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

| 字段 | 必填否？ | 註記 |
|-------|-----------|-------|
| `passageTitle` | 然 | 卡片之標題 |
| `passageDescription` | 然 | 卡片上之簡述 |
| `passageAuthor` | 然 | 示於卡片頁腳 |
| `publishDate` | 然 | 任意格式，示於卡片頁腳 |
| `filePath` | 然 | Markdown 文件於 `public/` 中之路徑 |
| `passageCover` | **否** | 封面圖路徑。不填或省略則為无封面之卡片。 |

---

## 書寫內容

### Markdown 文件

一切 Markdown 皆置於 `public/` 中。可設子目錄以組織之：

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

於 `config.json` 中以 `./posts/hello-world.md` 引之。

### 所支持之 Markdown 語法

渲染器支持**一切**標準及擴展 Markdown 語法：

| 特性 | 如此書寫 |
|---------|-----------|
| **粗體**，*斜體*，~~刪除線~~ | `**粗體**`，`*斜體*`，`~~刪除~~` |
| 鏈接 | `[文](https://...)` |
| 圖片 | `![替代文字](./image.png)` |
| 標題 | `# H1` 至 `###### H6` |
| 列表（有序、无序、嵌套） | `- 項` 或 `1. 項` |
| 任務列表 | `- [x] 已成`，`- [ ] 待成` |
| 表格 | `\| 列 \| 列 \|` |
| 引用 | `> 引文` |
| 代碼塊附語法高亮 | ` ```typescript ` |
| 行內代碼 | `` `代碼` `` |
| 數學式（LaTeX） | `$E=mc^2$` 或 `$$...$$` |
| 表情符號 | `:smile:` `:rocket:` |
| 腳註 | `[^1]` 繼而 `[^1]: 註` |
| 下標 / 上標 | `H~2~O` / `x^2^` |
| 定義列表 | `術語` 繼而 `: 定義` |
| 縮寫 | `*[HTML]: HyperText Markup Language` |

### 圖片

凡標準格式者皆可用：**JPEG**、**PNG**、**GIF**、**SVG**。置圖片於 `public/` 中，於 Markdown 中以 `![替代文字](./path/to/image.png)` 引之。

---

## 自訂外觀

### 更改配色

編輯 `src/themes/catppuccin.css` 或 `src/themes/oak.css` 中之 CSS 自定義屬性。每文件有二段落——畫模式之變量及 `.dark[data-theme="..."]` 塊用於夜間模式。

例如，欲改 catppuccin 亮色模式之主色調：

```css
[data-theme="catppuccin"] {
  --color-accent: #汝之十六進制色值;
  --color-accent-hover: #較深之變體;
}
```

### 字體

字體自 Google Fonts 於 `index.html` 中加載。欲用他字體：

1. 更新 `index.html` 中之 Google Fonts `<link>`
2. 於主題 CSS 兩處 `[data-theme="..."]` 塊中改 `--font-body`
3. 若欲用不同之代碼字體，改 `--font-mono`

---

## 構建以供生產

```bash
npm run build
```

此命創建 `dist/` 文件夾，內含靜態文件——HTML、CSS、JS 及 `public/` 中所有資源。將此文件夾部署至任何靜態託管或網頁伺服器即可。

---

## 部署至 VPS

此指南假定汝有 **Linux VPS**（Ubuntu/Debian），且有域名指向之。

### 一、上傳構建之產物

自汝本地之機器：

```bash
npm run build
scp -r dist/* user@your-server:/tmp/kitty-blog/
```

### 二、伺服器設置

SSH 登入 VPS 並安裝 nginx：

```bash
ssh user@your-server
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y
```

### 三、移動文件至網頁根目

```bash
sudo mkdir -p /var/www/kitty-blog
sudo cp -r /tmp/kitty-blog/* /var/www/kitty-blog/
sudo chown -R www-data:www-data /var/www/kitty-blog
```

### 四、Nginx 配置

創建 `/etc/nginx/sites-available/kitty-blog`：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/kitty-blog;
    index index.html;

    # SPA 回退——所有路由皆歸於 index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip 壓縮
    gzip on;
    gzip_types text/css application/javascript text/markdown image/svg+xml;
    gzip_min_length 256;

    # 緩存靜態資源
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

啓用之：

```bash
sudo ln -s /etc/nginx/sites-available/kitty-blog /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default   # 移除默認站點
sudo nginx -t                               # 測試配置
sudo systemctl reload nginx
```

`try_files $uri $uri/ /index.html` 此行之要，在於確保所有路由（`/read/...`、`/cards/...`）當用戶刷新或分享鏈接時皆能正常運作。

### 五、以 Certbot 配置 SSL

```bash
sudo certbot --nginx -d your-domain.com
```

遵提示而行。Certbot 自會更新 nginx 之配置以用 HTTPS，並設置自動續期。

測試自動續期：

```bash
sudo certbot renew --dry-run
```

### 六、防火牆（若用 ufw）

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 七、自動化後續部署

於本地機器創建部署腳本：

```bash
#!/bin/bash
npm run build
rsync -avz --delete dist/ user@your-server:/var/www/kitty-blog/
ssh user@your-server "sudo systemctl reload nginx"
echo "已部署！"
```

使之可執行：`chmod +x deploy.sh`。運行 `./deploy.sh` 以部署。

---

## 更新內容

欲增刪內容，但需：

1. 於 `public/` 中新增或編輯 Markdown 文件
2. 若有新增側欄項目，更新 `config.json`
3. 執行 `npm run build && ./deploy.sh`

無須觸及 React/TypeScript 代碼，除非欲自訂設計本身。

---

## 項目結構（備考）

```
./
├── config.json              # ← 汝但修此
├── public/                  # ← 汝之內容置於此
│   ├── favicon.svg
│   ├── avatar.svg
│   ├── aboutme.md
│   └── posts/
│       ├── hello-world.md
│       └── covers/
│           └── hello.svg
├── src/                     # ← 主題/組件代碼（若欲改設計則修之）
│   ├── themes/
│   │   ├── catppuccin.css
│   │   └── oak.css
│   ├── components/
│   └── pages/
├── vite.config.ts
└── package.json
```

---

## 許可協議

MIT —— 可隨意用之。
