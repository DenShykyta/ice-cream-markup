// ===================================================================== //
// модальні вікна
// ===================================================================== //

document.addEventListener('DOMContentLoaded', function () {
  /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
  const modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close'),
    video = document.querySelector('video');

  /* Перебираем массив кнопок */
  modalButtons.forEach(function (item) {
    /* Назначаем каждой кнопке обработчик клика */
    item.addEventListener('click', function (e) {
      /* Предотвращаем стандартное действие элемента. Так как кнопку разные
            люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
            Нужно подстраховаться. */
      e.preventDefault();

      /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
            и будем искать модальное окно с таким же атрибутом. */
      const modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector(
          '.modal[data-modal="' + modalId + '"]'
        );

      /* После того как нашли нужное модальное окно, добавим классы
            подложке и окну чтобы показать их, отключим скрол сайта под подложкой */
      modalElem.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.toggle('lock');
      // закриття мобільного меню при натисканні на кнопу Buy now в мобільній верстці
      const mobileMenu = document.querySelector('.js-menu-container');
      if (mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.toggle('is-open');
      }
    }); // end click
  }); // end foreach

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      const parentModal = this.closest('.modal');

      parentModal.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('lock');
      // Ставить відео на паузу після закриття модалки
      video.pause();
    });
  }); // end foreach

  document.body.addEventListener(
    'keyup',
    function (e) {
      const key = e.keyCode;

      if (key == 27) {
        document.querySelector('.modal.active').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
        document.body.classList.remove('lock');
        // Ставить відео на паузу після закриття модалки
        video.pause();
      }
    },
    false
  );

  overlay.addEventListener('click', function () {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
    document.body.classList.remove('lock');
    // Ставить відео на паузу після закриття модалки
    video.pause();
  });
}); // end ready
