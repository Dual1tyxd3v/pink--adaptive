const btnClose = document.querySelector('.main-nav__toggle');
const header = document.querySelector('.page-header');
const slider = document.querySelector('.reviews__slider');
const wrapper = document.querySelector('.reviews__wrapper');
const sliderLeftBtn = document.querySelector('.slider__arrow--left');
const sliderRightBtn = document.querySelector('.slider__arrow--right');
const reviews = document.querySelectorAll('.reviews__item');
let reviewsOffset = document.querySelector('.reviews__wrapper').clientWidth;
const reviewsDots = document.querySelector('.reviews__dots').querySelectorAll('.dots__item');

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
  slider.style.transform = `translateX(-${(currentReviewSlide.value.dataset.counter - 1) * reviewsOffset}px)`;
  slider.style.width = `${reviewsOffset * reviews.length}px`;
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

  currentSlide.value.classList.remove('reviews__item--active');
  slides[nextSlideCounter].classList.add('reviews__item--active');
  currentSlide.value = slides[nextSlideCounter];

  dots[counter].classList.remove('dots__item--active');
  dots[nextSlideCounter].classList.add('dots__item--active');

  slider.style.transform = `translateX(-${nextSlideCounter * offset}px)`;
}
//
// --слайдер ревью
reviewsDots.forEach((dot) => {
  dot.addEventListener('click', () => changeSlide(slider, reviewsOffset, currentReviewSlide, reviews, 0, reviewsSliderTimer, reviewsDots, dot.dataset.counter));
});
slider.style.width = `${reviewsOffset * reviews.length}px`;
const currentReviewSlide = {
  value: document.querySelector('.reviews__item--active')
}

const reviewsSliderTimer = setInterval(() => {
  changeSlide(slider, reviewsOffset, currentReviewSlide, reviews, 1, null, reviewsDots);
}, 3000);

sliderLeftBtn.addEventListener('click', () => changeSlide(slider, reviewsOffset, currentReviewSlide, reviews, -1, reviewsSliderTimer, reviewsDots));
sliderRightBtn.addEventListener('click', () => changeSlide(slider, reviewsOffset, currentReviewSlide, reviews, 1, reviewsSliderTimer, reviewsDots));
//
