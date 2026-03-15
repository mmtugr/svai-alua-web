(function () {
  'use strict';

  const STORAGE_KEY = 'svai_alua_lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'kk';
  let translations = {};

  async function loadLocale(lang) {
    try {
      const res = await fetch(`locales/${lang}.json`);
      if (!res.ok) throw new Error('Locale not found');
      return await res.json();
    } catch (e) {
      console.warn('Locale load failed:', e);
      return {};
    }
  }

  function t(key) {
    const keys = key.split('.');
    let val = translations;
    for (const k of keys) {
      val = val?.[k];
    }
    return val ?? key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const text = t(key);
      if (text && typeof text === 'string') el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = t(key);
      if (text && typeof text === 'string') el.placeholder = text;
    });
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : currentLang;
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderServices() {
    const items = translations.services?.items;
    const list = document.querySelector('.services-list');
    if (!list || !Array.isArray(items)) return;
    list.innerHTML = '';
    items.forEach((s, i) => {
      const text = typeof s === 'string' ? s : s.text;
      const li = document.createElement('li');
      li.dataset.serviceIndex = i;
      li.textContent = text;
      list.appendChild(li);
    });
  }

  const IMG_BASE = 'https://svai-alua.kz';

  function isValidImgSrc(src) {
    if (!src) return false;
    if (src.startsWith('data:image/')) return true;
    if (src.startsWith('/')) return true;
    try { const u = new URL(src); return ['http:', 'https:'].includes(u.protocol); } catch { return false; }
  }

  function renderEquipment() {
    const items = translations.equipment?.items;
    const grid = document.getElementById('equipment-grid');
    if (!grid || !Array.isArray(items)) return;
    grid.innerHTML = '';
    items.forEach((e) => {
      const card = document.createElement('div');
      card.className = 'equipment-card';
      if (e.img) {
        const imgSrc = e.img.startsWith('data:') ? e.img : IMG_BASE + e.img;
        if (isValidImgSrc(imgSrc)) {
          const img = document.createElement('img');
          img.src = imgSrc;
          img.alt = escapeHTML(e.name);
          img.loading = 'lazy';
          card.appendChild(img);
        }
      }
      const info = document.createElement('div');
      info.className = 'equipment-info';
      const strong = document.createElement('strong');
      strong.textContent = e.name;
      const span = document.createElement('span');
      span.textContent = e.desc || '';
      info.appendChild(strong);
      info.appendChild(span);
      card.appendChild(info);
      grid.appendChild(card);
    });
  }

  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    const galleryData = window.contentManager?.getShared('gallery');
    const images = galleryData?.images || window.contentManager?.DEFAULT_GALLERY_IMAGES || [];
    const companyName = translations.about?.title || 'ТОО Алуа';
    grid.innerHTML = '';
    images.forEach((src, i) => {
      const imgSrc = src.startsWith('data:') ? src : IMG_BASE + src;
      if (!isValidImgSrc(imgSrc)) return;
      const div = document.createElement('div');
      div.className = 'gallery-item';
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = companyName + ' — ' + (translations.gallery?.title || 'Галерея') + ' ' + (i + 1);
      img.loading = 'lazy';
      div.appendChild(img);
      grid.appendChild(div);
    });
  }

  function renderContactInfo() {
    const info = translations.contactInfo;
    if (!info) return;
    const addrEl = document.getElementById('contact-address-value');
    const phonesEl = document.getElementById('contact-phones');
    const emailEl = document.getElementById('contact-email-value');
    const hoursEl = document.getElementById('contact-hours-value');
    if (addrEl) addrEl.textContent = info.addressValue || '';
    if (phonesEl && Array.isArray(info.phones)) {
      phonesEl.innerHTML = '';
      info.phones.forEach((p, i) => {
        if (i > 0) phonesEl.appendChild(document.createElement('br'));
        const a = document.createElement('a');
        a.href = 'tel:' + p.replace(/[^+\d]/g, '');
        a.textContent = p;
        phonesEl.appendChild(a);
      });
    }
    if (emailEl) {
      emailEl.href = `mailto:${info.emailValue || ''}`;
      emailEl.textContent = info.emailValue || '';
    }
    if (hoursEl) hoursEl.textContent = info.hoursValue || '';
  }

  async function setLang(lang) {
    if (!['kk', 'ru', 'en', 'zh', 'tr'].includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    const defaultData = await loadLocale(lang);
    translations = window.contentManager ? window.contentManager.getContent(lang, defaultData) : defaultData;
    applyTranslations();
    renderServices();
    renderEquipment();
    renderGallery();
    renderContactInfo();
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.dispatchEvent(new Event('content-rendered'));
  }

  document.addEventListener('DOMContentLoaded', async () => {
    if (window.contentManager && window.contentManager.init) {
      await window.contentManager.init();
    }
    await setLang(currentLang);
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  });

  window.i18n = { t, setLang, getLang: () => currentLang, get translations() { return translations; } };
})();
