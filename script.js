'use strict';

const PAGES = ['home', 'bio', 'portfolio', 'blog', 'contact'];

// ── Navigation ──────────────────────────────────────────
function navigate(id) {
  PAGES.forEach(p => {
    const el = document.getElementById('page-' + p);
    el.classList.remove('active', 'visible');
  });

  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });

  const target = document.getElementById('page-' + id);
  target.classList.add('active');
  window.scrollTo(0, 0);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => target.classList.add('visible'));
  });
}

// ── Mobile menu ─────────────────────────────────────────
function toggleMenu() {
  document.getElementById('burger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('burger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── Portfolio filter ────────────────────────────────────
function filterProjects(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
  });
}

// ── Years of experience ─────────────────────────
const START_YEAR = 2022;

function countupYears() {
  const target = new Date().getFullYear() - START_YEAR;
  const duration = 800; // ms
  const startTime = performance.now();

  const statEl = document.getElementById('stat-years');
  const bioEl  = document.getElementById('bio-years');

  function tick(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(eased * target);

    if (statEl) statEl.textContent = current;
    if (bioEl)  bioEl.textContent  = current;

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initTicker() {
  const ticker = document.getElementById('ticker');
  if (!ticker) return;

  const set = ticker.querySelector('.ticker-set');
  if (!set) return;

  const setWidth = set.offsetWidth;

  while (ticker.scrollWidth < window.innerWidth * 2) {
    ticker.appendChild(set.cloneNode(true));
  }
  
  ticker.appendChild(set.cloneNode(true));
  ticker.style.setProperty('--ticker-shift', `-${setWidth}px`);

  // Scale duration to content width so speed stays consistent (~80px/s).
  ticker.style.animationDuration = `${Math.round(setWidth / 80)}s`;
}

// ── Init ────────────────────────────────────────────────
navigate('home');
initTicker();
countupYears();
