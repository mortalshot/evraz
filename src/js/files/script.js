// Подключение функционала "Чертоги Фрилансера"
import { isMobile, removeClasses, _slideToggle, _slideUp } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);

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

// Бегущая строка
const ticker = document.querySelectorAll('.ticker');
if (ticker.length > 0) {
  ticker.forEach(element => {
    const elementRow = element.querySelector('.ticker__row');
    let rowClone = elementRow.cloneNode(true);
    element.appendChild(rowClone);
  });
}

gsap.registerPlugin(ScrollTrigger);
function gsapAnimations() {
  const firstscreen = document.querySelector('.firstscreen');
  if (firstscreen) {
    const firstscreenTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".firstscreen__body",
        start: 'top center',
        // markers: true,
        onLeaveBack: () => firstscreenTL.reverse(),
        onEnterBack: () => firstscreenTL.restart(),
      },
    })

    const fsTitles = firstscreen.querySelectorAll('.firstscreen__title span');
    if (fsTitles.length > 0) {
      fsTitles.forEach(element => {
        firstscreenTL.from(element, {
          opacity: 0,
          xPercent: -50,
        }, "-=0.2")
      });
    }

    const fsSubtitles = firstscreen.querySelectorAll('.firstscreen__subtitle span');
    if (fsSubtitles.length > 0) {
      fsSubtitles.forEach(element => {
        firstscreenTL.from(element, {
          opacity: 0,
          xPercent: -50,
        }, "-=0.2")
      });
    }

    const fsActions = firstscreen.querySelector('.firstscreen__actions');
    if (fsActions) {
      firstscreenTL.from(fsActions, {
        opacity: 0,
      }, "-=0.2")
    }
  }

  const stepItems = document.querySelectorAll('.step-item');
  if (stepItems.length > 0) {
    let j = 0;
    let imageSign, textSign;

    stepItems.forEach(element => {
      j % 2 === 0 ? imageSign = "-" : imageSign = "+";
      j % 2 === 0 ? textSign = "+" : textSign = "-";
      const stepItemTL = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 95%',
          // markers: true,
          onLeaveBack: () => stepItemTL.reverse(),
          onEnterBack: () => stepItemTL.restart(),
        },
      })


      const elementTitle = element.querySelector('.step-item__title');
      if (elementTitle) {
        stepItemTL.from(elementTitle, {
          opacity: 0,
          xPercent: `${textSign}50`,
        })
      }
      const elementText = element.querySelector('.step-item__text');
      if (elementText) {
        stepItemTL.from(elementText, {
          opacity: 0,
          xPercent: `${textSign}50`,
        }, "-=0.2")
      }
      const elementStep = element.querySelector('.step-item__step');
      if (elementStep) {
        stepItemTL.from(elementStep, {
          opacity: 0,
        })
      }
      const elementImage = element.querySelector('.step-item__image');
      stepItemTL.from(elementImage, {
        opacity: 0,
        xPercent: `${imageSign}50`,
        duration: 0.7
      }, "-=0.8")

      j++;
    });
  }

  const platform = document.querySelector('.platform');
  if (platform) {
    const platformTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".platform__container",
        start: 'top 95%',
        // markers: true,
        onLeaveBack: () => platformTL.reverse(),
        onEnterBack: () => platformTL.restart(),
      },
    })

    const platformImage = platform.querySelector('.platform__image');
    if (platformImage) {
      platformTL.from(platformImage, {
        xPercent: -50,
        opacity: 0,
      })
    }
    const platformTitle = platform.querySelectorAll('.platform__title *');
    if (platformTitle.length > 0) {
      platformTitle.forEach(element => {
        platformTL.from(element, {
          xPercent: -50,
          opacity: 0,
        }, "-0.1")
      });
    }
    const platformCaption = platform.querySelector('.platform__caption');
    if (platformCaption) {
      platformTL.from(platformCaption, {
        xPercent: -50,
        opacity: 0,
      }, "-0.1")
    }
    const platformText = platform.querySelectorAll('.platform__text *');
    if (platformText.length > 0) {
      platformText.forEach(element => {
        platformTL.from(element, {
          xPercent: -30,
          opacity: 0,
        }, "-0.1")
      });
    }
  }

  const textSection = document.querySelectorAll('.text-section__text');
  if (textSection.length > 0) {
    textSection.forEach(section => {
      const items = section.querySelectorAll('._content *');

      items.forEach(element => {
        const elementTL = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top 95%',
            end: 'end 70%',
            scrub: true,
            // markers: true,
          },
        })

        elementTL.from(element, {
          yPercent: -20,
          opacity: 0,
        })
      });
    });
  }
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
    if (window.innerWidth >= 768) {
      gsapAnimations();
    }
  }, 300);
});

window.addEventListener('resize', function () {
  const firstscreen = document.querySelector('._firstscreen');

  if (firstscreen) {
    showHeaderHeight();
  }
});