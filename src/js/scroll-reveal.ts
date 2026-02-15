function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const srElements = document.querySelectorAll<HTMLElement>('[data-sr]');

  if (prefersReducedMotion) {
    srElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Set initial hidden state
  srElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 500ms var(--easing), transform 500ms var(--easing)';

    const delay = el.dataset.srDelay;
    if (delay) {
      el.style.transitionDelay = `${200 + Number(delay)}ms`;
    } else {
      el.style.transitionDelay = '200ms';
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.25 }
  );

  srElements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollReveal);
