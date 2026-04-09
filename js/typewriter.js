/* ============================================
   ADAM G INVENTIONS — Typewriter Effect
   ============================================ */

(function() {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-typewriter]').forEach(function(el) {
    var text = el.getAttribute('data-typewriter');
    if (!text) return;

    if (prefersReducedMotion) {
      el.textContent = text;
      return;
    }

    el.textContent = '';
    el.classList.add('typewriter');

    var i = 0;
    var speed = 40;

    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        // Keep cursor blinking for a moment, then remove
        setTimeout(function() {
          el.classList.add('typewriter--done');
        }, 2000);
      }
    }

    // Start after a short delay
    setTimeout(type, 600);
  });

})();
