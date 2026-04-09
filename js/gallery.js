/* ============================================
   ADAM G INVENTIONS — Gallery Lightbox
   ============================================ */

(function() {
  'use strict';

  var images = [];
  var currentIndex = 0;
  var lightbox = null;
  var lightboxImg = null;

  function createLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__nav lightbox__prev" aria-label="Previous">&#8249;</button>' +
      '<img class="lightbox__image" src="" alt="">' +
      '<button class="lightbox__nav lightbox__next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(lightbox);

    lightboxImg = lightbox.querySelector('.lightbox__image');

    lightbox.querySelector('.lightbox__close').addEventListener('click', close);
    lightbox.querySelector('.lightbox__prev').addEventListener('click', prev);
    lightbox.querySelector('.lightbox__next').addEventListener('click', next);

    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });
  }

  function open(index) {
    if (!lightbox) createLightbox();
    currentIndex = index;
    updateImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  }

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  }

  function updateImage() {
    if (lightboxImg && images[currentIndex]) {
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt || '';
    }
  }

  // Initialize gallery items
  document.querySelectorAll('.gallery__item').forEach(function(item, index) {
    var img = item.querySelector('img');
    if (img) {
      images.push({ src: img.src, alt: img.alt });
      item.addEventListener('click', function() {
        open(index);
      });
    }
  });

})();
