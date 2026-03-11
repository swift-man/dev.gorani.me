(() => {
  const markExternalLinks = () => {
    const origin = window.location.origin;
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href.startsWith('#') || href.startsWith('/')) return;

      let url;
      try {
        url = new URL(href, origin);
      } catch {
        return;
      }

      if (url.origin !== origin) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
    });
  };

  document.addEventListener('astro:page-load', markExternalLinks);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markExternalLinks);
  } else {
    markExternalLinks();
  }
})();
