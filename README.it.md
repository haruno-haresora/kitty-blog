# Kitty Blog

Un template di blog personale basato su markdown. Configura un file JSON, scrivi i tuoi contenuti in markdown, compila e distribuisci. Supporta post di blog, portfolio, curriculum, appunti e diari.

**Realizzato con** TypeScript + React 19 + Vite + TailwindCSS v4

🌐 [简体中文](README.zh-CN.md) · [繁體中文（香港）](README.zh-HK.md) · [繁體中文（臺灣）](README.zh-TW.md) · [Español](README.es.md) · [Italiano](README.it.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [文言](README.lzh.md) · [uʍop ǝpᴉsdn ǝuoɥdǝlǝꓕ](README.en-UD.md)

---

## Avvio Rapido

```bash
git clone https://github.com/haruno-haresora/kitty-blog.git my-blog
cd my-blog
npm install
npm run dev
```

Apri `http://localhost:5173` — vedrai il sito di esempio.

---

## Distribuzione Assistita dall'IA (Consigliata)

Questo progetto include un **Pacchetto di Istruzioni per Agenti** (`AGENTS.md`) che qualsiasi agente di codifica IA può utilizzare per configurare, compilare e distribuire il tuo sito automaticamente. Compatibile con OpenCode, Claude Code, Cursor, Codex, Windsurf, Hermes, KimiCode, OpenClaw e altri.

Basta aprire questo progetto nel tuo agente e dire:

> *"Distribuisci il mio blog su example.com sul mio VPS all'indirizzo 1.2.3.4"*

L'agente leggerà `AGENTS.md`, quindi:
1. Ti aiuterà a modificare `config.json` con i dettagli del tuo sito
2. Scriverà i tuoi contenuti markdown
3. Compilerà il pacchetto di produzione
4. Lo caricherà sul tuo VPS
5. Configurerà nginx + HTTPS tramite certbot

Nessuna configurazione manuale del server. Nessun copia-incolla di file di configurazione. Basta dire all'agente cosa vuoi.

La procedura completa di distribuzione, lo schema di configurazione, i comandi di compilazione e tutte le insidie note sono documentati in `AGENTS.md`.

---

## Configurare il Tuo Sito Web

Tutto è gestito da un singolo file: **`config.json`** nella radice del progetto. Modificalo prima della compilazione — non sono necessarie modifiche al codice.

### Passo 1 — Identità del Sito

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

| Campo | Descrizione |
|-------|-------------|
| `websiteTitle` | Titolo nella scheda del browser |
| `websiteAuthor` | Nome mostrato sotto l'avatar nella barra laterale |
| `titleOnTopBar` | Testo nella barra superiore |
| `faviconPath` | Favicon del browser (SVG/PNG, metti in `public/`) |
| `avatarPath` | La tua immagine del profilo nella barra laterale (JPEG/PNG/GIF/SVG, metti in `public/`) |
| `copyrightInfo` | Testo nel piè di pagina in fondo alla barra laterale |
| `websiteStyle` | `"catppuccin"` (sans-serif, accenti viola) o `"oak"` (serif, marrone caldo) |

### Passo 2 — Scegli un Tema

Due temi, entrambi con modalità scura/chiara automatica:

| Tema | Font | Stile |
|------|------|-------|
| `catppuccin` | Open Sans (sans-serif) | Moderno, pulito, accenti viola |
| `oak` | Source Serif 4 (serif) | Caldo, accogliente, toni marroni |

L'interruttore scuro/chiaro nell'angolo in alto a destra ricorda la tua preferenza. Per impostazione predefinita segue l'impostazione di sistema.

### Passo 3 — Costruisci la Tua Barra Laterale

La barra laterale è un albero di **moduli**. Ogni modulo ha uno dei tre stili:

#### Modulo Directory
Una cartella comprimibile che contiene altri moduli. Usala per raggruppare i tuoi contenuti.

```json
{
  "moduleName": "Blog",
  "moduleStyle": "directory",
  "inDirectory": [ ...child modules... ]
}
```

#### Modulo File
Cliccandolo carica un file markdown nell'area di lettura principale e chiude automaticamente la barra laterale.

```json
{
  "moduleName": "About Me",
  "moduleStyle": "file",
  "dir": "./aboutme.md"
}
```

`dir` è il percorso del tuo file markdown all'interno della cartella `public/`.

#### Modulo Card
Cliccandolo mostra una griglia di schede. Ogni scheda rimanda a un file markdown. Le schede possono opzionalmente avere immagini di copertina.

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

| Campo | Obbligatorio? | Note |
|-------|---------------|------|
| `passageTitle` | Sì | Intestazione della scheda |
| `passageDescription` | Sì | Breve riassunto sulla scheda |
| `passageAuthor` | Sì | Mostrato nel piè di pagina della scheda |
| `publishDate` | Sì | Qualsiasi formato, mostrato nel piè di pagina della scheda |
| `filePath` | Sì | Percorso del file markdown all'interno di `public/` |
| `passageCover` | **No** | Percorso dell'immagine di copertina. Lascia vuoto o ometti per schede senza copertina. |

---

## Scrivere Contenuti

### File Markdown

Tutti i file markdown vanno in `public/`. Puoi organizzarli in sottocartelle:

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

Riferiscili in `config.json` come `./posts/hello-world.md`.

### Sintassi Markdown Supportata

Il renderer supporta **tutto** il markdown standard ed esteso:

| Funzionalità | Scrivi così |
|--------------|-------------|
| **Grassetto**, *corsivo*, ~~barrato~~ | `**grassetto**`, `*corsivo*`, `~~barrato~~` |
| Link | `[testo](https://...)` |
| Immagini | `![alt](./immagine.png)` |
| Intestazioni | `# H1` fino a `###### H6` |
| Liste (ordinate, non ordinate, annidate) | `- elemento` o `1. elemento` |
| Elenchi di attività | `- [x] fatto`, `- [ ] da fare` |
| Tabelle | `| Col | Col |` |
| Citazioni | `> testo citato` |
| Blocchi di codice con evidenziazione della sintassi | ` ```typescript ` |
| Codice in linea | `` `codice` `` |
| Formule matematiche (LaTeX) | `$E=mc^2$` o `$$...$$` |
| Emoji | `:smile:` `:rocket:` |
| Note a piè di pagina | `[^1]` poi `[^1]: nota` |
| Pedice / Apice | `H~2~O` / `x^2^` |
| Liste di definizioni | `Termine` poi `: Definizione` |
| Abbreviazioni | `*[HTML]: HyperText Markup Language` |

### Immagini

Tutti i formati standard funzionano: **JPEG**, **PNG**, **GIF**, **SVG**. Metti le immagini in `public/` e riferiscile nel markdown con `![alt](./percorso/dell/immagine.png)`.

---

## Personalizzare l'Aspetto

### Cambiare i Colori

Modifica le proprietà CSS personalizzate in `src/themes/catppuccin.css` o `src/themes/oak.css`. Ogni file ha due sezioni — variabili per la modalità chiara e un blocco `.dark[data-theme="..."]` per la modalità scura.

Ad esempio, per cambiare il colore d'accento nella modalità chiara di catppuccin:

```css
[data-theme="catppuccin"] {
  --color-accent: #tuo-colore-hex;
  --color-accent-hover: #variante-più-scura;
}
```

### Font

I font sono caricati da Google Fonts in `index.html`. Per usare font diversi:

1. Aggiorna il `<link>` di Google Fonts in `index.html`
2. Cambia `--font-body` in entrambi i blocchi `[data-theme="..."]` nel tuo CSS del tema
3. Cambia `--font-mono` se vuoi un font per il codice diverso

---

## Compilare per la Produzione

```bash
npm run build
```

Questo crea una cartella `dist/` con file statici — HTML, CSS, JS e tutte le risorse da `public/`. Distribuisci questa cartella su qualsiasi host statico o server web.

---

## Distribuire su un VPS

Questa guida presuppone che tu abbia un **VPS Linux** (Ubuntu/Debian) con un nome di dominio che punta ad esso.

### 1. Carica la Tua Compilazione

Dalla tua macchina locale:

```bash
npm run build
scp -r dist/* user@tuo-server:/tmp/kitty-blog/
```

### 2. Configurazione del Server

Collegati via SSH al tuo VPS e installa nginx:

```bash
ssh user@tuo-server
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y
```

### 3. Sposta i File nella Root Web

```bash
sudo mkdir -p /var/www/kitty-blog
sudo cp -r /tmp/kitty-blog/* /var/www/kitty-blog/
sudo chown -R www-data:www-data /var/www/kitty-blog
```

### 4. Configurazione di Nginx

Crea `/etc/nginx/sites-available/kitty-blog`:

```nginx
server {
    listen 80;
    server_name tuo-dominio.com;

    root /var/www/kitty-blog;
    index index.html;

    # Fallback SPA — tutte le route vanno a index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Compressione Gzip
    gzip on;
    gzip_types text/css application/javascript text/markdown image/svg+xml;
    gzip_min_length 256;

    # Cache delle risorse statiche
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Abilitala:

```bash
sudo ln -s /etc/nginx/sites-available/kitty-blog /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default   # rimuovi il sito predefinito
sudo nginx -t                               # verifica la configurazione
sudo systemctl reload nginx
```

La riga `try_files $uri $uri/ /index.html` è fondamentale — garantisce che tutte le route (`/read/...`, `/cards/...`) funzionino quando gli utenti aggiornano o condividono i link.

### 5. SSL con Certbot

```bash
sudo certbot --nginx -d tuo-dominio.com
```

Segui le istruzioni. Certbot aggiornerà automaticamente la configurazione di nginx per usare HTTPS e imposterà il rinnovo automatico.

Per testare il rinnovo automatico:

```bash
sudo certbot renew --dry-run
```

### 6. Firewall (se usi ufw)

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 7. Automatizzare le Distribuzioni Future

Crea uno script di distribuzione sulla tua macchina locale:

```bash
#!/bin/bash
npm run build
rsync -avz --delete dist/ user@tuo-server:/var/www/kitty-blog/
ssh user@tuo-server "sudo systemctl reload nginx"
echo "Distribuito!"
```

Rendilo eseguibile: `chmod +x deploy.sh`. Esegui `./deploy.sh` per distribuire.

---

## Aggiornare i Contenuti

Per aggiungere o modificare contenuti, devi solo:

1. Aggiungere/modificare file markdown in `public/`
2. Aggiornare `config.json` se aggiungi nuove voci alla barra laterale
3. Eseguire `npm run build && ./deploy.sh`

Non devi mai toccare il codice React/TypeScript a meno che tu non stia personalizzando il design stesso.

---

## Struttura del Progetto (Riferimento)

```
./
├── config.json              # ← Tu modifichi QUESTO
├── public/                  # ← I tuoi contenuti vanno QUI
│   ├── favicon.svg
│   ├── avatar.svg
│   ├── aboutme.md
│   └── posts/
│       ├── hello-world.md
│       └── covers/
│           └── hello.svg
├── src/                     # ← Codice tema/componenti (modifica per cambi di design)
│   ├── themes/
│   │   ├── catppuccin.css
│   │   └── oak.css
│   ├── components/
│   └── pages/
├── vite.config.ts
└── package.json
```

---

## Licenza

MIT — usalo per qualsiasi cosa.
