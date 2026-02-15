let cleanup: (() => void) | null = null;

function initMenu() {
  cleanup?.();

  const hamburger = document.querySelector('.hamburger') as HTMLButtonElement;
  const menu = document.getElementById('mobile-menu') as HTMLElement;

  if (!hamburger || !menu) return;

  const FOCUSABLE_SELECTOR = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
  let isOpen = false;

  function openMenu() {
    isOpen = true;
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('blur');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('blur');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
      hamburger.focus();
    }
  }

  function onMousedown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (isOpen && !menu.contains(target) && !hamburger.contains(target)) {
      closeMenu();
    }
  }

  function onResize() {
    if (window.innerWidth > 768 && isOpen) {
      closeMenu();
    }
  }

  function onFocusTrap(e: KeyboardEvent) {
    if (e.key !== 'Tab' || !isOpen) return;

    const focusableElements = menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  hamburger.addEventListener('click', toggleMenu);
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('mousedown', onMousedown);
  window.addEventListener('resize', onResize);
  document.addEventListener('keydown', onFocusTrap);

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) closeMenu();
    });
  });

  cleanup = () => {
    hamburger.removeEventListener('click', toggleMenu);
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('mousedown', onMousedown);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('keydown', onFocusTrap);
  };
}

document.addEventListener('astro:page-load', initMenu);
