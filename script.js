// ============================================================
//  LANGUAGE
// ============================================================
const html   = document.documentElement;
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
  const filters    = document.getElementById('menuFilters');
  const categories = document.getElementById('menuCategories');
  if (!filters || !categories) return;

  // Filter buttons
  filters.innerHTML = MENU.map(cat => `
    <button class="menu-filter-btn" data-id="${cat.id}">
      ${cat.category[lang]}
    </button>
  `).join('');

  filters.querySelectorAll('.menu-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filters.querySelectorAll('.menu-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById('cat-' + btn.dataset.id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Categories
  categories.innerHTML = MENU.map(cat => {
    const photoHtml = cat.categoryPhoto
      ? `<img src="${cat.categoryPhoto}" alt="${cat.category[lang]}" class="category-photo">`
      : '';

    const descHtml = cat.description
      ? `<p class="category-description">${cat.description[lang]}</p>`
      : '';

    const noteHtml = cat.categoryNote
      ? `<p class="category-note">${cat.categoryNote[lang]}</p>`
      : '';

    const itemsHtml = cat.items.map(item => {
      const noteStr  = item.note  ? `<span class="item-note">${item.note[lang]}</span>`  : '';
      const photoStr = item.photo ? `<img src="${item.photo}" alt="${item.name[lang]}" class="item-photo">` : '';
      const priceStr = item.price !== null && item.price !== undefined
        ? `<span class="menu-item-price">${item.price} грн</span>`
        : '';

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
        // Pizza-style toppings list
        extrasHtml = `
          <div class="menu-extras">
            <p class="extras-label">${cat.extras.label[lang]}</p>
            <div class="extras-list">
              ${cat.extras.list[lang].map(t => `<span class="extra-tag">${t}</span>`).join('')}
            </div>
          </div>`;
      } else {
        // Simple note (e.g. crouton for soups)
        extrasHtml = `<p class="extras-crouton">${cat.extras.label[lang]}</p>`;
      }
    }

    return `
      <div class="menu-category" id="cat-${cat.id}">
        <div class="category-header">
          ${photoHtml}
          <div>
            <h3 class="category-title">${cat.category[lang]}</h3>
            ${descHtml}
            ${noteHtml}
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
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ============================================================
//  ACTIVE NAV LINK ON SCROLL
// ============================================================
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
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
  if (e.key === 'Escape') {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ============================================================
//  INIT
// ============================================================
applyLang();
