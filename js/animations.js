/* =========================================
   PORTFOLIO — animations.js
   Advanced visual effects & canvas
   ========================================= */

'use strict';

// =========================================
// PARTICLE BACKGROUND (canvas)
// =========================================
(function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particleCanvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.35;
  `;
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.2 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.5 + 0.1);
      this.alpha = Math.random() * 0.6 + 0.1;
      this.life  = Math.random() * 200 + 100;
      this.age   = 0;
    }

    update() {
      this.x   += this.vx;
      this.y   += this.vy;
      this.age++;
      if (this.age > this.life || this.y < -10) this.reset();
    }

    draw() {
      const fade = Math.min(this.age / 30, 1) * Math.min((this.life - this.age) / 30, 1);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 112, 58, ${this.alpha * fade})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    const count = Math.min(Math.floor(W * H / 14000), 80);
    particles   = Array.from({ length: count }, () => new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(232, 112, 58, ${(1 - dist / 100) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', init, { passive: true });
  init();
  animate();
})();

// =========================================
// MAGNETIC BUTTON EFFECT
// =========================================
(function initMagnetic() {
  const buttons = document.querySelectorAll('.btn--primary, .hero__card-cta');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect   = btn.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) * 0.35;
      const dy     = (e.clientY - cy) * 0.35;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.15s ease';
    });
  });
})();

// =========================================
// TEXT SCRAMBLE on hover
// =========================================
(function initTextScramble() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';

  class TextScramble {
    constructor(el) {
      this.el      = el;
      this.original = el.textContent;
      this.frame   = null;
    }

    scramble() {
      let iteration = 0;
      const original = this.original;
      clearInterval(this.frame);

      this.frame = setInterval(() => {
        this.el.textContent = original
          .split('')
          .map((char, i) => {
            if (i < iteration) return original[i];
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        iteration += 0.5;
        if (iteration >= original.length) {
          clearInterval(this.frame);
          this.el.textContent = original;
        }
      }, 40);
    }
  }

  // Apply to nav links
  document.querySelectorAll('.nav__link').forEach(link => {
    const scrambler = new TextScramble(link);
    link.addEventListener('mouseenter', () => scrambler.scramble());
  });
})();

// =========================================
// PARALLAX on hero shapes
// =========================================
(function initParallax() {
  const shapes = document.querySelectorAll('.shape');
  if (!shapes.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        shapes[0]?.style && (shapes[0].style.transform = `translateY(${y * 0.15}px)`);
        shapes[1]?.style && (shapes[1].style.transform = `translateY(${-y * 0.1}px)`);
        shapes[2]?.style && (shapes[2].style.transform = `translateY(${y * 0.08}px)`);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// =========================================
// CURSOR COLOR CHANGE by section
// =========================================
(function initCursorColor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  const sections = document.querySelectorAll('section');
  const colors   = {
    hero:         '#e8703a',
    about:        '#f0a070',
    work:         '#e8703a',
    services:     '#f0a070',
    testimonials: '#e8703a',
    contact:      '#f0a070',
  };

  window.addEventListener('scroll', () => {
    sections.forEach(section => {
      const rect  = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        const color = colors[section.id] || '#e8703a';
        cursor.style.background = color;
      }
    });
  }, { passive: true });
})();

// =========================================
// SMOOTH REVEAL for section headings
// =========================================
(function initHeadingReveal() {
  const headings = document.querySelectorAll('.section-title');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slide-up 0.7s cubic-bezier(0.4,0,0.2,1) forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  headings.forEach(h => {
    h.style.opacity = '0';
    observer.observe(h);
  });
})();

// =========================================
// CARD HOVER GLOW EFFECT
// =========================================
(function initCardGlow() {
  const cards = document.querySelectorAll('.stat-card, .service-card, .project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = ((e.clientX - rect.left) / rect.width)  * 100;
      const y    = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  // Inject dynamic glow style
  const style = document.createElement('style');
  style.textContent = `
    .stat-card, .service-card {
      --mouse-x: 50%;
      --mouse-y: 50%;
    }
    .stat-card:hover::before,
    .service-card:hover::before {
      background: radial-gradient(
        circle 120px at var(--mouse-x) var(--mouse-y),
        rgba(232,112,58,0.10),
        transparent 80%
      ) !important;
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(style);
})();

// =========================================
// STAGGER PROJECT CARDS on filter
// =========================================
(function patchFilterStagger() {
  // Extends filter in main.js to add stagger delay on re-show
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      let delay    = 0;
      document.querySelectorAll('.project-card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.style.transitionDelay = delay + 'ms';
          delay += 80;
        } else {
          card.style.transitionDelay = '0ms';
        }
      });
    });
  });
})();
