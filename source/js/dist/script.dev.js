'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _swiper = _interopRequireWildcard(require("swiper"));

var _gsap = require("gsap");

var _ScrollTrigger = require("gsap/dist/ScrollTrigger");

var _smoothScrollbar = _interopRequireDefault(require("smooth-scrollbar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_swiper["default"].use([_swiper.Scrollbar, _swiper.Thumbs, _swiper.EffectFade, _swiper.Navigation, _swiper.Autoplay]);

_gsap.gsap.registerPlugin(_ScrollTrigger.ScrollTrigger);

//  высота вьюпорта
var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
window.addEventListener('resize', function () {
  // We execute the same script as before
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
}); // Функция получения координат элемента

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: Math.round(box.top + scrollbar.offset.y),
    bottom: Math.round(box.bottom + scrollbar.offset.y)
  };
} // Скролл к определенному элементу


function scrollToTop(element) {
  var elementTopPosition = getCoords(element).top;
  scrollbar.scrollTo(0, elementTopPosition, 600);
} // Паралакс эффект на картинках


function parallax() {
  var layers = document.getElementsByClassName("parallax__img");
  var layer, speed, yPos;

  for (var _i = 0; _i < layers.length; _i++) {
    layer = layers[_i];
    var top = scrollbar.offset.y - getCoords(layer).top;
    speed = layer.getAttribute('data-speed');

    var _yPos = -(top * speed / 100);

    layer.setAttribute('style', 'transform: translate3d(0px, ' + _yPos + 'px, 0px)');
  }
} // Соц.сети


function socialInteraction() {
  var socialBtn = document.querySelectorAll('.social__btn');
  var socialDrop = document.querySelectorAll('.social__dropdown');
  var btnWrap = document.querySelectorAll('.social__btn-item');

  var _loop = function _loop(_i2) {
    socialBtn[_i2].addEventListener('click', function () {
      socialDrop[_i2].classList.toggle('active');

      btnWrap[_i2].classList.toggle('active');

      var socialWrap = document.querySelectorAll('.social__btn-item');
      document.addEventListener('click', function (event) {
        for (var _i3 = 0; _i3 < socialWrap.length; _i3++) {
          var isClickInside = socialWrap[_i3].contains(event.target);

          if (!isClickInside) {
            socialDrop[_i3].classList.remove('active');

            btnWrap[_i3].classList.remove('active');
          }
        }
      });
    });
  };

  for (var _i2 = 0; _i2 < socialBtn.length; _i2++) {
    _loop(_i2);
  }
} // Шапка


function headerShowAndHideDesktop() {
  var traktorsContainer = document.querySelector('.traktors__container');
  var twoScreen = document.querySelector('.two-screen'); // if(videoMain){
  // 	if(getCoords(twoScreen).top < scrollbar.offset.y){
  // 		videoMain.pause();
  // 	}else if(getCoords(twoScreen).top >= scrollbar.offset.y){
  // 		if(document.querySelector('.button__video-controls--play').classList.contains('active')) {
  // 			videoMain.play();
  // 		}
  // 	}
  // }

  if (getCoords(header).top > 50 && getCoords(twoScreen).top >= scrollbar.offset.y) {
    header.classList.add('hide');
  } else if (getCoords(header).top < 0 || getCoords(header).top > 100 && getCoords(twoScreen).top <= scrollbar.offset.y) {
    header.classList.remove('hide');
  }

  if (getCoords(twoScreen).top >= scrollbar.offset.y) {
    header.classList.remove('js-scroll');
  } else if (getCoords(header).top > 50 && getCoords(twoScreen).top <= scrollbar.offset.y) {
    header.classList.add('js-scroll');
  }

  if (traktorsContainer) {
    if (getCoords(header).top > getCoords(traktorsContainer).top && getCoords(header).bottom < getCoords(traktorsContainer).bottom) {
      header.classList.add('js-hide');
      header.classList.add('js-scroll-hide');
    } else if (getCoords(header).top < getCoords(traktorsContainer).top || getCoords(header).bottom > getCoords(traktorsContainer).bottom) {
      header.classList.remove('js-hide');
      header.classList.remove('js-scroll-hide');
    }
  }
}

