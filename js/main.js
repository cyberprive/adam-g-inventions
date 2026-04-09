/* ============================================
   ADAM G INVENTIONS — Main JavaScript
   ============================================ */

(function() {
  'use strict';

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('nav--open');
      document.body.style.overflow = nav.classList.contains('nav--open') ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav__mobile a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('nav--open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Sticky Nav Shadow ---
  window.addEventListener('scroll', function() {
    if (nav) {
      nav.classList.toggle('nav--scrolled', window.scrollY > 50);
    }
  }, { passive: true });

  // --- Scroll Reveal (IntersectionObserver) ---
  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '-30px'
    });

    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all elements
    revealElements.forEach(function(el) {
      el.classList.add('active');
    });
  }

  // --- Patent Stamp Animation ---
  var stamps = document.querySelectorAll('.stamp');
  if ('IntersectionObserver' in window && stamps.length) {
    var stampObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          stampObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    stamps.forEach(function(el) {
      stampObserver.observe(el);
    });
  }

  // --- SVG Line Draw Animation ---
  var svgDraws = document.querySelectorAll('.svg-draw');
  if ('IntersectionObserver' in window && svgDraws.length) {
    var svgObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          svgObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    svgDraws.forEach(function(el) {
      svgObserver.observe(el);
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile nav if open
        if (nav) {
          nav.classList.remove('nav--open');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // --- Accordion Toggle ---
  document.querySelectorAll('.accordion__header').forEach(function(header) {
    header.addEventListener('click', function() {
      var item = this.closest('.accordion__item');
      var wasOpen = item.classList.contains('accordion__item--open');

      // Close all siblings
      item.closest('.accordion').querySelectorAll('.accordion__item--open').forEach(function(open) {
        open.classList.remove('accordion__item--open');
      });

      // Toggle clicked item
      if (!wasOpen) {
        item.classList.add('accordion__item--open');
      }
    });
  });

  // --- Floating CTA Hide on Footer ---
  var floatingCta = document.getElementById('floatingCta');
  var footer = document.getElementById('footer');

  if (floatingCta && footer && 'IntersectionObserver' in window) {
    var footerObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        floatingCta.classList.toggle('hidden', entry.isIntersecting);
      });
    }, { threshold: 0.1 });

    footerObserver.observe(footer);
  }

  // --- Scroll Progress Bar ---
  var progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  // --- Contact Form: Auto-select product from URL param ---
  var productSelect = document.getElementById('product');
  if (productSelect) {
    var urlParams = new URLSearchParams(window.location.search);
    var productParam = urlParams.get('product');
    if (productParam) {
      var option = productSelect.querySelector('option[value="' + productParam + '"]');
      if (option) {
        productSelect.value = productParam;
      }
    }
  }

})();
