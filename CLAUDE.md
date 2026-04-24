# Tasty for You — Café Website

## Café Details
- Name: Tasty for You
- Phone: (067) 436-84-58
- Address: м. Тернопіль, вул. Оболоня, 2 (кіоск на вході в ринок «Юмакс»)
- Hours: Вт–Нд 9:00–16:00, Пн — вихідний
- Slogan UA: "Зупинись. Скуштуй. Насолодись."
- Slogan EN: "Stop. Taste. Enjoy."

## Tech Stack
Pure HTML5, CSS3 (Flexbox + Grid), vanilla JavaScript. No frameworks, no build tools.
Google Fonts: Playfair Display + Open Sans.

## File Structure
```
├── index.html       — main page
├── styles.css       — all styles
├── script.js        — language toggle, navigation, menu rendering
├── menu.js          — ← EDIT THIS to update menu (prices, dishes, photos)
├── menu.md          — original menu text (reference only)
├── CLAUDE.md        — this file
└── Files/           — photos
    ├── Фото кафе.jpeg
    ├── Піца.jpeg
    ├── Шаурма.jpeg
    ├── Паніні.jpeg
    ├── Хот-дог французьский.jpeg
    ├── Бургер в лаваші.jpeg
    └── WhatsApp Image 2026-04-20 at 19.37.26.jpeg
```

## How to Update Menu
Edit `menu.js`. Each item has:
- `name`: dish name in Ukrainian (`uk`) and English (`en`)
- `price`: price number in UAH (e.g. `80`), or `null` if priced by weight
- `note`: optional description (ingredient list, weight info)
- `photo`: path to photo file (e.g. `"Files/Піца.jpeg"`) or `null`

To add a new dish — copy an existing item block and change the values.
To add a photo — put the image file in `Files/` folder and set `photo: "Files/filename.jpeg"`.

## Languages
Site is bilingual UA/EN. Toggle button in the header switches languages.
All text uses `.uk` / `.en` CSS classes. Menu re-renders on language switch.
