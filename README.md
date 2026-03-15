# ТОО «Алуа» — Сайт компании

Современный многоязычный сайт для ТОО «Алуа» (свайные работы, проколы под дорогами, Алматы).

## Языки

- Қазақша (KZ)
- Русский (RU)
- 中文 (ZH)
- Türkçe (TR)

## Структура

```
svai_alua_web/
├── index.html
├── css/style.css
├── js/
│   ├── app.js
│   └── i18n.js
├── locales/
│   ├── kk.json
│   ├── ru.json
│   ├── zh.json
│   └── tr.json
├── README.md
├── .env.example
└── .gitignore
```

## Запуск локально

Локали загружаются через `fetch()`, поэтому нужен HTTP-сервер:

```bash
# Python
python3 -m http.server 8000

# или npx
npx serve .
```

Откройте http://localhost:8000

## SSL / Production

Для production используйте HTTPS (nginx, Cloudflare, Let's Encrypt). Статические файлы можно раздавать любым веб-сервером.

## Контактная форма

Форма «Связаться с нами» сейчас выводит данные в консоль и показывает уведомление. Для реальной отправки подключите backend (API endpoint в `.env`).
