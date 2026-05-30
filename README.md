# Kitty Blog

A markdown-based personal blog template. Configure one JSON file, write your content in markdown, build, and deploy. Supports blog posts, portfolios, resumes, notes, and diaries.

**Built with** TypeScript + React 19 + Vite + TailwindCSS v4

🌐 [简体中文](README.zh-CN.md) · [繁體中文（香港）](README.zh-HK.md) · [繁體中文（臺灣）](README.zh-TW.md) · [Español](README.es.md) · [Italiano](README.it.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [文言](README.lzh.md) · [uʍop ǝpᴉsdn ǝuoɥdǝlǝꓕ](README.en-UD.md)

---

## Quick Start

```bash
git clone https://github.com/haruno-haresora/kitty-blog.git my-blog
cd my-blog
npm install
npm run dev
```

Open `http://localhost:5173` — you'll see the sample site.

---

## AI-Powered Deploy (Recommended)

This project includes an **Agent Instruction Pack** (`AGENTS.md`) that any AI coding agent can use to configure, build, and deploy your site automatically. Compatible with OpenCode, Claude Code, Cursor, Codex, Windsurf, Hermes, KimiCode, OpenClaw, and more.

Just open this project in your agent and say:

> *"Deploy my blog to example.com on my VPS at 1.2.3.4"*

The agent will read `AGENTS.md`, then:
1. Help you edit `config.json` with your site details
2. Write your markdown content
3. Build the production bundle
4. Upload it to your VPS
5. Configure nginx + HTTPS via certbot

No manual server setup. No copy-pasting config files. Just tell the agent what you want.

The complete deployment procedure, config schema, build commands, and all known pitfalls are documented in `AGENTS.md`.

---

## Configuring Your Website

Everything is driven by a single file: **`config.json`** at the project root. Edit it before building — no code changes needed.

### Step 1 — Site Identity

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

| Field | What it does |
|-------|-------------|
| `websiteTitle` | Browser tab title |
| `websiteAuthor` | Name shown under avatar in sidebar |
| `titleOnTopBar` | Text in the top header bar |
| `faviconPath` | Browser favicon (SVG/PNG, put in `public/`) |
| `avatarPath` | Your profile picture in sidebar (JPEG/PNG/GIF/SVG, put in `public/`) |
| `copyrightInfo` | Footer text at bottom of sidebar |
| `websiteStyle` | `"catppuccin"` (sans-serif, purple accents) or `"oak"` (serif, warm brown) |

### Step 2 — Choose a Theme

Two themes, both with automatic dark/light mode:

| Theme | Font | Vibe |
|-------|------|------|
| `catppuccin` | Open Sans (sans-serif) | Modern, clean, purple accents |
| `oak` | Source Serif 4 (serif) | Warm, cozy, brown tones |

The dark/light toggle in the top-right corner remembers your preference. By default it follows your system setting.

### Step 3 — Build Your Sidebar

The sidebar is a tree of **modules**. Each module has one of three styles:

#### Directory Module
A collapsible folder that contains other modules. Use this to group your content.

```json
{
  "moduleName": "Blog",
  "moduleStyle": "directory",
  "inDirectory": [ ...child modules... ]
}
```

#### File Module
Clicking it loads a markdown file in the main reading area and auto-closes the sidebar.

```json
{
  "moduleName": "About Me",
  "moduleStyle": "file",
  "dir": "./aboutme.md"
}
```

`dir` is the path to your markdown file inside the `public/` folder.

#### Card Module
Clicking it shows a grid of passage cards. Each card links to a markdown file. Cards can optionally have cover images.

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

| Field | Required? | Notes |
|-------|-----------|-------|
| `passageTitle` | Yes | Card heading |
| `passageDescription` | Yes | Short summary on the card |
| `passageAuthor` | Yes | Shown on card footer |
| `publishDate` | Yes | Any format, shown on card footer |
| `filePath` | Yes | Path to markdown file inside `public/` |
| `passageCover` | **No** | Cover image path. Leave empty or omit for no-cover cards. |

---

## Writing Content

### Markdown Files

All markdown goes in `public/`. You can organize into subdirectories:

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

Reference them in `config.json` as `./posts/hello-world.md`.

### Supported Markdown Syntax

The renderer supports **all** standard and extended markdown:

| Feature | Write this |
|---------|-----------|
| **Bold**, *italic*, ~~strikethrough~~ | `**bold**`, `*italic*`, `~~strike~~` |
| Links | `[text](https://...)` |
| Images | `![alt](./image.png)` |
| Headings | `# H1` through `###### H6` |
| Lists (ordered, unordered, nested) | `- item` or `1. item` |
| Task lists | `- [x] done`, `- [ ] todo` |
| Tables | `| Col | Col |` |
| Blockquotes | `> quoted text` |
| Code blocks with syntax highlighting | ` ```typescript ` |
| Inline code | `` `code` `` |
| Math (LaTeX) | `$E=mc^2$` or `$$...$$` |
| Emoji | `:smile:` `:rocket:` |
| Footnotes | `[^1]` then `[^1]: note` |
| Subscript / Superscript | `H~2~O` / `x^2^` |
| Definition lists | `Term` then `: Definition` |
| Abbreviations | `*[HTML]: HyperText Markup Language` |

### Images

All standard formats work: **JPEG**, **PNG**, **GIF**, **SVG**. Put images in `public/` and reference them in markdown with `![alt](./path/to/image.png)`.

---

## Customizing Appearance

### Changing Colors

Edit the CSS custom properties in `src/themes/catppuccin.css` or `src/themes/oak.css`. Each file has two sections — light mode variables and a `.dark[data-theme="..."]` block for dark mode.

For example, to change the accent color in catppuccin light mode:

```css
[data-theme="catppuccin"] {
  --color-accent: #your-hex-color;
  --color-accent-hover: #darker-variant;
}
```

### Fonts

Fonts are loaded from Google Fonts in `index.html`. To use different fonts:

1. Update the Google Fonts `<link>` in `index.html`
2. Change `--font-body` in both `[data-theme="..."]` blocks in your theme CSS
3. Change `--font-mono` if you want a different code font

---

## Building for Production

```bash
npm run build
```

This creates a `dist/` folder with static files — HTML, CSS, JS, and all assets from `public/`. Deploy this folder to any static host or web server.

---

## Deploying to a VPS

This guide assumes you have a **Linux VPS** (Ubuntu/Debian) with a domain name pointing to it.

### 1. Upload Your Build

From your local machine:

```bash
npm run build
scp -r dist/* user@your-server:/tmp/kitty-blog/
```

### 2. Server Setup

SSH into your VPS and install nginx:

```bash
ssh user@your-server
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y
```

### 3. Move Files to Web Root

```bash
sudo mkdir -p /var/www/kitty-blog
sudo cp -r /tmp/kitty-blog/* /var/www/kitty-blog/
sudo chown -R www-data:www-data /var/www/kitty-blog
```

### 4. Nginx Config

Create `/etc/nginx/sites-available/kitty-blog`:

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

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/kitty-blog /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default   # remove default site
sudo nginx -t                               # test config
sudo systemctl reload nginx
```

The `try_files $uri $uri/ /index.html` line is critical — it ensures all routes (`/read/...`, `/cards/...`) work when users refresh or share links.

### 5. SSL with Certbot

```bash
sudo certbot --nginx -d your-domain.com
```

Follow the prompts. Certbot will automatically update your nginx config to use HTTPS and set up auto-renewal.

To test auto-renewal:

```bash
sudo certbot renew --dry-run
```

### 6. Firewall (if using ufw)

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 7. Automate Future Deploys

Create a deploy script on your local machine:

```bash
#!/bin/bash
npm run build
rsync -avz --delete dist/ user@your-server:/var/www/kitty-blog/
ssh user@your-server "sudo systemctl reload nginx"
echo "Deployed!"
```

Make it executable: `chmod +x deploy.sh`. Run `./deploy.sh` to deploy.

---

## Updating Content

To add or change content, you only need to:

1. Add/edit markdown files in `public/`
2. Update `config.json` if adding new sidebar entries
3. Run `npm run build && ./deploy.sh`

You never need to touch React/TypeScript code unless you're customizing the design itself.

---

## Project Structure (Reference)

```
./
├── config.json              # ← You edit THIS
├── public/                  # ← Your content goes HERE
│   ├── favicon.svg
│   ├── avatar.svg
│   ├── aboutme.md
│   └── posts/
│       ├── hello-world.md
│       └── covers/
│           └── hello.svg
├── src/                     # ← Theme/component code (edit for design changes)
│   ├── themes/
│   │   ├── catppuccin.css
│   │   └── oak.css
│   ├── components/
│   └── pages/
├── vite.config.ts
└── package.json
```

---

## License

MIT — use it for anything.
