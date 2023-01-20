const btnClose = document.querySelector('.main-nav__toggle');
const header = document.querySelector('.page-header');
const reviewsSlider = document.querySelector('.reviews__slider');
const priceSlider = document.querySelector('.price__slider');
const wrapper = document.querySelector('.reviews__wrapper');
const sliderLeftBtn = document.querySelector('.slider__arrow--left');
const sliderRightBtn = document.querySelector('.slider__arrow--right');
const reviews = document.querySelectorAll('.reviews__item');
const priceSlides = document.querySelectorAll('.price-item[data-counter]');
let reviewsOffset = document.querySelector('.reviews__wrapper').clientWidth;
const reviewsDots = document.querySelector('.reviews__dots').querySelectorAll('.dots__item');
const priceDots = document.querySelector('.price__dots').querySelectorAll('.dots__item');

const TABLET_WIDTH = 660;

// кнопка бургер
btnClose.addEventListener('click', () => {
  header.classList.toggle('page-header--full');
});
//
// закрытие меню при изменении размера окна
window.addEventListener('resize', () => {
  if (document.documentElement.scrollWidth > 1199) {
    document.querySelector('.page-header').classList.remove('page-header--full');
  }

  reviewsOffset = document.querySelector('.reviews__wrapper').clientWidth;
  reviewsSlider.style.transform = `translateX(-${(currentReviewSlide.value.dataset.counter - 1) * reviewsOffset}px)`;
  reviewsSlider.style.width = `${reviewsOffset * reviews.length}px`;
  if (document.documentElement.clientWidth < TABLET_WIDTH) {
    priceSlider.style.width = `${reviewsOffset * priceSlides.length}px`;
  } else {
    clearInterval(priceSliderTimer);
    priceSlider.style.width = `100%`;
    priceSlider.style.transform = 'translateX(0)';
  }
});
//
// слайдер
function changeSlide(slider, offset, currentSlide, slides, direction, timer = null, dots, position = 0) {
  if (timer) {
    clearInterval(timer);
  }
  let counter = currentSlide.value.dataset.counter - 1;
  let nextSlideCounter = counter + direction;
  if (nextSlideCounter < 0) {
    nextSlideCounter = slides.length - 1;
  }
  if (nextSlideCounter === slides.length) {
    nextSlideCounter = 0;
  }
  if (position) {
    nextSlideCounter = position - 1;
  }

  currentSlide.value.classList.remove('slide--active');
  slides[nextSlideCounter].classList.add('slide--active');
  currentSlide.value = slides[nextSlideCounter];

  dots[counter].classList.remove('dots__item--active');
  dots[nextSlideCounter].classList.add('dots__item--active');

  slider.style.transform = `translateX(-${nextSlideCounter * offset}px)`;
}
//
// --слайдер ревью
reviewsDots.forEach((dot) => {
  dot.addEventListener('click', () => changeSlide(reviewsSlider, reviewsOffset, currentReviewSlide, reviews, 0, reviewsSliderTimer, reviewsDots, dot.dataset.counter));
});
reviewsSlider.style.width = `${reviewsOffset * reviews.length}px`;
const currentReviewSlide = {
  value: document.querySelector('.reviews__item')
}

const reviewsSliderTimer = setInterval(() => {
  changeSlide(reviewsSlider, reviewsOffset, currentReviewSlide, reviews, 1, null, reviewsDots);
}, 3000);

sliderLeftBtn.addEventListener('click', () => changeSlide(reviewsSlider, reviewsOffset, currentReviewSlide, reviews, -1, reviewsSliderTimer, reviewsDots));
sliderRightBtn.addEventListener('click', () => changeSlide(reviewsSlider, reviewsOffset, currentReviewSlide, reviews, 1, reviewsSliderTimer, reviewsDots));
//
// слайдер прайсов
const currentPriceSlide = {
  value: document.querySelector('.price__item[data-counter]')
}

let priceSliderTimer = null;
if (document.documentElement.clientWidth < TABLET_WIDTH) {
  priceSlider.style.width = `${reviewsOffset * priceSlides.length}px`;
  priceSliderTimer = setInterval(() => {
    changeSlide(priceSlider, reviewsOffset, currentPriceSlide, priceSlides, 1, null, priceDots);
  }, 3000);
}

priceDots.forEach((dot) => {
  dot.addEventListener('click', () => changeSlide(priceSlider, reviewsOffset, currentPriceSlide, priceSlides, 0, priceSliderTimer, priceDots, dot.dataset.counter));
});
//
