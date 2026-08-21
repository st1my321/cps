const showMoreBtn = document.querySelector('.services_more_button');
const servicesList = document.querySelector('.services_list');

showMoreBtn.addEventListener('click', function () {
  servicesList.classList.toggle('isOpen');
  showMoreBtn.classList.toggle('isActive');
  if (servicesList.classList.contains('isOpen')) {
    showMoreBtn.innerHTML = ' <img' +
      '      src="../img/icon.png"' +
      '      alt=""' +
      '      class="services_more_button_icon"' +
      '    >' +
      '    Скрыть';
  }
  else {
    showMoreBtn.innerHTML = ' <img' +
      '      src="../img/icon.png"' +
      '      alt=""' +
      '      class="services_more_button_icon"' +
      '    >' +
      '    Показать все';
  }
});

let mySwiper = null;

function initOrDestroySwiper() {
  const windowWidth = window.innerWidth;

  if (windowWidth < 768) {

    if (!mySwiper) {
      mySwiper = new Swiper('.swiper', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets'
        },
      });
    }
  } else {

    if (mySwiper) {
      mySwiper.destroy(true, true);
      mySwiper = null;
    }
  }
}

initOrDestroySwiper();

window.addEventListener('resize', initOrDestroySwiper);