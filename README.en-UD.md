
˙ƃuᴉɥʇʎuɐ ɹoɟ ʇᴉ ǝsn — ⊥IW

ǝsuǝɔᴉ⅂ ##

---

```
└── package.json
├── vite.config.ts
│   └── pages/
│   ├── components/
│   │   └── oak.css
│   │   ├── catppuccin.css
│   ├── themes/
├── src/                     # ← Theme/component code (edit for design changes)
│           └── hello.svg
│       └── covers/
│       ├── hello-world.md
│   └── posts/
│   ├── aboutme.md
│   ├── avatar.svg
│   ├── favicon.svg
├── public/                  # ← Your content goes HERE
├── config.json              # ← You edit THIS
./
```

)ǝɔuǝɹǝɟǝᴚ( ǝɹnʇɔnɹʇS ʇɔǝɾoɹԀ ##

---

˙ɟlǝsʇᴉ uƃᴉsǝp ǝɥʇ ƃuᴉzᴉɯoʇsnɔ ǝɹ,noʎ ssǝlun ǝpoɔ ʇdᴉɹɔSǝdʎ⊥/ʇɔɐǝᴚ ɥɔnoʇ oʇ pǝǝu ɹǝʌǝu no⅄

 unᴚ ˙Ɛ`npm run build && ./deploy.sh`
 ǝʇɐpd∩ ˙ᘔ`config.json`sǝᴉɹʇuǝ ɹɐqǝpᴉs ʍǝu ƃuᴉppɐ ɟᴉ 
 uᴉ sǝlᴉɟ uʍopʞɹɐɯ ʇᴉpǝ/pp∀ ˙⇂`public/`

:oʇ pǝǝu ʎluo noʎ 'ʇuǝʇuoɔ ǝƃuɐɥɔ ɹo ppɐ o⊥

ʇuǝʇuoƆ ƃuᴉʇɐpd∩ ##

---

 :ǝlqɐʇnɔǝxǝ ʇᴉ ǝʞɐW`chmod +x deploy.sh` unᴚ ˙`./deploy.sh`˙ʎoldǝp oʇ 

```
echo "Deployed!"
ssh user@your-server "sudo systemctl reload nginx"
rsync -avz --delete dist/ user@your-server:/var/www/kitty-blog/
npm run build
#!/bin/bash
```bash

:ǝuᴉɥɔɐɯ lɐɔol ɹnoʎ uo ʇdᴉɹɔs ʎoldǝp ɐ ǝʇɐǝɹƆ

sʎoldǝᗡ ǝɹnʇnℲ ǝʇɐɯoʇn∀ ˙ㄥ ###

```
sudo ufw enable
sudo ufw allow 443/tcp
sudo ufw allow 80/tcp
```bash

)ʍɟn ƃuᴉsn ɟᴉ( llɐʍǝɹᴉℲ ˙9 ###

```
sudo certbot renew --dry-run
```bash

:lɐʍǝuǝɹ-oʇnɐ ʇsǝʇ o⊥

˙lɐʍǝuǝɹ-oʇnɐ dn ʇǝs puɐ SԀ⊥⊥H ǝsn oʇ ƃᴉɟuoɔ xuᴉƃu ɹnoʎ ǝʇɐpdn ʎllɐɔᴉʇɐɯoʇnɐ llᴉʍ ʇoqʇɹǝƆ ˙sʇdɯoɹd ǝɥʇ ʍolloℲ

```
sudo certbot --nginx -d your-domain.com
```bash

ʇoqʇɹǝƆ ɥʇᴉʍ ⅂SS ˙ϛ ###

 ǝɥ⊥`try_files $uri $uri/ /index.html`( sǝʇnoɹ llɐ sǝɹnsuǝ ʇᴉ — lɐɔᴉʇᴉɹɔ sᴉ ǝuᴉl `/read/...` '`/cards/...`˙sʞuᴉl ǝɹɐɥs ɹo ɥsǝɹɟǝɹ sɹǝsn uǝɥʍ ʞɹoʍ )

```
sudo systemctl reload nginx
sudo nginx -t                               # test config
sudo rm /etc/nginx/sites-enabled/default   # remove default site
sudo ln -s /etc/nginx/sites-available/kitty-blog /etc/nginx/sites-enabled/
```bash

:ʇᴉ ǝlqɐuƎ

```
}
    }
        add_header Cache-Control "public, immutable";
        expires 1y;
    location /assets/ {
    # Cache static assets

    gzip_min_length 256;
    gzip_types text/css application/javascript text/markdown image/svg+xml;
    gzip on;
    # Gzip compression

    }
        try_files $uri $uri/ /index.html;
    location / {
    # SPA fallback — all routes go to index.html

    index index.html;
    root /var/www/kitty-blog;

    server_name your-domain.com;
    listen 80;
server {
```nginx

 ǝʇɐǝɹƆ`/etc/nginx/sites-available/kitty-blog`:

ƃᴉɟuoƆ xuᴉƃN ˙ㄣ ###

```
sudo chown -R www-data:www-data /var/www/kitty-blog
sudo cp -r /tmp/kitty-blog/* /var/www/kitty-blog/
sudo mkdir -p /var/www/kitty-blog
```bash

ʇooᴚ qǝM oʇ sǝlᴉℲ ǝʌoW ˙Ɛ ###

```
sudo apt install nginx certbot python3-certbot-nginx -y
sudo apt update
ssh user@your-server
```bash

:xuᴉƃu llɐʇsuᴉ puɐ SԀΛ ɹnoʎ oʇuᴉ HSS

dnʇǝS ɹǝʌɹǝS ˙ᘔ ###

```
scp -r dist/* user@your-server:/tmp/kitty-blog/
npm run build
```bash

:ǝuᴉɥɔɐɯ lɐɔol ɹnoʎ ɯoɹℲ

plᴉn𐐒 ɹno⅄ pɐold∩ ˙⇂ ###

˙ʇᴉ oʇ ƃuᴉʇuᴉod ǝɯɐu uᴉɐɯop ɐ ɥʇᴉʍ )uɐᴉqǝᗡ/nʇunq∩( **SԀΛ xnuᴉ⅂** ɐ ǝʌɐɥ noʎ sǝɯnssɐ ǝpᴉnƃ sᴉɥ⊥

SԀΛ ɐ oʇ ƃuᴉʎoldǝᗡ ##

---

 ɐ sǝʇɐǝɹɔ sᴉɥ⊥`dist/` ɯoɹɟ sʇǝssɐ llɐ puɐ 'Sſ 'SSƆ '⅂W⊥H — sǝlᴉɟ ɔᴉʇɐʇs ɥʇᴉʍ ɹǝploɟ `public/`˙ɹǝʌɹǝs qǝʍ ɹo ʇsoɥ ɔᴉʇɐʇs ʎuɐ oʇ ɹǝploɟ sᴉɥʇ ʎoldǝᗡ ˙

```
npm run build
```bash

uoᴉʇɔnpoɹԀ ɹoɟ ƃuᴉplᴉn𐐒 ##

---

 ǝƃuɐɥƆ ˙Ɛ`--font-mono`ʇuoɟ ǝpoɔ ʇuǝɹǝɟɟᴉp ɐ ʇuɐʍ noʎ ɟᴉ 
 ǝƃuɐɥƆ ˙ᘔ`--font-body` ɥʇoq uᴉ `[data-theme="..."]`SSƆ ǝɯǝɥʇ ɹnoʎ uᴉ sʞɔolq 
 sʇuoℲ ǝlƃoo⅁ ǝɥʇ ǝʇɐpd∩ ˙⇂`<link>` uᴉ `index.html`

 uᴉ sʇuoℲ ǝlƃoo⅁ ɯoɹɟ pǝpɐol ǝɹɐ sʇuoℲ`index.html`:sʇuoɟ ʇuǝɹǝɟɟᴉp ǝsn o⊥ ˙

sʇuoℲ ###

```
}
  --color-accent-hover: #darker-variant;
  --color-accent: #your-hex-color;
[data-theme="catppuccin"] {
```css

:ǝpoɯ ʇɥƃᴉl uᴉɔɔnddʇɐɔ uᴉ ɹoloɔ ʇuǝɔɔɐ ǝɥʇ ǝƃuɐɥɔ oʇ 'ǝldɯɐxǝ ɹoℲ

 uᴉ sǝᴉʇɹǝdoɹd ɯoʇsnɔ SSƆ ǝɥʇ ʇᴉpƎ`src/themes/catppuccin.css` ɹo `src/themes/oak.css` ɐ puɐ sǝlqɐᴉɹɐʌ ǝpoɯ ʇɥƃᴉl — suoᴉʇɔǝs oʍʇ sɐɥ ǝlᴉɟ ɥɔɐƎ ˙`.dark[data-theme="..."]`˙ǝpoɯ ʞɹɐp ɹoɟ ʞɔolq 

sɹoloƆ ƃuᴉƃuɐɥƆ ###

ǝɔuɐɹɐǝdd∀ ƃuᴉzᴉɯoʇsnƆ ##

---

 uᴉ sǝƃɐɯᴉ ʇnԀ ˙**⅁ΛS** '**ℲI⅁** '**⅁NԀ** '**⅁ƎԀſ** :ʞɹoʍ sʇɐɯɹoɟ pɹɐpuɐʇs ll∀`public/` ɥʇᴉʍ uʍopʞɹɐɯ uᴉ ɯǝɥʇ ǝɔuǝɹǝɟǝɹ puɐ `![alt](./path/to/image.png)`˙

sǝƃɐɯI ###

 | suoᴉʇɐᴉʌǝɹqq∀ |`*[HTML]: HyperText Markup Language`| 
 | sʇsᴉl uoᴉʇᴉuᴉɟǝᗡ |`Term` uǝɥʇ `: Definition`| 
 | ʇdᴉɹɔsɹǝdnS / ʇdᴉɹɔsqnS |`H~2~O` / `x^2^`| 
 | sǝʇouʇooℲ |`[^1]` uǝɥʇ `[^1]: note`| 
 | ᴉɾoɯƎ |`:smile:` `:rocket:`| 
 | )Xǝ⊥ɐ⅂( ɥʇɐW |`$E=mc^2$` ɹo `$$...$$`| 
` | ǝpoɔ ǝuᴉluI |` `ǝpoɔ` `| `
 | ƃuᴉʇɥƃᴉlɥƃᴉɥ xɐʇuʎs ɥʇᴉʍ sʞɔolq ǝpoƆ |` ```typescript `| 
 | sǝʇonbʞɔol𐐒 |`> quoted text`| 
 | sǝlqɐ⊥ |`| Col | Col |`| 
 | sʇsᴉl ʞsɐ⊥ |`- [x] done` '`- [ ] todo`| 
 | )pǝʇsǝu 'pǝɹǝpɹoun 'pǝɹǝpɹo( sʇsᴉ⅂ |`- item` ɹo `1. item`| 
 | sƃuᴉpɐǝH |`# H1` ɥƃnoɹɥʇ `###### H6`| 
 | sǝƃɐɯI |`![alt](./image.png)`| 
 | sʞuᴉ⅂ |`[text](https://...)`| 
 | ~~ɥƃnoɹɥʇǝʞᴉɹʇs~~ '*ɔᴉlɐʇᴉ* '**plo𐐒** |`**bold**` '`*italic*` '`~~strike~~`| 
|-----------|---------|
| sᴉɥʇ ǝʇᴉɹM | ǝɹnʇɐǝℲ |

:uʍopʞɹɐɯ pǝpuǝʇxǝ puɐ pɹɐpuɐʇs **llɐ** sʇɹoddns ɹǝɹǝpuǝɹ ǝɥ⊥

xɐʇuʎS uʍopʞɹɐW pǝʇɹoddnS ###

 uᴉ ɯǝɥʇ ǝɔuǝɹǝɟǝᴚ`config.json` sɐ `./posts/hello-world.md`˙

```
    └── diary.md
└── notes/
│       └── hello.svg
│   └── covers/
│   ├── hello-world.md
├── posts/
├── aboutme.md
public/
```

 uᴉ sǝoƃ uʍopʞɹɐɯ ll∀`public/`:sǝᴉɹoʇɔǝɹᴉpqns oʇuᴉ ǝzᴉuɐƃɹo uɐɔ no⅄ ˙

sǝlᴉℲ uʍopʞɹɐW ###

ʇuǝʇuoƆ ƃuᴉʇᴉɹM ##

---

 |`passageCover`| ˙spɹɐɔ ɹǝʌoɔ-ou ɹoɟ ʇᴉɯo ɹo ʎʇdɯǝ ǝʌɐǝ⅂ ˙ɥʇɐd ǝƃɐɯᴉ ɹǝʌoƆ | **oN** | 
 |`filePath` ǝpᴉsuᴉ ǝlᴉɟ uʍopʞɹɐɯ oʇ ɥʇɐԀ | sǝ⅄ | `public/`| 
 |`publishDate`| ɹǝʇooɟ pɹɐɔ uo uʍoɥs 'ʇɐɯɹoɟ ʎu∀ | sǝ⅄ | 
 |`passageAuthor`| ɹǝʇooɟ pɹɐɔ uo uʍoɥS | sǝ⅄ | 
 |`passageDescription`| pɹɐɔ ǝɥʇ uo ʎɹɐɯɯns ʇɹoɥS | sǝ⅄ | 
 |`passageTitle`| ƃuᴉpɐǝɥ pɹɐƆ | sǝ⅄ | 
|-------|-----------|-------|
| sǝʇoN | ¿pǝɹᴉnbǝᴚ | plǝᴉℲ |

```
}
  ]
    }
      "filePath": "./posts/no-cover.md"
      "publishDate": "2026-05-15 Afternoon",
      "passageAuthor": "Jane Doe",
      "passageDescription": "This card has no cover image — it uses the plain style.",
      "passageTitle": "No Cover Card",
    {
    },
      "passageCover": "./posts/covers/hello.svg"
      "filePath": "./posts/hello-world.md",
      "publishDate": "2026-06-01 Morning",
      "passageAuthor": "Jane Doe",
      "passageDescription": "My first blog post about starting out.",
      "passageTitle": "Hello World",
    {
  "inCard": [
  "moduleStyle": "card",
  "moduleName": "Articles",
{
```json

˙sǝƃɐɯᴉ ɹǝʌoɔ ǝʌɐɥ ʎllɐuoᴉʇdo uɐɔ spɹɐƆ ˙ǝlᴉɟ uʍopʞɹɐɯ ɐ oʇ sʞuᴉl pɹɐɔ ɥɔɐƎ ˙spɹɐɔ ǝƃɐssɐd ɟo pᴉɹƃ ɐ sʍoɥs ʇᴉ ƃuᴉʞɔᴉlƆ
ǝlnpoW pɹɐƆ ####

`dir` ǝɥʇ ǝpᴉsuᴉ ǝlᴉɟ uʍopʞɹɐɯ ɹnoʎ oʇ ɥʇɐd ǝɥʇ sᴉ `public/`˙ɹǝploɟ 

```
}
  "dir": "./aboutme.md"
  "moduleStyle": "file",
  "moduleName": "About Me",
{
```json

˙ɹɐqǝpᴉs ǝɥʇ sǝsolɔ-oʇnɐ puɐ ɐǝɹɐ ƃuᴉpɐǝɹ uᴉɐɯ ǝɥʇ uᴉ ǝlᴉɟ uʍopʞɹɐɯ ɐ spɐol ʇᴉ ƃuᴉʞɔᴉlƆ
ǝlnpoW ǝlᴉℲ ####

```
}
  "inDirectory": [ ...child modules... ]
  "moduleStyle": "directory",
  "moduleName": "Blog",
{
```json

˙ʇuǝʇuoɔ ɹnoʎ dnoɹƃ oʇ sᴉɥʇ ǝs∩ ˙sǝlnpoɯ ɹǝɥʇo suᴉɐʇuoɔ ʇɐɥʇ ɹǝploɟ ǝlqᴉsdɐlloɔ ∀
ǝlnpoW ʎɹoʇɔǝɹᴉᗡ ####

:sǝlʎʇs ǝǝɹɥʇ ɟo ǝuo sɐɥ ǝlnpoɯ ɥɔɐƎ ˙**sǝlnpoɯ** ɟo ǝǝɹʇ ɐ sᴉ ɹɐqǝpᴉs ǝɥ⊥

ɹɐqǝpᴉS ɹno⅄ plᴉn𐐒 — Ɛ dǝʇS ###

˙ƃuᴉʇʇǝs ɯǝʇsʎs ɹnoʎ sʍolloɟ ʇᴉ ʇlnɐɟǝp ʎ𐐒 ˙ǝɔuǝɹǝɟǝɹd ɹnoʎ sɹǝqɯǝɯǝɹ ɹǝuɹoɔ ʇɥƃᴉɹ-doʇ ǝɥʇ uᴉ ǝlƃƃoʇ ʇɥƃᴉl/ʞɹɐp ǝɥ⊥

 |`oak`| sǝuoʇ uʍoɹq 'ʎzoɔ 'ɯɹɐM | )ɟᴉɹǝs( ㄣ ɟᴉɹǝS ǝɔɹnoS | 
 |`catppuccin`| sʇuǝɔɔɐ ǝldɹnd 'uɐǝlɔ 'uɹǝpoW | )ɟᴉɹǝs-suɐs( suɐS uǝdO | 
|------|------|-------|
| ǝqᴉΛ | ʇuoℲ | ǝɯǝɥ⊥ |

:ǝpoɯ ʇɥƃᴉl/ʞɹɐp ɔᴉʇɐɯoʇnɐ ɥʇᴉʍ ɥʇoq 'sǝɯǝɥʇ oʍ⊥

ǝɯǝɥ⊥ ɐ ǝsooɥƆ — ᘔ dǝʇS ###

 |`websiteStyle` | `"catppuccin"` ɹo )sʇuǝɔɔɐ ǝldɹnd 'ɟᴉɹǝs-suɐs( `"oak"`| )uʍoɹq ɯɹɐʍ 'ɟᴉɹǝs( 
 |`copyrightInfo`| ɹɐqǝpᴉs ɟo ɯoʇʇoq ʇɐ ʇxǝʇ ɹǝʇooℲ | 
 |`avatarPath` uᴉ ʇnd '⅁ΛS/ℲI⅁/⅁NԀ/⅁ƎԀſ( ɹɐqǝpᴉs uᴉ ǝɹnʇɔᴉd ǝlᴉɟoɹd ɹno⅄ | `public/`| )
 |`faviconPath` uᴉ ʇnd '⅁NԀ/⅁ΛS( uoɔᴉʌɐɟ ɹǝsʍoɹ𐐒 | `public/`| )
 |`titleOnTopBar`| ɹɐq ɹǝpɐǝɥ doʇ ǝɥʇ uᴉ ʇxǝ⊥ | 
 |`websiteAuthor`| ɹɐqǝpᴉs uᴉ ɹɐʇɐʌɐ ɹǝpun uʍoɥs ǝɯɐN | 
 |`websiteTitle`| ǝlʇᴉʇ qɐʇ ɹǝsʍoɹ𐐒 | 
|-------------|-------|
| sǝop ʇᴉ ʇɐɥM | plǝᴉℲ |

```
}
  "websiteStyle": "catppuccin"
  "copyrightInfo": "© 2026 Jane Doe. All rights reserved.",
  "avatarPath": "./avatar.svg",
  "faviconPath": "./favicon.svg",
  "titleOnTopBar": "Jane's Corner",
  "websiteAuthor": "Jane Doe",
  "websiteTitle": "My Blog",
{
```json

ʎʇᴉʇuǝpI ǝʇᴉS — ⇂ dǝʇS ###

** :ǝlᴉɟ ǝlƃuᴉs ɐ ʎq uǝʌᴉɹp sᴉ ƃuᴉɥʇʎɹǝʌƎ`config.json`˙pǝpǝǝu sǝƃuɐɥɔ ǝpoɔ ou — ƃuᴉplᴉnq ǝɹoɟǝq ʇᴉ ʇᴉpƎ ˙ʇooɹ ʇɔǝɾoɹd ǝɥʇ ʇɐ **

ǝʇᴉsqǝM ɹno⅄ ƃuᴉɹnƃᴉɟuoƆ ##

---

 uᴉ pǝʇuǝɯnɔop ǝɹɐ sllɐɟʇᴉd uʍouʞ llɐ puɐ 'spuɐɯɯoɔ plᴉnq 'ɐɯǝɥɔs ƃᴉɟuoɔ 'ǝɹnpǝɔoɹd ʇuǝɯʎoldǝp ǝʇǝldɯoɔ ǝɥ⊥`AGENTS.md`˙

˙ʇuɐʍ noʎ ʇɐɥʍ ʇuǝƃɐ ǝɥʇ llǝʇ ʇsnſ ˙sǝlᴉɟ ƃᴉɟuoɔ ƃuᴉʇsɐd-ʎdoɔ oN ˙dnʇǝs ɹǝʌɹǝs lɐnuɐɯ oN

ʇoqʇɹǝɔ ɐᴉʌ SԀ⊥⊥H + xuᴉƃu ǝɹnƃᴉɟuoƆ ˙ϛ
SԀΛ ɹnoʎ oʇ ʇᴉ pɐold∩ ˙ㄣ
ǝlpunq uoᴉʇɔnpoɹd ǝɥʇ plᴉn𐐒 ˙Ɛ
ʇuǝʇuoɔ uʍopʞɹɐɯ ɹnoʎ ǝʇᴉɹM ˙ᘔ
 ʇᴉpǝ noʎ dlǝH ˙⇂`config.json`slᴉɐʇǝp ǝʇᴉs ɹnoʎ ɥʇᴉʍ 
 pɐǝɹ llᴉʍ ʇuǝƃɐ ǝɥ⊥`AGENTS.md`:uǝɥʇ '

*„ㄣ˙Ɛ˙ᘔ˙⇂ ʇɐ SԀΛ ʎɯ uo ɯoɔ˙ǝldɯɐxǝ oʇ ƃolq ʎɯ ʎoldǝᗡ„* >

:ʎɐs puɐ ʇuǝƃɐ ɹnoʎ uᴉ ʇɔǝɾoɹd sᴉɥʇ uǝdo ʇsnſ

( **ʞɔɐԀ uoᴉʇɔnɹʇsuI ʇuǝƃ∀** uɐ sǝpnlɔuᴉ ʇɔǝɾoɹd sᴉɥ⊥`AGENTS.md`˙ǝɹoɯ puɐ 'ʍɐlƆuǝdO 'ǝpoƆᴉɯᴉ⋊ 'sǝɯɹǝH 'ɟɹnspuᴉM 'xǝpoƆ 'ɹosɹnƆ 'ǝpoƆ ǝpnɐlƆ 'ǝpoƆuǝdO ɥʇᴉʍ ǝlqᴉʇɐdɯoƆ ˙ʎllɐɔᴉʇɐɯoʇnɐ ǝʇᴉs ɹnoʎ ʎoldǝp puɐ 'plᴉnq 'ǝɹnƃᴉɟuoɔ oʇ ǝsn uɐɔ ʇuǝƃɐ ƃuᴉpoɔ I∀ ʎuɐ ʇɐɥʇ )

)pǝpuǝɯɯoɔǝᴚ( ʎoldǝᗡ pǝɹǝʍoԀ-I∀ ##

---

 uǝdO`http://localhost:5173`˙ǝʇᴉs ǝldɯɐs ǝɥʇ ǝǝs ll,noʎ — 

```
npm run dev
npm install
cd my-blog
git clone https://github.com/haruno-haresora/kitty-blog.git my-blog
```bash

ʇɹɐʇS ʞɔᴉnΌ ##

---

文中体简[ 🌐](README.zh-CN.md)）港香（文中體繁[ · ](README.zh-HK.md)）灣臺（文中體繁[ · ](README.zh-TW.md)loñɐdsƎ[ · ](README.es.md)ouɐᴉlɐʇI[ · ](README.it.md)語本日[ · ](README.ja.md)어국한[ · ](README.ko.md)言文[ · ](README.lzh.md)ꓕǝlǝpɥonǝ upsᴉdǝ doʍn[ · ](README.en-UD.md)

ㄣʌ SSƆpuᴉʍlᴉɐ⊥ + ǝʇᴉΛ + 6⇂ ʇɔɐǝᴚ + ʇdᴉɹɔSǝdʎ⊥ **ɥʇᴉʍ ʇlᴉn𐐒**

˙sǝᴉɹɐᴉp puɐ 'sǝʇou 'sǝɯnsǝɹ 'soᴉloɟʇɹod 'sʇsod ƃolq sʇɹoddnS ˙ʎoldǝp puɐ 'plᴉnq 'uʍopʞɹɐɯ uᴉ ʇuǝʇuoɔ ɹnoʎ ǝʇᴉɹʍ 'ǝlᴉɟ NOSſ ǝuo ǝɹnƃᴉɟuoƆ ˙ǝʇɐldɯǝʇ ƃolq lɐuosɹǝd pǝsɐq-uʍopʞɹɐɯ ∀

ƃol𐐒 ʎʇʇᴉ⋊ #

(˙pǝddᴉlɟ sɐʍ ʇuǝʇuoɔ lɐuᴉƃᴉɹo ǝɥ⊥ — uʍop ǝpᴉsdn sᴉ ǝlᴉɟ sᴉɥ⊥)