function hideAndShowHeaderMobile() {
  if (scrollbar.offset.y > 0) {
    header.classList.add('hide');
  } else if (scrollbar.offset.y == 0) {
    header.classList.remove('hide');
  }
} // Инициализация плавного скролла


var options = {
  damping: 0.04,
  delegateTo: document
};
var options2 = {
  damping: 0.04,
  continuousScrolling: false // delegateTo: document

};
var options3 = {
  damping: 0.04,
  continuousScrolling: false // delegateTo: document

};
var breakpoint = window.matchMedia('(min-width:767px)');
var header = document.querySelector('.header'); // Кнопка для вызова попапа на стр кировец

var btnMore; // Определения координат для GSAP относительно плавного скролла

_ScrollTrigger.ScrollTrigger.scrollerProxy(document.body, {
  scrollTop: function scrollTop(value) {
    if (arguments.length) {
      scrollbar.scrollTop = value;
    }

    return scrollbar.scrollTop;
  },
  getBoundingClientRect: function getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
});

var containerScroll = document.querySelector('.scroll');
var scrollbar;

if (containerScroll) {
  scrollbar = _smoothScrollbar["default"].init(containerScroll, options);
  scrollbar.addListener(_ScrollTrigger.ScrollTrigger.update);
  scrollbar.addListener(function () {
    parallax();
    showAndHideYearNav();
  });

  if (breakpoint.matches === true) {
    scrollbar.addListener(function () {
      if (header) {
        headerShowAndHideDesktop();
      }
    });
  } else if (breakpoint.matches === false) {
    scrollbar.addListener(function () {
      hideAndShowHeaderMobile();
    });
  }
}

var popupWrap = document.querySelectorAll('.scroll-popup');

for (var _i4 = 0; _i4 < popupWrap.length; _i4++) {
  var scrollbarPopup = _smoothScrollbar["default"].init(popupWrap[_i4], options2);

  scrollbarPopup.addListener(_ScrollTrigger.ScrollTrigger.update);
}

var containerNavScroll = document.querySelector('.nav_list-wrap');
var scrollbarNav;

if (containerNavScroll) {
  scrollbarNav = _smoothScrollbar["default"].init(containerNavScroll, options3);
  scrollbarNav.addListener(_ScrollTrigger.ScrollTrigger.update);
} // Инициализация свайперов


var swiperStatistics;
var swiperTabFeature1;
var swiperTabFeature2;
var swiperTab;
var swiperTabThumbs;
var swiperNews;
var swiperCompanies;
var companiesThumbs;
var swiperHero;
var transitionSlide = 15000;

var enableSwiper = function enableSwiper() {
  // document.addEventListener('DOMContentLoaded', function(){
  if (document.querySelector('.statistics__slider')) {
    swiperStatistics = new _swiper["default"]('.statistics__slider', {
      observer: true,
      observeParents: true,
      scrollbar: {
        el: '.swiper-scrollbar'
      }
    });
  }

  if (document.querySelector('.kirovets_tabs__features--1')) {
    var tabFeatures1 = document.querySelector('.kirovets_tabs__features--1');
    swiperTabFeature1 = new _swiper["default"](tabFeatures1, {
      observer: true,
      observeParents: true,
      scrollbar: {
        el: '.swiper-scrollbar'
      }
    });
  }

  if (document.querySelector('.kirovets_tabs__features--2')) {
    var tabFeatures2 = document.querySelector('.kirovets_tabs__features--2');
    swiperTabFeature2 = new _swiper["default"](tabFeatures2, {
      observer: true,
      observeParents: true,
      scrollbar: {
        el: '.swiper-scrollbar'
      }
    });
  }
}; // })


