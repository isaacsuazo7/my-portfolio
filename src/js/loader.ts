import anime from 'animejs/lib/anime.es.js';

function initLoader() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.getElementById('loader');

  if (!loader) return;

  if (prefersReducedMotion) {
    loader.style.display = 'none';
    document.body.classList.remove('loading');
    document.dispatchEvent(new CustomEvent('loader-complete'));
    return;
  }

  const logoWrapper = loader.querySelector('.logo-wrapper') as HTMLElement;
  const hexPath = loader.querySelector('path') as SVGPathElement;
  const isText = loader.querySelector('#IS') as SVGGElement;

  if (!logoWrapper || !hexPath || !isText) return;

  const timeline = anime.timeline({
    complete: () => {
      loader.style.display = 'none';
      document.body.classList.remove('loading');
      document.dispatchEvent(new CustomEvent('loader-complete'));
    },
  });

  timeline
    .add({
      targets: logoWrapper,
      opacity: 1,
      duration: 1,
      easing: 'linear',
    })
    .add({
      targets: hexPath,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1500,
      delay: 300,
      easing: 'easeInOutQuart',
    })
    .add({
      targets: isText,
      opacity: [0, 1],
      duration: 700,
      easing: 'easeInOutQuart',
    })
    .add({
      targets: logoWrapper,
      opacity: 0,
      scale: 0.1,
      duration: 300,
      delay: 500,
      easing: 'easeInOutQuart',
    })
    .add({
      targets: loader,
      opacity: 0,
      duration: 200,
      easing: 'easeInOutQuart',
    });
}

document.addEventListener('DOMContentLoaded', initLoader);
