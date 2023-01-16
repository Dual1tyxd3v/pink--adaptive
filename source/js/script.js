const btnClose = document.querySelector('.main-nav__toggle');
const header = document.querySelector('.page-header');

btnClose.addEventListener('click', () => {
  header.classList.toggle('page-header--full');
});

window.addEventListener('resize', () => {
  if (document.documentElement.scrollWidth > 1199) {
    document.querySelector('.page-header').classList.remove('page-header--full');
  }
});