document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.news__container')) {
    var newNavPrev = document.querySelector('.news__container .swiper-button-next');
    var newNavNext = document.querySelector('.news__container .swiper-button-prev');
    swiperNews = new _swiper["default"]('.news__container', {
      // autoHeight: true,
      // observer: true,
      // 	observeParents: true,
      slidesPerView: 'auto',
      spaceBetween: 0,
      scrollbar: {
        el: '.swiper-scrollbar--news'
      },
      navigation: {
        nextEl: newNavPrev,
        prevEl: newNavNext
      },
      observer: true,
      observeParents: true,
      // updateOnWindowResize: true,
      slidesOffsetAfter: 0,
      breakpoints: {
        500: {
          spaceBetween: 20,
          slidesOffsetAfter: 200
        },
        767: {
          spaceBetween: 20,
          slidesOffsetAfter: 200
        },
        1280: {
          spaceBetween: 35,
          slidesOffsetAfter: 200
        }
      }
    });
  }

  if (document.querySelector('.swiper-container--companies')) {
    companiesThumbs = new _swiper["default"]('.swiper-container--companies-thumbs', {
      direction: 'vertical',
      spaceBetween: 20,
      slidesPerView: 'auto',
      autoHeight: true,
      // observer: true,
      // 	observeParents: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      breakpoints: {
        1680: {
          spaceBetween: 45
        }
      }
    });
    swiperCompanies = new _swiper["default"]('.swiper-container--companies', {
      // observer: true,
      // observeParents: true,
      // autoHeight: true,
      thumbs: {
        swiper: companiesThumbs
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      scrollbar: {
        el: '.swiper-scrollbar--companies'
      }
    });
    swiperCompanies.on('slidePrevTransitionStart', function () {
      var btnCompanies = document.querySelectorAll('.swiper-slide-active .button-more--inner');

      for (var _i5 = 0; _i5 < btnCompanies.length; _i5++) {
        btnCompanies[_i5].classList.add('is-inview-line');
      }

      _gsap.gsap.utils.toArray('.swiper-slide-active .companies__title .title--inner').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          y: '130%',
          rotateX: "-40deg",
          opacity: 0
        }, {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: 1,
          stagger: .13,
          ease: "power3.out",
          delay: 0
        });
      });

      _gsap.gsap.utils.toArray('.swiper-slide:not(.swiper-slide-active) .companies__title .title--inner').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          y: '0%',
          rotateX: 0,
          opacity: 1
        }, {
          y: '130%',
          rotateX: '-40deg',
          opacity: 0,
          duration: 1,
          stagger: .13,
          ease: "power3.out",
          delay: 0
        });
      });

      _gsap.gsap.utils.toArray('.swiper-slide-active .companies__desc').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          // y: '-50%',
          // rotateX: "-40deg",
          opacity: 0
        }, {
          // y: "0%",
          // rotateX: 0,
          opacity: 1,
          duration: 2,
          stagger: .13,
          ease: "power3.out",
          delay: 2
        });
      });

      _gsap.gsap.utils.toArray('.swiper-slide-active .button-more--inner').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          // y: '-50%',
          // rotateX: "-40deg",
          opacity: 0
        }, {
          // y: "0%",
          // rotateX: 0,
          opacity: 1,
          duration: 2,
          stagger: .13,
          ease: "power3.out",
          delay: 2
        });
      });
    });
    swiperCompanies.on('slideNextTransitionStart', function () {
      var btnCompanies = document.querySelectorAll('.swiper-slide-active .button-more--inner');

      for (var _i6 = 0; _i6 < btnCompanies.length; _i6++) {
        btnCompanies[_i6].classList.add('is-inview-line');
      }

      _gsap.gsap.utils.toArray('.swiper-slide-active .companies__title .title--inner').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          y: '130%',
          rotateX: "-40deg",
          opacity: 0
        }, {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: 1,
          stagger: .13,
          ease: "power3.out",
          delay: 0
        });
      });

      _gsap.gsap.utils.toArray('.swiper-slide:not(.swiper-slide-active) .companies__title .title--inner').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          y: '0%',
          rotateX: 0,
          opacity: 1
        }, {
          y: '130%',
          rotateX: '-40deg',
          opacity: 0,
          duration: 1,
          stagger: .13,
          ease: "power3.out",
          delay: 0
        });
      });

      _gsap.gsap.utils.toArray('.swiper-slide-active .companies__desc').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          // y: '-50%',
          // rotateX: "-40deg",
          opacity: 0
        }, {
          // y: "0%",
          // rotateX: 0,
          opacity: 1,
          duration: 2,
          stagger: .13,
          ease: "power3.out",
          delay: 2
        });
      });

      _gsap.gsap.utils.toArray('.swiper-slide-active .button-more--inner').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          // y: '-50%',
          // rotateX: "-40deg",
          opacity: 0
        }, {
          // y: "0%",
          // rotateX: 0,
          opacity: 1,
          duration: 2,
          stagger: .13,
          ease: "power3.out",
          delay: 2
        });
      });
    });
  }

  if (document.querySelector('.swiper-container--hero')) {
    var checkActiveSlideForVideo = function checkActiveSlideForVideo() {
      if (swiperHero.activeIndex == 1) {
        videoMain.play();
      } else {
        videoMain.pause();
      }
    };

    swiperHero = new _swiper["default"]('.swiper-container--hero', {
      loop: true,
      autoplay: {
        delay: transitionSlide,
        disableOnInteraction: true
      },
      navigation: {
        nextEl: '.hero__slider-controls .swiper-button-prev',
        prevEl: '.hero__slider-controls .swiper-button-next'
      },
      observer: true,
      observeParents: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    });
    swiperHero.on('slidePrevTransitionStart', function () {
      checkActiveSlideForVideo();

      _gsap.gsap.utils.toArray('.swiper-slide-active .hero__title .title--inner').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          y: '130%',
          rotateX: "-40deg",
          opacity: 0
        }, {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: 4,
          stagger: .13,
          ease: "power3.out",
          delay: 3
        });
      });

      _gsap.gsap.utils.toArray('.swiper-slide-active .hero__subtitle').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          y: '-50%',
          // rotateX: "-40deg",
          opacity: 0
        }, {
          y: "0%",
          // rotateX: 0,
          opacity: 1,
          duration: 2,
          stagger: .13,
          ease: "power3.out",
          delay: 2
        });
      });
    });
    swiperHero.on('slideNextTransitionStart', function () {
      checkActiveSlideForVideo();

      _gsap.gsap.utils.toArray('.swiper-slide-active .hero__title .title--inner').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          y: '130%',
          rotateX: "-40deg",
          opacity: 0
        }, {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: 4,
          stagger: .13,
          ease: "power3.out",
          delay: 3
        });
      });

      _gsap.gsap.utils.toArray('.swiper-slide-active .hero__subtitle').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          y: '-50%',
          // rotateX: "-40deg",
          opacity: 0
        }, {
          y: "0%",
          // rotateX: 0,
          opacity: 1,
          duration: 2,
          stagger: .13,
          ease: "power3.out",
          delay: 2
        });
      });
    });
  }

  if (document.querySelector('.kirovets_tabs__list-wrap')) {
    swiperTabThumbs = new _swiper["default"]('.kirovets_tabs__list-wrap', {
      observer: true,
      observeParents: true,
      slidesPerView: 2,
      watchSlidesVisibility: true,
      watchSlidesProgress: true
    });
  }

  if (document.querySelector('.kirovets_tabs__container')) {
    swiperTab = new _swiper["default"]('.kirovets_tabs__container', {
      observer: true,
      observeParents: true,
      thumbs: {
        swiper: swiperTabThumbs
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    });
  }
});

