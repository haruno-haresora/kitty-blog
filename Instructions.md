# Kitty Blog

## Overview

A markdown-based personal blog template built with **TypeScript + React 19 + Vite 8 + TailwindCSS v4**. Supports passages, portfolio, resume, diary, or notes with a comfortable reading experience. The entire site is configured via a single `config.json` file before building — no code changes needed.

---

## Tech Stack & Dependencies

| Category | Package |
|----------|---------|
| Framework | `react@^19`, `react-dom@^19` |
| Build | `vite@^8`, `@vitejs/plugin-react` |
| Styling | `tailwindcss`, `@tailwindcss/vite` |
| Routing | `react-router-dom` (BrowserRouter, no hash) |
| Markdown | `react-markdown`, `remark-gfm`, `remark-math`, `remark-emoji` |
| Markdown HTML | `rehype-katex`, `rehype-raw`, `rehype-slug`, `rehype-prism-plus` |
| Math | `katex` (CSS loaded in index.html via CDN) |

---

## Project Structure

```
./
├── config.json                   # Website owner edits this ONLY
├── index.html                    # Entry HTML (Google Fonts <link> + KaTeX CSS CDN)
├── vite.config.ts                # Vite + React + TailwindCSS plugins
├── tsconfig.app.json             # TypeScript config (resolveJsonModule: true)
├── package.json
├── Instructions.md               # This file
├── Instructions.md.old           # Original brief spec (archive)
│
├── public/                       # Static assets served at /
│   ├── favicon.svg
│   ├── avatar.svg
│   ├── aboutme.md                # Sample markdown file
│   └── notes/
│       ├── SamplePassage.md
│       └── covers/
│           └── sample.svg
│
└── src/
    ├── main.tsx                  # Entry: BrowserRouter > ConfigProvider > App
    ├── App.tsx                   # Layout shell: TopBar + Sidebar + <Routes>
    ├── index.css                 # @import "tailwindcss" + theme CSS files
    │
    ├── types/
    │   └── config.ts             # TypeScript interfaces for config.json schema
    │
    ├── hooks/
    │   ├── useConfig.ts          # ConfigContext, useConfig(), findCardModule()
    │   └── useTheme.ts           # Dark/light toggle, localStorage, system pref
    │
    ├── providers/
    │   └── ConfigProvider.tsx    # React context provider for BlogConfig
    │
    ├── themes/
    │   ├── catppuccin.css        # CSS custom properties: light + .dark overrides
    │   └── oak.css               # CSS custom properties: light + .dark overrides
    │
    ├── pages/
    │   ├── WelcomePage.tsx       # Route: /
    │   ├── FilePage.tsx          # Route: /read/*  → fetches & renders markdown
    │   └── CardPage.tsx          # Route: /cards/:moduleName → card grid
    │
    └── components/
        ├── TopBar.tsx            # Title, hamburger menu, theme toggle
        ├── Sidebar.tsx           # Multi-level tree nav, avatar, copyright
        ├── CardView.tsx          # Card grid with optional cover images
        └── MarkdownRenderer.tsx  # Full markdown renderer (all extended grammar)
```

---

## config.json Schema

The entire site is driven by `./config.json`. Below is the complete schema with all supported fields.

```jsonc
{
  // --- Site metadata ---
  "websiteTitle": "Kitty Blog",         // <title> tag
  "websiteAuthor": "Author",            // shown in sidebar avatar section
  "titleOnTopBar": "Kitty Blog",        // header text
  "faviconPath": "./favicon.svg",       // path relative to public/
  "avatarPath": "./avatar.svg",         // path relative to public/, shown in sidebar
  "copyrightInfo": "© 2026. All rights reserved.",
  "websiteStyle": "catppuccin",         // "catppuccin" | "oak"

  // --- Sidebar modules (multi-level tree) ---
  "sidebar": [
    {
      "moduleName": "Passages",
      "moduleStyle": "directory",       // "directory" | "file" | "card"
      "inDirectory": [                  // only for "directory" style
        {
          "moduleName": "Notes",
          "moduleStyle": "card",
          "inCard": [                   // only for "card" style
            {
              "passageTitle": "Sample Passage",
              "passageDescription": "A demo passage",
              "passageAuthor": "Author",
              "publishDate": "2026-05-30 Morning",
              "filePath": "./notes/SamplePassage.md",
              "passageCover": "./notes/covers/sample.svg"  // OPTIONAL
            }
          ]
        }
      ]
    },
    {
      "moduleName": "About Me",
      "moduleStyle": "file",
      "dir": "./aboutme.md"             // only for "file" style
    }
  ]
}
```

### Module Styles

