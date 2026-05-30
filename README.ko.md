# Kitty Blog

마크다운 기반 개인 블로그 템플릿입니다. JSON 파일 하나를 설정하고, 마크다운으로 콘텐츠를 작성한 후 빌드하여 배포하세요. 블로그, 포트폴리오, 이력서, 메모, 일기장으로 활용할 수 있습니다.

**사용 기술** TypeScript + React 19 + Vite + TailwindCSS v4

🌐 [简体中文](README.zh-CN.md) · [繁體中文（香港）](README.zh-HK.md) · [繁體中文（臺灣）](README.zh-TW.md) · [Español](README.es.md) · [Italiano](README.it.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [文言](README.lzh.md) · [uʍop ǝpᴉsdn ǝuoɥdǝlǝꓕ](README.en-UD.md)

---

## 빠른 시작

```bash
git clone https://github.com/haruno-haresora/kitty-blog.git my-blog
cd my-blog
npm install
npm run dev
```

`http://localhost:5173` 을 열면 샘플 사이트를 볼 수 있습니다.

---

## AI 기반 배포 (권장)

이 프로젝트에는 모든 AI 코딩 에이전트가 사이트를 자동으로 설정, 빌드, 배포하는 데 사용할 수 있는 **에이전트 명령 팩**(`AGENTS.md`)이 포함되어 있습니다. OpenCode, Claude Code, Cursor, Codex, Windsurf, Hermes, KimiCode, OpenClaw 등과 호환됩니다.

에이전트에서 이 프로젝트를 열고 다음과 같이 말하기만 하면 됩니다:

> *"example.com 도메인으로 IP 1.2.3.4의 VPS에 내 블로그를 배포해줘"*

에이전트가 `AGENTS.md`를 읽고 다음을 수행합니다:
1. 사이트 정보로 `config.json` 편집을 도와줍니다
2. 마크다운 콘텐츠를 작성합니다
3. 프로덕션 번들을 빌드합니다
4. VPS에 업로드합니다
5. certbot을 통한 nginx + HTTPS 설정

수동 서버 설정이 필요 없습니다. 설정 파일을 복사하여 붙여넣을 필요도 없습니다. 그저 에이전트에게 원하는 것을 말하세요.

전체 배포 절차, 설정 스키마, 빌드 명령어 및 알려진 모든 문제점이 `AGENTS.md`에 문서화되어 있습니다.

---

## 웹사이트 설정하기

모든 설정은 프로젝트 루트의 **`config.json`** 단일 파일로 제어됩니다. 빌드 전에 편집하세요 — 코드 변경이 필요 없습니다.

### 1단계 — 사이트 정보

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

| 필드 | 설명 |
|-------|-------------|
| `websiteTitle` | 브라우저 탭 제목 |
| `websiteAuthor` | 사이드바 아바타 아래에 표시되는 이름 |
| `titleOnTopBar` | 상단 헤더 바의 텍스트 |
| `faviconPath` | 브라우저 파비콘 (SVG/PNG, `public/`에 저장) |
| `avatarPath` | 사이드바의 프로필 사진 (JPEG/PNG/GIF/SVG, `public/`에 저장) |
| `copyrightInfo` | 사이드바 하단의 푸터 텍스트 |
| `websiteStyle` | `"catppuccin"` (산세리프, 보라색 포인트) 또는 `"oak"` (세리프, 따뜻한 갈색) |

### 2단계 — 테마 선택하기

두 가지 테마 모두 자동 다크/라이트 모드를 지원합니다:

| 테마 | 폰트 | 분위기 |
|-------|------|------|
| `catppuccin` | Open Sans (산세리프) | 모던하고 깔끔하며 보라색 포인트 |
| `oak` | Source Serif 4 (세리프) | 따뜻하고 아늑한 갈색 톤 |

우측 상단의 다크/라이트 토글은 사용자 설정을 기억합니다. 기본적으로 시스템 설정을 따릅니다.

### 3단계 — 사이드바 구성하기

사이드바는 **모듈**의 트리 구조입니다. 각 모듈은 세 가지 스타일 중 하나를 가집니다:

#### 디렉터리 모듈
다른 모듈을 포함하는 접이식 폴더입니다. 콘텐츠를 그룹화할 때 사용합니다.

```json
{
  "moduleName": "Blog",
  "moduleStyle": "directory",
  "inDirectory": [ ...자식 모듈... ]
}
```

#### 파일 모듈
클릭하면 메인 읽기 영역에 마크다운 파일을 불러오고 사이드바를 자동으로 닫습니다.

```json
{
  "moduleName": "About Me",
  "moduleStyle": "file",
  "dir": "./aboutme.md"
}
```

`dir`은 `public/` 폴더 내 마크다운 파일의 경로입니다.

#### 카드 모듈
클릭하면 글 카드 그리드를 표시합니다. 각 카드는 마크다운 파일로 연결됩니다. 카드에는 선택적으로 커버 이미지를 설정할 수 있습니다.

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

| 필드 | 필수? | 설명 |
|-------|-----------|-------|
| `passageTitle` | 예 | 카드 제목 |
| `passageDescription` | 예 | 카드에 표시될 짧은 요약 |
| `passageAuthor` | 예 | 카드 하단에 표시됨 |
| `publishDate` | 예 | 어떤 형식이든 가능, 카드 하단에 표시됨 |
| `filePath` | 예 | `public/` 내 마크다운 파일 경로 |
| `passageCover` | **아니오** | 커버 이미지 경로. 빈 값으로 두거나 생략하면 커버 없는 카드가 됩니다. |

---

## 콘텐츠 작성하기

### 마크다운 파일

모든 마크다운 파일은 `public/`에 저장합니다. 하위 디렉터리로 구성할 수 있습니다:

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

`config.json`에서는 `./posts/hello-world.md`와 같이 참조합니다.

### 지원되는 마크다운 문법

렌더러는 **모든** 표준 및 확장 마크다운을 지원합니다:

| 기능 | 작성 방법 |
|---------|-----------|
| **굵게**, *기울임*, ~~취소선~~ | `**굵게**`, `*기울임*`, `~~취소선~~` |
| 링크 | `[텍스트](https://...)` |
| 이미지 | `![대체텍스트](./image.png)` |
| 제목 | `# H1` ~ `###### H6` |
| 목록 (순서, 비순서, 중첩) | `- 항목` 또는 `1. 항목` |
| 작업 목록 | `- [x] 완료`, `- [ ] 할일` |
| 표 | `| 열 | 열 |` |
| 인용문 | `> 인용 텍스트` |
| 구문 강조가 있는 코드 블록 | ` ```typescript ` |
| 인라인 코드 | `` `코드` `` |
| 수식 (LaTeX) | `$E=mc^2$` 또는 `$$...$$` |
| 이모지 | `:smile:` `:rocket:` |
| 각주 | `[^1]` 후 `[^1]: 설명` |
| 아래첨자 / 위첨자 | `H~2~O` / `x^2^` |
| 정의 목록 | `용어` 후 `: 정의` |
| 약어 | `*[HTML]: HyperText Markup Language` |

### 이미지

모든 표준 이미지 형식이 지원됩니다: **JPEG**, **PNG**, **GIF**, **SVG**. 이미지를 `public/`에 저장하고 마크다운에서 `![대체텍스트](./path/to/image.png)`로 참조하세요.

---

## 외관 커스터마이징

### 색상 변경하기

`src/themes/catppuccin.css` 또는 `src/themes/oak.css`의 CSS 사용자 정의 속성을 편집하세요. 각 파일에는 두 개의 섹션이 있습니다 — 라이트 모드 변수와 다크 모드를 위한 `.dark[data-theme="..."]` 블록입니다.

예를 들어, catppuccin 라이트 모드에서 포인트 색상을 변경하려면:

```css
[data-theme="catppuccin"] {
  --color-accent: #your-hex-color;
  --color-accent-hover: #darker-variant;
}
```

### 폰트

폰트는 `index.html`에서 Google Fonts를 통해 로드됩니다. 다른 폰트를 사용하려면:

1. `index.html`의 Google Fonts `<link>`를 업데이트하세요
2. 테마 CSS의 두 `[data-theme="..."]` 블록에서 `--font-body`를 변경하세요
3. 다른 코드 폰트를 원한다면 `--font-mono`도 변경하세요

---

## 프로덕션 빌드

```bash
npm run build
```

이 명령어는 `dist/` 폴더에 정적 파일(HTML, CSS, JS 및 `public/`의 모든 자산)을 생성합니다. 이 폴더를 아무 정적 호스팅이나 웹 서버에 배포하면 됩니다.

---

## VPS에 배포하기

이 가이드는 도메인이 연결된 **Linux VPS**(Ubuntu/Debian)가 있다고 가정합니다.

### 1. 빌드 업로드

로컬 머신에서:

```bash
npm run build
scp -r dist/* user@your-server:/tmp/kitty-blog/
```

### 2. 서버 설정

VPS에 SSH로 접속하여 nginx를 설치합니다:

```bash
ssh user@your-server
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y
```

### 3. 파일을 웹 루트로 이동

```bash
sudo mkdir -p /var/www/kitty-blog
sudo cp -r /tmp/kitty-blog/* /var/www/kitty-blog/
sudo chown -R www-data:www-data /var/www/kitty-blog
```

### 4. Nginx 설정

`/etc/nginx/sites-available/kitty-blog` 파일을 생성합니다:

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

활성화합니다:

```bash
sudo ln -s /etc/nginx/sites-available/kitty-blog /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default   # 기본 사이트 제거
sudo nginx -t                               # 설정 테스트
sudo systemctl reload nginx
```

`try_files $uri $uri/ /index.html` 줄이 중요합니다 — 이는 사용자가 새로고침하거나 링크를 공유할 때 모든 경로(`/read/...`, `/cards/...`)가 정상 작동하도록 보장합니다.

### 5. Certbot으로 SSL 설정

```bash
sudo certbot --nginx -d your-domain.com
```

안내에 따라 진행하세요. Certbot이 자동으로 nginx 설정을 HTTPS로 업데이트하고 자동 갱신을 설정합니다.

자동 갱신을 테스트하려면:

```bash
sudo certbot renew --dry-run
```

### 6. 방화벽 (ufw 사용 시)

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 7. 향후 배포 자동화

로컬 머신에 배포 스크립트를 생성합니다:

```bash
#!/bin/bash
npm run build
rsync -avz --delete dist/ user@your-server:/var/www/kitty-blog/
ssh user@your-server "sudo systemctl reload nginx"
echo "Deployed!"
```

실행 권한 부여: `chmod +x deploy.sh`. `./deploy.sh`를 실행하여 배포합니다.

---

## 콘텐츠 업데이트하기

콘텐츠를 추가하거나 변경하려면 다음만 하면 됩니다:

1. `public/`에 마크다운 파일 추가/편집
2. 새 사이드바 항목을 추가하는 경우 `config.json` 업데이트
3. `npm run build && ./deploy.sh` 실행

디자인 자체를 커스터마이징하지 않는 한 React/TypeScript 코드를 수정할 필요가 전혀 없습니다.

---

## 프로젝트 구조 (참고)

```
./
├── config.json              # ← 이 파일을 편집하세요
├── public/                  # ← 콘텐츠는 여기에 저장됩니다
│   ├── favicon.svg
│   ├── avatar.svg
│   ├── aboutme.md
│   └── posts/
│       ├── hello-world.md
│       └── covers/
│           └── hello.svg
├── src/                     # ← 테마/컴포넌트 코드 (디자인 변경 시 편집)
│   ├── themes/
│   │   ├── catppuccin.css
│   │   └── oak.css
│   ├── components/
│   └── pages/
├── vite.config.ts
└── package.json
```

---

## 라이선스

MIT — 어떤 용도로든 자유롭게 사용하세요.