function updateSlider(slider) {
  if (slider != undefined) {
    slider.update();
  }
}

window.addEventListener("resize", function () {
  updateSlider(swiperStatistics);
  updateSlider(swiperTabFeature1);
  updateSlider(swiperTabFeature2);
  updateSlider(swiperTab);
  updateSlider(swiperTabThumbs);
  updateSlider(swiperNews);
  updateSlider(swiperCompanies);
  updateSlider(companiesThumbs);
  updateSlider(swiperHero);
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
});

function setMainSwiperMouseOver() {
  swiperTab.detachEvents(); // swiperTab.mousewheel.disable();
}

function setMainSwiperMouseOut() {
  swiperTab.attachEvents(); // swiperTab.mousewheel.enable();
}

var InnerSliders = document.querySelectorAll('.kirovets_tabs__features');

var breakpointChecker = function breakpointChecker() {
  // if larger viewport and multi-row layout needed
  if (breakpoint.matches === true) {
    if (swiperStatistics != null) {
      swiperStatistics.destroy(true, true);
      swiperStatistics.update();
    }

    if (document.querySelector('.statistics__slider')) {
      document.querySelector('.statistics__slider').classList.remove('swiper-container');
      document.querySelector('.statistics__list').classList.remove('swiper-wrapper');
      var statSlides = document.querySelectorAll('.statistics__item');

      for (var _i7 = 0; _i7 < statSlides.length; _i7++) {
        statSlides[_i7].classList.remove('swiper-slide');
      }
    }

    if (document.querySelector('.kirovets_tabs__container')) {
      if (swiperTabFeature1 != null) {
        swiperTabFeature1.destroy(true, true);
        swiperTabFeature1.update();
      }

      if (swiperTabFeature2 != null) {
        swiperTabFeature2.destroy(true, true);
        swiperTabFeature2.update();
      }

      for (var _i8 = 0; _i8 < InnerSliders.length; _i8++) {
        InnerSliders[_i8].classList.remove('swiper-container');

        InnerSliders[_i8].querySelector('.kirovets_tabs__features-list').classList.remove('swiper-wrapper');

        var slides = InnerSliders[_i8].querySelectorAll('.kirovets_tabs__features-item');

        for (var _i9 = 0; _i9 < slides.length; _i9++) {
          slides[_i9].classList.remove('swiper-slide');
        }

        InnerSliders[_i8].removeEventListener('mouseover', setMainSwiperMouseOver);

        InnerSliders[_i8].removeEventListener('mouseout', setMainSwiperMouseOut);
      }
    } // Анимация элементов


    _gsap.gsap.utils.toArray('.is-animate').forEach(function (element) {
      var parallax = element.getAttribute('data-speed');
      var speed = parallax * 100 + '%';

      _gsap.gsap.fromTo(element, {
        // duration: 5,
        y: speed
      }, {
        y: "0%",
        force3D: true,
        scrollTrigger: {
          trigger: element,
          scrub: true // start: "top top"

        }
      });
    });

    btnMore = document.querySelectorAll('.traktors__text-wrap--desktop .button-more--traktors');
  } else if (breakpoint.matches === false) {
    if (document.querySelector('.kirovets_tabs__container')) {
      for (var _i10 = 0; _i10 < InnerSliders.length; _i10++) {
        InnerSliders[_i10].addEventListener('mouseover', setMainSwiperMouseOver);

        InnerSliders[_i10].addEventListener('mouseout', setMainSwiperMouseOut);

        InnerSliders[_i10].classList.add('swiper-container');

        InnerSliders[_i10].querySelector('.kirovets_tabs__features-list').classList.add('swiper-wrapper');

        var _slides = InnerSliders[_i10].querySelectorAll('.kirovets_tabs__features-item');

        for (var _i11 = 0; _i11 < _slides.length; _i11++) {
          _slides[_i11].classList.add('swiper-slide');
        }
      }
    }

    if (document.querySelector('.statistics__slider')) {
      document.querySelector('.statistics__slider').classList.add('swiper-container');
      document.querySelector('.statistics__list').classList.add('swiper-wrapper');

      var _statSlides = document.querySelectorAll('.statistics__item');

      for (var _i12 = 0; _i12 < _statSlides.length; _i12++) {
        _statSlides[_i12].classList.add('swiper-slide');
      }
    }

    enableSwiper();
    btnMore = document.querySelectorAll('.traktors__text-wrap--tablet .button-more--traktors');
  }
};

