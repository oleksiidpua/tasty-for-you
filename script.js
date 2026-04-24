// ============================================================
//  GOOGLE SHEETS — ID таблиці меню
// ============================================================
const SHEET_ID = '1DOcvhY89qyvQm66qTtqSJOjrbiljlLifDg1WvIrzAIk';

// ============================================================
//  LOAD MENU FROM GOOGLE SHEETS
// ============================================================
async function loadMenuFromSheets() {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
  try {
    const res  = await fetch(url);
    const text = await res.text();

    // Strip the JSONP wrapper Google adds: /*O_o*/\ngoogle...setResponse({...});
    const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/);
    if (!match) throw new Error('Unexpected Sheets response format');

    const json  = JSON.parse(match[1]);
    const table = json.table;

    // Map column labels to index
    const colIndex = {};
    table.cols.forEach((col, i) => { colIndex[col.label] = i; });

    // Parse rows into objects
    const rows = table.rows
      .map(row => {
        const get = key => {
          const i = colIndex[key];
          if (i === undefined) return '';
          const cell = row.c[i];
          return cell && cell.v !== null && cell.v !== undefined ? String(cell.v).trim() : '';
        };
        return {
          id:          get('id'),
          category_ua: get('category_ua'),
          category_en: get('category_en'),
          name_ua:     get('name_ua'),
          name_en:     get('name_en'),
          price:       get('price'),
          note_ua:     get('note_ua'),
          note_en:     get('note_en'),
          item_photo:  get('item_photo')
        };
      })
      .filter(r => r.id && r.name_ua); // skip empty rows

    // Group rows into categories
    const map = new Map();
    rows.forEach(row => {
      const catId = row.id;
      if (!map.has(catId)) {
        // Inherit photos/extras/notes from the local menu.js definition
        const orig = (typeof MENU !== 'undefined' ? MENU : []).find(c => c.id === catId) || {};
        map.set(catId, {
          id:            catId,
          category:      { uk: row.category_ua, en: row.category_en },
          categoryPhoto: orig.categoryPhoto  || null,
          categoryNote:  orig.categoryNote   || null,
          description:   orig.description    || null,
          extras:        orig.extras         || null,
          items: []
        });
      }
      const priceNum = parseFloat(row.price);
      map.get(catId).items.push({
        name:  { uk: row.name_ua, en: row.name_en },
        price: isNaN(priceNum) ? null : priceNum,
        note:  (row.note_ua || row.note_en)
                 ? { uk: row.note_ua, en: row.note_en }
                 : null,
        photo: row.item_photo || null
      });
    });

    return Array.from(map.values());

  } catch (err) {
    console.warn('Google Sheets недоступні, використовується локальне меню.', err);
    return null;
  }
}

// ============================================================
//  ACTIVE MENU  (Sheets → fallback to local menu.js)
// ============================================================
let ACTIVE_MENU = (typeof MENU !== 'undefined') ? MENU : [];

// ============================================================
//  LANGUAGE
// ============================================================
const html    = document.documentElement;
const langBtn = document.getElementById('langBtn');
let lang = localStorage.getItem('tasty-lang') || 'uk';

function applyLang() {
  html.setAttribute('data-lang', lang);
  langBtn.textContent = lang === 'uk' ? 'EN' : 'UA';
  localStorage.setItem('tasty-lang', lang);
  renderMenu();
}

langBtn.addEventListener('click', () => {
  lang = lang === 'uk' ? 'en' : 'uk';
  applyLang();
});

// ============================================================
//  MENU RENDERING
// ============================================================
function renderMenu() {
  const filtersEl    = document.getElementById('menuFilters');
  const categoriesEl = document.getElementById('menuCategories');
  if (!filtersEl || !categoriesEl) return;

  const data = ACTIVE_MENU;

  // Filter buttons
  filtersEl.innerHTML = data.map(cat => `
    <button class="menu-filter-btn" data-id="${cat.id}">
      ${cat.category[lang]}
    </button>
  `).join('');

  filtersEl.querySelectorAll('.menu-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filtersEl.querySelectorAll('.menu-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const el = document.getElementById('cat-' + btn.dataset.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Categories
  categoriesEl.innerHTML = data.map(cat => {
    const photoHtml = cat.categoryPhoto
      ? `<img src="${cat.categoryPhoto}" alt="${cat.category[lang]}" class="category-photo">`
      : '';
    const descHtml = cat.description
      ? `<p class="category-description">${cat.description[lang]}</p>` : '';
    const noteHtml = cat.categoryNote
      ? `<p class="category-note">${cat.categoryNote[lang]}</p>` : '';

    const itemsHtml = cat.items.map(item => {
      const noteStr  = item.note  ? `<span class="item-note">${item.note[lang]}</span>`  : '';
      const photoStr = item.photo ? `<img src="${item.photo}" alt="${item.name[lang]}" class="item-photo">` : '';
      const priceStr = item.price !== null && item.price !== undefined
        ? `<span class="menu-item-price">${item.price} грн</span>` : '';
      return `
        <div class="menu-item">
          ${photoStr}
          <div class="menu-item-info">
            <span class="menu-item-name">${item.name[lang]}</span>
            ${noteStr}
          </div>
          ${priceStr}
        </div>`;
    }).join('');

    let extrasHtml = '';
    if (cat.extras) {
      if (cat.extras.list) {
        extrasHtml = `
          <div class="menu-extras">
            <p class="extras-label">${cat.extras.label[lang]}</p>
            <div class="extras-list">
              ${cat.extras.list[lang].map(t => `<span class="extra-tag">${t}</span>`).join('')}
            </div>
          </div>`;
      } else {
        extrasHtml = `<p class="extras-crouton">${cat.extras.label[lang]}</p>`;
      }
    }

    return `
      <div class="menu-category" id="cat-${cat.id}">
        <div class="category-header">
          ${photoHtml}
          <div>
            <h3 class="category-title">${cat.category[lang]}</h3>
            ${descHtml}${noteHtml}
          </div>
        </div>
        <div class="menu-items">${itemsHtml}</div>
        ${extrasHtml}
      </div>`;
  }).join('');
}

// ============================================================
//  STICKY HEADER
// ============================================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ============================================================
//  HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

// ============================================================
//  ACTIVE NAV LINK ON SCROLL
// ============================================================
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navAnchors.forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#' + current)
  );
}, { passive: true });

// ============================================================
//  GALLERY LIGHTBOX
// ============================================================
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
});

// ============================================================
//  INIT — спочатку показуємо локальне меню, потім оновлюємо з Sheets
// ============================================================
applyLang(); // одразу рендеримо з menu.js (без затримки)

loadMenuFromSheets().then(sheetsData => {
  if (sheetsData && sheetsData.length > 0) {
    ACTIVE_MENU = sheetsData;
    renderMenu(); // оновлюємо меню даними з Google Sheets
  }
});
