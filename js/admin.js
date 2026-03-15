(function () {
  'use strict';

  // --- Theme toggle (shared with main site) ---
  const THEME_KEY = 'svai_alua_theme';
  function getResolvedTheme(m) { return m === 'system' ? (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light') : m; }
  function applyAdminTheme(mode) {
    document.documentElement.setAttribute('data-theme', getResolvedTheme(mode));
    const btn = document.getElementById('admin-theme-toggle');
    if (btn) btn.textContent = mode === 'light' ? '\u2600' : mode === 'dark' ? '\u263E' : '\u25D0';
  }
  applyAdminTheme(localStorage.getItem(THEME_KEY) || 'light');
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('admin-theme-toggle');
    if (btn) btn.addEventListener('click', function () {
      const cur = localStorage.getItem(THEME_KEY) || 'light';
      const next = cur === 'light' ? 'dark' : cur === 'dark' ? 'system' : 'light';
      localStorage.setItem(THEME_KEY, next);
      applyAdminTheme(next);
    });
  });

  // --- Admin UI translations ---
  const ADMIN_LANG_KEY = 'svai_alua_admin_lang';
  const ADMIN_UI = {
    tr: {
      // Auth
      'auth.subtitle': 'Devam etmek için şifreyi girin',
      'auth.placeholder': 'Şifre',
      'auth.error': 'Yanlış şifre',
      'auth.login': 'Giriş',
      'auth.forgot': 'Şifremi unuttum',
      'auth.forgotConfirm': 'Yeni şifre e-posta adresinize gönderilecek. Devam edilsin mi?',
      'auth.forgotDone': 'Yeni şifre e-posta adresinize gönderildi.',
      'auth.forgotNoEmail': 'Önce Ayarlar bölümünden e-posta adresinizi kaydedin.',
      'auth.forgotFailed': 'E-posta gönderilemedi. Lütfen tekrar deneyin.',
      'auth.forgotNotConfigured': 'EmailJS henüz yapılandırılmamış. Ayarlar bölümünden yapılandırın.',
      // Header
      'header.viewSite': 'Siteyi Görüntüle',
      'header.export': 'Dışa Aktar',
      'header.import': 'İçe Aktar',
      'header.clearAll': 'Tümünü Sıfırla',
      'header.changePass': 'Şifre Değiştir',
      'header.logout': 'Çıkış',
      'header.logoutConfirm': 'Oturumu kapatmak istediğinizden emin misiniz?',
      // Change password
      'pass.title': 'Şifre Değiştir',
      'pass.current': 'Mevcut şifre',
      'pass.new': 'Yeni şifre',
      'pass.confirm': 'Yeni şifre (tekrar)',
      'pass.save': 'Kaydet',
      'pass.cancel': 'İptal',
      'pass.wrongCurrent': 'Mevcut şifre yanlış',
      'pass.mismatch': 'Yeni şifreler eşleşmiyor',
      'pass.tooShort': 'Şifre en az 6 karakter olmalı',
      'pass.success': 'Şifre başarıyla değiştirildi',
      // Sidebar
      'nav.hero': 'Hero',
      'nav.about': 'Hakkımızda',
      'nav.services': 'Hizmetler',
      'nav.equipment': 'Ekipman',
      'nav.gallery': 'Galeri',
      'nav.clients': 'Projeler',
      'nav.contact': 'İletişim',
      // Shared
      'shared.langNote': 'Bu bölüm tüm diller için ortaktır',
      'btn.save': 'Kaydet',
      'btn.reset': 'Sıfırla',
      'btn.delete': 'Sil',
      'btn.upload': 'Yükle',
      'unsaved': 'Kaydedilmemiş değişiklikler var. Devam etmek istiyor musunuz?',
      'saved': 'Kaydedildi',
      'resetConfirm': 'bölümünü varsayılana sıfırlamak istediğinizden emin misiniz?',
      'resetDone': 'Sıfırlandı',
      'fileTooLarge': 'Dosya çok büyük (max 2MB)',
      'imageUploaded': 'Resim yüklendi',
      'exportDone': 'JSON dışa aktarıldı',
      'importDone': 'İçerik içe aktarıldı',
      'importError': 'Geçersiz JSON dosyası',
      'clearConfirm': 'Tüm admin düzenlemelerini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
      'clearDone': 'Tüm düzenlemeler silindi',
      // Hero
      'hero.title': 'Hero Bölümü',
      'hero.heading': 'Başlık',
      'hero.subtitle': 'Alt başlık',
      'hero.cta': 'Buton metni',
      // About
      'about.title': 'Hakkımızda Bölümü',
      'about.heading': 'Başlık',
      'about.p1': 'Paragraf 1',
      'about.p2': 'Paragraf 2',
      'about.p3': 'Paragraf 3',
      'about.missionTitle': 'Misyon başlığı',
      'about.mission': 'Misyon metni',
      'about.visionTitle': 'Vizyon başlığı',
      'about.vision': 'Vizyon metni',
      // Services
      'services.title': 'Hizmetler',
      'services.sectionTitle': 'Bölüm başlığı',
      'services.item': 'Hizmet',
      'services.name': 'İsim',
      'services.desc': 'Açıklama',
      'services.img': 'Resim',
      'services.add': '+ Hizmet Ekle',
      'services.added': 'Yeni hizmet eklendi',
      'services.deleteConfirm': 'Bu hizmeti silmek istediğinizden emin misiniz?',
      'services.deleted': 'Hizmet silindi',
      // Equipment
      'equipment.title': 'Ekipman',
      'equipment.sectionTitle': 'Bölüm başlığı',
      'equipment.item': 'Ekipman',
      'equipment.name': 'İsim',
      'equipment.desc': 'Açıklama',
      'equipment.img': 'Resim',
      'equipment.add': '+ Ekipman Ekle',
      'equipment.added': 'Yeni ekipman eklendi',
      'equipment.deleteConfirm': 'Bu ekipmanı silmek istediğinizden emin misiniz?',
      'equipment.deleted': 'Ekipman silindi',
      // Gallery
      'gallery.title': 'Galeri Resimleri',
      'gallery.note': 'Resim yolları svai-alua.kz alan adına görelidir',
      'gallery.add': '+ Resim Ekle',
      'gallery.added': 'Yeni resim alanı eklendi',
      'gallery.deleted': 'Resim silindi',
      'gallery.saved': 'Galeri kaydedildi',
      'gallery.resetConfirm': 'Galeriyi varsayılana sıfırlamak istediğinizden emin misiniz?',
      'gallery.resetDone': 'Galeri sıfırlandı',
      // Clients
      'clients.title': 'Proje Listesi',
      'clients.search': 'Proje ara...',
      'clients.add': '+ Proje Ekle',
      'clients.added': 'Yeni proje eklendi',
      'clients.saved': 'Projeler kaydedildi',
      'clients.resetConfirm': 'Projeleri varsayılana sıfırlamak istediğinizden emin misiniz?',
      'clients.resetDone': 'Projeler sıfırlandı',
      // Contact
      'contact.infoTitle': 'İletişim Bilgileri',
      'contact.sectionTitle': 'Bölüm başlığı',
      'contact.address': 'Adres',
      'contact.phone1': 'Telefon 1',
      'contact.phone2': 'Telefon 2',
      'contact.email': 'Email',
      'contact.hours': 'Çalışma saatleri',
      'contact.chatbotTitle': 'Chatbot Metinleri',
      'contact.chatbotHeading': 'Chatbot başlık',
      'contact.chatbotQuestion': 'Chatbot soru',
      'contact.choicePiles': 'Kazık işleri butonu',
      'contact.choicePuncture': 'Prokollar butonu',
      'contact.choiceQuote': 'KP butonu',
      'contact.choiceOther': 'Diğer butonu',
      'contact.resultPiles': 'Kazık sonuç',
      'contact.resultPuncture': 'Prokol sonuç',
      'contact.resultQuote': 'KP sonuç',
      'contact.resultOther': 'Diğer sonuç',
      'contact.whatsappBtn': 'WhatsApp butonu',
      // Settings
      'nav.settings': 'Ayarlar',
      'settings.title': 'Ayarlar',
      'settings.emailLabel': 'Admin e-posta adresi',
      'settings.emailHint': 'Şifre sıfırlama e-postası bu adrese gönderilecektir.',
      'settings.save': 'Kaydet',
      'settings.saved': 'Ayarlar kaydedildi',
      'settings.emailjsTitle': 'EmailJS Yapılandırması',
      'settings.emailjsPublicKey': 'Public Key',
      'settings.emailjsServiceId': 'Service ID',
      'settings.emailjsTemplateId': 'Template ID',
      'settings.emailjsHint': 'emailjs.com hesabınızdan alınan bilgileri girin. Şifre sıfırlama e-postaları bu servis üzerinden gönderilecektir.',
    },
    ru: {
      // Auth
      'auth.subtitle': 'Введите пароль для продолжения',
      'auth.placeholder': 'Пароль',
      'auth.error': 'Неверный пароль',
      'auth.login': 'Войти',
      'auth.forgot': 'Забыли пароль?',
      'auth.forgotConfirm': 'Новый пароль будет отправлен на ваш e-mail. Продолжить?',
      'auth.forgotDone': 'Новый пароль отправлен на ваш e-mail.',
      'auth.forgotNoEmail': 'Сначала укажите e-mail в разделе Настройки.',
      'auth.forgotFailed': 'Не удалось отправить e-mail. Попробуйте ещё раз.',
      'auth.forgotNotConfigured': 'EmailJS не настроен. Настройте в разделе Настройки.',
      // Header
      'header.viewSite': 'Открыть сайт',
      'header.export': 'Экспорт',
      'header.import': 'Импорт',
      'header.clearAll': 'Сбросить всё',
      'header.changePass': 'Сменить пароль',
      'header.logout': 'Выход',
      'header.logoutConfirm': 'Вы уверены, что хотите выйти?',
      // Change password
      'pass.title': 'Сменить пароль',
      'pass.current': 'Текущий пароль',
      'pass.new': 'Новый пароль',
      'pass.confirm': 'Новый пароль (повтор)',
      'pass.save': 'Сохранить',
      'pass.cancel': 'Отмена',
      'pass.wrongCurrent': 'Неверный текущий пароль',
      'pass.mismatch': 'Новые пароли не совпадают',
      'pass.tooShort': 'Пароль должен быть не менее 6 символов',
      'pass.success': 'Пароль успешно изменён',
      // Sidebar
      'nav.hero': 'Главная',
      'nav.about': 'О компании',
      'nav.services': 'Услуги',
      'nav.equipment': 'Оборудование',
      'nav.gallery': 'Галерея',
      'nav.clients': 'Проекты',
      'nav.contact': 'Контакты',
      // Shared
      'shared.langNote': 'Этот раздел общий для всех языков',
      'btn.save': 'Сохранить',
      'btn.reset': 'Сбросить',
      'btn.delete': 'Удалить',
      'btn.upload': 'Загрузить',
      'unsaved': 'Есть несохранённые изменения. Продолжить?',
      'saved': 'Сохранено',
      'resetConfirm': 'Вы уверены, что хотите сбросить раздел к значениям по умолчанию?',
      'resetDone': 'Сброшено',
      'fileTooLarge': 'Файл слишком большой (макс. 2МБ)',
      'imageUploaded': 'Изображение загружено',
      'exportDone': 'JSON экспортирован',
      'importDone': 'Контент импортирован',
      'importError': 'Некорректный JSON файл',
      'clearConfirm': 'Вы уверены, что хотите удалить все изменения? Это действие необратимо.',
      'clearDone': 'Все изменения удалены',
      // Hero
      'hero.title': 'Главный экран',
      'hero.heading': 'Заголовок',
      'hero.subtitle': 'Подзаголовок',
      'hero.cta': 'Текст кнопки',
      // About
      'about.title': 'О компании',
      'about.heading': 'Заголовок',
      'about.p1': 'Абзац 1',
      'about.p2': 'Абзац 2',
      'about.p3': 'Абзац 3',
      'about.missionTitle': 'Заголовок миссии',
      'about.mission': 'Текст миссии',
      'about.visionTitle': 'Заголовок видения',
      'about.vision': 'Текст видения',
      // Services
      'services.title': 'Услуги',
      'services.sectionTitle': 'Заголовок раздела',
      'services.item': 'Услуга',
      'services.name': 'Название',
      'services.desc': 'Описание',
      'services.img': 'Изображение',
      'services.add': '+ Добавить услугу',
      'services.added': 'Новая услуга добавлена',
      'services.deleteConfirm': 'Вы уверены, что хотите удалить эту услугу?',
      'services.deleted': 'Услуга удалена',
      // Equipment
      'equipment.title': 'Оборудование',
      'equipment.sectionTitle': 'Заголовок раздела',
      'equipment.item': 'Оборудование',
      'equipment.name': 'Название',
      'equipment.desc': 'Описание',
      'equipment.img': 'Изображение',
      'equipment.add': '+ Добавить оборудование',
      'equipment.added': 'Новое оборудование добавлено',
      'equipment.deleteConfirm': 'Вы уверены, что хотите удалить это оборудование?',
      'equipment.deleted': 'Оборудование удалено',
      // Gallery
      'gallery.title': 'Изображения галереи',
      'gallery.note': 'Пути к изображениям относительно домена svai-alua.kz',
      'gallery.add': '+ Добавить изображение',
      'gallery.added': 'Новое поле добавлено',
      'gallery.deleted': 'Изображение удалено',
      'gallery.saved': 'Галерея сохранена',
      'gallery.resetConfirm': 'Вы уверены, что хотите сбросить галерею?',
      'gallery.resetDone': 'Галерея сброшена',
      // Clients
      'clients.title': 'Список проектов',
      'clients.search': 'Поиск проекта...',
      'clients.add': '+ Добавить проект',
      'clients.added': 'Новый проект добавлен',
      'clients.saved': 'Проекты сохранены',
      'clients.resetConfirm': 'Вы уверены, что хотите сбросить проекты?',
      'clients.resetDone': 'Проекты сброшены',
      // Contact
      'contact.infoTitle': 'Контактная информация',
      'contact.sectionTitle': 'Заголовок раздела',
      'contact.address': 'Адрес',
      'contact.phone1': 'Телефон 1',
      'contact.phone2': 'Телефон 2',
      'contact.email': 'Email',
      'contact.hours': 'Режим работы',
      'contact.chatbotTitle': 'Тексты чат-бота',
      'contact.chatbotHeading': 'Заголовок чат-бота',
      'contact.chatbotQuestion': 'Вопрос чат-бота',
      'contact.choicePiles': 'Кнопка «Сваи»',
      'contact.choicePuncture': 'Кнопка «Проколы»',
      'contact.choiceQuote': 'Кнопка «КП»',
      'contact.choiceOther': 'Кнопка «Другое»',
      'contact.resultPiles': 'Результат «Сваи»',
      'contact.resultPuncture': 'Результат «Проколы»',
      'contact.resultQuote': 'Результат «КП»',
      'contact.resultOther': 'Результат «Другое»',
      'contact.whatsappBtn': 'Кнопка WhatsApp',
      // Settings
      'nav.settings': 'Настройки',
      'settings.title': 'Настройки',
      'settings.emailLabel': 'E-mail администратора',
      'settings.emailHint': 'На этот адрес будет отправлен новый пароль при сбросе.',
      'settings.save': 'Сохранить',
      'settings.saved': 'Настройки сохранены',
      'settings.emailjsTitle': 'Настройка EmailJS',
      'settings.emailjsPublicKey': 'Public Key',
      'settings.emailjsServiceId': 'Service ID',
      'settings.emailjsTemplateId': 'Template ID',
      'settings.emailjsHint': 'Введите данные из вашего аккаунта emailjs.com. Через этот сервис будут отправляться e-mail для сброса пароля.',
    },
  };

  let adminLang = localStorage.getItem(ADMIN_LANG_KEY) || 'ru';

  function t(key) {
    return ADMIN_UI[adminLang]?.[key] || ADMIN_UI.tr[key] || key;
  }

  function applyAdminLang() {
    // Update static HTML elements
    document.querySelectorAll('[data-admin-i18n]').forEach(el => {
      el.textContent = t(el.dataset.adminI18n);
    });
    document.querySelectorAll('[data-admin-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.adminI18nPlaceholder);
    });
    // Update lang buttons
    document.querySelectorAll('.admin-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.adminLang === adminLang);
    });
  }

  // Init admin lang buttons
  (function initAdminLangButtons() {
    document.querySelectorAll('.admin-lang-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        adminLang = btn.dataset.adminLang;
        localStorage.setItem(ADMIN_LANG_KEY, adminLang);
        applyAdminLang();
        renderSidebar();
        renderEditor();
      });
    });
    applyAdminLang();
  })();

  const IMG_BASE = 'https://svai-alua.kz';
  const LANGS = ['kk', 'ru', 'en', 'zh', 'tr'];
  const LANG_LABELS = { kk: 'KZ', ru: 'RU', en: 'EN', zh: 'ZH', tr: 'TR' };
  const SECTIONS = [
    { id: 'hero', key: 'nav.hero' },
    { id: 'about', key: 'nav.about' },
    { id: 'services', key: 'nav.services' },
    { id: 'equipment', key: 'nav.equipment' },
    { id: 'gallery', key: 'nav.gallery' },
    { id: 'clients', key: 'nav.clients' },
    { id: 'contact', key: 'nav.contact' },
    { id: 'settings', key: 'nav.settings' },
  ];

  let currentLang = 'ru';
  let currentSection = 'hero';
  let localeCache = {};
  let dirty = false;

  // --- Auth (SHA-256 hashed password + brute-force protection) ---
  const DEFAULT_PASS_HASH = '963a708fb5c3cbc8656e380ea1060f1476ec56801c8fef94c727e4c769148f9e'; // alua2025
  const PASS_HASH_KEY = 'svai_alua_admin_pass_hash';
  function getPassHash() { return localStorage.getItem(PASS_HASH_KEY) || DEFAULT_PASS_HASH; }
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_KEY = 'admin_lockout';
  const authOverlay = document.getElementById('auth-overlay');
  const authForm = document.getElementById('auth-form');
  const authInput = document.getElementById('auth-password');
  const authError = document.getElementById('auth-error');

  async function hashPassword(pass) {
    const data = new TextEncoder().encode(pass);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function getLockoutState() {
    try {
      const raw = localStorage.getItem(LOCKOUT_KEY);
      if (!raw) return { attempts: 0, lockedUntil: 0 };
      return JSON.parse(raw);
    } catch { return { attempts: 0, lockedUntil: 0 }; }
  }

  function setLockoutState(state) {
    localStorage.setItem(LOCKOUT_KEY, JSON.stringify(state));
  }

  function checkAuth() {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      authOverlay.style.display = 'none';
      return true;
    }
    return false;
  }

  if (authForm) {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const lockout = getLockoutState();

      // Check if locked out
      if (lockout.lockedUntil > Date.now()) {
        const remaining = Math.ceil((lockout.lockedUntil - Date.now()) / 1000);
        authError.textContent = adminLang === 'ru'
          ? `Слишком много попыток. Подождите ${remaining} сек.`
          : `Çok fazla deneme. ${remaining} sn bekleyin.`;
        authError.style.display = 'block';
        authInput.value = '';
        return;
      }

      const hash = await hashPassword(authInput.value);
      if (hash === getPassHash()) {
        sessionStorage.setItem('admin_auth', 'true');
        setLockoutState({ attempts: 0, lockedUntil: 0 });
        authOverlay.style.display = 'none';
        init();
      } else {
        const attempts = lockout.attempts + 1;
        if (attempts >= MAX_ATTEMPTS) {
          // Lock for 30 seconds * (number of lockouts)
          const lockSeconds = 30 * Math.min(attempts - MAX_ATTEMPTS + 1, 10);
          setLockoutState({ attempts, lockedUntil: Date.now() + lockSeconds * 1000 });
          authError.textContent = adminLang === 'ru'
            ? `Слишком много попыток. Подождите ${lockSeconds} сек.`
            : `Çok fazla deneme. ${lockSeconds} sn bekleyin.`;
        } else {
          setLockoutState({ attempts, lockedUntil: 0 });
          authError.textContent = t('auth.error');
        }
        authError.style.display = 'block';
        authInput.value = '';
      }
    });
  }

  // --- Toast ---
  function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = `toast visible ${type}`;
    setTimeout(() => { toast.className = 'toast'; }, 2500);
  }

  // --- Locale loading ---
  async function loadLocale(lang) {
    if (localeCache[lang]) return localeCache[lang];
    try {
      const res = await fetch(`locales/${lang}.json`);
      const data = await res.json();
      localeCache[lang] = data;
      return data;
    } catch {
      return {};
    }
  }

  async function getMergedContent(lang) {
    const defaults = await loadLocale(lang);
    return window.contentManager.getContent(lang, defaults);
  }

  // --- Sidebar ---
  function renderSidebar() {
    const nav = document.getElementById('admin-nav');
    nav.innerHTML = SECTIONS.map(s =>
      `<li data-section="${s.id}" class="${s.id === currentSection ? 'active' : ''}">${t(s.key)}</li>`
    ).join('');
    nav.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        if (dirty && !confirm(t('unsaved'))) return;
        currentSection = li.dataset.section;
        dirty = false;
        renderSidebar();
        renderEditor();
      });
    });
  }

  // --- Lang tabs ---
  function renderLangTabs() {
    const container = document.getElementById('lang-tabs');
    const isShared = currentSection === 'gallery' || currentSection === 'clients' || currentSection === 'settings';
    if (isShared) {
      container.innerHTML = `<span style="color:var(--color-text-muted);font-size:0.85rem;">${t('shared.langNote')}</span>`;
      return;
    }
    container.innerHTML = LANGS.map(l =>
      `<button class="lang-tab ${l === currentLang ? 'active' : ''}" data-lang="${l}">${LANG_LABELS[l]}</button>`
    ).join('');
    container.querySelectorAll('.lang-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        if (dirty && !confirm(t('unsaved'))) return;
        currentLang = btn.dataset.lang;
        dirty = false;
        renderLangTabs();
        renderEditor();
      });
    });
  }

  // --- Editor renderers ---
  async function renderEditor() {
    const container = document.getElementById('admin-editor');
    renderLangTabs();
    switch (currentSection) {
      case 'hero': await renderHeroEditor(container); break;
      case 'about': await renderAboutEditor(container); break;
      case 'services': await renderServicesEditor(container); break;
      case 'equipment': await renderEquipmentEditor(container); break;
      case 'gallery': renderGalleryEditor(container); break;
      case 'clients': renderClientsEditor(container); break;
      case 'contact': await renderContactEditor(container); break;
      case 'settings': renderSettingsEditor(container); break;
    }
  }

  function markDirty() { dirty = true; }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function inputField(label, value, id, type = 'input') {
    const escaped = escapeHTML(value || '');
    if (type === 'textarea') {
      return `<div class="form-group"><label>${escapeHTML(label)}</label><textarea class="form-textarea" id="${id}" oninput="window._adminMarkDirty()">${escaped}</textarea></div>`;
    }
    return `<div class="form-group"><label>${escapeHTML(label)}</label><input class="form-input" id="${id}" value="${escaped}" oninput="window._adminMarkDirty()"></div>`;
  }

  window._adminMarkDirty = markDirty;

  // --- Image upload (base64) ---
  let _uploadCounter = 0;
  function imageField(label, value, id) {
    const escaped = (value || '').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const uid = `upload-${_uploadCounter++}`;
    const isBase64 = value && value.startsWith('data:');
    const previewSrc = isBase64 ? value : (value ? IMG_BASE + value : '');
    return `<div class="form-group"><label>${label}</label>
      <div class="img-preview-row">
        <input class="form-input" id="${id}" value="${escaped}" oninput="window._adminMarkDirty()">
        <label class="admin-btn admin-btn-secondary admin-btn-sm" for="${uid}" style="cursor:pointer;flex-shrink:0;">${t('btn.upload')}</label>
        <input type="file" accept="image/*" id="${uid}" class="hidden-input" onchange="window._adminUploadImage(this,'${id}')">
      </div>
      ${previewSrc ? `<img class="img-preview" src="${previewSrc}" style="margin-top:6px" onerror="this.style.display='none'">` : ''}
    </div>`;
  }

  window._adminUploadImage = function (fileInput, targetId) {
    const file = fileInput.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast(t('fileTooLarge'), 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const input = document.getElementById(targetId);
      if (input) {
        input.value = e.target.result;
        markDirty();
        const preview = input.closest('.form-group')?.querySelector('.img-preview');
        if (preview) {
          preview.src = e.target.result;
          preview.style.display = '';
        } else {
          const img = document.createElement('img');
          img.className = 'img-preview';
          img.style.marginTop = '6px';
          img.src = e.target.result;
          input.closest('.form-group')?.appendChild(img);
        }
        showToast(t('imageUploaded'));
      }
    };
    reader.readAsDataURL(file);
    fileInput.value = '';
  };

  // Hero
  async function renderHeroEditor(container) {
    const data = await getMergedContent(currentLang);
    const hero = data.hero || {};
    container.innerHTML = `
      <div class="editor-card">
        <h3>${t('hero.title')}</h3>
        ${inputField(t('hero.heading'), hero.title, 'hero-title')}
        ${inputField(t('hero.subtitle'), hero.subtitle, 'hero-subtitle')}
        ${inputField(t('hero.cta'), hero.cta, 'hero-cta')}
        <div class="actions-bar">
          <button class="admin-btn admin-btn-primary" onclick="window._adminSave('hero')">${t('btn.save')}</button>
          <button class="admin-btn admin-btn-secondary" onclick="window._adminReset('hero')">${t('btn.reset')}</button>
        </div>
      </div>`;
  }

  // About
  async function renderAboutEditor(container) {
    const data = await getMergedContent(currentLang);
    const about = data.about || {};
    container.innerHTML = `
      <div class="editor-card">
        <h3>${t('about.title')}</h3>
        ${inputField(t('about.heading'), about.title, 'about-title')}
        ${inputField(t('about.p1'), about.p1, 'about-p1', 'textarea')}
        ${inputField(t('about.p2'), about.p2, 'about-p2', 'textarea')}
        ${inputField(t('about.p3'), about.p3, 'about-p3', 'textarea')}
        ${inputField(t('about.missionTitle'), about.missionTitle, 'about-missionTitle')}
        ${inputField(t('about.mission'), about.mission, 'about-mission', 'textarea')}
        ${inputField(t('about.visionTitle'), about.visionTitle, 'about-visionTitle')}
        ${inputField(t('about.vision'), about.vision, 'about-vision', 'textarea')}
        <div class="actions-bar">
          <button class="admin-btn admin-btn-primary" onclick="window._adminSave('about')">${t('btn.save')}</button>
          <button class="admin-btn admin-btn-secondary" onclick="window._adminReset('about')">${t('btn.reset')}</button>
        </div>
      </div>`;
  }

  // Services
  async function renderServicesEditor(container) {
    const data = await getMergedContent(currentLang);
    const services = data.services || {};
    const items = services.items || [];
    let html = `<div class="editor-card"><h3>${t('services.title')}</h3>`;
    html += inputField(t('services.sectionTitle'), services.title, 'services-title');
    items.forEach((item, i) => {
      html += `<div class="dynamic-item">
        <div class="dynamic-item-header">
          <span>${t('services.item')} #${i + 1}</span>
          <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="window._adminRemoveService(${i})">${t('btn.delete')}</button>
        </div>
        ${inputField(t('services.name'), item.text, `service-text-${i}`)}
        ${inputField(t('services.desc'), item.desc, `service-desc-${i}`, 'textarea')}
        ${imageField(t('services.img'), item.img, `service-img-${i}`)}
      </div>`;
    });
    html += `<button class="admin-btn admin-btn-secondary" onclick="window._adminAddService()">${t('services.add')}</button>`;
    html += `<div class="actions-bar">
      <button class="admin-btn admin-btn-primary" onclick="window._adminSave('services')">${t('btn.save')}</button>
      <button class="admin-btn admin-btn-secondary" onclick="window._adminReset('services')">${t('btn.reset')}</button>
    </div></div>`;
    container.innerHTML = html;
  }

  window._adminAddService = async function () {
    const data = await getMergedContent(currentLang);
    const items = data.services?.items || [];
    items.push({ text: '', desc: '', img: '' });
    window.contentManager.setContent(currentLang, 'services', { ...data.services, items });
    renderEditor();
    showToast(t('services.added'));
  };

  window._adminRemoveService = async function (idx) {
    if (!confirm(t('services.deleteConfirm'))) return;
    const data = await getMergedContent(currentLang);
    const items = data.services?.items || [];
    items.splice(idx, 1);
    window.contentManager.setContent(currentLang, 'services', { ...data.services, items });
    renderEditor();
    showToast(t('services.deleted'));
  };

  // Equipment
  async function renderEquipmentEditor(container) {
    const data = await getMergedContent(currentLang);
    const equipment = data.equipment || {};
    const items = equipment.items || [];
    let html = `<div class="editor-card"><h3>${t('equipment.title')}</h3>`;
    html += inputField(t('equipment.sectionTitle'), equipment.title, 'equipment-title');
    items.forEach((item, i) => {
      html += `<div class="dynamic-item">
        <div class="dynamic-item-header">
          <span>${t('equipment.item')} #${i + 1}</span>
          <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="window._adminRemoveEquipment(${i})">${t('btn.delete')}</button>
        </div>
        ${inputField(t('equipment.name'), item.name, `equip-name-${i}`)}
        ${inputField(t('equipment.desc'), item.desc, `equip-desc-${i}`)}
        ${imageField(t('equipment.img'), item.img, `equip-img-${i}`)}
      </div>`;
    });
    html += `<button class="admin-btn admin-btn-secondary" onclick="window._adminAddEquipment()">${t('equipment.add')}</button>`;
    html += `<div class="actions-bar">
      <button class="admin-btn admin-btn-primary" onclick="window._adminSave('equipment')">${t('btn.save')}</button>
      <button class="admin-btn admin-btn-secondary" onclick="window._adminReset('equipment')">${t('btn.reset')}</button>
    </div></div>`;
    container.innerHTML = html;
  }

  window._adminAddEquipment = async function () {
    const data = await getMergedContent(currentLang);
    const items = data.equipment?.items || [];
    items.push({ name: '', desc: '', img: '' });
    window.contentManager.setContent(currentLang, 'equipment', { ...data.equipment, items });
    renderEditor();
    showToast(t('equipment.added'));
  };

  window._adminRemoveEquipment = async function (idx) {
    if (!confirm(t('equipment.deleteConfirm'))) return;
    const data = await getMergedContent(currentLang);
    const items = data.equipment?.items || [];
    items.splice(idx, 1);
    window.contentManager.setContent(currentLang, 'equipment', { ...data.equipment, items });
    renderEditor();
    showToast(t('equipment.deleted'));
  };

  // Gallery (shared)
  function renderGalleryEditor(container) {
    const galleryData = window.contentManager.getShared('gallery');
    const images = galleryData?.images || window.contentManager.DEFAULT_GALLERY_IMAGES;
    let html = `<div class="editor-card"><h3>${t('gallery.title')}</h3>
      <p style="color:var(--color-text-muted);font-size:0.85rem;margin-bottom:16px;">${t('gallery.note')}</p>
      <div class="gallery-editor-grid">`;
    images.forEach((src, i) => {
      const isB64 = src && src.startsWith('data:');
      const previewSrc = isB64 ? src : (src ? IMG_BASE + src : '');
      const gUploadId = `gallery-upload-${i}`;
      html += `<div class="gallery-editor-item">
        <img src="${previewSrc || 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22100%22><rect fill=%22%231a2035%22 width=%22200%22 height=%22100%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%2390a4ae%22 text-anchor=%22middle%22 dy=%22.3em%22>No Image</text></svg>'}" alt="" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22100%22><rect fill=%22%231a2035%22 width=%22200%22 height=%22100%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%2390a4ae%22 text-anchor=%22middle%22 dy=%22.3em%22>No Image</text></svg>'">
        <input class="form-input" value="${src.replace(/"/g, '&quot;')}" data-gallery-idx="${i}" id="gallery-input-${i}" oninput="window._adminMarkDirty()">
        <div style="display:flex;gap:4px;margin-top:4px;">
          <label class="admin-btn admin-btn-secondary admin-btn-sm" for="${gUploadId}" style="cursor:pointer;flex:1;justify-content:center;">${t('btn.upload')}</label>
          <input type="file" accept="image/*" id="${gUploadId}" class="hidden-input" onchange="window._adminUploadImage(this,'gallery-input-${i}')">
          <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="window._adminRemoveGallery(${i})">×</button>
        </div>
      </div>`;
    });
    html += `</div>
      <button class="admin-btn admin-btn-secondary" style="margin-top:12px" onclick="window._adminAddGallery()">${t('gallery.add')}</button>
      <div class="actions-bar">
        <button class="admin-btn admin-btn-primary" onclick="window._adminSaveGallery()">${t('btn.save')}</button>
        <button class="admin-btn admin-btn-secondary" onclick="window._adminResetGallery()">${t('btn.reset')}</button>
      </div>
    </div>`;
    container.innerHTML = html;
  }

  window._adminAddGallery = function () {
    const galleryData = window.contentManager.getShared('gallery');
    const images = [...(galleryData?.images || window.contentManager.DEFAULT_GALLERY_IMAGES)];
    images.push('');
    window.contentManager.setShared('gallery', { images });
    renderGalleryEditor(document.getElementById('admin-editor'));
    showToast(t('gallery.added'));
  };

  window._adminRemoveGallery = function (idx) {
    const galleryData = window.contentManager.getShared('gallery');
    const images = [...(galleryData?.images || window.contentManager.DEFAULT_GALLERY_IMAGES)];
    images.splice(idx, 1);
    window.contentManager.setShared('gallery', { images });
    renderGalleryEditor(document.getElementById('admin-editor'));
    showToast(t('gallery.deleted'));
  };

  window._adminSaveGallery = function () {
    const inputs = document.querySelectorAll('[data-gallery-idx]');
    const images = Array.from(inputs).map(inp => inp.value.trim()).filter(Boolean);
    window.contentManager.setShared('gallery', { images });
    dirty = false;
    showToast(t('gallery.saved'));
  };

  window._adminResetGallery = function () {
    if (!confirm(t('gallery.resetConfirm'))) return;
    window.contentManager.setShared('gallery', { images: window.contentManager.DEFAULT_GALLERY_IMAGES });
    dirty = false;
    renderGalleryEditor(document.getElementById('admin-editor'));
    showToast(t('gallery.resetDone'));
  };

  // Clients/Projects (shared)
  function renderClientsEditor(container) {
    const projects = window.contentManager.getShared('projects') || window.contentManager.DEFAULT_PROJECTS;
    let html = `<div class="editor-card"><h3>${t('clients.title')} (${projects.length})</h3>
      <input class="search-input" placeholder="${t('clients.search')}" oninput="window._adminFilterProjects(this.value)">
      <div class="projects-editor" id="projects-editor">`;
    projects.forEach((p, i) => {
      html += `<div class="project-item" data-project-idx="${i}">
        <input class="form-input" value="${p.replace(/"/g, '&quot;')}" data-project-input="${i}" oninput="window._adminMarkDirty()">
        <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="window._adminRemoveProject(${i})">×</button>
      </div>`;
    });
    html += `</div>
      <button class="admin-btn admin-btn-secondary" style="margin-top:12px" onclick="window._adminAddProject()">${t('clients.add')}</button>
      <div class="actions-bar">
        <button class="admin-btn admin-btn-primary" onclick="window._adminSaveProjects()">${t('btn.save')}</button>
        <button class="admin-btn admin-btn-secondary" onclick="window._adminResetProjects()">${t('btn.reset')}</button>
      </div>
    </div>`;
    container.innerHTML = html;
  }

  window._adminFilterProjects = function (query) {
    const items = document.querySelectorAll('.project-item');
    const q = query.toLowerCase();
    items.forEach(item => {
      const input = item.querySelector('input');
      item.style.display = input.value.toLowerCase().includes(q) ? '' : 'none';
    });
  };

  window._adminAddProject = function () {
    const projects = [...(window.contentManager.getShared('projects') || window.contentManager.DEFAULT_PROJECTS)];
    projects.push('');
    window.contentManager.setShared('projects', projects);
    renderClientsEditor(document.getElementById('admin-editor'));
    showToast(t('clients.added'));
  };

  window._adminRemoveProject = function (idx) {
    const projects = [...(window.contentManager.getShared('projects') || window.contentManager.DEFAULT_PROJECTS)];
    projects.splice(idx, 1);
    window.contentManager.setShared('projects', projects);
    renderClientsEditor(document.getElementById('admin-editor'));
  };

  window._adminSaveProjects = function () {
    const inputs = document.querySelectorAll('[data-project-input]');
    const projects = Array.from(inputs).map(inp => inp.value.trim()).filter(Boolean);
    window.contentManager.setShared('projects', projects);
    dirty = false;
    showToast(t('clients.saved'));
  };

  window._adminResetProjects = function () {
    if (!confirm(t('clients.resetConfirm'))) return;
    window.contentManager.setShared('projects', window.contentManager.DEFAULT_PROJECTS);
    dirty = false;
    renderClientsEditor(document.getElementById('admin-editor'));
    showToast(t('clients.resetDone'));
  };

  // Contact
  async function renderContactEditor(container) {
    const data = await getMergedContent(currentLang);
    const contact = data.contact || {};
    const info = data.contactInfo || {};
    let html = `<div class="editor-card"><h3>${t('contact.infoTitle')}</h3>
      ${inputField(t('contact.sectionTitle'), contact.title, 'contact-title')}
      ${inputField(t('contact.address'), info.addressValue, 'contact-address')}
      ${inputField(t('contact.phone1'), info.phones?.[0] || '', 'contact-phone1')}
      ${inputField(t('contact.phone2'), info.phones?.[1] || '', 'contact-phone2')}
      ${inputField(t('contact.email'), info.emailValue, 'contact-email-val')}
      ${inputField(t('contact.hours'), info.hoursValue, 'contact-hours-val')}
    </div>
    <div class="editor-card"><h3>${t('contact.chatbotTitle')}</h3>
      ${inputField(t('contact.chatbotHeading'), contact.chatbotTitle, 'contact-chatbotTitle')}
      ${inputField(t('contact.chatbotQuestion'), contact.chatbotQ1, 'contact-chatbotQ1')}
      ${inputField(t('contact.choicePiles'), contact.choicePiles, 'contact-choicePiles')}
      ${inputField(t('contact.choicePuncture'), contact.choicePuncture, 'contact-choicePuncture')}
      ${inputField(t('contact.choiceQuote'), contact.choiceQuote, 'contact-choiceQuote')}
      ${inputField(t('contact.choiceOther'), contact.choiceOther, 'contact-choiceOther')}
      ${inputField(t('contact.resultPiles'), contact.resultPiles, 'contact-resultPiles', 'textarea')}
      ${inputField(t('contact.resultPuncture'), contact.resultPuncture, 'contact-resultPuncture', 'textarea')}
      ${inputField(t('contact.resultQuote'), contact.resultQuote, 'contact-resultQuote', 'textarea')}
      ${inputField(t('contact.resultOther'), contact.resultOther, 'contact-resultOther', 'textarea')}
      ${inputField(t('contact.whatsappBtn'), contact.whatsappBtn, 'contact-whatsappBtn')}
      <div class="actions-bar">
        <button class="admin-btn admin-btn-primary" onclick="window._adminSave('contact')">${t('btn.save')}</button>
        <button class="admin-btn admin-btn-secondary" onclick="window._adminReset('contact')">${t('btn.reset')}</button>
      </div>
    </div>`;
    container.innerHTML = html;
  }

  // --- Save / Reset ---
  window._adminSave = async function (section) {
    const val = (id) => document.getElementById(id)?.value || '';
    const tval = (id) => { const el = document.getElementById(id); return el ? el.value : ''; };

    if (section === 'hero') {
      window.contentManager.setContent(currentLang, 'hero', {
        title: val('hero-title'),
        subtitle: val('hero-subtitle'),
        cta: val('hero-cta'),
      });
    } else if (section === 'about') {
      window.contentManager.setContent(currentLang, 'about', {
        title: val('about-title'),
        p1: tval('about-p1'),
        p2: tval('about-p2'),
        p3: tval('about-p3'),
        missionTitle: val('about-missionTitle'),
        mission: tval('about-mission'),
        visionTitle: val('about-visionTitle'),
        vision: tval('about-vision'),
      });
    } else if (section === 'services') {
      const items = [];
      let i = 0;
      while (document.getElementById(`service-text-${i}`)) {
        items.push({
          text: val(`service-text-${i}`),
          desc: tval(`service-desc-${i}`),
          img: val(`service-img-${i}`),
        });
        i++;
      }
      window.contentManager.setContent(currentLang, 'services', {
        title: val('services-title'),
        items,
      });
    } else if (section === 'equipment') {
      const items = [];
      let i = 0;
      while (document.getElementById(`equip-name-${i}`)) {
        items.push({
          name: val(`equip-name-${i}`),
          desc: val(`equip-desc-${i}`),
          img: val(`equip-img-${i}`),
        });
        i++;
      }
      window.contentManager.setContent(currentLang, 'equipment', {
        title: val('equipment-title'),
        items,
      });
    } else if (section === 'contact') {
      window.contentManager.setContent(currentLang, 'contact', {
        title: val('contact-title'),
        chatbotTitle: val('contact-chatbotTitle'),
        chatbotQ1: val('contact-chatbotQ1'),
        choicePiles: val('contact-choicePiles'),
        choicePuncture: val('contact-choicePuncture'),
        choiceQuote: val('contact-choiceQuote'),
        choiceOther: val('contact-choiceOther'),
        resultPiles: tval('contact-resultPiles'),
        resultPuncture: tval('contact-resultPuncture'),
        resultQuote: tval('contact-resultQuote'),
        resultOther: tval('contact-resultOther'),
        whatsappBtn: val('contact-whatsappBtn'),
      });
      window.contentManager.setContent(currentLang, 'contactInfo', {
        addressValue: val('contact-address'),
        phones: [val('contact-phone1'), val('contact-phone2')].filter(Boolean),
        emailValue: val('contact-email-val'),
        hoursValue: val('contact-hours-val'),
      });
    }
    dirty = false;
    showToast(t('saved'));
  };

  window._adminReset = function (section) {
    if (!confirm(t('resetConfirm'))) return;
    const stored = JSON.parse(localStorage.getItem('svai_alua_admin_content') || '{}');
    if (stored[currentLang]) {
      delete stored[currentLang][section];
      if (section === 'contact') delete stored[currentLang].contactInfo;
      localStorage.setItem('svai_alua_admin_content', JSON.stringify(stored));
    }
    localeCache = {};
    dirty = false;
    renderEditor();
    showToast(t('resetDone'));
  };

  // --- Export / Import ---
  document.getElementById('btn-export')?.addEventListener('click', () => {
    const json = window.contentManager.exportAll();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alua-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(t('exportDone'));
  });

  document.getElementById('btn-import')?.addEventListener('click', () => {
    document.getElementById('import-file')?.click();
  });

  document.getElementById('import-file')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        window.contentManager.importAll(ev.target.result);
        localeCache = {};
        renderEditor();
        showToast(t('importDone'));
      } catch {
        showToast(t('importError'), 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  document.getElementById('btn-clear')?.addEventListener('click', () => {
    if (!confirm(t('clearConfirm'))) return;
    window.contentManager.clearAll();
    localeCache = {};
    renderEditor();
    showToast(t('clearDone'));
  });

  // --- Logout ---
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    if (!confirm(t('header.logoutConfirm'))) return;
    sessionStorage.removeItem('admin_auth');
    dirty = false;
    window.location.reload();
  });

  // --- Change password ---
  const passModal = document.getElementById('pass-modal');
  const passForm = document.getElementById('pass-form');
  const passError = document.getElementById('pass-error');

  document.getElementById('btn-change-pass')?.addEventListener('click', () => {
    if (passModal) {
      passModal.style.display = 'flex';
      document.getElementById('pass-current').value = '';
      document.getElementById('pass-new').value = '';
      document.getElementById('pass-confirm').value = '';
      passError.style.display = 'none';
      document.getElementById('pass-current').focus();
    }
  });

  document.getElementById('pass-cancel')?.addEventListener('click', () => {
    if (passModal) passModal.style.display = 'none';
  });

  passModal?.addEventListener('click', (e) => {
    if (e.target === passModal) passModal.style.display = 'none';
  });

  passForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const curPass = document.getElementById('pass-current').value;
    const newPass = document.getElementById('pass-new').value;
    const confirmPass = document.getElementById('pass-confirm').value;

    const curHash = await hashPassword(curPass);
    if (curHash !== getPassHash()) {
      passError.textContent = t('pass.wrongCurrent');
      passError.style.display = 'block';
      return;
    }
    if (newPass.length < 6) {
      passError.textContent = t('pass.tooShort');
      passError.style.display = 'block';
      return;
    }
    if (newPass !== confirmPass) {
      passError.textContent = t('pass.mismatch');
      passError.style.display = 'block';
      return;
    }
    const newHash = await hashPassword(newPass);
    localStorage.setItem(PASS_HASH_KEY, newHash);
    passModal.style.display = 'none';
    showToast(t('pass.success'));
  });

  // --- EmailJS config keys ---
  const EMAILJS_PUBLIC_KEY_STORAGE = 'svai_alua_emailjs_public_key';
  const EMAILJS_SERVICE_ID_STORAGE = 'svai_alua_emailjs_service_id';
  const EMAILJS_TEMPLATE_ID_STORAGE = 'svai_alua_emailjs_template_id';
  const ADMIN_EMAIL_KEY = 'svai_alua_admin_email';

  function getEmailJSConfig() {
    return {
      publicKey: localStorage.getItem(EMAILJS_PUBLIC_KEY_STORAGE) || '',
      serviceId: localStorage.getItem(EMAILJS_SERVICE_ID_STORAGE) || '',
      templateId: localStorage.getItem(EMAILJS_TEMPLATE_ID_STORAGE) || '',
    };
  }

  function generateRandomPassword(length = 12) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    const arr = new Uint8Array(length);
    crypto.getRandomValues(arr);
    return Array.from(arr, b => chars[b % chars.length]).join('');
  }

  // --- Forgot password (email reset) ---
  document.getElementById('forgot-pass-link')?.addEventListener('click', async function () {
    const adminEmail = localStorage.getItem(ADMIN_EMAIL_KEY);
    if (!adminEmail) {
      alert(t('auth.forgotNoEmail'));
      return;
    }
    const cfg = getEmailJSConfig();
    if (!cfg.publicKey || !cfg.serviceId || !cfg.templateId) {
      alert(t('auth.forgotNotConfigured'));
      return;
    }
    if (!confirm(t('auth.forgotConfirm'))) return;

    const newPass = generateRandomPassword();
    const newHash = await hashPassword(newPass);

    try {
      await emailjs.send(cfg.serviceId, cfg.templateId, {
        to_email: adminEmail,
        new_password: newPass,
        company_name: 'ТОО АЛУА',
      }, cfg.publicKey);

      localStorage.setItem(PASS_HASH_KEY, newHash);
      showToast(t('auth.forgotDone'));
    } catch (err) {
      console.error('EmailJS error:', err);
      alert(t('auth.forgotFailed'));
    }
  });

  // --- Settings editor ---
  function renderSettingsEditor(container) {
    const adminEmail = localStorage.getItem(ADMIN_EMAIL_KEY) || '';
    const cfg = getEmailJSConfig();

    container.innerHTML = `
      <h2>${escapeHTML(t('settings.title'))}</h2>

      <div class="form-group">
        <label>${escapeHTML(t('settings.emailLabel'))}</label>
        <input class="form-input" type="email" id="settings-admin-email" value="${escapeHTML(adminEmail)}" placeholder="admin@example.com">
        <small style="color:var(--color-text-muted);display:block;margin-top:4px">${escapeHTML(t('settings.emailHint'))}</small>
      </div>

      <hr style="border:none;border-top:1px solid var(--color-border);margin:24px 0">

      <h3>${escapeHTML(t('settings.emailjsTitle'))}</h3>
      <small style="color:var(--color-text-muted);display:block;margin-bottom:12px">${escapeHTML(t('settings.emailjsHint'))}</small>

      <div class="form-group">
        <label>${escapeHTML(t('settings.emailjsPublicKey'))}</label>
        <input class="form-input" type="text" id="settings-emailjs-pk" value="${escapeHTML(cfg.publicKey)}" placeholder="xxxxxxxxxxxxxxx">
      </div>
      <div class="form-group">
        <label>${escapeHTML(t('settings.emailjsServiceId'))}</label>
        <input class="form-input" type="text" id="settings-emailjs-sid" value="${escapeHTML(cfg.serviceId)}" placeholder="service_xxxxxxx">
      </div>
      <div class="form-group">
        <label>${escapeHTML(t('settings.emailjsTemplateId'))}</label>
        <input class="form-input" type="text" id="settings-emailjs-tid" value="${escapeHTML(cfg.templateId)}" placeholder="template_xxxxxxx">
      </div>

      <div style="margin-top:16px">
        <button class="admin-btn admin-btn-primary" id="settings-save">${escapeHTML(t('settings.save'))}</button>
      </div>
    `;

    document.getElementById('settings-save').addEventListener('click', () => {
      const email = document.getElementById('settings-admin-email').value.trim();
      const pk = document.getElementById('settings-emailjs-pk').value.trim();
      const sid = document.getElementById('settings-emailjs-sid').value.trim();
      const tid = document.getElementById('settings-emailjs-tid').value.trim();

      if (email) localStorage.setItem(ADMIN_EMAIL_KEY, email);
      else localStorage.removeItem(ADMIN_EMAIL_KEY);

      if (pk) localStorage.setItem(EMAILJS_PUBLIC_KEY_STORAGE, pk);
      else localStorage.removeItem(EMAILJS_PUBLIC_KEY_STORAGE);

      if (sid) localStorage.setItem(EMAILJS_SERVICE_ID_STORAGE, sid);
      else localStorage.removeItem(EMAILJS_SERVICE_ID_STORAGE);

      if (tid) localStorage.setItem(EMAILJS_TEMPLATE_ID_STORAGE, tid);
      else localStorage.removeItem(EMAILJS_TEMPLATE_ID_STORAGE);

      showToast(t('settings.saved'));
    });
  }

  // --- Unsaved changes warning ---
  window.addEventListener('beforeunload', (e) => {
    if (dirty) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  // --- Init ---
  async function init() {
    renderSidebar();
    await renderEditor();
  }

  if (checkAuth()) {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
