# Kitty Blog

基于 Markdown 的个人博客模板。配置一个 JSON 文件，用 Markdown 编写内容，构建并部署。支持博客文章、作品集、简历、笔记和日记。

**技术栈** TypeScript + React 19 + Vite + TailwindCSS v4

🌐 [English](README.md) · [繁體中文（香港）](README.zh-HK.md) · [繁體中文（臺灣）](README.zh-TW.md) · [Español](README.es.md) · [Italiano](README.it.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [文言](README.lzh.md) · [uʍop ǝpᴉsdn ǝuoɥdǝlǝꓕ](README.en-UD.md)

---

## 快速开始

```bash
git clone https://github.com/haruno-haresora/kitty-blog.git my-blog
cd my-blog
npm install
npm run dev
```

打开 `http://localhost:5173` — 你将看到示例网站。

---

## AI 驱动部署（推荐）

本项目包含一个 **Agent 指令包**（`AGENTS.md`），任何 AI 编程代理都可以用它来自动配置、构建和部署你的网站。兼容 OpenCode、Claude Code、Cursor、Codex、Windsurf、Hermes、KimiCode、OpenClaw 等。

只需在代理中打开本项目，然后说：

> *"将我的博客部署到 example.com，VPS IP 是 1.2.3.4"*

代理会读取 `AGENTS.md`，然后：
1. 帮你编辑 `config.json`，填入网站信息
2. 编写你的 Markdown 内容
3. 构建生产环境包
4. 上传到你的 VPS
5. 通过 certbot 配置 nginx + HTTPS

无需手动配置服务器。无需复制粘贴配置文件。只需告诉代理你想要什么。

完整的部署流程、配置 schema、构建命令以及所有已知陷阱都记录在 `AGENTS.md` 中。

---

## 配置你的网站

一切由项目根目录下的单个文件驱动：**`config.json`**。在构建前编辑它 — 无需改动代码。

### 第一步 — 网站身份

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

| 字段 | 说明 |
|-------|-------------|
| `websiteTitle` | 浏览器标签页标题 |
| `websiteAuthor` | 侧边栏头像下方显示的名字 |
| `titleOnTopBar` | 顶部标题栏文字 |
| `faviconPath` | 浏览器图标（SVG/PNG，放入 `public/`） |
| `avatarPath` | 侧边栏中的个人头像（JPEG/PNG/GIF/SVG，放入 `public/`） |
| `copyrightInfo` | 侧边栏底部的版权文字 |
| `websiteStyle` | `"catppuccin"`（无衬线体，紫色调）或 `"oak"`（衬线体，温暖棕色） |

### 第二步 — 选择主题

两种主题，均支持自动深色/浅色模式：

| 主题 | 字体 | 风格 |
|-------|------|------|
| `catppuccin` | Open Sans（无衬线体） | 现代、简洁、紫色调 |
| `oak` | Source Serif 4（衬线体） | 温暖、舒适、棕色调 |

右上角的深色/浅色切换按钮会记住你的偏好。默认跟随系统设置。

### 第三步 — 构建你的侧边栏

侧边栏是一个模块树。每个模块有三种样式之一：

#### 目录模块
一个可折叠的文件夹，包含其他模块。用于分组管理内容。

```json
{
  "moduleName": "Blog",
  "moduleStyle": "directory",
  "inDirectory": [ ...子模块... ]
}
```

#### 文件模块
点击后在主阅读区加载 Markdown 文件，并自动关闭侧边栏。

```json
{
  "moduleName": "About Me",
  "moduleStyle": "file",
  "dir": "./aboutme.md"
}
```

`dir` 是 Markdown 文件在 `public/` 文件夹内的路径。

#### 卡片模块
点击后显示文章卡片网格。每张卡片链接到一个 Markdown 文件。卡片可以可选地添加封面图片。

```json
{
  "moduleName": "Articles",
  "moduleStyle": "card",
  "inCard": [
    {
      "passageTitle": "Hello World",
      "passageDescription": "我的第一篇博客文章，关于入门。",
      "passageAuthor": "Jane Doe",
      "publishDate": "2026-06-01 上午",
      "filePath": "./posts/hello-world.md",
      "passageCover": "./posts/covers/hello.svg"
    },
    {
      "passageTitle": "无封面卡片",
      "passageDescription": "这张卡片没有封面图片 — 使用简洁样式。",
      "passageAuthor": "Jane Doe",
      "publishDate": "2026-05-15 下午",
      "filePath": "./posts/no-cover.md"
    }
  ]
}
```

| 字段 | 必填？ | 说明 |
|-------|-----------|-------|
| `passageTitle` | 是 | 卡片标题 |
| `passageDescription` | 是 | 卡片上的简短摘要 |
| `passageAuthor` | 是 | 显示在卡片底部 |
| `publishDate` | 是 | 任意格式，显示在卡片底部 |
| `filePath` | 是 | Markdown 文件在 `public/` 内的路径 |
| `passageCover` | **否** | 封面图片路径。留空或省略则显示无封面卡片。 |

---

## 编写内容

### Markdown 文件

所有 Markdown 文件放在 `public/` 中。你可以按子目录组织：

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

在 `config.json` 中引用它们，如 `./posts/hello-world.md`。

### 支持的 Markdown 语法

渲染器支持所有标准和扩展的 Markdown：

| 功能 | 写法 |
|---------|-----------|
| **粗体**，*斜体*，~~删除线~~ | `**bold**`，`*italic*`，`~~strike~~` |
| 链接 | `[text](https://...)` |
| 图片 | `![alt](./image.png)` |
| 标题 | `# 一级标题` 到 `###### 六级标题` |
| 列表（有序、无序、嵌套） | `- 项目` 或 `1. 项目` |
| 任务列表 | `- [x] 已完成`，`- [ ] 待办` |
| 表格 | `\| 列 \| 列 \|` |
| 引用 | `> 引用文字` |
| 代码块（带语法高亮） | ` ```typescript ` |
| 行内代码 | `` `code` `` |
| 数学公式（LaTeX） | `$E=mc^2$` 或 `$$...$$` |
| 表情符号 | `:smile:` `:rocket:` |
| 脚注 | `[^1]` 然后 `[^1]: 注释` |
| 下标 / 上标 | `H~2~O` / `x^2^` |
| 定义列表 | `术语` 然后 `: 定义` |
| 缩写 | `*[HTML]: 超文本标记语言` |

### 图片

支持所有标准格式：**JPEG**、**PNG**、**GIF**、**SVG**。将图片放入 `public/`，在 Markdown 中用 `![alt](./path/to/image.png)` 引用。

---

## 自定义外观

### 更改颜色

编辑 `src/themes/catppuccin.css` 或 `src/themes/oak.css` 中的 CSS 自定义属性。每个文件有两个部分 — 浅色模式变量和用于深色模式的 `.dark[data-theme="..."]` 块。

例如，修改 catppuccin 浅色模式的主题色：

```css
[data-theme="catppuccin"] {
  --color-accent: #your-hex-color;
  --color-accent-hover: #darker-variant;
}
```

### 字体

字体通过 `index.html` 从 Google Fonts 加载。使用不同字体的步骤：

1. 更新 `index.html` 中的 Google Fonts `<link>`
2. 在主题 CSS 的两个 `[data-theme="..."]` 块中修改 `--font-body`
3. 如果想更换等宽字体，修改 `--font-mono`

---

## 构建生产版本

```bash
npm run build
```

这会创建一个 `dist/` 文件夹，包含静态文件 — HTML、CSS、JS 以及 `public/` 中的所有资源。将此文件夹部署到任何静态托管或 Web 服务器即可。

---

## 部署到 VPS

本指南假设你有一台 **Linux VPS**（Ubuntu/Debian），并且域名已指向该 VPS。

### 1. 上传构建产物

在本地机器上运行：

```bash
npm run build
scp -r dist/* user@your-server:/tmp/kitty-blog/
```

### 2. 服务器配置

SSH 登录到你的 VPS 并安装 nginx：

```bash
ssh user@your-server
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y
```

### 3. 移动文件到 Web 根目录

```bash
sudo mkdir -p /var/www/kitty-blog
sudo cp -r /tmp/kitty-blog/* /var/www/kitty-blog/
sudo chown -R www-data:www-data /var/www/kitty-blog
```

### 4. Nginx 配置

创建 `/etc/nginx/sites-available/kitty-blog`：

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

启用网站配置：

```bash
sudo ln -s /etc/nginx/sites-available/kitty-blog /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default   # 移除默认站点
sudo nginx -t                               # 测试配置
sudo systemctl reload nginx
```

`try_files $uri $uri/ /index.html` 这一行至关重要 — 它确保所有路由（`/read/...`、`/cards/...`）在用户刷新或分享链接时正常工作。

### 5. 使用 Certbot 配置 SSL

```bash
sudo certbot --nginx -d your-domain.com
```

按提示操作。Certbot 会自动更新你的 nginx 配置以使用 HTTPS，并设置自动续期。

测试自动续期：

```bash
sudo certbot renew --dry-run
```

### 6. 防火墙（如使用 ufw）

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 7. 自动化后续部署

在本地机器上创建部署脚本：

```bash
#!/bin/bash
npm run build
rsync -avz --delete dist/ user@your-server:/var/www/kitty-blog/
ssh user@your-server "sudo systemctl reload nginx"
echo "部署完成！"
```

赋予执行权限：`chmod +x deploy.sh`。运行 `./deploy.sh` 即可部署。

---

## 更新内容

要添加或修改内容，你只需要：

1. 在 `public/` 中添加/编辑 Markdown 文件
2. 如果添加了新的侧边栏条目，更新 `config.json`
3. 运行 `npm run build && ./deploy.sh`

除非你要自定义设计本身，否则永远不需要触碰 React/TypeScript 代码。

---

## 项目结构（参考）

```
./
├── config.json              # ← 编辑这个文件
├── public/                  # ← 内容放在这里
│   ├── favicon.svg
│   ├── avatar.svg
│   ├── aboutme.md
│   └── posts/
│       ├── hello-world.md
│       └── covers/
│           └── hello.svg
├── src/                     # ← 主题/组件代码（修改设计时编辑）
│   ├── themes/
│   │   ├── catppuccin.css
│   │   └── oak.css
│   ├── components/
│   └── pages/
├── vite.config.ts
└── package.json
```

---

## 许可证

MIT — 可自由使用。
