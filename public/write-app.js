const API_BASE = window.__WRITE_API_BASE__;
const CATEGORIES = ['python', 'mongodb', 'nginx', 'react-native', 'redis', 'postgresql', 'astro'];

const q = (s) => document.querySelector(s);
const statusEl = q('#status');
const categoryEl = q('#category');
const titleEl = q('#title');
const descEl = q('#description');
const contentEl = q('#content');
const openCategoryEl = q('#openCategory');

const setStatus = (msg, isError = false) => {
  statusEl.textContent = msg;
  statusEl.style.color = isError ? '#fca5a5' : '#93c5fd';
};

const inferCategory = () => {
  const url = new URL(window.location.href);
  const fromQuery = url.searchParams.get('category');
  if (fromQuery && CATEGORIES.includes(fromQuery)) return fromQuery;
  const fromStorage = localStorage.getItem('currentCategory');
  if (fromStorage && CATEGORIES.includes(fromStorage)) return fromStorage;
  return 'astro';
};

const fillCategories = (selected) => {
  CATEGORIES.forEach((c) => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    if (c === selected) opt.selected = true;
    categoryEl.appendChild(opt);
  });
};

const updateCategoryLink = () => {
  openCategoryEl.href = `/${categoryEl.value}/`;
};

const api = async (path, init = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'content-type': 'application/json', ...(init.headers || {}) }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
};

const checkLogin = async () => {
  try {
    const me = await api('/api/me');
    setStatus(`로그인됨: ${me.login}`);
  } catch (_err) {
    setStatus('로그인이 필요합니다. 먼저 GitHub 로그인 버튼을 누르세요.');
  }
};

q('#login').addEventListener('click', () => {
  const redirect = `${window.location.origin}/write?category=${encodeURIComponent(categoryEl.value)}`;
  window.location.href = `${API_BASE}/auth/github/start?redirect=${encodeURIComponent(redirect)}`;
});

q('#logout').addEventListener('click', async () => {
  try {
    await api('/auth/logout', { method: 'POST' });
    setStatus('로그아웃 완료');
  } catch (err) {
    setStatus(err.message, true);
  }
});

q('#submit').addEventListener('click', async () => {
  const title = titleEl.value.trim();
  const description = descEl.value.trim();
  const body = contentEl.value;
  if (!title || !body) {
    setStatus('제목과 본문은 필수입니다.', true);
    return;
  }
  try {
    setStatus('저장 중...');
    const result = await api('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        category: categoryEl.value,
        title,
        description,
        body
      })
    });
    setStatus(`저장 완료: ${result.path}`);
    window.open(result.htmlUrl, '_blank', 'noopener,noreferrer');
  } catch (err) {
    setStatus(err.message, true);
  }
});

categoryEl.addEventListener('change', () => {
  localStorage.setItem('currentCategory', categoryEl.value);
  updateCategoryLink();
});

(() => {
  const current = inferCategory();
  fillCategories(current);
  localStorage.setItem('currentCategory', current);
  updateCategoryLink();
  checkLogin();
})();