| Style | Behavior | Extra Fields |
|-------|----------|-------------|
| `directory` | Expandable/collapsible folder. Contains child modules. | `inDirectory: SidebarModule[]` |
| `file` | Click loads a markdown file in the main area. Sidebar auto-closes. | `dir: string` (path relative to public/) |
| `card` | Click shows a grid of passage cards. Sidebar auto-closes. | `inCard: PassageCard[]` |

### PassageCard Fields

| Field | Required | Description |
|-------|----------|-------------|
| `passageTitle` | Yes | Card heading |
| `passageDescription` | Yes | Card subtext |
| `passageAuthor` | Yes | Author name on card footer |
| `publishDate` | Yes | Date string on card footer |
| `filePath` | Yes | Path to markdown file (relative to public/) |
| `passageCover` | **No** | Cover image path. If omitted or empty → plain card style. If provided → card shows 180px cover image at top. |

### Theme Values

- `catppuccin` — Catppuccin Mocha (dark) / Latte (light). Uses **sans-serif** (Open Sans) everywhere.
- `oak` — Warm oak palette. Uses **serif** (Source Serif 4) everywhere.

---

## Routing (No Hash URLs)

Uses `BrowserRouter` from react-router-dom. **No hash fragments.**

| Route | Content |
|-------|---------|
| `/` | Welcome page |
| `/read/*` | Fetches and renders markdown file. The `*` captures the file path (e.g., `/read/aboutme.md`, `/read/notes/SamplePassage.md`). |
| `/cards/:moduleName` | Renders card grid for the named card module. Module name is URI-encoded in the URL. |

**IMPORTANT — SPA fallback:** `vite.config.ts` must set `appType: 'spa'`. On the production server, all routes must fall back to `index.html` (nginx `try_files`, etc.).

---

## Markdown Renderer (Extended Grammar)

Built with `react-markdown` + plugins. Supports **all** standard and extended markdown:

| Feature | Plugin |
|---------|--------|
| Tables, task lists, strikethrough, autolinks, footnotes | `remark-gfm` |
| LaTeX math ($...$ and $$...$$) | `remark-math` + `rehype-katex` |
| Emoji shortcodes (:smile:) | `remark-emoji` |
| Raw HTML passthrough | `rehype-raw` |
| Heading IDs (for future TOC) | `rehype-slug` |
| Syntax-highlighted code blocks | `rehype-prism-plus` |
| Subscript (`~text~`) | Preprocessing regex → `<sub>` |
| Superscript (`^text^`) | Preprocessing regex → `<sup>` |
| Definition lists (`Term\n: Def`) | Preprocessing regex → `<dl><dt><dd>` |
| Abbreviations (`*[ABBR]: full`) | Preprocessing → `<abbr>` tags |

**Headings do NOT have clickable anchor links** — `rehypeAutolinkHeadings` is intentionally excluded.

**KaTeX CSS** is loaded in `index.html` via CDN:  
`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" />`

---

## Themes & Dark/Light Mode

Both themes define two sets of CSS custom properties:

1. **Light** — defined on `[data-theme="catppuccin"]` / `[data-theme="oak"]`
2. **Dark** — defined on `.dark[data-theme="catppuccin"]` / `.dark[data-theme="oak"]`

