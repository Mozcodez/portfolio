/* =========================================
   PORTFOLIO — main.js
   Core interactions & functionality
   ========================================= */

"use strict";

// =========================================
// PAGE LOADER
// =========================================
(function initLoader() {
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.innerHTML = `
    <div class="page-loader__text">◈ MUSA GORDARD</div>
    <div class="page-loader__bar-track">
      <div class="page-loader__bar-fill" id="loaderBar"></div>
    </div>
  `;
  document.body.prepend(loader);

  const bar = document.getElementById("loaderBar");
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => loader.classList.add("hidden"), 300);
    }
    bar.style.width = progress + "%";
  }, 80);
})();

// =========================================
// SCROLL PROGRESS BAR
// =========================================
(function initScrollProgress() {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.prepend(bar);

  window.addEventListener(
    "scroll",
    () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = (window.scrollY / docH) * 100;
      bar.style.width = pct + "%";
    },
    { passive: true },
  );
})();

// =========================================
// CUSTOM CURSOR
// =========================================
(function initCursor() {
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  if (!cursor || !follower) return;

  let mouseX = 0,
    mouseY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hide on mouse leave
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    follower.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    follower.style.opacity = "0.6";
  });

  // Click effect
  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(0.7)";
  });
  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(1)";
  });
})();

// =========================================
// NAVBAR — scroll behavior
// =========================================
(function initNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    },
    { passive: true },
  );
})();

// =========================================
// MOBILE MENU
// =========================================
(function initMobileMenu() {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  let open = false;

  function toggle() {
    open = !open;
    menu.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";

    const spans = btn.querySelectorAll("span");
    if (open) {
      spans[0].style.transform = "rotate(45deg) translate(5px,5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px,-5px)";
    } else {
      spans.forEach((s) => {
        s.style.transform = "";
        s.style.opacity = "";
      });
    }
  }

  btn.addEventListener("click", toggle);

  menu.querySelectorAll(".mobile-menu__link").forEach((link) => {
    link.addEventListener("click", () => {
      if (open) toggle();
    });
  });
})();

// =========================================
// LIVE TIME
// =========================================
(function initLiveTime() {
  const el = document.getElementById("liveTime");
  if (!el) return;

  function update() {
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    el.textContent = `${h}:${m} ${ampm}`;
  }
  update();
  setInterval(update, 60000);
})();

// =========================================
// SCROLL REVEAL
// =========================================
(function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Don't un-observe so it stays visible
        }
      });
    },
    { threshold: 0.12 },
  );

  els.forEach((el) => observer.observe(el));
})();

// =========================================
// PROJECT CARD REVEAL
// =========================================
(function initCardReveal() {
  const cards = document.querySelectorAll(".project-card");
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  cards.forEach((card) => observer.observe(card));
})();

// =========================================
// SERVICE CARD REVEAL
// =========================================
(function initServiceReveal() {
  const cards = document.querySelectorAll(".service-card");
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  cards.forEach((card) => observer.observe(card));
})();

// =========================================
// COUNTER ANIMATION
// =========================================
(function initCounters() {
  const counters = document.querySelectorAll(".stat-card__value[data-count]");
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = "true";
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => observer.observe(c));
})();

// =========================================
// SKILL BARS
// =========================================
(function initSkillBars() {
  const bars = document.querySelectorAll(".skill-bar");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector(".skill-bar__fill");
          const pct = entry.target.dataset.pct || 0;
          setTimeout(() => {
            fill.style.width = pct + "%";
          }, 200);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  bars.forEach((b) => observer.observe(b));
})();

// =========================================
// WORK FILTER
// =========================================
(function initWorkFilter() {
  const btns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  if (!btns.length) return;

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        if (match) {
          card.classList.remove("hidden");
          setTimeout(() => card.classList.add("visible"), 50);
        } else {
          card.classList.add("hidden");
          card.classList.remove("visible");
        }
      });
    });
  });
})();

// =========================================
// TESTIMONIAL SLIDER
// =========================================
(function initTestimonials() {
  const track = document.getElementById("testimonialTrack");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");
  const dotsEl = document.getElementById("testimonialDots");
  if (!track) return;

  const slides = track.querySelectorAll(".testimonial-card");
  let current = 0;
  let autoTimer;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "testimonial-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsEl
      .querySelectorAll(".testimonial-dot")
      .forEach((d, i) => d.classList.toggle("active", i === current));
  }

  prevBtn?.addEventListener("click", () => {
    goTo(current - 1);
    resetAuto();
  });
  nextBtn?.addEventListener("click", () => {
    goTo(current + 1);
    resetAuto();
  });

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 4500);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // Pause on hover
  track.addEventListener("mouseenter", () => clearInterval(autoTimer));
  track.addEventListener("mouseleave", startAuto);

  startAuto();
})();

// =========================================
// ACTIVE SIDENAV ON SCROLL
// =========================================
(function initSidenav() {
  const icons = document.querySelectorAll(".sidenav-icon");
  const sections = ["hero", "about", "work", "services", "contact"];

  window.addEventListener(
    "scroll",
    () => {
      let current = "";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) current = id;
      });

      icons.forEach((icon) => {
        const href = icon.getAttribute("href")?.replace("#", "");
        icon.classList.toggle("active", href === current);
      });
    },
    { passive: true },
  );
})();

// =========================================
// CONTACT FORM
// =========================================
(function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');

    // Simple validation
    const name = form.querySelector("#nameInput").value.trim();
    const email = form.querySelector("#emailInput").value.trim();
    const message = form.querySelector("#messageInput").value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill in all required fields.";
      status.className = "form-status error";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.className = "form-status error";
      return;
    }

    // Simulate send
    btn.disabled = true;
    btn.querySelector("span").textContent = "Sending...";
    status.textContent = "";
    status.className = "form-status";

    setTimeout(() => {
      status.textContent = "✓ Message sent! I'll get back to you soon.";
      status.className = "form-status success";
      form.reset();
      btn.disabled = false;
      btn.querySelector("span").textContent = "Send Message";
    }, 1800);
  });
})();

// =========================================
// SCROLL TO TOP
// =========================================
(function initScrollTop() {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("visible", window.scrollY > 500);
    },
    { passive: true },
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

// =========================================
// CARD 3D TILT EFFECT
// =========================================
(function initTilt() {
  const card = document.querySelector(".hero__card");
  if (!card) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotX = -y * 12;
    const rotY = x * 12;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale(1)";
    card.style.transition = "transform 0.5s ease";
  });
  card.addEventListener("mouseenter", () => {
    card.style.transition = "transform 0.1s ease";
  });
})();

// =========================================
// SMOOTH SCROLL for nav links
// =========================================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// =========================================
// IMAGE PLACEHOLDER fallback
// =========================================
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    this.style.display = "none";
    const placeholder = this.nextElementSibling;
    if (
      (placeholder &&
        placeholder.classList.contains("hero__card-photo-placeholder")) ||
      (placeholder &&
        placeholder.classList.contains("project-card__img-placeholder")) ||
      (placeholder &&
        placeholder.classList.contains("about__image-placeholder"))
    ) {
      placeholder.style.display = "flex";
    }
  });
});
