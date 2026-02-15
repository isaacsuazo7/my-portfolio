let cleanup: (() => void) | null = null;

function initNavScroll() {
  cleanup?.();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const header = document.getElementById('nav-header');
  if (!header) return;

  const h = header;
  const DELTA = 5;
  let lastScrollTop = 0;
  let ticking = false;

  function onScroll() {
    if (ticking) return;

    ticking = true;
    requestAnimationFrame(() => {
      const currentScroll = window.scrollY;

      if (Math.abs(currentScroll - lastScrollTop) < DELTA) {
        ticking = false;
        return;
      }

      if (currentScroll < 50) {
        h.classList.remove('scroll-down', 'scroll-up');
      } else if (currentScroll > lastScrollTop) {
        h.classList.add('scroll-down');
        h.classList.remove('scroll-up');
      } else {
        h.classList.add('scroll-up');
        h.classList.remove('scroll-down');
      }

      lastScrollTop = currentScroll;
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  cleanup = () => window.removeEventListener('scroll', onScroll);
}

document.addEventListener('astro:page-load', initNavScroll);