breakpoint.addListener(breakpointChecker);
breakpointChecker(); // Конец свайперов
// Плавный ссылки в годах

var makeNavLinksSmooth = function makeNavLinksSmooth() {
  var navLinks = document.querySelectorAll('.traktors__nav-link');
  var section = document.querySelectorAll('.traktors');

  var _loop2 = function _loop2(n) {
    // if ( navLinks.hasOwnProperty( n ) ) {
    navLinks[n].addEventListener('click', function (e) {
      // const id = section[ n ].id;
      e.preventDefault();
      scrollToTop(section[n]);
    }); // }
  };

  for (var n = 0; n < navLinks.length; n++) {
    _loop2(n);
  }
}; // Наблюдение за ссылками при скролле


var spyScrolling = function spyScrolling() {
  var sections = document.querySelectorAll('.traktors');
  var scrollPos = scrollbar.offset.y; // считывает или устанавливает количество пикселей, прокрученных от верха элемент 

  for (var s in sections) {
    if (sections.hasOwnProperty(s) && getCoords(sections[s]).top - 100 <= scrollPos) {
      var id = sections[s].id;
      document.querySelector('.traktors__nav-link.active').classList.remove('active');
      document.querySelector("a[href*=".concat(id, "]")).classList.add('active');
    }
  }
}; // Скрытие / открытие навигации по годам


