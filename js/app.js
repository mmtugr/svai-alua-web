(function () {
  'use strict';

  const IMG_BASE = 'https://svai-alua.kz';
  const WHATSAPP_NUM = '77772153228';
  const THEME_KEY = 'svai_alua_theme';

  /* ===== Theme toggle ===== */
  function getResolvedTheme(mode) {
    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode;
  }

  function applyTheme(mode) {
    const resolved = getResolvedTheme(mode);
    document.documentElement.setAttribute('data-theme', resolved);
    const icon = document.getElementById('theme-icon');
    if (icon) {
      if (mode === 'light') icon.textContent = '\u2600';
      else if (mode === 'dark') icon.textContent = '\u263E';
      else icon.textContent = '\u25D0';
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(saved);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        const current = localStorage.getItem(THEME_KEY) || 'light';
        const next = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      const mode = localStorage.getItem(THEME_KEY) || 'light';
      if (mode === 'system') applyTheme('system');
    });
  }

  initTheme();

  /* ===== Scroll reveal ===== */
  function initScrollReveal() {
    var els = document.querySelectorAll('.scroll-reveal, .scroll-stagger');
    if (!els.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.remove('exit');
        } else {
          var rect = entry.boundingClientRect;
          if (rect.top > 0) {
            entry.target.classList.remove('visible');
            entry.target.classList.remove('exit');
          } else {
            entry.target.classList.add('exit');
            entry.target.classList.remove('visible');
          }
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    els.forEach(function (el) { observer.observe(el); });
  }

  document.addEventListener('content-rendered', initScrollReveal);
  document.addEventListener('DOMContentLoaded', initScrollReveal);

  function getProjects() {
    return window.contentManager?.getShared('projects') || window.contentManager?.DEFAULT_PROJECTS || [];
  }

  function openModal(id) {
    document.getElementById(id)?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(id) {
    document.getElementById(id)?.classList.remove('active');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach((el) => el.classList.remove('active'));
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.modal-close').forEach((btn) => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.modal-overlay');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // Service modal
  document.querySelector('.services-list')?.addEventListener('click', (e) => {
    const li = e.target.closest('li[data-service-index]');
    if (!li) return;
    const idx = parseInt(li.dataset.serviceIndex, 10);
    const items = window.i18n?.translations?.services?.items;
    if (!items || !items[idx] || typeof items[idx] === 'string') return;
    const s = items[idx];
    const img = document.getElementById('service-modal-img');
    const title = document.getElementById('service-modal-title');
    const desc = document.getElementById('service-modal-desc');
    if (img) {
      img.src = s.img ? (s.img.startsWith('data:') ? s.img : IMG_BASE + s.img) : '';
      img.style.display = s.img ? 'block' : 'none';
    }
    if (title) title.textContent = s.text;
    if (desc) desc.textContent = s.desc || '';
    openModal('service-modal');
  });

  // Gallery lightbox (delegated - gallery is rendered by i18n)
  document.getElementById('gallery-grid')?.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    const img = item?.querySelector('img');
    if (!img || !img.src) return;
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
      lightboxImg.src = img.src;
      openModal('gallery-lightbox');
    }
  });

  // Clients modal
  document.querySelector('.clients-count')?.addEventListener('click', () => {
    const list = document.getElementById('projects-list');
    if (list) {
      const projects = getProjects();
      list.innerHTML = '';
      projects.forEach((p) => {
        const li = document.createElement('li');
        li.textContent = p;
        list.appendChild(li);
      });
      openModal('clients-modal');
    }
  });

  // Chatbot centered balloon (opens on click)
  const CHOICE_DATA = {
    piles: { key: 'contact.resultPiles', wa: '\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u0418\u043d\u0442\u0435\u0440\u0435\u0441\u0443\u044e\u0442 \u0441\u0432\u0430\u0439\u043d\u044b\u0435 \u0440\u0430\u0431\u043e\u0442\u044b.' },
    puncture: { key: 'contact.resultPuncture', wa: '\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u0418\u043d\u0442\u0435\u0440\u0435\u0441\u0443\u044e\u0442 \u043f\u0440\u043e\u043a\u043e\u043b\u044b \u043f\u043e\u0434 \u0434\u043e\u0440\u043e\u0433\u0430\u043c\u0438.' },
    quote: { key: 'contact.resultQuote', wa: '\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u041d\u0443\u0436\u043d\u043e \u043a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u043e\u0435 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0435.' },
    other: { key: 'contact.resultOther', wa: '\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u0415\u0441\u0442\u044c \u0432\u043e\u043f\u0440\u043e\u0441 \u043f\u043e \u0443\u0441\u043b\u0443\u0433\u0430\u043c \u0422\u041e\u041e \u0410\u043b\u0443\u0430.' },
  };

  const balloon = document.getElementById('chatbot-balloon');
  const balloonDesc = document.getElementById('chatbot-balloon-desc');
  const balloonWa = document.getElementById('chatbot-balloon-wa');
  const contactSection = document.getElementById('contact');

  let balloonOpenScrollY = null;

  function updateBalloonOpacity() {
    if (!balloon?.classList.contains('visible') || !contactSection) return;
    if (balloonOpenScrollY !== null && Math.abs(window.scrollY - balloonOpenScrollY) < 50) return;
    balloonOpenScrollY = null;
    const rect = contactSection.getBoundingClientRect();
    const vh = window.innerHeight;
    const visibleHeight = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
    if (visibleHeight <= 0) {
      hideBalloon();
      if (balloon) balloon.style.opacity = '';
      return;
    }
    const ratio = Math.min(1, visibleHeight / rect.height);
    const opacity = Math.pow(ratio, 1.5);
    if (balloon) balloon.style.opacity = String(opacity);
  }

  function showBalloon() {
    balloon?.classList.add('visible');
    if (balloon) balloon.style.opacity = '1';
    balloonOpenScrollY = window.scrollY;
  }

  function hideBalloon() {
    balloon?.classList.remove('visible');
    if (balloon) balloon.style.opacity = '';
  }

  function setBalloonChoice(choice) {
    const data = CHOICE_DATA[choice];
    if (!data) return;
    if (balloonDesc) balloonDesc.textContent = window.i18n?.t(data.key) || data.key;
    if (balloonWa) balloonWa.href = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(data.wa)}`;
    document.querySelectorAll('.chatbot-balloon-choice').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.choice === choice);
    });
  }

  function onOptionClick(choice) {
    setBalloonChoice(choice);
    showBalloon();
  }

  document.querySelectorAll('.chatbot-choice, .chatbot-balloon-choice').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      onOptionClick(btn.dataset.choice);
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#chatbot-balloon') && !e.target.closest('#chatbot-trigger')) {
      hideBalloon();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideBalloon();
  });

  window.addEventListener('scroll', updateBalloonOpacity, { passive: true });

  setBalloonChoice('piles');

  // Contact form (Formspree)
  // TODO: Formspree'de hesap oluştur ve form ID'yi buraya yaz
  const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const origText = btn.textContent;
      btn.disabled = true;
      btn.textContent = '...';
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' },
        });
        if (res.ok) {
          const msg = window.i18n ? window.i18n.t('form.success') : '\u0421\u043f\u0430\u0441\u0438\u0431\u043e!';
          btn.textContent = msg;
          form.reset();
          setTimeout(function () { btn.textContent = origText; btn.disabled = false; }, 3000);
        } else {
          throw new Error('Form error');
        }
      } catch {
        btn.textContent = origText;
        btn.disabled = false;
        alert(window.i18n ? window.i18n.t('form.error') : '\u041e\u0448\u0438\u0431\u043a\u0430. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435.');
      }
    });
  }

  // Mobile menu
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  var menuOpen = false;

  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    nav.classList.remove('mobile-open');
  }

  function openMenu() {
    menuOpen = true;
    nav.classList.add('mobile-open');
  }

  if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (menuOpen) { closeMenu(); } else { openMenu(); }
    });

    // Menüden link seçilince
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        closeMenu();
      }
    });

    // Boş yere dokunma veya tıklama
    document.addEventListener('touchstart', function (e) {
      if (menuOpen && !e.target.closest('.nav') && !e.target.closest('.mobile-menu-btn')) {
        closeMenu();
      }
    }, { passive: true });

    document.addEventListener('click', function (e) {
      if (menuOpen && !e.target.closest('.nav') && !e.target.closest('.mobile-menu-btn')) {
        closeMenu();
      }
    });

    // Scroll yapınca
    var lastScrollY = window.scrollY;
    window.addEventListener('scroll', function () {
      if (menuOpen && Math.abs(window.scrollY - lastScrollY) > 10) {
        closeMenu();
      }
      lastScrollY = window.scrollY;
    }, { passive: true });
  }
})();
