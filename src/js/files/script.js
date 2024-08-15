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


  // Подключаем библиотеку API
  ymaps.ready(function () {
    // Создаем карту
    var geoMap = new ymaps.Map('map', {
      center: [55.76, 37.64], // Координаты центра карты
      zoom: 4 // Масштаб карты
    });

    geoMap.controls.add('zoomControl');

    var lastCollection = 0,
      lastActiveRegion = 0;

    var lng = 'ru',
      contr = 'RU',
      level = '1';
    if (lastCollection) {
      geoMap.geoObjects.remove(lastCollection);
    }
    ymaps.regions.load(contr, {
      lang: lng,
      quality: level
    }).then(function (result) {
      lastCollection = result.geoObjects;

      lastCollection.each(function (reg) {
        switch (reg.properties.get('osmId')) {
          /* begin Северо-Кавказский федеральный округ*/
          case '108081':
            {
              reg.options.set({ fillColor: '#DC893D', opacity: 0.8, strokeColor: '#fff' });
              break;
            }
          case '109877':
            {
              reg.options.set({ fillColor: '#DC893D', opacity: 0.8, strokeColor: '#fff' });
              break;
            }
          case '110032':
            {
              reg.options.set({ fillColor: '#DC893D', opacity: 0.8, strokeColor: '#fff' });
              break;
            }
          case '109878':
            {
              reg.options.set({ fillColor: '#DC893D', opacity: 0.8, strokeColor: '#fff' });
              break;
            }
          case '109879':
            {
              reg.options.set({ fillColor: '#DC893D', opacity: 0.8, strokeColor: '#fff' });
              break;
            }
          case '253252':
            {
              reg.options.set({ fillColor: '#DC893D', opacity: 0.8, strokeColor: '#fff' });
              break;
            }
          case '109876':
            {
              reg.options.set({ fillColor: '#DC893D', opacity: 0.8, strokeColor: '#fff' });
              break;
            }
          /* end Северо-Кавказский федеральный округ*/

          /* begin Приволжский федеральный округ*/
          case '109876':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '77677':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '115114':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '72196':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '79374':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '115134':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '80513':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '115100':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '72195':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '77669':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '72182':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '72192':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '72194':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '72193':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '115135':
            {
              reg.options.set({ fillColor: '#F6A43AF2', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          /* end Приволжский федеральный округ*/

          /* begin Уральский федеральный округ*/
          case '140290':
            {
              reg.options.set({ fillColor: '#ffff00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '79379':
            {
              reg.options.set({ fillColor: '#ffff00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '140291':
            {
              reg.options.set({ fillColor: '#ffff00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '77687':
            {
              reg.options.set({ fillColor: '#ffff00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '140296':
            {
              reg.options.set({ fillColor: '#ffff00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '191706':
            {
              reg.options.set({ fillColor: '#ffff00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          /* end Уральский федеральный округ*/

          /* begin Сибирский федеральный округ*/
          case '145194':
            {
              reg.options.set({ fillColor: '#0000ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '145729':
            {
              reg.options.set({ fillColor: '#0000ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '145195':
            {
              reg.options.set({ fillColor: '#0000ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '190911':
            {
              reg.options.set({ fillColor: '#0000ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '144764':
            {
              reg.options.set({ fillColor: '#0000ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '145730':
            {
              reg.options.set({ fillColor: '#0000ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '190090':
            {
              reg.options.set({ fillColor: '#0000ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '145454':
            {
              reg.options.set({ fillColor: '#0000ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '144763':
            {
              reg.options.set({ fillColor: '#0000ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '140294':
            {
              reg.options.set({ fillColor: '#0000ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '140292':
            {
              reg.options.set({ fillColor: '#0000ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '140295':
            {
              reg.options.set({ fillColor: '#0000ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          /* end Сибирский федеральный округ*/

          /* begin Дальневосточный федеральный округ*/
          case '151234':
            {
              reg.options.set({ fillColor: '#8b00ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '151233':
            {
              reg.options.set({ fillColor: '#8b00ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '151225':
            {
              reg.options.set({ fillColor: '#8b00ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '151223':
            {
              reg.options.set({ fillColor: '#8b00ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '147166':
            {
              reg.options.set({ fillColor: '#8b00ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '151228':
            {
              reg.options.set({ fillColor: '#8b00ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '394235':
            {
              reg.options.set({ fillColor: '#8b00ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '147167':
            {
              reg.options.set({ fillColor: '#8b00ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '151231':
            {
              reg.options.set({ fillColor: '#8b00ff', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          /* end Дальневосточный федеральный округ*/

          /* begin Северо-Западный федеральный округ*/
          case '393980':
            {
              reg.options.set({ fillColor: '#ffa500', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '115136':
            {
              reg.options.set({ fillColor: '#ffa500', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '140337':
            {
              reg.options.set({ fillColor: '#ffa500', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '115106':
            {
              reg.options.set({ fillColor: '#ffa500', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '103906':
            {
              reg.options.set({ fillColor: '#ffa500', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '176095':
            {
              reg.options.set({ fillColor: '#ffa500', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '2099216':
            {
              reg.options.set({ fillColor: '#ffa500', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '89331':
            {
              reg.options.set({ fillColor: '#ffa500', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '155262':
            {
              reg.options.set({ fillColor: '#ffa500', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '337422':
            {
              reg.options.set({ fillColor: '#ffa500', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '274048':
            {
              reg.options.set({ fillColor: '#ffa500', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          /* end Северо-Западный федеральный округ*/

          /* begin Южный федеральный округ*/
          case '253256':
            {
              reg.options.set({ fillColor: '#61EC17', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '108083':
            {
              reg.options.set({ fillColor: '#61EC17', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '108082':
            {
              reg.options.set({ fillColor: '#61EC17', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '112819':
            {
              reg.options.set({ fillColor: '#61EC17', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '77665':
            {
              reg.options.set({ fillColor: '#61EC17', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '85606':
            {
              reg.options.set({ fillColor: '#61EC17', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          /* end Южный федеральный округ*/

          /* begin Центральный федеральный округ*/
          case '83184':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '81997':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '72197':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '72181':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '85617':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '81995':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '85963':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '72223':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '72169':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '51490':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '72224':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '71950':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '81996':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '72180':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '2095259':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '81993':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '81994':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          case '102269':
            {
              reg.options.set({ fillColor: '#7b3f00', opacity: 0.8, strokeColor: '#FFFFFF' });
              break;
            }
          /* end Центральный федеральный округ*/
        }
      });


      lastCollection.options.set({
        zIndex: 1,
        zIndexHover: 1,
        draggable: false
      });


      lastCollection.events.add('click', function (event) {
        var region = event.get('target');
        console.log(region.properties.get('name') + ' -> ' + region.properties.get('osmId'));

        var target = event.get('target');
        if (lastActiveRegion) {
          lastActiveRegion.options.set('preset', '')
        }
        lastActiveRegion = target;
        lastActiveRegion.options.set('preset', {
          strokeWidth: 3,
          fillColor: 'F99',
          strokeColor: '9f9'
        });
      });


      // var myPlacemark = new ymaps.GeoObject({
      //   geometry: {
      //     type: "Point",
      //     coordinates: [44.128040, 44.736990]
      //   },
      //   // Описываем данные геообъекта.
      //   properties: {
      //     hintContent: "Северо-Кавказский федеральный округ",
      //     balloonContentHeader: "Северо-Кавказский федеральный округ",
      //     balloonContentBody: "Россия"
      //   }
      // });

      var myPlacemark1 = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: [49.041646, 43.254042]
        },
        // Описываем данные геообъекта.
        properties: {
          hintContent: "Южный федеральный округ",
          balloonContentHeader: "Южный федеральный округ",
          balloonContentBody: "Кол-во ЗМК: 19. <br> Производительность тн/мес. 10,600"
        }
      });

      var myPlacemark2 = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: [55.424665, 38.240499]
        },
        // Описываем данные геообъекта.
        properties: {
          hintContent: "Центральный федеральный округ",
          balloonContentHeader: "Центральный федеральный округ",
          balloonContentBody: "Кол-во ЗМК: 25. <br> Производительность тн/мес. 16,650"
        }
      });

      var myPlacemark3 = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: [56.248661, 51.963736]
        },
        // Описываем данные геообъекта.
        properties: {
          hintContent: "Приволжский федеральный округ",
          balloonContentHeader: "Приволжский федеральный округ",
          balloonContentBody: "Кол-во ЗМК: 8. <br> Производительность тн/мес. 7,100"
        }
      });

      var myPlacemark4 = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: [63.335770, 36.146574]
        },
        // Описываем данные геообъекта.
        properties: {
          hintContent: "Северо-Западный федеральный округ",
          balloonContentHeader: "Северо-Западный федеральный округ",
          balloonContentBody: "Кол-во ЗМК: 11. <br> Производительность тн/мес. 6,200"
        }
      });

      var myPlacemark5 = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: [61.830704, 64.789900]
        },
        // Описываем данные геообъекта.
        properties: {
          hintContent: "Уральский федеральный округ",
          balloonContentHeader: "Уральский федеральный округ",
          balloonContentBody: "Кол-во ЗМК: 27. <br> Производительность тн/мес. 24,000"
        }
      });

      var myPlacemark6 = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: [64.218118, 98.192932]
        },
        // Описываем данные геообъекта.
        properties: {
          hintContent: "Сибирский федеральный округ",
          balloonContentHeader: "Сибирский федеральный округ",
          balloonContentBody: "Кол-во ЗМК: 14. <br> Производительность тн/мес. 7,600"
        }
      });

      var myPlacemark7 = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: [67.127115, 124.131856]
        },
        // Описываем данные геообъекта.
        properties: {
          hintContent: "Дальневосточный федеральный округ",
          balloonContentHeader: "Дальневосточный федеральный округ",
          balloonContentBody: "Кол-во ЗМК: 5. <br> Производительность тн/мес. 2,200"
        }
      });

      var myPlacemark8 = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: [53.424665, 25.240499]
        },
        // Описываем данные геообъекта.
        properties: {
          hintContent: "Беларусь",
          balloonContentHeader: "Беларусь",
          balloonContentBody: "Кол-во ЗМК: 5. <br> Производительность тн/мес. 4,400"
        }
      });

      // geoMap.geoObjects.add(myPlacemark);
      geoMap.geoObjects.add(myPlacemark1);
      geoMap.geoObjects.add(myPlacemark2);
      geoMap.geoObjects.add(myPlacemark3);
      geoMap.geoObjects.add(myPlacemark4);
      geoMap.geoObjects.add(myPlacemark5);
      geoMap.geoObjects.add(myPlacemark6);
      geoMap.geoObjects.add(myPlacemark7);
      geoMap.geoObjects.add(myPlacemark8);
      geoMap.geoObjects.add(lastCollection);


    }, function () {
      //alert('no response');
    });
  });
});

window.addEventListener('resize', function () {
  const firstscreen = document.querySelector('._firstscreen');

  if (firstscreen) {
    showHeaderHeight();
  }
});