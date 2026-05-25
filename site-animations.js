(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function addHeroAtmosphere(hero) {
    if (!hero || hero.dataset.animatedHero === 'true') return;
    hero.dataset.animatedHero = 'true';

    ['hero-grid', 'hero-orb hero-orb-1', 'hero-orb hero-orb-2', 'hero-orb hero-orb-3', 'hero-blob'].forEach((className) => {
      const item = document.createElement('div');
      item.className = className;
      item.setAttribute('aria-hidden', 'true');
      hero.prepend(item);
    });

    const ring = document.createElement('div');
    ring.className = 'hero-ring';
    ring.setAttribute('aria-hidden', 'true');
    const dot = document.createElement('div');
    dot.className = 'hero-ring-dot';
    ring.appendChild(dot);
    hero.prepend(ring);

    const particles = document.createElement('div');
    particles.className = 'hero-particles';
    particles.setAttribute('aria-hidden', 'true');
    hero.prepend(particles);

    if (prefersReducedMotion) return;

    const count = window.innerWidth > 768 ? 18 : 8;
    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = [
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `--tx:${(Math.random() - 0.5) * 40}px`,
        `--ty:${(Math.random() - 0.5) * 40}px`,
        `--dur:${4 + Math.random() * 6}s`,
        `--delay:${Math.random() * 5}s`,
        `opacity:${0.2 + Math.random() * 0.5}`,
        `width:${2 + Math.random() * 4}px`,
        `height:${2 + Math.random() * 4}px`
      ].join(';');
      particles.appendChild(particle);
    }
  }

  function markRevealElements() {
    const selectors = [
      '.section-heading',
      '.section-copy',
      '.about-intro-media',
      '.about-intro-copy',
      '.about-block-copy',
      '.about-block-image',
      '.feature-card',
      '.property-card',
      '.project-card',
      '.service-block',
      '.channel-list a',
      '.partner-callout > *',
      '.quote-panel',
      '.final-cta > *',
      '.contact-card',
      '.contact-form',
      '.policy-content article',
      '.pitch-card',
      '.metric-card',
      '.pill-row',
      '.check-list',
      '.show-case-container > *',
      '.lead-gen-tactics',
      '.partner-logo'
    ];

    document.querySelectorAll(selectors.join(',')).forEach((el, index) => {
      el.classList.add('reveal');
      el.classList.add(`reveal-delay-${(index % 4) + 1}`);
    });
  }

  function observeReveals() {
    const revealEls = document.querySelectorAll('.reveal');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('visible'));
      return;
    }

    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => revealObs.observe(el));
  }

  function animateHomeStats() {
    const stats = document.querySelectorAll('.hero-stats-item strong');
    const statsWrap = document.querySelector('.hero-stats');
    if (!stats.length || !statsWrap || prefersReducedMotion || !('IntersectionObserver' in window)) return;

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || animated) return;
      animated = true;

      stats.forEach((stat) => {
        const raw = stat.textContent.trim();
        const number = parseFloat(raw.replace(/,/g, ''));
        if (Number.isNaN(number)) return;

        const suffix = raw.replace(/[\d,.]/g, '');
        const hasComma = raw.includes(',');
        let start = 0;
        const duration = 1800;

        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(number * eased);
          stat.textContent = `${hasComma ? value.toLocaleString() : value}${suffix}`;
          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      });

      observer.disconnect();
    }, { threshold: 0.8 });

    observer.observe(statsWrap);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.page-hero, body > main > .hero:first-child').forEach(addHeroAtmosphere);
    markRevealElements();
    observeReveals();
    animateHomeStats();
  });
}());
