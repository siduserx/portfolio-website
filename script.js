document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- YEAR UPDATE ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ---------------- NAVIGATION ---------------- */
  const header = document.getElementById('site-header');
  const navLinks = document.querySelector('.nav-links');
  const navToggle = document.querySelector('.nav-toggle');

  function scrollToSection(target) {
    const el = document.querySelector(target);
    if (!el) return;

    const headerHeight = header.offsetHeight;
    const yPos = el.getBoundingClientRect().top + window.scrollY - headerHeight - 10;

    window.scrollTo({
      top: yPos,
      behavior: 'smooth'
    });
  }

  // Click for all menu items
  document.querySelectorAll('[data-target]').forEach(link => {
    link.addEventListener("click", () => {
      const target = link.getAttribute('data-target');
      scrollToSection(target);

      if (window.innerWidth < 900) {
        navLinks.style.display = 'none';
      }
    });
  });

  // Mobile Menu Toggle
  navToggle.addEventListener("click", () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.textAlign = 'center';
    }
  });


  /* ---------------- SCROLL REVEAL ---------------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ---------------- SKILL BAR ANIMATION ---------------- */
  const skillBars = document.querySelectorAll('.skill-bar');

  const skillsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const fill = bar.querySelector('.fill');
          const value = bar.getAttribute('data-value');
          fill.style.width = value + '%';
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillsObserver.observe(skillsSection);


  /* ---------------- CONTACT FORM ---------------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      status.textContent = "Sending...";

      setTimeout(() => {
        status.textContent = "Message sent!";
        form.reset();

        setTimeout(() => {
          status.textContent = "";
        }, 2500);

      }, 900);
    });
  }


  /* ---------------- HASH FIX ON PAGE LOAD ---------------- */
  if (window.location.hash) {
    setTimeout(() => {
      scrollToSection(window.location.hash);
    }, 150);
  }

});
