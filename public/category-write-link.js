(() => {
  const KNOWN = new Set(['python', 'mongodb', 'nginx', 'react-native', 'redis', 'postgresql', 'astro']);

  const extractCategory = () => {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return null;
    const first = parts[0];
    return KNOWN.has(first) ? first : null;
  };

  const mount = () => {
    const category = extractCategory();
    if (!category) return;
    localStorage.setItem('currentCategory', category);

    if (document.querySelector('.write-in-category-link')) return;
    const anchor = document.createElement('a');
    anchor.className = 'write-in-category-link';
    anchor.href = `/write?category=${encodeURIComponent(category)}`;
    anchor.textContent = '이 카테고리에 글쓰기';

    const target = document.querySelector('.sl-markdown-content h1') || document.querySelector('main h1');
    if (target) {
      target.insertAdjacentElement('afterend', anchor);
    }
  };

  document.addEventListener('astro:page-load', mount);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
