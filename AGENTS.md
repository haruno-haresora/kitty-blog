# Kitty Blog — Agent Instruction Pack

Import this file into any AI coding agent (OpenCode, Claude Code, Cursor, Codex, Windsurf, Hermes, KimiCode, OpenClaw, etc.) to configure, build, and deploy this blog automatically.

---

## Project Identity

This is **Kitty Blog** — a markdown-based personal blog. TypeScript + React 19 + Vite 8 + TailwindCSS v4. All site configuration lives in `config.json`. User content lives in `public/` as markdown files and images.

---

## Agent Behavior Rules

When a user asks you to work on this project:

1. **Never modify `src/` code unless the user explicitly asks for design/behavior changes.** Content and site config changes should only touch `config.json` and files under `public/`.

2. **When editing `config.json`**, follow the schema below exactly. All fields are typed. The file is imported at build time; invalid JSON will break the build.

3. **When writing markdown content**, create `.md` files under `public/` (or subdirectories like `public/posts/`, `public/notes/`). Reference them in `config.json` as `./path/file.md`.

4. **After any change**, always run `npm run build` to verify nothing is broken.

5. **Read `Instructions.md`** for the full technical specification including all component details, CSS variable reference, and known pitfalls.

---

## config.json Schema

```jsonc
{
  "websiteTitle": "string",
  "websiteAuthor": "string",
  "titleOnTopBar": "string",
  "faviconPath": "./path.svg",       // relative to public/
  "avatarPath": "./path.svg",        // relative to public/
  "copyrightInfo": "string",
  "websiteStyle": "catppuccin | oak",
  "sidebar": [
    // ModuleType: "directory" | "file" | "card"
    {
      "moduleName": "string",
      "moduleStyle": "directory",
      "inDirectory": [ /* child modules */ ]
    },
    {
      "moduleName": "string",
      "moduleStyle": "file",
      "dir": "./path/to/file.md"
    },
    {
      "moduleName": "string",
      "moduleStyle": "card",
      "inCard": [
        {
          "passageTitle": "string",
          "passageDescription": "string",
          "passageAuthor": "string",
          "publishDate": "string",
          "filePath": "./path/to/file.md",
          "passageCover": "./path/to/cover.svg"   // OPTIONAL
        }
      ]
    }
  ]
}
```

### Module behaviors

| Style | Click action | Sidebar |
|-------|-------------|---------|
| `directory` | Expand/collapse children | Stays open |
| `file` | Load markdown in main area | Auto-closes |
| `card` | Show card grid in main area | Auto-closes |

---

## Themes

- `"catppuccin"` — Sans-serif (Open Sans), purple accents, Catppuccin Latte/Mocha palette
- `"oak"` — Serif (Source Serif 4), brown accents, warm oak palette

Dark/light toggle in top bar. Follows system preference; remembers user choice in localStorage. CSS custom properties in `src/themes/<name>.css`.

---

## Markdown Features

Full extended grammar via react-markdown + plugins:
- **GFM**: tables, task lists, strikethrough, autolinks, footnotes
- **Math**: inline `$...$` + block `$$...$$` (KaTeX)
- **Emoji**: `:smile:` shortcodes
- **Code**: syntax-highlighted fenced blocks (rehype-prism-plus)
- **Raw HTML**: passthrough (rehype-raw)
- **Extended**: subscript `~text~`, superscript `^text^`, definition lists (`Term\n: Def`), abbreviations (`*[ABBR]: def`)
- **No heading anchor links** (intentionally excluded)

Supports JPEG, PNG, GIF, SVG images. KaTeX CSS loaded via CDN in `index.html`.

---

## Routing (BrowserRouter, no hash)

| Route | Content |
|-------|---------|
| `/` | Welcome page |
| `/read/*` | Markdown file (splat captures path e.g. `/read/aboutme.md`) |
| `/cards/:moduleName` | Card grid (module name URI-encoded) |

---

## Critical Pitfalls

| # | Trap | Correct |
|---|------|---------|
| 1 | Dark CSS: `.dark [data-theme]` with space | `.dark[data-theme]` NO space (both on `<html>`) |
| 2 | FilePage fetch: `./${params["*"]}` | `/${params["*"]}` (absolute from root) |
| 3 | JSX in `.ts` file | Must be `.tsx` |
| 4 | Heading anchor links | rehypeAutolinkHeadings must NOT be included |
| 5 | `passageCover` field | Optional — omit/empty for plain cards |
| 6 | SPA fallback | `vite.config.ts` needs `appType: 'spa'`; nginx needs `try_files` |
| 7 | Config import | tsconfig needs `"resolveJsonModule": true` |
| 8 | Font variable | Use single `--font-body`, not `--font-sans`/`--font-serif` |

---

## Build Commands

```bash
npm install           # first time
npm run dev           # dev server → localhost:5173
npm run build         # production → dist/
npm run preview       # preview production build
npm run lint          # ESLint
```

---

## Deploy to VPS (Nginx + Certbot)

### Push build to server
```bash
npm run build
scp -r dist/* user@server:/tmp/kitty-blog/
```

### Server setup (SSH in)
```bash
sudo apt update && sudo apt install nginx certbot python3-certbot-nginx -y
sudo mkdir -p /var/www/kitty-blog
sudo cp -r /tmp/kitty-blog/* /var/www/kitty-blog/
sudo chown -R www-data:www-data /var/www/kitty-blog
```

### Nginx config (`/etc/nginx/sites-available/kitty-blog`)
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN;

    root /var/www/kitty-blog;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript text/markdown image/svg+xml;
    gzip_min_length 256;

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Enable & SSL
```bash
sudo ln -s /etc/nginx/sites-available/kitty-blog /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d YOUR_DOMAIN
sudo certbot renew --dry-run
sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw enable
```

### Repeat-deploy script (local)
```bash
#!/bin/bash
npm run build
rsync -avz --delete dist/ user@server:/var/www/kitty-blog/
ssh user@server "sudo systemctl reload nginx"
echo "Deployed!"
```

---

## Customizing

- **Colors**: Edit CSS variables in `src/themes/catppuccin.css` or `src/themes/oak.css`
- **Fonts**: Update Google Fonts `<link>` in `index.html`, then change `--font-body` in theme CSS
- **Layout**: Edit components in `src/components/`
- **Full reference**: Read `Instructions.md`
