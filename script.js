/**
 * Sagar Sagat - Portfolio Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------
  // 1. Dynamic Footer Year
  // ---------------------------------------------------------
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ---------------------------------------------------------
  // 2. Dark / Light Mode Toggle
  // ---------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('sagar-portfolio-theme');

  // Check saved theme or system preference
  if (savedTheme) {
    body.className = savedTheme;
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    body.className = 'light-theme';
  } else {
    body.className = 'dark-theme';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = body.classList.contains('dark-theme');
      const newTheme = isDark ? 'light-theme' : 'dark-theme';
      body.className = newTheme;
      localStorage.setItem('sagar-portfolio-theme', newTheme);
    });
  }

  // ---------------------------------------------------------
  // 3. Mobile Navigation Menu
  // ---------------------------------------------------------
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking a link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------------------------------------------------------
  // 4. Navbar Shadow & Active Link on Scroll
  // ---------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    // Navbar elevation
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Active link highlighting
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        matchingLink?.classList.add('active');
      } else {
        matchingLink?.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger once on load

  // ---------------------------------------------------------
  // 5. Typing Effect for Subtitle
  // ---------------------------------------------------------
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const words = [
      'engaging web experiences',
      'responsive user interfaces',
      'scalable full-stack apps',
      'clean & maintainable code'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const typeEffect = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 45;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 95;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 1600; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400; // Pause before typing next word
      }

      setTimeout(typeEffect, typeSpeed);
    };

    setTimeout(typeEffect, 1000);
  }

  // ---------------------------------------------------------
  // 6. Project Filter Functionality
  // ---------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ---------------------------------------------------------
  // 7. Contact Form Submission (Interactive Simulation)
  // ---------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const feedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showFeedback('Please fill out all required fields.', 'error');
        return;
      }

      // Simple email check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
      }

      // Simulated sending state
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending message...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        showFeedback(`Thanks ${name}! Your message has been received. I'll get back to you soon.`, 'success');
        contactForm.reset();

        // Clear feedback after 6 seconds
        setTimeout(() => {
          if (feedback) feedback.style.display = 'none';
        }, 6000);
      }, 1000);
    });
  }

  function showFeedback(msg, type) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = `form-feedback ${type}`;
    feedback.style.display = 'block';
  }
});
