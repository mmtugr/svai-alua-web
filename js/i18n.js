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

  const IMG_BASE = 'https://svai-alua.kz';

  function isValidImgSrc(src) {
    if (!src) return false;
    if (src.startsWith('data:image/')) return true;
    if (src.startsWith('/')) return true;
    try { const u = new URL(src); return ['http:', 'https:'].includes(u.protocol); } catch { return false; }
  }

  function renderServices() {
    const items = translations.services?.items;
    const list = document.querySelector('.services-list');
    if (!list || !Array.isArray(items)) return;
    list.innerHTML = '';
    items.forEach((s, i) => {
      const text = typeof s === 'string' ? s : s.text;
      const imgSrc = typeof s === 'object' ? s.img : null;
      const li = document.createElement('li');
      li.dataset.serviceIndex = i;
      if (imgSrc && isValidImgSrc(imgSrc)) {
        const thumb = document.createElement('img');
        thumb.className = 'service-thumb';
        thumb.src = imgSrc.startsWith('data:') ? imgSrc : IMG_BASE + imgSrc;
        thumb.alt = '';
        thumb.loading = 'lazy';
        li.appendChild(thumb);
      }
      const span = document.createElement('span');
      span.className = 'service-text';
      span.textContent = text;
      li.appendChild(span);
      list.appendChild(li);
    });
  }

  const INITIAL_VISIBLE = 6;

  function createShowAllBtn(totalCount, targetId) {
    const btn = document.createElement('button');
    btn.className = 'show-all-btn';
    btn.dataset.target = targetId;
    const showText = (t('btn.showAll') || 'Показать все') + ` (${totalCount})`;
    const hideText = t('btn.hide') || 'Скрыть';
    const arrow = document.createElement('span');
    arrow.className = 'show-all-arrow';
    arrow.textContent = '↓';
    btn.textContent = showText;
    btn.appendChild(arrow);
    btn.addEventListener('click', () => {
      const grid = document.getElementById(targetId);
      if (!grid) return;
      const expanded = grid.classList.toggle('show-all');
      btn.firstChild.textContent = expanded ? hideText : showText;
      arrow.textContent = expanded ? '↑' : '↓';
      btn.classList.toggle('expanded', expanded);
    });
    return btn;
  }

  function renderEquipment() {
    const items = translations.equipment?.items;
    const grid = document.getElementById('equipment-grid');
    if (!grid || !Array.isArray(items)) return;
    grid.innerHTML = '';
    grid.classList.remove('show-all');
    const existingBtn = grid.parentElement?.querySelector('.show-all-btn[data-target="equipment-grid"]');
    if (existingBtn) existingBtn.remove();
    items.forEach((e, i) => {
      const card = document.createElement('div');
      card.className = 'equipment-card';
      if (i >= INITIAL_VISIBLE) card.classList.add('hidden-item');
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
    if (items.length > INITIAL_VISIBLE) {
      grid.parentElement.appendChild(createShowAllBtn(items.length, 'equipment-grid'));
    }
  }

  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    const galleryData = window.contentManager?.getShared('gallery');
    const images = galleryData?.images || window.contentManager?.DEFAULT_GALLERY_IMAGES || [];
    const companyName = translations.about?.title || 'ТОО Алуа';
    grid.innerHTML = '';
    grid.classList.remove('show-all');
    const existingBtn = grid.parentElement?.querySelector('.show-all-btn[data-target="gallery-grid"]');
    if (existingBtn) existingBtn.remove();
    let validCount = 0;
    images.forEach((src, i) => {
      const imgSrc = src.startsWith('data:') ? src : IMG_BASE + src;
      if (!isValidImgSrc(imgSrc)) return;
      const div = document.createElement('div');
      div.className = 'gallery-item';
      if (validCount >= INITIAL_VISIBLE) div.classList.add('hidden-item');
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = companyName + ' — ' + (translations.gallery?.title || 'Галерея') + ' ' + (i + 1);
      img.loading = 'lazy';
      div.appendChild(img);
      grid.appendChild(div);
      validCount++;
    });
    if (validCount > INITIAL_VISIBLE) {
      grid.parentElement.appendChild(createShowAllBtn(validCount, 'gallery-grid'));
    }
  }

  function renderCertificates() {
    const grid = document.getElementById('certificates-grid');
    if (!grid) return;
    const certData = window.contentManager?.getShared('certificates');
    const images = certData?.images || [];
    const companyName = translations.about?.title || 'ТОО Алуа';
    grid.innerHTML = '';
    const section = grid.closest('.certificates-section');
    const navLink = document.querySelector('a[href="#certificates"]');
    if (images.length === 0) {
      if (section) section.style.display = 'none';
      if (navLink) navLink.style.display = 'none';
      return;
    }
    if (section) section.style.display = '';
    if (navLink) navLink.style.display = '';
    images.forEach((src, i) => {
      const imgSrc = src.startsWith('data:') ? src : IMG_BASE + src;
      if (!isValidImgSrc(imgSrc)) return;
      const div = document.createElement('div');
      div.className = 'certificate-item';
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = companyName + ' — ' + (translations.certificates?.title || 'Сертификат') + ' ' + (i + 1);
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
    renderCertificates();
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
