const page = document.querySelector('.page');
const sidebar = document.querySelector('.sidebar');
const pageOverlay = document.querySelector('.page__overlay');
const burgerButton = document.querySelector('.mobile-header__burger');
const sidebarCloseButton = document.querySelector('.sidebar__close');

function setSidebar(open) {
  sidebar.classList.toggle('isOpen', open);
  pageOverlay.classList.toggle('isOpen', open);
  page.classList.toggle('page--locked', open);
  pageOverlay.setAttribute('aria-hidden', String(!open));
  burgerButton.setAttribute('aria-expanded', String(open));
}

burgerButton.addEventListener('click', () => setSidebar(true));
sidebarCloseButton.addEventListener('click', () => setSidebar(false));
pageOverlay.addEventListener('click', () => setSidebar(false));
sidebar.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 1366) setSidebar(false);
  });
});

const introTabs = document.querySelectorAll('.intro__tab');

introTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    introTabs.forEach((item) => {
      item.classList.remove('intro__tab--active');
      item.removeAttribute('aria-current');
    });

    tab.classList.add('intro__tab--active');
    tab.setAttribute('aria-current', 'page');
  });
});

document.querySelector('.intro__more').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const text = document.querySelector('.intro__text-wrap');
  const open = text.classList.toggle('isOpen');
  button.classList.toggle('isActive', open);
  button.setAttribute('aria-expanded', String(open));
  button.querySelector('span:last-child').textContent = open ? 'Скрыть' : 'Читать далее';
});

document.querySelectorAll('.catalog-section__toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const list = document.querySelector(button.dataset.target);
    const open = list.classList.toggle('isOpen');
    button.classList.toggle('isActive', open);
    button.setAttribute('aria-expanded', String(open));
    button.querySelector('span:last-child').textContent = open ? 'Скрыть' : 'Показать все';
  });
});

let brandsSwiper = null;
let devicesSwiper = null;
let pricesSwiper = null;

function initOrDestroyBrandsSwiper() {
  const windowWidth = window.innerWidth;

  if (windowWidth < 768) {
    if (!brandsSwiper) {
      brandsSwiper = new Swiper('.catalog-section__slider--brands', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: '.catalog-section__pagination--brands',
          clickable: true,
          type: 'bullets'
        },
      });
    }
  } else if (brandsSwiper) {
    brandsSwiper.destroy(true, true);
    brandsSwiper = null;
  }
}

function initOrDestroyDevicesSwiper() {
  const windowWidth = window.innerWidth;

  if (windowWidth < 768) {
    if (!devicesSwiper) {
      devicesSwiper = new Swiper('.catalog-section__slider--devices', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: '.catalog-section__pagination--devices',
          clickable: true,
          type: 'bullets'
        },
      });
    }
  } else if (devicesSwiper) {
    devicesSwiper.destroy(true, true);
    devicesSwiper = null;
  }
}

function initOrDestroyPricesSwiper() {
  const windowWidth = window.innerWidth;

  if (windowWidth < 768) {
    if (!pricesSwiper) {
      pricesSwiper = new Swiper('.prices__slider--services', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: '.prices__pagination',
          clickable: true,
          type: 'bullets'
        },
      });
    }
  } else if (pricesSwiper) {
    pricesSwiper.destroy(true, true);
    pricesSwiper = null;
  }
}

function updateSwipers() {
  initOrDestroyBrandsSwiper();
  initOrDestroyDevicesSwiper();
  initOrDestroyPricesSwiper();
}

updateSwipers();

window.addEventListener('resize', updateSwipers);

const modalLayer = document.querySelector('.modal-layer');
const feedbackModal = document.querySelector('.modal--feedback');
const callModal = document.querySelector('.modal--call');
let lastFocusedElement = null;

function openModal(modal) {
  lastFocusedElement = document.activeElement;
  setSidebar(false);
  modalLayer.classList.add('isOpen');
  modal.classList.add('isOpen');
  modalLayer.setAttribute('aria-hidden', 'false');
  page.classList.add('page--locked');
  modal.querySelector('input').focus();
}

function closeModal() {
  modalLayer.classList.remove('isOpen');
  modalLayer.querySelectorAll('.modal').forEach((modal) => modal.classList.remove('isOpen'));
  modalLayer.setAttribute('aria-hidden', 'true');
  page.classList.remove('page--locked');
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll('.js-feedback').forEach((button) => button.addEventListener('click', () => openModal(feedbackModal)));
document.querySelectorAll('.js-call').forEach((button) => button.addEventListener('click', () => openModal(callModal)));
modalLayer.querySelectorAll('.modal__close').forEach((button) => button.addEventListener('click', closeModal));
modalLayer.querySelector('.modal-layer__backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (modalLayer.classList.contains('isOpen')) closeModal();
    else setSidebar(false);
  }
});

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (event) => event.preventDefault());
});
