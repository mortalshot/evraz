// Подключение функционала "Чертоги Фрилансера"
import { isMobile, removeClasses, _slideToggle, _slideUp } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

document.addEventListener('click', function (e) {
  const targetElement = e.target;

  // Показываем выпадающее меню при клике на стрелку
  if (window.innerWidth > 991.98) {
    if (targetElement.closest('.menu__arrow')) {
      removeClasses(document.querySelectorAll('.menu-item-has-children._hover'), "_hover");
      targetElement.closest('.menu-item-has-children').classList.add('_hover');
    }
    if (!targetElement.closest('.menu-item-has-children') && document.querySelectorAll('.menu-item-has-children._hover').length > 0) {
      removeClasses(document.querySelectorAll('.menu-item-has-children._hover'), "_hover");
    }
  }

  if (window.innerWidth < 991.98) {
    if (targetElement.closest('.menu__arrow')) {
      const arrowParent = targetElement.closest('.menu-item-has-children');
      const list = arrowParent.querySelector('ul');
      _slideToggle(list);
      arrowParent.classList.toggle('_hover');
    }
  }
})

// Прячем меню на мобильных устройствах
if (window.innerWidth < 991.98) {
  const menuItemsHasChildren = document.querySelectorAll('.menu-item-has-children');
  if (menuItemsHasChildren.length > 0) {
    menuItemsHasChildren.forEach(element => {
      const menuList = element.querySelector('ul');
      _slideUp(menuList, 0);
    });
  }
}

function showHeaderHeight() {
  const header = document.querySelector('.header');

  if (header) {
    let headerHeight = getComputedStyle(header).height;
    let calcHeight = parseFloat(headerHeight);

    document.documentElement.style.setProperty('--header-height', `${calcHeight}px`);
  }
}

// !Бегущая строка
const ticker = document.querySelectorAll('.ticker');
if (ticker.length > 0) {
  ticker.forEach(element => {
    const elementRow = element.querySelector('.ticker__row');
    let rowClone = elementRow.cloneNode(true);
    element.appendChild(rowClone);
  });
}

window.addEventListener('DOMContentLoaded', function () {
  // !Включаем анимацию прокрутки у firstscreen
  const ticker = document.querySelector('.ticker');

  if (ticker) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('_active');
        } else {
          entry.target.classList.remove('_active');
        }
      });
    }, {
      threshold: 0.5 // Элемент должен быть виден хотя бы на 50% для активации
    });

    observer.observe(ticker);
  }

  setTimeout(() => {
    showHeaderHeight();
  }, 300);
});

window.addEventListener('resize', function () {
  const firstscreen = document.querySelector('._firstscreen');

  if (firstscreen) {
    showHeaderHeight();
  }
});