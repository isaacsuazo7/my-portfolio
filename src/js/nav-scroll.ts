function initNavScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const header = document.getElementById('nav-header');
  if (!header) return;

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
        // At top
        header.classList.remove('scroll-down', 'scroll-up');
      } else if (currentScroll > lastScrollTop) {
        // Scrolling down
        header.classList.add('scroll-down');
        header.classList.remove('scroll-up');
      } else {
        // Scrolling up
        header.classList.add('scroll-up');
        header.classList.remove('scroll-down');
      }

      lastScrollTop = currentScroll;
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

document.addEventListener('DOMContentLoaded', initNavScroll);
