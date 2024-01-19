// Прокрутка при натисканні на навігаційні посилання в хедері сторінки

const menuLinks = document.querySelectorAll('.link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });
  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector('header').offsetHeight;

      // --------Закриття мобільного меню при натисканні на посилання -------//
      const mobileMenu = document.querySelector('.js-menu-container');
      if (mobileMenu.classList.contains('is-open')) {
        document.body.classList.remove('lock');
        mobileMenu.classList.toggle('is-open');
      }
      // ------------------------------------------------------------------- //
      window.scroll({
        top: gotoBlockValue,
        behavior: 'smooth',
      });
      e.preventDefault();
    }
  }
}