function showAndHideYearNav() {
  var yearNav = document.querySelector('.traktors__nav');

  if (yearNav) {
    document.addEventListener('DOMContentLoaded', function () {
      yearNav.style.opacity = "0";
    });
    var containerNav = document.querySelector('.traktors__container');
    var yearNavTopY = getCoords(yearNav).top;
    var yearNavBottomY = getCoords(yearNav).bottom;
    var containerNavTopY = getCoords(containerNav).top;
    var containerNavBottomY = getCoords(containerNav).bottom;

    if (yearNavTopY >= containerNavTopY && yearNavBottomY < containerNavBottomY) {
      yearNav.style.opacity = "1";
      yearNav.style.pointerEvents = "auto";
      yearNav.style.zIndex = "5";
      spyScrolling();
    } else if (yearNavTopY <= containerNavTopY || yearNavBottomY >= containerNavBottomY) {
      yearNav.style.opacity = "0";
      yearNav.style.pointerEvents = "none";
      yearNav.style.zIndex = "-1";
    }

    makeNavLinksSmooth();
  }
} // Видео


var videoMain = document.querySelector('.parallax__img-video');

if (videoMain) {
  var playPauseMedia = function playPauseMedia() {
    if (videoMain.paused) {
      videoMain.style.display = "block";
      videoMain.play();
      btnPlay.classList.add('active');
    } else {
      videoMain.pause();
      btnPlay.classList.remove('active');
    }
  };

  var btnPlay = document.querySelector('.button__video-controls--play');
  btnPlay.addEventListener('click', playPauseMedia);
  var btnsPlaySlider = document.querySelectorAll('.button__video-controls--other');

  for (var _i13 = 0; _i13 < btnsPlaySlider.length; _i13++) {
    btnsPlaySlider[_i13].addEventListener('click', function () {
      console.log('hi');
      swiperHero.slideToLoop(0, 100, true);
      videoMain.currentTime = 0;
    });
  }
} // Анимация


document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    setTimeout(function () {
      document.querySelector('.preloader').style.display = "none";

      _gsap.gsap.utils.toArray('.traktors__number-icon').forEach(function (element) {
        _ScrollTrigger.ScrollTrigger.create({
          trigger: element,
          scrub: true,
          toggleClass: 'is-inview',
          // this toggles the class again when you scroll back up:
          toggleActions: 'play none none none' // this removes the class when the scrolltrigger is passed:
          // once: true,

        });
      });

      _gsap.gsap.utils.toArray('.company_group__item-icon').forEach(function (element) {
        _ScrollTrigger.ScrollTrigger.create({
          trigger: element,
          scrub: true,
          toggleClass: 'is-inview',
          // this toggles the class again when you scroll back up:
          toggleActions: 'play none none none' // this removes the class when the scrolltrigger is passed:
          // once: true,

        });
      });

      _gsap.gsap.utils.toArray('.property__pic').forEach(function (element) {
        _ScrollTrigger.ScrollTrigger.create({
          trigger: element,
          // scrub: true,
          toggleClass: 'is-inview' // this toggles the class again when you scroll back up:
          // toggleActions: 'play none none none',
          // this removes the class when the scrolltrigger is passed:
          // once: true,

        });
      });

      _gsap.gsap.utils.toArray('.traktors__info-wrap').forEach(function (element) {
        _ScrollTrigger.ScrollTrigger.create({
          trigger: element,
          start: 'bottom bottom',
          scrub: true,
          toggleClass: 'is-inview-line',
          // this toggles the class again when you scroll back up:
          toggleActions: 'play none none none' // this removes the class when the scrolltrigger is passed:
          // once: true,

        });
      });

      _gsap.gsap.utils.toArray('.title--inner-main').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          y: '130%',
          rotateX: "-40deg",
          opacity: 0
        }, {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: 2,
          stagger: .13,
          ease: "power3.out",
          delay: .2
        });
      });

      _gsap.gsap.utils.toArray('.title--inner').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          y: '130%',
          rotateX: "-40deg",
          opacity: 0
        }, {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: 2,
          stagger: .13,
          ease: "power3.out",
          delay: .2,
          // force3D: true,
          scrollTrigger: {
            trigger: element,
            // scrub: true,
            start: "bottom bottom"
          }
        });
      });

      _gsap.gsap.fromTo(".footer__outer", {
        y: '-20%'
      }, {
        y: "0%",
        duration: 0.3,
        ease: "none",
        // pin: true,
        // force3D: true,
        scrollTrigger: {
          trigger: ".footer",
          start: 'top bottom',
          // pin: true,
          toggleActions: "play reverse play reverse" // scrub: true,
          // pinSpacing: false
          // start: "top c"

        }
      });

      _gsap.gsap.utils.toArray('.statictics--inner').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          opacity: 0,
          y: "25px"
        }, {
          y: "0%",
          duration: 1,
          opacity: 1,
          // stagger: .2,
          // ease: "ease",
          scrollTrigger: {
            trigger: element,
            // scrub: true,
            start: "bottom bottom"
          }
        });
      });

      _gsap.gsap.utils.toArray('.hero__subtitle').forEach(function (element) {
        _gsap.gsap.fromTo(element, {
          y: '-50%',
          // rotateX: "-40deg",
          opacity: 0
        }, {
          y: "0%",
          // rotateX: 0,
          opacity: 1,
          duration: 2,
          // stagger: .13,
          ease: "power3.out",
          delay: 2
        });
      });

      _gsap.gsap.utils.toArray('.button-more').forEach(function (element) {
        _ScrollTrigger.ScrollTrigger.create({
          trigger: element,
          start: 'bottom bottom',
          scrub: true,
          toggleClass: 'is-inview-line',
          // this toggles the class again when you scroll back up:
          toggleActions: 'play none none none' // this removes the class when the scrolltrigger is passed:
          // once: true,

        });
      });

      _gsap.gsap.utils.toArray('.button-line').forEach(function (element) {
        _ScrollTrigger.ScrollTrigger.create({
          trigger: element,
          toggleClass: 'is-inview'
        });
      });
    }, 9000);
  }
};

