const slideImages = [
  'gallery/g01.jpeg','gallery/g02.jpeg','gallery/g03.jpeg','gallery/g04.jpeg','gallery/g05.jpeg',
  'gallery/g06.jpeg','gallery/g07.jpeg','gallery/g08.jpeg','gallery/g09.jpeg','gallery/g10.jpeg',
  'gallery/g11.jpeg','gallery/g12.jpeg','gallery/g13.jpeg','gallery/g14.jpeg','gallery/g15.jpeg',
  'gallery/g16.jpeg','gallery/g17.jpeg','gallery/g18.jpeg','gallery/g19.jpeg','gallery/g20.jpeg',
  'gallery/g21.jpeg','gallery/g22.jpeg','gallery/g23.jpeg','gallery/g24.jpeg'
];

const heroBg = document.querySelector('.hero-bg');
const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const enquiryForm = document.getElementById('enquiryForm');
const formMsg = document.getElementById('formMsg');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

let currentSlide = 0;
const slideElements = [];
let slideInterval = null;

function createHeroSlides() {
  if (!heroBg) return;
  slideImages.forEach((src, index) => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide';
    slide.style.backgroundImage = `linear-gradient(rgba(18,0,34,0.28), rgba(18,0,34,0.28)), url('${src}')`;
    if (index === 0) slide.classList.add('active');
    heroBg.appendChild(slide);
    slideElements.push(slide);
  });
}

function showNextSlide() {
  if (slideElements.length < 2) return;
  slideElements[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slideElements.length;
  slideElements[currentSlide].classList.add('active');
}

function setupSlideshow() {
  createHeroSlides();
  slideInterval = setInterval(showNextSlide, 3000);
}

function handleScroll() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 40);
}

function setupMenuToggle() {
  if (!menuToggle || !mainNav) return;
  menuToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

function setupGalleryLightbox() {
  if (!lightbox || !lightboxImg || !lightboxClose) return;
  document.querySelectorAll('.g-item img').forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
}

function setupForm() {
  if (!enquiryForm || !formMsg) return;

  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = enquiryForm.fname.value.trim();
    const phone = enquiryForm.fphone.value.trim();
    const email = enquiryForm.femail.value.trim();
    const batch = enquiryForm.fbatch.value;
    const message = enquiryForm.fmsg.value.trim();
    const phoneValid = /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));

    if (!name || !phoneValid || !batch) {
      formMsg.textContent = 'Please fill your name, a valid 10-digit phone number, and select a batch.';
      formMsg.className = 'form-msg error';
      return;
    }

    const whatsappNumber = '919322477249';
    const whatsappText = `Hello My United Football Academy,%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ABatch interested in: ${encodeURIComponent(batch)}` +
      `${email ? `%0AEmail: ${encodeURIComponent(email)}` : ''}` +
      `${message ? `%0AMessage: ${encodeURIComponent(message)}` : ''}` +
      `%0A%0AThank you!`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

    window.location.href = whatsappUrl;
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setupSlideshow();
  setupMenuToggle();
  setupGalleryLightbox();
  setupForm();
  handleScroll();
});

window.addEventListener('scroll', handleScroll);
