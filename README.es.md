# Kitty Blog

Una plantilla de blog personal basada en markdown. Configura un archivo JSON, escribe tu contenido en markdown, compila y despliega. Admite publicaciones de blog, portafolios, currículums, notas y diarios.

**Construido con** TypeScript + React 19 + Vite + TailwindCSS v4

🌐 [简体中文](README.zh-CN.md) · [繁體中文（香港）](README.zh-HK.md) · [繁體中文（臺灣）](README.zh-TW.md) · [Español](README.es.md) · [Italiano](README.it.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [文言](README.lzh.md) · [uʍop ǝpᴉsdn ǝuoɥdǝlǝꓕ](README.en-UD.md)

---

## Inicio Rápido

```bash
git clone https://github.com/haruno-haresora/kitty-blog.git my-blog
cd my-blog
npm install
npm run dev
```

Abre `http://localhost:5173` — verás el sitio de ejemplo.

---

## Despliegue Asistido por IA (Recomendado)

Este proyecto incluye un **Agent Instruction Pack** (`AGENTS.md`) que cualquier agente de codificación con IA puede usar para configurar, compilar y desplegar tu sitio automáticamente. Compatible con OpenCode, Claude Code, Cursor, Codex, Windsurf, Hermes, KimiCode, OpenClaw y más.

Simplemente abre este proyecto en tu agente y di:

> *"Despliega mi blog en example.com en mi VPS con IP 1.2.3.4"*

El agente leerá `AGENTS.md` y luego:
1. Te ayudará a editar `config.json` con los detalles de tu sitio
2. Escribirá tu contenido en markdown
3. Compilará el paquete de producción
4. Lo subirá a tu VPS
5. Configurará nginx + HTTPS mediante certbot

Sin configuración manual del servidor. Sin copiar y pegar archivos de configuración. Solo dile al agente lo que quieres.

El procedimiento completo de despliegue, el esquema de configuración, los comandos de compilación y todas las trampas conocidas están documentados en `AGENTS.md`.

---

## Configurando Tu Sitio Web

Todo se controla desde un único archivo: **`config.json`** en la raíz del proyecto. Edítalo antes de compilar — no se necesitan cambios de código.

### Paso 1 — Identidad del Sitio

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

| Campo | Qué hace |
|-------|----------|
| `websiteTitle` | Título de la pestaña del navegador |
| `websiteAuthor` | Nombre mostrado debajo del avatar en la barra lateral |
| `titleOnTopBar` | Texto en la barra superior |
| `faviconPath` | Favicon del navegador (SVG/PNG, colocar en `public/`) |
| `avatarPath` | Tu foto de perfil en la barra lateral (JPEG/PNG/GIF/SVG, colocar en `public/`) |
| `copyrightInfo` | Texto del pie de página en la parte inferior de la barra lateral |
| `websiteStyle` | `"catppuccin"` (sans-serif, acentos púrpura) o `"oak"` (serif, tonos marrones cálidos) |

### Paso 2 — Elige un Tema

Dos temas, ambos con modo claro/oscuro automático:

| Tema | Fuente | Ambiente |
|------|--------|----------|
| `catppuccin` | Open Sans (sans-serif) | Moderno, limpio, acentos púrpura |
| `oak` | Source Serif 4 (serif) | Cálido, acogedor, tonos marrones |

El interruptor claro/oscuro en la esquina superior derecha recuerda tu preferencia. Por defecto sigue la configuración de tu sistema.

### Paso 3 — Construye Tu Barra Lateral

La barra lateral es un árbol de **módulos**. Cada módulo tiene uno de tres estilos:

#### Módulo Directory
Una carpeta plegable que contiene otros módulos. Úsalo para agrupar tu contenido.

```json
{
  "moduleName": "Blog",
  "moduleStyle": "directory",
  "inDirectory": [ ...módulos hijos... ]
}
```

#### Módulo File
Al hacer clic carga un archivo markdown en el área de lectura principal y cierra automáticamente la barra lateral.

```json
{
  "moduleName": "About Me",
  "moduleStyle": "file",
  "dir": "./aboutme.md"
}
```

`dir` es la ruta a tu archivo markdown dentro de la carpeta `public/`.

#### Módulo Card
Al hacer clic muestra una cuadrícula de tarjetas de pasajes. Cada tarjeta enlaza a un archivo markdown. Las tarjetas pueden tener opcionalmente imágenes de portada.

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

| Campo | ¿Requerido? | Notas |
|-------|-------------|-------|
| `passageTitle` | Sí | Encabezado de la tarjeta |
| `passageDescription` | Sí | Resumen corto en la tarjeta |
| `passageAuthor` | Sí | Se muestra en el pie de la tarjeta |
| `publishDate` | Sí | Cualquier formato, se muestra en el pie de la tarjeta |
| `filePath` | Sí | Ruta al archivo markdown dentro de `public/` |
| `passageCover` | **No** | Ruta de la imagen de portada. Dejar vacío u omitir para tarjetas sin portada. |

---

## Escribiendo Contenido

### Archivos Markdown

Todo el markdown va en `public/`. Puedes organizarlo en subdirectorios:

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

Referéncialos en `config.json` como `./posts/hello-world.md`.

### Sintaxis Markdown Soportada

El renderizador admite **todo** el markdown estándar y extendido:

| Característica | Escribe esto |
|----------------|--------------|
| **Negrita**, *cursiva*, ~~tachado~~ | `**negrita**`, `*cursiva*`, `~~tachado~~` |
| Enlaces | `[texto](https://...)` |
| Imágenes | `![alt](./imagen.png)` |
| Encabezados | `# H1` hasta `###### H6` |
| Listas (ordenadas, no ordenadas, anidadas) | `- elemento` o `1. elemento` |
| Listas de tareas | `- [x] hecho`, `- [ ] pendiente` |
| Tablas | `| Col | Col |` |
| Citas en bloque | `> texto citado` |
| Bloques de código con resaltado de sintaxis | ` ```typescript ` |
| Código en línea | `` `código` `` |
| Matemáticas (LaTeX) | `$E=mc^2$` o `$$...$$` |
| Emoji | `:smile:` `:rocket:` |
| Notas al pie | `[^1]` luego `[^1]: nota` |
| Subíndice / Superíndice | `H~2~O` / `x^2^` |
| Listas de definición | `Término` luego `: Definición` |
| Abreviaturas | `*[HTML]: HyperText Markup Language` |

### Imágenes

Todos los formatos estándar funcionan: **JPEG**, **PNG**, **GIF**, **SVG**. Coloca las imágenes en `public/` y refiérelas en markdown con `![alt](./ruta/a/imagen.png)`.

---

## Personalizando la Apariencia

### Cambiando Colores

Edita las propiedades personalizadas de CSS en `src/themes/catppuccin.css` o `src/themes/oak.css`. Cada archivo tiene dos secciones — variables del modo claro y un bloque `.dark[data-theme="..."]` para el modo oscuro.

Por ejemplo, para cambiar el color de acento en el modo claro de catppuccin:

```css
[data-theme="catppuccin"] {
  --color-accent: #tu-color-hex;
  --color-accent-hover: #variante-más-oscura;
}
```

### Fuentes

Las fuentes se cargan desde Google Fonts en `index.html`. Para usar fuentes diferentes:

1. Actualiza el `<link>` de Google Fonts en `index.html`
2. Cambia `--font-body` en ambos bloques `[data-theme="..."]` en tu CSS del tema
3. Cambia `--font-mono` si deseas una fuente de código diferente

---

## Compilando para Producción

```bash
npm run build
```

Esto crea una carpeta `dist/` con archivos estáticos — HTML, CSS, JS y todos los recursos de `public/`. Despliega esta carpeta en cualquier host estático o servidor web.

---

## Desplegando en un VPS

Esta guía asume que tienes un **VPS Linux** (Ubuntu/Debian) con un nombre de dominio apuntando a él.

### 1. Sube Tu Compilación

Desde tu máquina local:

```bash
npm run build
scp -r dist/* user@your-server:/tmp/kitty-blog/
```

### 2. Configuración del Servidor

Conéctate por SSH a tu VPS e instala nginx:

```bash
ssh user@your-server
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y
```

### 3. Mueve los Archivos a la Raíz Web

```bash
sudo mkdir -p /var/www/kitty-blog
sudo cp -r /tmp/kitty-blog/* /var/www/kitty-blog/
sudo chown -R www-data:www-data /var/www/kitty-blog
```

### 4. Configuración de Nginx

Crea `/etc/nginx/sites-available/kitty-blog`:

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

Habilítalo:

```bash
sudo ln -s /etc/nginx/sites-available/kitty-blog /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default   # eliminar sitio por defecto
sudo nginx -t                               # probar configuración
sudo systemctl reload nginx
```

La línea `try_files $uri $uri/ /index.html` es crítica — asegura que todas las rutas (`/read/...`, `/cards/...`) funcionen cuando los usuarios recarguen la página o compartan enlaces.

### 5. SSL con Certbot

```bash
sudo certbot --nginx -d your-domain.com
```

Sigue las indicaciones. Certbot actualizará automáticamente tu configuración de nginx para usar HTTPS y configurará la renovación automática.

Para probar la renovación automática:

```bash
sudo certbot renew --dry-run
```

### 6. Firewall (si usas ufw)

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 7. Automatiza Despliegues Futuros

Crea un script de despliegue en tu máquina local:

```bash
#!/bin/bash
npm run build
rsync -avz --delete dist/ user@your-server:/var/www/kitty-blog/
ssh user@your-server "sudo systemctl reload nginx"
echo "¡Desplegado!"
```

Hazlo ejecutable: `chmod +x deploy.sh`. Ejecuta `./deploy.sh` para desplegar.

---

## Actualizando Contenido

Para añadir o cambiar contenido, solo necesitas:

1. Añadir/editar archivos markdown en `public/`
2. Actualizar `config.json` si añades nuevas entradas a la barra lateral
3. Ejecutar `npm run build && ./deploy.sh`

Nunca necesitas tocar el código React/TypeScript a menos que estés personalizando el diseño en sí.

---

## Estructura del Proyecto (Referencia)

```
./
├── config.json              # ← Tú editas ESTO
├── public/                  # ← Tu contenido va AQUÍ
│   ├── favicon.svg
│   ├── avatar.svg
│   ├── aboutme.md
│   └── posts/
│       ├── hello-world.md
│       └── covers/
│           └── hello.svg
├── src/                     # ← Código del tema/componentes (editar para cambios de diseño)
│   ├── themes/
│   │   ├── catppuccin.css
│   │   └── oak.css
│   ├── components/
│   └── pages/
├── vite.config.ts
└── package.json
```

---

## Licencia

MIT — úsalo para lo que quieras.