var socialContainer = document.querySelector('.social__btn-list');

if (socialContainer) {
  socialInteraction();
} // Меню


var burger = document.querySelector('.js-nav-toggle');

if (burger) {
  (function () {
    var btnSearch = document.querySelector('.js-search-text');
    var dropList = document.querySelectorAll('.js-dropdown');
    var navList = document.querySelector('.nav_list');
    var navLink = navList.querySelectorAll('.js-dropdown-toggle');
    var navItem = navList.querySelectorAll('.js-dropdown');
    burger.addEventListener('click', function () {
      document.body.classList.toggle('has-nav-open');
      document.body.classList.remove('has-search-open');

      var _loop3 = function _loop3(_i14) {
        navItem[_i14].addEventListener('mouseover', function () {
          navItem[_i14].querySelector('.js-dropdown-toggle').classList.add('active');
        });

        navItem[_i14].addEventListener('mouseleave', function () {
          navItem[_i14].querySelector('.js-dropdown-toggle').classList.remove('active');
        });
      };

      for (var _i14 = 0; _i14 < navItem.length; _i14++) {
        _loop3(_i14);
      }
    });
    btnSearch.addEventListener('click', function () {
      document.body.classList.toggle('has-search-open');
    });

    if (window.screen.width < 1199) {
      var _loop4 = function _loop4(_i15) {
        navItem[_i15].addEventListener('click', function (event) {
          navLink[_i15].classList.toggle('active');

          navItem[_i15].classList.toggle('active'); // this.querySelector('.c-nav_dropdown').classList.add('active');


          navItem[_i15].querySelector('.nav_dropdown').classList.toggle('active'); // if(!this.contains(event.target)){
          // 	navItem[i].classList.remove('active');
          // 	navItem[i].querySelector('.nav_dropdown').classList.remove('active');
          // 	navLink[i].classList.remove('active');
          // }

        });
      };

      for (var _i15 = 0; _i15 < dropList.length; _i15++) {
        _loop4(_i15);
      }
    }
  })();
}

var popup = document.querySelectorAll('.popup_kirovets');