**CRITICAL**: The dark selector chains `.dark` and `[data-theme]` **without a space** because both are on the same `<html>` element.  
CORRECT: `.dark[data-theme="catppuccin"]`  
WRONG:   `.dark [data-theme="catppuccin"]` (descendant selector — won't match)

The `useTheme` hook:
- Reads initial mode from `localStorage("kitty-blog-theme")` or `prefers-color-scheme`
- Toggles `class="dark"` on `<html>` via `document.documentElement.classList`
- Persists choice to localStorage
- Listens for system theme changes (only if user hasn't manually set)

The theme value is set on `<html>` via `document.documentElement.setAttribute("data-theme", config.websiteStyle)` in App.tsx.

### Font Strategy

A single `--font-body` CSS variable controls all body text:

- Catppuccin → `"Open Sans", system-ui, -apple-system, ...sans-serif`
- Oak → `"Source Serif 4", ui-serif, ...serif`

Font stacks include CJK fallbacks (`Noto Sans SC/JP/KR`) and Arabic fallbacks (`Noto Naskh Arabic`). Google Fonts are loaded in `index.html` via `<link>` tags.

### Theme CSS Variables

Each theme defines these variables (light + `.dark` overrides):

| Variable | Purpose |
|----------|---------|
| `--font-body` | Body text font stack |
| `--font-mono` | Code/monospace font stack |
| `--radius-xs` … `--radius-xl`, `--radius-full` | Border radius scale |
| `--shadow-xs` … `--shadow-xl` | Box shadow scale |
| `--color-bg`, `--color-bg-secondary`, `--color-bg-tertiary` | Background colors |
| `--color-surface`, `--color-surface-hover` | Card/surface backgrounds |
| `--color-text`, `--color-text-secondary`, `--color-text-muted` | Text colors |
| `--color-accent`, `--color-accent-hover`, `--color-accent-text`, `--color-accent-soft` | Accent/purple |
| `--color-border`, `--color-border-light` | Border colors |
| `--color-code-bg`, `--color-code-text` | Inline & block code |
| `--color-blockquote`, `--color-blockquote-bg` | Blockquote styling |
| `--color-table-border`, `--color-table-header`, `--color-table-stripe` | Table styling |
| `--color-link`, `--color-link-hover` | Link colors |
| `--color-card-bg`, `--color-card-hover`, `--color-card-shadow` | Card styling |
| `--color-sidebar-bg`, `--color-sidebar-hover`, `--color-sidebar-active` | Sidebar styling |
| `--color-topbar-bg`, `--color-topbar-border` | Top bar styling |
| `--color-overlay` | Mobile sidebar overlay |
| `--color-scrollbar`, `--color-scrollbar-hover` | Custom scrollbar |

---

## Design Principles

- **Generous padding** — 48px horizontal padding on content, 52px tall top bar, 28px card padding
- **Rounded corners** — sm=10px, md=16px, lg=22px on catppuccin; slightly smaller on oak
- **Soft shadows** — multi-level shadow scale from xs to xl
- **Semi-transparent top bar** — backdrop-filter blur
- **Card hover lift** — translateY(-4px) + shadow increase
- **Content centered** — both markdown articles and card grids use `maxWidth: "48rem"` + `margin: "0 auto"`
- **Sidebar pill hover** — 50% opacity hover backgrounds with rounded corners

---

## Mobile Responsiveness

- **Desktop (≥768px)**: Sidebar is inline in the flex layout (272px wide, `shrink-0`)
- **Mobile (<768px)**: Sidebar becomes `fixed` positioned below the top bar, overlaying content with a backdrop blur overlay. Tap overlay to close.
- **Top bar**: Always accessible at top (hamburger menu + theme toggle)
- Sidebar overlay sits below the top bar (`top: 52px`) so controls remain reachable

---

## Language Support

- **CJK** (Chinese/Japanese/Korean): `word-break: break-word` + `overflow-wrap: break-word` on the markdown article. Font stacks include system CJK fonts.
- **Arabic/RTL**: `dir="auto"` on the markdown `<article>` element — the browser auto-detects RTL text and switches direction. Font stacks include Arabic system fonts.
- All image tags (`<img>`) support JPEG, PNG, GIF, SVG natively.

---

## Known Pitfalls (Do NOT Repeat)

1. **Dark mode CSS selector** — Must be `.dark[data-theme="x"]` (no space), NOT `.dark [data-theme="x"]`. Both attributes live on `<html>`, so they must be chained on the same element.

2. **Markdown fetch path** — In `FilePage.tsx`, construct the fetch URL as `/${params["*"]}` (absolute from site root). Using `./${params["*"]}` resolves relative to the current `/read/...` URL and fails.

3. **useConfig file extension** — If the file contains JSX (e.g., a ConfigProvider component), it must be `.tsx`, not `.ts`. The eslint `react-refresh/only-export-components` rule requires components and hooks/utilities to live in separate files — hence `ConfigProvider.tsx` is in `providers/` while `useConfig.ts` is in `hooks/`.

4. **TailwindCSS v4 class generation** — Some Tailwind classes (`max-w-2xl`, etc.) may not generate as expected in v4. When in doubt, use inline styles for critical layout properties (max-width, margin centering) rather than relying on Tailwind utility classes.

5. **SPA routing** — `BrowserRouter` requires server-side fallback to `index.html` for all routes. Set `appType: 'spa'` in `vite.config.ts`. For production deployment, configure the web server accordingly.

6. **Config import** — `config.json` is imported at build time in `useConfig.ts`. TypeScript needs `"resolveJsonModule": true` in `tsconfig.app.json`. The config is cast `as unknown as BlogConfig` for type safety.

7. **rehypeAutolinkHeadings must NOT be included** — The spec requires headings WITHOUT clickable anchor links.

8. **passageCover is optional** — Cards with an empty/missing `passageCover` render in plain padded style (no image). Cards with a cover render with `overflow: hidden` and the cover image at top.

9. **Sidebar mobile positioning** — Uses responsive classes: `fixed top-[52px] left-0 bottom-0 w-[272px]` on mobile, `md:relative md:top-auto md:left-auto md:bottom-auto md:shrink-0` on desktop. The overlay backdrop also uses `top-[52px]` on mobile.

10. **Font consistency** — Use a single `--font-body` variable, not separate `--font-sans`/`--font-serif`. Set it per theme so the entire site uses one consistent font family.

---

## Build & Run

```bash
npm install
npm run dev        # Dev server at http://localhost:5173
npm run build      # Production build to dist/
npm run preview    # Preview production build
npm run lint       # ESLint check
```