var _loop5 = function _loop5(_i16) {
  var number = popup[_i16].querySelector('.traktors__number--popup');

  var numbers = number.querySelectorAll('.traktors__number-icon');

  for (var _i18 = 0; _i18 < numbers.length; _i18++) {
    numbers[_i18].classList.remove('is-inview');
  }

  btnMore[_i16].addEventListener('click', function (event) {
    event.preventDefault();

    popup[_i16].classList.add('active');

    for (var _i19 = 0; _i19 < numbers.length; _i19++) {
      numbers[_i19].classList.add('is-inview');
    }

    var btnBack = popup[_i16].querySelector('.popup_kirovets__back');

    btnBack.addEventListener('click', function (event) {
      popup[_i16].classList.remove('active');

      for (var _i20 = 0; _i20 < numbers.length; _i20++) {
        numbers[_i20].classList.remove('is-inview');
      }
    });

    var btnClose = popup[_i16].querySelector('.popup_kirovets__close');

    btnClose.addEventListener('click', function (event) {
      popup[_i16].classList.remove('active');

      for (var _i21 = 0; _i21 < numbers.length; _i21++) {
        numbers[_i21].classList.remove('is-inview');
      }
    });
  });
};

for (var _i16 = 0; _i16 < popup.length; _i16++) {
  _loop5(_i16);
} // Добавление видимость параграфам 


if (window.screen.width < 767) {
  var paragraph = document.querySelector('.zavod-text--main');
  var paragraphBtnMore = document.querySelector('.button-more--zavod ');
  var wrapper = document.querySelector('.zavod');

  if (paragraph) {
    paragraphBtnMore.addEventListener('click', function () {
      paragraph.classList.add('show');
      paragraphBtnMore.style.display = "none";
      wrapper.classList.add('active');
    });
  }
} // accordion


var acc = document.getElementsByClassName("akcioner-info__accordion-item");
var menu = document.getElementsByClassName("akcioner-info__menu-icon");
var contactNavItem = document.getElementsByClassName("contacts-sidebar__nav-item");
var navItem = document.getElementsByClassName("contacts-navigation-list__item");
var actionerNavItem = document.getElementsByClassName('akcioner-navigation-list__item-active');
var contactsMenuItem = document.getElementsByClassName('contacts-navigation-list__item-active');
var contactsMenu = document.getElementsByClassName("contacts-menu-container");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

for (i = 0; i < menu.length; i++) {
  menu[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

for (i = 0; i < contactsMenuItem.length; i++) {
  contactsMenuItem[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

for (i = 0; i < actionerNavItem.length; i++) {
  actionerNavItem[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

for (i = 0; i < contactNavItem.length; i++) {
  contactNavItem[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

for (i = 0; i < navItem.length; i++) {
  navItem[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("contacts-navigation-list__item-active");
    current[0].className = current[0].className.replace(" contacts-navigation-list__item-active", "");
    this.className += " contacts-navigation-list__item-active";
  });
}

if (document.querySelector('.geography')) {
  //Добавление класса active к городам section-geography__map-item в рандомном порядке 
  var toggleActiveClass = function toggleActiveClass() {
    var elements = document.querySelectorAll('.section-geography__map-item');

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains('active')) {
        elements[i].classList.remove('active');
        var nextActive = Math.floor(Math.random() * elements.length);

        while (nextActive == i) {
          nextActive = Math.floor(Math.random() * elements.length);
        }

        elements[nextActive].classList.add('active');
        break;
      }
    }
  };

  var elements = document.querySelectorAll('.section-geography__map-item');

  var startTogglingActiveClass = function startTogglingActiveClass() {
    elements[0].classList.add('active');
    return setInterval(toggleActiveClass, 2000);
  };

  var intervalID = startTogglingActiveClass();
}

if (screen.width >= 1280) {
  (function () {
    var body = document.body;
    var parallaxHor = document.querySelectorAll(".parallax__img--horizontal");

    var _loop6 = function _loop6(_i17) {
      body.addEventListener('mousemove', function (e) {
        var speed = parallaxHor[_i17].getAttribute('data-speed');

        var x = -(e.pageX + this.offsetLeft) / speed;
        parallaxHor[_i17].style.transform = 'translate3d(' + x + 'px,' + '0px, 0px)'; // blobs[0].style.transform = 'translate3d(' + -x + 'px,' + -y + 'px, 0px)';
      });
    };

    for (var _i17 = 0; _i17 < parallaxHor.length; _i17++) {
      _loop6(_i17);
    }
  })();
} // let preloader = document.querySelector('.preloader');
// preloader.classList.add('animate');