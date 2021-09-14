'use strict';


import barba from '@barba/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import InstagramFeed from 'instafeed';
import ScrollbarSmoth from 'smooth-scrollbar';
import svg4everybody from 'svg4everybody';
import Swiper, { Autoplay, EffectFade, Keyboard, Lazy, Mousewheel, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';

Swiper.use([Scrollbar, Thumbs, EffectFade, Pagination, Navigation, Autoplay, Mousewheel, Keyboard, Lazy]);


gsap.registerPlugin(ScrollTrigger);



function ajaxSearch() {
    function get_result() {
        //очищаем результаты поиска
        $('#search_result').html('');
        $('#search_result').css('display', 'block');

        $('#reset_live_search').css('display', 'block');
        //пока не получили результаты поиска - отобразим прелоадер
        // $('#search_result').append('<div><img width="30" src="/search/preloader.GIF"></div>');
        $.ajax({
            type: "POST",
            url: "/search/ajax_search.php",
            data: "q=" + q,
            dataType: 'json',
            success: function(json) {
                //очистим прелоадер
                $('#search_result').html('');
                $('#search_result').append('<div class="live-search"></div>');
                //добавляем каждый элемент массива json внутрь div-ника с class="live-search" (вёрстку можете использовать свою)
                $.each(json, function(index, element) {
                    $('#search_result').find('.live-search').append('<a href="' + element.URL + '" class="live-search__item no-barba"><span class="live-search__item-inner"><span class="live-search__item-name"><span class="live-search__item-hl">' + element.TITLE + '</span><p style="color:#999;">' + element.DATE_CHANGE + '</p></a>');
                    //console.log (element.BODY_FORMATED);
                });
            }
        });
    }
    var timerAjax = 0;
    var q = '';
    $(document).ready(function() {
        $('#q').keyup(function() {

            q = this.value;
            clearTimeout(timerAjax);
            timerAjax = setTimeout(get_result, 100);
        });
        $('#reset_live_search').click(function() {
            $('#search_result').html('');
            $('#search_result').css('display', 'none');
            $('#reset_live_search').css('display', 'none');
        });
        $(".vac-d-form-test2").on("click", function() {

                $(".vac-d-form2").hide(200),
                    $(".share_wrap").fadeOut(200)
            }),
            document.addEventListener('click', function(event) {

                // let target = event.target;
                if (event.target != $('.press-searchbar')) {
                    $('#search_result').css('display', 'none');
                    $('#reset_live_search').css('display', 'none');
                }
            });
    });
}


// import $ from "jquery";
var $ = require("jquery");
window.jQuery = $;






var fancybox = require("@fancyapps/fancybox");

$('[data-fancybox="gallery"]').fancybox({
    // Options will go here
});

$('[data-fancybox]').fancybox({
    youtube: {
        controls: 0,
        showinfo: 0
    },
    vimeo: {
        color: 'f00'
    }
});
$.fancybox.defaults.backFocus = false;


svg4everybody();



// Инста виджет
function instagramFeedInit() {

    let instafeed = document.querySelectorAll('.instafeed');

    for (let i = 0; i < instafeed.length; i++) {

        $.instagramFeed({
            'username': 'kirovskyzavod',
            'container': instafeed[i],
            'display_profile': false,
            'display_biography': false,
            'display_gallery': true,
            'display_captions': false,
            'callback': null,
            'styling': true,
            'items': 9,
            'items_per_row': 3,
            'margin': 0.5,
            'lazy_load': true,
            'on_error': console.error
        });
    }

}

// Проверка на ИЕ

function isInternetExplorer() {
    return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
}

// Заакртыие и открытие модалок

function showModalForm(id) {
    if (id) {
        if (document.querySelector(window.location.hash) && !document.querySelector(window.location.hash).classList.contains('tabs-common-content') && !document.querySelector(window.location.hash).classList.contains('press-news-in-main-text')) {
            let modal = document.querySelector(id);
            let overlay = document.querySelector('.overlay')
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
        }
    }

}

function closeModalForm(id) {

    if (id) {
        if (document.querySelector(window.location.hash)) {
            if (document.querySelector(window.location.hash) && !document.querySelector(window.location.hash).classList.contains('tabs-common-content') && !document.querySelector(window.location.hash).classList.contains('press-news-in-main-text')) {
                let modal = document.querySelector(id);

                let btnOk = modal.querySelector('button');
                let overlay = document.querySelector('.overlay')
                btnOk.addEventListener('click', function() {
                    modal.classList.add('modal-hidden');
                    overlay.classList.add('modal-hidden');
                })
                overlay.addEventListener('click', function() {
                    modal.classList.add('modal-hidden');
                    overlay.classList.add('modal-hidden');
                })
            }
        }
    }

}



// Вспомогательные функции

var Visible = function(target) {
    // Все позиции элемента
    var targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
        // Получаем позиции окна
        windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };

    if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
        targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
        targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
        targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
        // Если элемент полностью видно, то запускаем следующий код

        return true;
    } else {
        // Если элемент не видно, то запускаем этот код
        return false;
    };
};

// Получение высоты элемента
function knowHeightOfElement(el, block) {
    let elements = document.querySelectorAll(el);
    let elementsWidth;
    let elementsHeight;
    let blocks = document.querySelectorAll(block);
    for (let i = 0; i < elements.length; i++) {
        elementsWidth = elements[i].offsetWidth;
        elementsHeight = elements[i].offsetHeight;
        blocks[i].style.height = elementsHeight + 'px';
        blocks[i].style.width = elementsWidth + 'px';

    }
}

// Функция получения координат элемента
function getCoords(elem) {

    let box = elem.getBoundingClientRect();

    return {
        top: Math.round(box.top + scrollProgress),
        bottom: Math.round(box.bottom + scrollProgress)
    };

}

// Получение координат для панорамы
function getCoordsFrame(elem) {
    let box = elem.getBoundingClientRect();

    return {

        left: Math.round(box.left),
        right: Math.round(box.right),
        top: Math.round(box.top),
        bottom: Math.round(box.bottom)
    };
}


let getCoordsNew = function(el) {
    let block = $(el),
        offset = block.offset(),
        topOffset = offset.top,
        bottomOffset = topOffset + block.outerHeight();
    return {
        top: topOffset,
        bottom: bottomOffset
    }
};

// Для формы функции скролла писал рома
function scrollToTopForm(element, pxs) {
    let elementTopPosition = -(getCoordsNew(element).top) - pxs;
    if (scrollbar) {
        scrollbar.scrollTo(0, elementTopPosition, 900);
    } else {
        window.scrollTo({
            top: elementTopPosition,
            behavior: "smooth"
        });
    }

}
// Скролл к определенному элементу
function scrollToTop(element) {

    let elementTopPosition = getCoords(element).top;


    if (scrollbar) {
        scrollbar.scrollTo(0, elementTopPosition, 1000);
    } else {

        console.log('ДОЛЖНО СКРОЛЛИТСЯ');
        window.scrollTo({
            top: elementTopPosition,
            behavior: "smooth"
        });
    }

}

function scrollToTopStatic(element) {

    let elementTopPosition = getCoordsFrame(element).top;


    if (scrollbar) {
        scrollbar.scrollTo(0, elementTopPosition, 1000);
    } else {
        window.scrollTo({
            top: elementTopPosition,
            behavior: "smooth"
        });
    }

}

function scrollToTopStaticLink(element) {

    let elementTopPosition = getCoordsFrame(element).top - header.offsetHeight;


    if (scrollbar) {
        scrollbar.scrollTo(0, elementTopPosition, 1000);
    } else {
        window.scrollTo({
            top: elementTopPosition,
            behavior: "smooth"
        });
    }

}

// Скролл в аккордеоне
function scrollToTopH(element) {

    let elementTopPosition = getCoords(element).top - header.offsetHeight;
    if (scrollbar) {
        scrollbar.scrollTo(0, elementTopPosition, 500);
    } else {
        window.scrollTo({
            top: elementTopPosition,
            behavior: "smooth"
        });
    }


}


// Скролл к определенному элементу на страницы история
function scrollToTopHistory(element) {
    let elementTopPosition = getCoords(element).top + 50;


    if (scrollbar) {
        scrollbar.scrollTo(0, elementTopPosition, 1000);
    } else {
        window.scrollTo({
            top: elementTopPosition,
            behavior: "smooth"
        });
    }
}

// Скролл к определенному элементу музей
function scrollToTopMuseum(element) {
    let museumNavHeight = document.querySelector('.museum-nav').offsetHeight;
    let elementTopPosition = getCoords(element).top;
    if (scrollbar) {
        scrollbar.scrollTo(0, elementTopPosition - (museumNavHeight / 2), 600);
    } else {
        window.scrollTo({
            top: elementTopPosition - (museumNavHeight / 2),
            behavior: "smooth"
        });
    }
}
// Проверка урлов для выделения ссылок или смены заголовков
function checkUrlForTabs(links) {
    // e.preventDefault();


    let tabsLink = document.querySelectorAll(links);
    for (let i = 0; i < tabsLink.length; i++) {
        if (tabsLink[i].getAttribute('href') == window.location.hash) {
            if (scrollbar) {
                setTimeout(function() {
                    window.scrollTo(0, 0);
                }, 1);
            }
            removeActivity(tabsLink);
            tabsLink[i].classList.add('active');
            let tabcontent = document.querySelectorAll(".tabs-common-content");

            removeActivity(tabcontent);
            document.getElementById(tabsLink[i].dataset.tab).classList.add('active')
            document.getElementById(tabsLink[i].dataset.tab).classList.add('leave')

        }
    }
}

function checkUrl(links) {
    let barbalink = document.querySelectorAll(links);
    removeActivity(barbalink);
    for (let i = 0; i < barbalink.length; i++) {
        let path = window.location.href;

        let pathСategory = path.split('?')[0];
        let linkCategory = barbalink[i].href.split('?')[0];
        if (pathСategory == linkCategory) {
            barbalink[i].classList.add('active');
        }
        if (document.body.classList.contains('actioners')) {
            let pathAct = path.split('/')[3];
            let linkAct = barbalink[i].href.split('/')[3];
            if (barbalink[i].classList.contains('tabs-common-links')) {
                if (pathAct == linkAct) {
                    barbalink[i].classList.add('active');
                }
            }
        }
        if (barbalink[i].href == window.location.href) {

            if (path.indexOf(barbalink[i].href) > -1) {
                barbalink[i].classList.add('active');
            }

        }
    }
}

function checkUrlForTitle(title) {
    let header = document.querySelectorAll(title);

    for (let i = 0; i < header.length; i++) {


        let path = window.location.pathname;
        header[i].dataset.name = path;

        let namePage = header[i].dataset.name;


        // console.log(path + 'путь к странице');
        if (path.indexOf(namePage) > -1) {

            let camelPath = path.replace(/[\.\/]/g, '');

            // console.log('data-' + camelPath);

            let title = header[i].getAttribute('data-' + camelPath);

            header[i].innerHTML = title;


        } else {

        }

    }
}

function checkUrlForBg(title) {
    let header = document.querySelectorAll(title);

    for (let i = 0; i < header.length; i++) {
        let namePage = header[i].dataset.name;
        let path = window.location.pathname;

        if (namePage == path) {
            header[i].classList.add('active');
        } else {
            header[i].classList.remove('active');
        }

    }
}

function checkUrlForSide() {
    let path = window.location.href;
    let pathSplit = path.split('&')[0]
    let link = document.querySelectorAll('.press-rigt-side-bar-theme-button');
    for (let i = 0; i < link.length; i++) {


        if (link[i].href == pathSplit) {
            let current = link[i];

            if (current) {

                let text = current.textContent;

                if (text != 'ВСЕ') {
                    let title = document.querySelector('.main__title');
                    let textTitle = title.innerHTML;
                    title.innerHTML = textTitle + '<div class="title--inner-main title--inner-main--sub press-header-title" style="opacity: 1; transform: translate(0px, 0%); display:block;">' + text + '</div>'
                }
            }
        }


    }
}

// Паралакс эффект на картинках

// Удаление стилей для моб
function parallaxRemove(layer) {
    // let layers = items;

    // for (let i = 0; i < layers.length; i++) {
    // let layer = layers[i];
    if (layer) {
        layer.removeAttribute('style');
    }

    // }
}
let layerTop;

function parallax(layer) {
    // let layers = items;
    let speed;
    let yPos;
    // for (let i = 0; i < layers.length; i++) {
    // let layer = layers[i];
    layerTop = getCoords(layer).top;


    speed = layer.getAttribute('data-speed');
    top = scrollProgress - layerTop;
    yPos = -(top * speed / 100);
    if (scrollbar.isVisible(layer)) {
        layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
    }

    // }
}

function parallaxSlide(layer, firstChild) {
    // let layers = items;
    let speed;
    let yPos;
    // for (let i = 0; i < layers.length; i++) {
    // let layer = layers[i];
    layerTop = getCoords(firstChild).top;
    speed = firstChild.getAttribute('data-speed');
    top = scrollProgress - layerTop;
    yPos = -(top * speed / 100);
    if (scrollbar.isVisible(firstChild)) {
        layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
    }

    // }
}

function parallaxSlideNews(layer, firstChild) {
    // let layers = items;
    let speed;
    let yPos;
    // for (let i = 0; i < layers.length; i++) {
    // let layer = layers[i];
    layerTop = getCoords(firstChild).top;
    speed = firstChild.getAttribute('data-speed');
    top = scrollProgress - layerTop;
    yPos = -(top * speed / 100);
    let news = document.querySelector('.news')
    if (scrollbar.isVisible(news)) {
        layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
    }

    // }
}

function parallaxSlideCompanies(layer, firstChild) {
    // let layers = items;
    let speed;
    let yPos;
    // for (let i = 0; i < layers.length; i++) {
    // let layer = layers[i];
    layerTop = getCoords(firstChild).top;
    speed = layer.getAttribute('data-speed');
    top = scrollProgress - layerTop;
    yPos = -(top * speed / 100);
    // let news = document.querySelector('.companies-news')
    if (scrollbar.isVisible(firstChild)) {
        layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
    }

    // }
}


function parallaxSlideTwo(layer, firstChild) {
    // let layers = items;
    let speed;
    let yPos;
    // for (let i = 0; i < layers.length; i++) {
    // let layer = layers[i];
    layerTop = getCoords(firstChild).top;
    speed = layer.getAttribute('data-speed');
    top = scrollProgress - layerTop;
    yPos = -(top * speed / 100);
    if (scrollbar.isVisible(firstChild)) {
        layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
    }

    // }
}

// Добавление стилей при первой загрузке
function parallaxOnLoad(items) {
    let layers = items;
    let speed;
    let yPos;
    let layerTop;
    for (let i = 0; i < layers.length; i++) {
        let layer = layers[i];
        layerTop = getCoords(layer).top;
        speed = layer.getAttribute('data-speed');
        top = 15 - layerTop;
        yPos = -(top * speed / 100);
        if (top <= 0) {
            layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
        }


    }

}

// Горизонтальный паралакс
function horParallax() {
    let parallaxHor = document.querySelectorAll(".parallax__img--horizontal");
    let wrapperHor = document.querySelector('.strategy_about');


    for (let i = 0; i < parallaxHor.length; i++) {
        wrapperHor.addEventListener('mousemove', function(e) {

            let speed = parallaxHor[i].getAttribute('data-speedhor');
            let x = -(e.pageX + this.offsetLeft) / speed;

            parallaxHor[i].style.transform = 'translate3d(' + x + 'px,' + '0px, 0px)';

        })
    }
}


let scrollbarYear;
// В пресс-центре появление модалки выбора года на десктопе
function yearSelection() {
    let yearSelect = document.querySelector('.press-dropdown-list');
    if (yearSelect) {

        let containerYearScroll = document.querySelector('.press-dropdown-list-content');
        if (containerYearScroll) {
            scrollbarYear = ScrollbarSmoth.init(containerYearScroll, options2);
        }
        let dropdown = document.getElementById("myDropdown");
        let btnSelect = document.querySelector('.press-rigt-side-bar-date-button-drop')

        btnSelect.addEventListener('click', function() {
            dropdown.classList.add("show");
        })

        document.addEventListener('click', function(event) {
            if (!event.target.classList.contains('press-rigt-side-bar-date-button-drop')) {
                dropdown.classList.remove("show");
            }
        })
    }
}
// Соц.сети
function socialInteraction() {
    let socialContainer = document.querySelector('.social__btn-list');
    if (socialContainer) {
        let socialBtn = document.querySelectorAll('.social__btn');
        let socialDrop = document.querySelectorAll('.social__dropdown');
        let btnWrap = document.querySelectorAll('.social__btn-item');
        for (let i = 0; i < socialBtn.length; i++) {
            socialBtn[i].addEventListener('click', function() {
                socialDrop[i].classList.toggle('active');
                btnWrap[i].classList.toggle('active');


                let socialWrap = document.querySelectorAll('.social__btn-item');

                document.addEventListener('click', function(event) {
                    for (let i = 0; i < socialWrap.length; i++) {
                        let isClickInside = socialWrap[i].contains(event.target);
                        if (!isClickInside) {
                            socialDrop[i].classList.remove('active');
                            btnWrap[i].classList.remove('active');
                        }
                    }
                })
            })

        }
    }
}

let twoScreen = document.querySelector('.two-screen');
let traktorsContainer = document.querySelector('.traktors__container');
let museumContainer = document.querySelector('.museum-zal__wrap');

let historyContainer = document.querySelector('.history__wrapper');

let coordinateHeaderTop;
let coordinateHeaderBottom;
let coordinateTwoScreenTop;
let coordinateTraktorsNavBottom;
let coordinateTraktorsWrapperBottom;
let coordinateTraktorsWrapperTop;

let coordinateMuseumWrapperBottom;
let coordinateMuseumWrapperTop;

let coordinatehistoryContainerBottom;
let coordinatehistoryContainerTop;

let scrollProgress = 0;


let univerLink = document.querySelector('.header__wrapper--university');
// Шапка плавающая
function headerShowAndHideDesktop() {

    coordinateHeaderBottom = getCoords(header).bottom;
    if (scrollProgress > 50 && coordinateTwoScreenTop >= scrollProgress + 10) {
        header.classList.add('hide')
        if (univerLink) {
            univerLink.style.display = "block";
        }
    } else if (scrollProgress <= 0 || scrollProgress > 100 && coordinateTwoScreenTop <= scrollProgress + 10) {
        header.classList.remove('hide')
        if (univerLink) {
            univerLink.style.display = "none";
        }

    }
    if (coordinateTwoScreenTop >= scrollProgress + 10) {
        header.classList.remove('js-scroll');
        if (univerLink) {
            univerLink.style.display = "block";
        }

    } else if (scrollProgress > 50 && coordinateTwoScreenTop <= scrollProgress + 10) {
        header.classList.add('js-scroll');
        header.classList.remove('js-scroll-noshadow');

    }

    if (coordinateTwoScreenTop <= 0) {
        header.classList.add('js-scroll');
        header.classList.remove('js-scroll-noshadow');
    }

    if (traktorsContainer) {
        if (scrollProgress > coordinateTraktorsWrapperTop && scrollProgress < coordinateTraktorsWrapperBottom) {
            header.classList.add('js-hide');
            header.classList.add('js-scroll-hide');
            header.classList.add('js-scroll-noshadow');

        } else if (scrollProgress < coordinateTraktorsWrapperTop || scrollProgress > coordinateTraktorsWrapperBottom) {
            header.classList.remove('js-hide');
            header.classList.remove('js-scroll-hide');
            header.classList.remove('js-scroll-noshadow');
        }
    }


    if (museumContainer) {
        if (coordinateHeaderBottom + 120 > coordinateMuseumWrapperTop && scrollProgress < coordinateMuseumWrapperBottom) {
            header.classList.add('js-hide');
            header.classList.add('js-scroll-hide');
            header.classList.add('js-scroll-noshadow');

        } else if (coordinateHeaderBottom < coordinateMuseumWrapperTop || scrollProgress > coordinateMuseumWrapperBottom) {
            header.classList.remove('js-hide');
            header.classList.remove('js-scroll-hide');
            header.classList.remove('js-scroll-noshadow');
        }
    }

}

function fixedNavForm(offsetscroll, navigation) {
    let fixed = document.querySelector(navigation);
    if (fixed) {
        let _headerHeight = header.offsetHeight;
        let top = offsetscroll + _headerHeight + 30;
        fixed.style.top = top + 'px';
    }
}




function showNav(containerTop, containerBottom) {
    let nav = document.querySelector('.traktors__nav')
    coordinateTraktorsNavBottom = getCoords(nav).bottom;

    if (containerTop <= scrollProgress && coordinateTraktorsNavBottom <= containerBottom) {
        nav.classList.add('show')
    } else {
        nav.classList.remove('show')
    }
}

function initYandexMap(ind) {
    let maps = document.getElementById(ind);
    let hintContent;
    if (maps) {

        let tag
        if (typeof(ymaps) == 'undefined') {

            tag = document.createElement('script');
            if (document.querySelector('.contacts-map--big')) {
                tag.src = "https://api-maps.yandex.ru/2.1/?lang=en_US";
                hintContent = 'Kirovsky Zavod';
            } else {
                tag.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
                hintContent = 'Кировский завод';
            }

            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            tag.onload = function() {
                ymaps.ready(init);
            }
        } else {
            ymaps.ready(init);
        }


        function init() {
            let map = new ymaps.Map(maps, {
                // center: [59.880069, 30.259939],
                center: [59.880402, 30.252628],
                zoom: 15
            });

            let place = new ymaps.Placemark(
                [59.880402, 30.252628], {
                    hintContent: hintContent,
                }, {
                    iconImageHref: '/local/templates/kzgroup/img/contacts/ya_maps_pin.svg',
                    iconImageSize: [64, 64],
                    iconLayout: 'default#image',
                }
            );
            map.geoObjects.add(place);
            map.behaviors.disable('scrollZoom');
            // map.behaviors.disable('multiTouch');
            map.behaviors.disable('drag');

            maps.addEventListener('click', function() {
                map.behaviors.enable('drag');
                map.behaviors.disable('scrollZoom');
            })
        };

    }
}
// Создание яндекс карты
function createMap() {

    initYandexMap('yamap2')
    initYandexMap('yamap')
}

function stickyNav(navigation) {
    let nav = document.querySelector(navigation);
    let navHeight = nav.offsetHeight;
    let sec1 = document.querySelector('#zal-1')
    if (coordinateMuseumWrapperTop <= scrollProgress && ((coordinateMuseumWrapperBottom - navHeight + 50) >= scrollProgress)) {
        nav.classList.add('show')
    } else {
        nav.classList.remove('show')
    }

}

// Плавный ссылки в годах
const makeNavLinksSmooth = (sec, alllink) => {
    const navLinks = document.querySelectorAll(alllink);
    const section = document.querySelectorAll(sec);
    for (let n = 0; n < navLinks.length; n++) {
        navLinks[n].addEventListener('click', e => {
            e.preventDefault();
            scrollToTop(section[n]);
        });
    }
}

const makeNavLinksSmoothHistory = (sec, alllink) => {
    const navLinks = document.querySelectorAll(alllink);
    const section = document.querySelectorAll(sec);
    for (let n = 0; n < navLinks.length; n++) {
        navLinks[n].addEventListener('click', e => {
            e.preventDefault();
            scrollToTopHistory(section[n]);

        });
    }
}

// Плавный ссылки в годах
const makeNavLinksSmoothMuseum = (sec, alllink) => {
        const navLinks = document.querySelectorAll(alllink);
        const section = document.querySelectorAll(sec);
        for (let n = 0; n < navLinks.length; n++) {
            navLinks[n].addEventListener('click', e => {
                e.preventDefault();
                scrollToTopMuseum(section[n]);

            });
        }
    }
    // Наблюдение за ссылками при скролле
const spyScrolling = (container, link) => {
    const sections = document.querySelectorAll(container);
    let topSection;
    for (let i = 0; i < sections.length; i++) {
        topSection = getCoords(sections[i]).top;
        if (sections[i] && topSection - 200 <= scrollProgress) {
            const id = sections[i].id;
            document.querySelector(link).classList.remove('active');
            document.querySelector(`a[href*=${ id }]`).classList.add('active');
        }
    }
}

// Вся анимация при скролле 
let initAnimation = function() {
    gsap.utils.toArray('.traktors__number-icon').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            scrub: true,
            toggleClass: 'is-inview',
            // this toggles the class again when you scroll back up:
            // toggleActions: 'play none none none',
            // this removes the class when the scrolltrigger is passed:
            once: true,
        });
    });


    gsap.utils.toArray('.company_group__item-icon').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            scrub: true,
            toggleClass: 'is-inview',
            // this toggles the class again when you scroll back up:
            // toggleActions: 'play none none none',
            // this removes the class when the scrolltrigger is passed:
            once: true,
        });
    });

    gsap.utils.toArray('.property__pic').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            // scrub: true,
            toggleClass: 'is-inview',
            // this toggles the class again when you scroll back up:
            // toggleActions: 'play none none none',
            // this removes the class when the scrolltrigger is passed:
            once: true,
        });
    });

    gsap.utils.toArray('.traktors__info-wrap').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: 'bottom bottom',
            scrub: true,
            toggleClass: 'is-inview-line',
            // this toggles the class again when you scroll back up:
            // toggleActions: 'play none none none',
            // this removes the class when the scrolltrigger is passed:
            once: true,
        });
    });


    gsap.utils.toArray('.title--inner-main').forEach(element => {
        gsap.fromTo(element, {
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

        });
    });

    gsap.utils.toArray('.title--inner').forEach(element => {
        gsap.fromTo(element, {
            y: '110%',
            rotateX: "-40deg",
            opacity: 0
        }, {
            y: "0%",
            rotateX: 0,
            opacity: 1,

            duration: 1.5,
            stagger: .13,
            ease: "power3.out",
            // delay: 0,
            // force3D: true,
            scrollTrigger: {
                trigger: element,
                // scrub: true,
                start: "bottom bottom",
                // once: true,
            }
        });
    });

    gsap.utils.toArray('.statictics--inner').forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            y: "25px"
        }, {
            y: "0%",
            duration: 5,
            opacity: 1,
            // stagger: .2,
            ease: "Power3.easeOut",
            scrollTrigger: {
                trigger: element,
                once: true,
                // scrub: true,
                // start: "bottom bottom"
            }
        });
    });



    gsap.utils.toArray('.hero__subtitle').forEach(element => {
        gsap.fromTo(element, {
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
            delay: 2,

        });
    });



    gsap.utils.toArray('.button-more').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: 'bottom bottom',
            scrub: true,
            toggleClass: 'is-inview-line',
            // this toggles the class again when you scroll back up:
            // toggleActions: 'play none none none',
            // this removes the class when the scrolltrigger is passed:
            once: true,
        });
    });




    gsap.utils.toArray('.button-line').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            once: true,
            toggleClass: 'is-inview',
            // toggleActions: 'play none none none',
        });


    });

    gsap.utils.toArray('.pic__frame--line').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            toggleClass: 'is-inview',
        });


    });

}

// Раскрытие текста при нажатии на подробнее
function paragraphOpen() {
    let paragraph = document.querySelector('.zavod-text--main');
    let p = document.querySelectorAll('.zavod-text--main p');
    let title = document.querySelector('.zavod-text--main .zavod__title')
    let titleHeight = 0;
    if (title) {
        titleHeight = title.offsetHeight;
    }
    let height = 0;

    // window.addEventListener('load', function() {
    for (let i = 0; i < p.length; i++) {
        height += (p[i].offsetHeight + 15);
    }

    // })

    let paragraphBtnMore = document.querySelector('.button-more--zavod ');
    let wrapper = document.querySelector('.zavod');
    if (paragraph) {
        paragraphBtnMore.addEventListener('click', function(event) {
            event.preventDefault();

            paragraph.style.maxHeight = height + titleHeight + 'px';
            paragraphBtnMore.style.display = "none";
            wrapper.classList.add('active');
            if (scrollbar) {
                paragraph.addEventListener('transitionEnd', function() {
                    scrollbar.update()
                })
            }

        })

    }
}

// Аккордеон
function accordion() {
    let accordionItem = document.querySelectorAll('.accordion-item:not(.accordion-item--noinner)');

    Array.from(accordionItem).forEach(function(item, i, accordionItem) {

        item.querySelector('.accordion-item-header').addEventListener('click', function(e) {

            let active = document.querySelectorAll('.accordion-item.show');
            if (active.length && active[0] !== item) {
                // scrollbar.update(true);
                active[0].querySelector('.accordion-item-content').style.display = 'none';
                active[0].classList.remove('show');

                if (scrollbar) {
                    scrollbar.update(true);
                }

                // } );

            }

            let content = item.querySelector('.accordion-item-wrap');
            // let contentHeight = content.offsetHeight;
            if (item.classList.contains('show')) {

                item.classList.remove('show');

                item.querySelector('.accordion-item-content').style.display = 'none';

                if (scrollbar) {
                    scrollbar.update(true);
                }


            } else if (!item.classList.contains('show')) {
                setTimeout(function() {
                    scrollToTopH(item);
                }, 10)

                item.classList.add('show');

                item.querySelector('.accordion-item-content').style.display = 'block';
                if (scrollbar) {
                    scrollbar.update(true);
                }

            }




        });


    });





}

function subMenuAccordion() {
    // Доп подменю в аккордеоне
    let btnInfo = document.querySelectorAll('.actioner-list-link--toggle');

    for (let i = 0; i < btnInfo.length; i++) {
        let flagBtnInfo = false;
        btnInfo[i].addEventListener('click', function(event) {
            event.preventDefault();
            let container = document.querySelectorAll('.actioner-info--toggle')[i];


            if (flagBtnInfo == false) {

                container.style.display = 'block';

                btnInfo[i].classList.add('active')
                flagBtnInfo = true;
            } else {
                flagBtnInfo = false;
                container.style.display = 'none';

                btnInfo[i].classList.remove('active')
            }

        })
    }
}

// Функции для пресс-центра, спрятать/показать галерею
function hideGalleryImage(image) {
    for (let i = 0; i < image.length; i++) {
        if (i >= 6) {

            image[i].classList.add('gallery-hide')
        }
    }
}

function showGalleryImage(image, btn) {
    for (let i = 0; i < image.length; i++) {

        if (i >= 6) {
            image[i].classList.toggle('gallery-hide')
            btn.classList.toggle('gallery-in-close')
            if (btn.classList.contains('gallery-in-close')) {
                btn.style.display = "none";
            }
        }
    }

}

// Переписать в один общий , кастомный селект на нескольких страницах
function customSelect() {
    if (document.querySelector('.c-select')) {

        $('.c-select').each(function() {
            const _this = $(this),
                selectOption = _this.find('option'),
                selectOptionLength = selectOption.length,
                selectedOption = selectOption.filter(':selected'),
                duration = 450; // длительность анимации

            _this.hide();
            _this.wrap('<div class="c-select"></div>');
            $('<div>', {
                class: 'new-select',
                //text: _this.children('option:disabled').text()
                text: _this.children('option:selected').text()
            }).insertAfter(_this);

            const selectHead = _this.next('.new-select');
            $('<div>', {
                class: 'new-select__list'
            }).insertAfter(selectHead);

            const selectList = selectHead.next('.new-select__list');
            for (let i = 1; i < selectOptionLength; i++) {
                $('<div>', {
                        class: 'new-select__item',
                        html: $('<span>', {
                            text: selectOption.eq(i).text()
                        })
                    })
                    .attr('data-value', selectOption.eq(i).val())
                    .appendTo(selectList);
            }

            const selectItem = selectList.find('.new-select__item');
            selectList.slideUp(0);
            selectHead.on('click', function() {
                if (!$(this).hasClass('on')) {
                    $(this).addClass('on');

                    $(this).parent('.c-select').addClass('c-select-rotate');
                    selectList.slideDown(duration);
                    selectItem.on('click', function() {
                        let chooseItem = $(this).data('value');
                        $('select').val(chooseItem).attr('selected', 'selected');
                        selectHead.text($(this).find('span').text());

                        selectList.slideUp(duration);
                        selectHead.removeClass('on');

                        $('select').val(chooseItem).attr('selected', 'selected');
                        $('select').trigger('change');
                    });

                } else {
                    $(this).removeClass('on');
                    $(this).parent('.c-select').removeClass('c-select-rotate');
                    selectList.slideUp(duration);
                }
            });
        });
    }
    if (document.querySelector('.select')) {
        $('.select').each(function() {
            const _this = $(this),
                selectOption = _this.find('option'),
                selectOptionLength = selectOption.length,
                selectedOption = selectOption.filter(':selected'),
                duration = 450; // длительность анимации

            _this.hide();
            _this.wrap('<div class="select"></div>');
            $('<div>', {
                class: 'new-select',
                text: _this.children('option:disabled').text()
            }).insertAfter(_this);

            const selectHead = _this.next('.new-select');
            $('<div>', {
                class: 'new-select__list'
            }).insertAfter(selectHead);

            const selectList = selectHead.next('.new-select__list');
            for (let i = 1; i < selectOptionLength; i++) {
                $('<div>', {
                        class: 'new-select__item',
                        html: $('<span>', {
                            text: selectOption.eq(i).text()
                        })
                    })
                    .attr('data-value', selectOption.eq(i).val())
                    .appendTo(selectList);
            }

            const selectItem = selectList.find('.new-select__item');
            selectList.slideUp(0);
            selectHead.on('click', function() {
                if (!$(this).hasClass('on')) {
                    $(this).addClass('on');
                    selectList.slideDown(duration);

                    selectItem.on('click', function() {
                        let chooseItem = $(this).data('value');

                        $('select').val(chooseItem).attr('selected', 'selected');
                        selectHead.text($(this).find('span').text());

                        selectList.slideUp(duration);
                        selectHead.removeClass('on');
                    });

                } else {
                    $(this).removeClass('on');
                    selectList.slideUp(duration);
                }
            });
        });
    }


    if (document.querySelector('.select-contact')) {
        $('.select-contact').each(function() {
            const _this = $(this),
                selectOption = _this.find('option'),
                selectOptionLength = selectOption.length,
                selectedOption = selectOption.filter(':selected'),
                duration = 450; // длительность анимации

            _this.hide();
            _this.wrap('<div class="select"></div>');
            $('<div>', {
                class: 'contacts_form_select my_select',
                text: _this.children('option:disabled').text()
            }).insertAfter(_this);

            const selectHead = _this.next('.contacts_form_select');
            $('<div>', {
                class: 'contacts_form_select__list my_drop',
            }).insertAfter(selectHead);

            const selectList = selectHead.next('.contacts_form_select__list');
            for (let i = 1; i < selectOptionLength; i++) {
                $('<div>', {
                        class: 'contacts_form_select__item',
                        html: $('<span>', {
                            text: selectOption.eq(i).text()
                        })
                    })
                    .attr('data-value', selectOption.eq(i).val())
                    .appendTo(selectList);
            }

            const selectItem = selectList.find('.contacts_form_select__item');
            selectList.slideUp(0);
            selectHead.on('click', function() {
                if (!$(this).hasClass('on')) {

                    setTimeout(function() {
                        $(this).addClass('on');
                        selectList.slideDown(duration);
                        _this.addClass('on');
                        selectHead.addClass('on');
                    }, 10)

                    selectItem.on('click', function() {
                        let chooseItem = $(this).data('value');

                        _this.val(chooseItem).prop('selected', 'selected');
                        selectHead.text($(this).find('span').text());
                        selectList.slideUp(duration);

                        _this.removeClass('on');
                    });
                    document.addEventListener('click', function(event) {
                        // console.log(event.target);
                        // console.log(_this);
                        if (!event.target.classList.contains('on')) {

                            selectList.slideUp(duration);
                            _this.removeClass('on');
                            selectHead.removeClass('on');
                        } else {
                            // console.log(' в нужное место')
                        }





                    })

                } else {

                    $(this).removeClass('on');
                    _this.removeClass('on');
                    selectList.slideUp(duration);

                }


            });


        });
    }
}

let btnUp = document.querySelector('.btn-up');

function showAndHidebtnUp() {
    if (scrollProgress > coordinateTwoScreenTop + 300) {
        btnUp.classList.add('btn-show');

        btnUp.addEventListener('click', function() {
            if (scrollbar) {
                scrollbar.scrollTo(0, 0, 3000);
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        })

    } else {
        btnUp.classList.remove('btn-show');
    }
}



// Функция видео при нажатии на кнопку
function playPauseMedia() {
    if (videoMain.paused) {
        if (!flagBtnVideo) {


            videoMain.getElementsByTagName('source')[0].src = srcVideo;
            videoMain.load();

            videoMain.addEventListener('canplaythrough', function() {
                videoMain.style.opacity = "1";
                videoMain.play();


                btnPlay.classList.add('active');
                if (overlay) {
                    overlay.style.opacity = "1";
                }

                flagBtnVideo = true;

            });
        } else {
            videoMain.play();
            btnPlay.classList.add('active');
            if (overlay) {
                overlay.style.opacity = "1";
            }

            flagBtnVideo = true;
        }
    } else {
        videoMain.pause();
        flagBtnVideo = true;
        btnPlay.classList.remove('active');

    }
}

// Функции для меню в контактах на моб
function closeMenu() {
    menuItem.classList.remove("show");
    arrow.classList.remove("active");
}

function showMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    menuItem.classList.toggle("show");
    arrow.classList.toggle("active");
}

// Подсветка табов
function highlightTabs(event, tabs) {
    let tablinks = document.querySelectorAll('.' + tabs);
    if (event.target.classList.contains(tabs)) {
        removeActivity(tablinks);
        event.target.classList.add('active');
    }

}

function removeActivity(arrCollection) {
    for (let i = 0; i < arrCollection.length; i++) {
        arrCollection[i].classList.remove('active');

    }
}

function removeActivityTabs(arrCollection) {
    for (let i = 0; i < arrCollection.length; i++) {
        arrCollection[i].classList.remove('active');
        arrCollection[i].classList.remove('leave');
    }
}
// Функция для открытия табов

let tabsE = document.querySelectorAll('.tabs-common-links-js');
for (let i = 0; i < tabsE.length; i++) {
    tabsE[i].addEventListener('click', function(event) {
        event.preventDefault();
    })
}

function openList(e) {
    e.stopPropagation();
    e.preventDefault();


    highlightTabs(e, 'tabs-common-links-js');
    if (e.target.classList.contains('tabs-common-links-js')) {
        let tabcontent = document.querySelectorAll(".tabs-common-content");

        removeActivityTabs(tabcontent);
        // location.hash = e.target.hash;

        history.pushState({}, "", e.target.hash);

        document.getElementById(e.target.dataset.tab).classList.add('leave')

        document.getElementById(e.target.dataset.tab).classList.add('active')

        gsap.utils.toArray('.button-more').forEach(element => {
            ScrollTrigger.create({
                trigger: element,
                start: 'bottom bottom',
                scrub: true,
                toggleClass: 'is-inview-line',
                // this toggles the class again when you scroll back up:
                toggleActions: 'play none none none',
                // this removes the class when the scrolltrigger is passed:
                // once: true,
            });
        });




        gsap.utils.toArray('.button-line').forEach(element => {
            ScrollTrigger.create({
                trigger: element,
                toggleClass: 'is-inview',
            });


        });

    }



}


function eventOnScrollStartWithTablet() {
    if (historyContainer) {
        showNav(coordinatehistoryContainerTop, coordinatehistoryContainerBottom);
        makeNavLinksSmoothHistory('.article', '.history__nav-link');
        spyScrolling('.article', '.history__nav-link.active');
    }
    if (traktorsContainer) {
        showNav(coordinateTraktorsWrapperTop, coordinateTraktorsWrapperBottom);
        makeNavLinksSmooth('.traktors', '.traktors__nav-link');
        spyScrolling('.traktors', '.traktors__nav-link.active');
    }


}

// События на десктопе  Media(min-width:1280px)
function eventOnScrollDesktop() {
    clearTimeout(timer);
    if (!body.classList.contains('disable-hover')) {
        body.classList.add('disable-hover')
    }
    timer = setTimeout(function() {
        body.classList.remove('disable-hover')
    }, 100);


    if (!isInternetExplorer()) {
        for (let i = 0; i < parallaxImg.length; i++) {
            parallax(parallaxImg[i]);
        }
        for (let i = 0; i < parallaxImgSlide.length; i++) {
            parallaxSlide(parallaxImgSlide[i], parallaxImgSlide[0]);
        }

        for (let i = 0; i < parallaxImgSlide2.length; i++) {
            parallaxSlide(parallaxImgSlide2[i], parallaxImgSlide2[0]);
        }
        for (let i = 0; i < parallaxImgSlideNews.length; i++) {
            parallaxSlideNews(parallaxImgSlideNews[i], parallaxImgSlideNews[0]);

        }


        for (let i = 0; i < parallaxImgSlideCompanies.length; i++) {

            parallaxSlideCompanies(parallaxImgSlideCompanies[i], parallaxImgSlideCompanies[i].parentElement.parentElement.parentElement.parentElement);


        }

        for (let i = 0; i < parallaxImgSlideTwo.length; i++) {
            parallaxSlideTwo(parallaxImgSlideTwo[i], parallaxImgSlideTwo[0]);
        }
    }


    if (historyBg) {
        for (let i = 0; i < light.length; i++) {
            if (scrollbar.isVisible(light[i])) {
                historyBg.style.opacity = "0"
            }
        }
        for (let i = 0; i < dark.length; i++) {
            if (scrollbar.isVisible(dark[i])) {
                historyBg.style.opacity = "1"
            }

        }
    }

}



// Координата для паралакса
let top;

// Кнопка для вызова попапа на стр кировец
let btnMore;

// Брейкпоит
const breakpointMobile = window.matchMedia('(min-width:767px)');
const breakpointDesktop = window.matchMedia('(min-width:1280px)');
// Шапка
const header = document.querySelector('.header');

// Видео на главной
let videoMain = document.querySelector('.parallax__img-video');
// Кнопка плей
let btnPlay = document.querySelector('.button__video-controls--play');
let overlay = document.querySelector('.video-overlay');
let flagBtnVideo = false;


// Для меню в контактах на моб
let menuItem = document.getElementById("menu-container");
let arrow = document.getElementById("arrow");

// Для таймера поинтер евент при скролле
let body = document.body,
    timer;
//  высота вьюпорта
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);


// Опции плавного скролла
let options = {
    damping: 0.09,
    renderByPixels: true,
    continuousScrolling: true,
    delegateTo: document
}
let options2 = {
    damping: 0.09,
    renderByPixels: true,
    continuousScrolling: false,
    alwaysShowTracks: true,
}
let options4 = {
    damping: 0.09,
    renderByPixels: true,
}
let options5 = {
    damping: 0.09,
    renderByPixels: true,
    alwaysShowTracks: true
}
let options6 = {
    damping: 0.09,
    renderByPixels: true,
    alwaysShowTracks: true,
    continuousScrolling: true,
}
let options7 = {
    damping: 0.09,
    renderByPixels: true,
    continuousScrolling: true,
}

let containerScroll = document.querySelector('.scroll');


// Инициализация плавных на попапах на любых страницах
let popupWrap = document.querySelectorAll('.scroll-popup');
for (let i = 0; i < popupWrap.length; i++) {
    let scrollbarPopup = ScrollbarSmoth.init(popupWrap[i], options2);
    scrollbarPopup.addListener(ScrollTrigger.update);
}


let containerFormScroll = document.querySelectorAll('.vac-d-form__wrap');
for (let i = 0; i < containerFormScroll.length; i++) {
    let scrollbarForm = ScrollbarSmoth.init(containerFormScroll[i], options2);

}

let containerNavScroll = document.querySelector('.nav_list-wrap');
let scrollbarNav;

// Инициализация плавных на попапах на любых страницах
if (containerNavScroll) {
    scrollbarNav = ScrollbarSmoth.init(containerNavScroll, options2);

}

// Инициализация плавных на попапах на любых страницах
let containerTabsScroll = document.querySelector('.tabs-common');
let scrollbarTabs;

if (containerTabsScroll) {
    scrollbarTabs = ScrollbarSmoth.init(containerTabsScroll, options4);
}


// Глобальные переменные
let scrollbarAside;
let scrollbarTable;

let containerTableScroll;

function initSmoothScrollbarTable() {
    containerTableScroll = document.querySelector('.b-table');
    if (containerTableScroll) {
        scrollbarTable = ScrollbarSmoth.init(containerTableScroll, options6);
    }
}
initSmoothScrollbarTable();



let scrollbarTableProd;
let scrollbarTablePurchase;
// Плавный скролл в таблицах
let containerTableProdScroll = document.querySelector('.p-table__wrapper');
if (containerTableProdScroll) {
    scrollbarTableProd = ScrollbarSmoth.init(containerTableProdScroll, options6);
}
let containerTablePurchaseScroll = document.querySelector('.dp-table__wrapper');
if (containerTablePurchaseScroll) {
    scrollbarTablePurchase = ScrollbarSmoth.init(containerTablePurchaseScroll, options6);
}

let containerLeaderScroll = document.querySelector('.leadership-person__wrap');
if (containerLeaderScroll) {
    let scrollbarLeader = ScrollbarSmoth.init(containerLeaderScroll, options7);
}

// Конец подключения плавного скролла

// Все что относится к барбе
function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}


function addClickToLinkWithBarba(links) {
    // let links = document.querySelectorAll('a');

    for (let i = 0; i < links.length; i++) {
        links[i].classList.add('no-barba');
        if (links[i].classList.contains('tabs-common-links--barba')) {
            links[i].classList.remove('no-barba');
        }
        if (links[i].classList.contains('contacts-sidebar__nav-link')) {
            links[i].classList.remove('no-barba');
        }
        if (links[i].classList.contains('contacts-sidebar__nav-link--mobile')) {
            links[i].classList.remove('no-barba');
        }
        if (links[i].classList.contains('actioner-sidebar-item__link')) {
            links[i].classList.remove('no-barba');
        }

        if (links[i].classList.contains('press-rigt-side-bar-theme-button')) {
            links[i].classList.remove('no-barba');
        }
        if (links[i].classList.contains('press-rigt-side-bar-date-button')) {
            links[i].classList.remove('no-barba');
        }
        if (links[i].classList.contains('button-paginate')) {
            links[i].classList.remove('no-barba');
        }
        if (links[i].classList.contains('common-pagination__arrow')) {
            links[i].classList.remove('no-barba');
        }


    }

}
if (document.querySelector('.barbapage')) {
    let linksAll = document.querySelectorAll('a');
    addClickToLinkWithBarba(linksAll)

    var cbk = function(e) {
        if (e.currentTarget.href === window.location.href) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    for (var i = 0; i < linksAll.length; i++) {
        linksAll[i].addEventListener('click', cbk);
    }

    barba.init({
        debug: true,
        sync: true,
        prevent: ({
            el
        }) => el.classList && el.classList.contains('no-barba'),
        transitions: [{

            name: 'opacity-transition',
            async leave(data) {

                data.current.container.classList.add('active');
                const done = this.async();
                await delay(800);

                done();


            },
            async enter(data) {

                data.next.container.classList.add('show');
            }
        }]



    });
    let bg = document.querySelector('.barba_background');
    barba.hooks.enter((data) => {

        createMap();



        if (scrollbar) {
            scrollbar.addListener(ScrollTrigger.update);
            scrollbar.update();
        }

        setTimeout(initAnimation, 10);
        initSlider()
        socialInteraction()



        checkUrl('.tabs-common-links--barba');
        checkUrl('.contacts-sidebar__nav-link');
        checkUrl('.contacts-sidebar__nav-link--mobile');
        checkUrl('.actioner-sidebar-item__link');
        checkUrlForTitle('.contacts-header-title');
        checkUrlForTitle('.press-header-title');
        checkUrlForTitle('.tender-header-title');
        checkUrlForBg('.parallax__img--inner-tender');


        customSelect();

        if (document.getElementById('accordion')) {
            accordion();

        }


        ajaxSearch();



        $('#Ing .common-pagination').find('a').each(function() {
            $(this).attr('href', $(this).attr('href') + '#Ing');
        });
        $('#Managers .common-pagination').find('a').each(function() {
            $(this).attr('href', $(this).attr('href') + '#Managers');
        });
        $('#All .common-pagination').find('a').each(function() {
            $(this).attr('href', $(this).attr('href') + '#All');
        });


        form();
        let linksAll = document.querySelectorAll('a');
        addClickToLinkWithBarba(linksAll);





    });
    barba.hooks.once(() => {
        breakpointDesktop.addListener(breakpointCheckerForDesktopAndLowerOnce);
        breakpointCheckerForDesktopAndLowerOnce();
        // initSmoothScrollbarAside();
        initSmoothScrollbarTable();
        yearSelection()



    });
    barba.hooks.after(() => {
        // initSmoothScrollbarAside();
        initSmoothScrollbarTable();
        yearSelection()
        if (document.getElementById('accordion')) {
            subMenuAccordion()
        }



        instagramFeedInit();

        checkUrlForSide();

        checkUrlForTabs('.tabs-common-links-js');


        breakpointMobile.addListener(breakpointCheckerForMobile);
        breakpointCheckerForMobile();


        breakpointDesktop.addListener(breakpointCheckerForDesktopAndLower);

        breakpointCheckerForDesktopAndLower();

        if (scrollbar) {
            scrollProgress = scrollbar.offset.y;
        }
        scrollToTop(document.querySelector('.tabs-common'));

        setTimeout(function() {
            var tag = document.createElement('script');
            tag.src = "https://www.google.com/recaptcha/api.js";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }, 100);
    });
}


// Инициализация свайперов
let swiperStatistics;
let swiperTabFeature1;
let swiperTabFeature2;
let swiperTab;
let swiperTabThumbs;
let swiperNews = [];
let swiperCompanies;
let companiesThumbs;
let swiperHero;
let swiperGallery = [];
let swipersHistory = [];
let swiperPress = [];
let swiperAchieves;
let swiperPurchase;
let swiperFrame;
let transitionSlide = 10000;

function updateSlider(slider) {
    if (slider != undefined) {
        if (Array.isArray(slider)) {
            if (slider.length != 0) {

                for (let i = 0; i < slider.length; i++) {
                    slider[i].update();
                }
            }
        } else {
            slider.update();


        }

    }
}
// Функциии для слайдеров внутри слайдеров
function setMainSwiperMouseOver() {
    swiperTab.detachEvents();

}

function setMainSwiperMouseOut() {
    swiperTab.attachEvents();

}
// Функции свайперов которые исчезают на определенных брейкпоинтах
const enableSwiper = function() {

    if (document.querySelector('.statistics__slider')) {
        swiperStatistics = new Swiper('.statistics__slider', {

            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    }

    if (document.querySelector('.kirovets_tabs__features--1')) {
        let tabFeatures1 = document.querySelector('.kirovets_tabs__features--1');
        swiperTabFeature1 = new Swiper(tabFeatures1, {
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    }
    if (document.querySelector('.kirovets_tabs__features--2')) {

        let tabFeatures2 = document.querySelector('.kirovets_tabs__features--2');
        swiperTabFeature2 = new Swiper(tabFeatures2, {
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });

    }
    if (document.querySelectorAll('.history__photos')) {
        document.querySelectorAll('.history__photos').forEach(function(slider, index) {
            slider.classList.add('swiper-container--history-' + index);
            slider.querySelector('.swiper-scrollbar--history').classList.add('swiper-scrollbar--history-' + index)
            swipersHistory[index] = new Swiper(".swiper-container--history-" + index, {
                slidesPerView: '1',
                scrollbar: {

                    el: '.swiper-scrollbar--history-' + index
                },
            });
        });
    }
    if (document.querySelector('.history_slider')) {
        swiperAchieves = new Swiper('.history_slider', {
            slidesPerView: 'auto',
            scrollbar: {
                el: '.swiper-scrollbar--achieves',
            },
        });
    }
}

const enableSwiperForPress = function() {
    if (document.querySelectorAll('.press__container')) {
        document.querySelectorAll('.press__container').forEach(function(slider, index) {

            slider.classList.add('swiper-container--press-' + index);
            slider.querySelector('.swiper-button-next').classList.add('press_swiper-button-next-' + index);
            slider.querySelector('.swiper-button-prev').classList.add('press_swiper-button-prev-' + index);
            slider.querySelector('.swiper-scrollbar--news').classList.add('swiper-scrollbar--news-' + index)

            swiperPress[index] = new Swiper('.swiper-container--press-' + index, {
                slidesPerView: 'auto',
                spaceBetween: 0,
                scrollbar: {
                    el: '.swiper-scrollbar--news-' + index,
                },
                navigation: {
                    nextEl: '.press_swiper-button-next-' + index,
                    prevEl: '.press_swiper-button-prev-' + index,
                },
                slidesOffsetAfter: 0,
                breakpoints: {
                    500: {
                        spaceBetween: 20,
                        slidesOffsetAfter: 200,
                    },
                    767: {
                        spaceBetween: 20,
                        slidesOffsetAfter: 200,

                    },
                    1280: {
                        spaceBetween: 35,
                        slidesOffsetAfter: 200,

                    }
                }
            });
        });

    }

    if (document.querySelector('.swiper-purchase')) {
        swiperPurchase = new Swiper('.swiper-purchase', {
            slidesPerView: 'auto',
            grabCursor: true,
            scrollbar: {
                el: '.swiper-scrollbar--purchase',
            },
            breakpoints: {
                500: {
                    spaceBetween: 15,
                },
                600: {
                    spaceBetween: 22,
                },
            },
        });


    }
}

const initSlider = function() {
    if (document.querySelector('.rent-details__slider')) {
        let galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 20,
            slidesPerView: 5,
            loop: false,
            freeMode: true,
            loopedSlides: 1, //looped slides should be the same
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });
        let galleryTop = new Swiper('.gallery-top', {
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: '.rent-details__slider-next-arrow',
                prevEl: '.rent-details__slider-prev-arrow',
            },
            thumbs: {
                swiper: galleryThumbs,
            },
            pagination: {
                el: '.rent-details__swiper-pagination',
                type: 'fraction',
            },
        });
    }


    document.querySelectorAll('.news__container').forEach((element, i) => {
        let newNavPrev = element.querySelector('.swiper-button-next');
        let newNavNext = element.querySelector('.swiper-button-prev');
        let newNavScroll = element.querySelector('.swiper-scrollbar--news');
        swiperNews[i] = new Swiper(element, {
            slidesPerView: 'auto',
            preloadImages: false,
            watchSlidesVisibility: true,
            // Enable lazy loading
            lazy: {
                loadOnTransitionStart: true,
                // lazyLoadingInPrevNext: true,
                // lazyLoadingInPrevNextAmount: 5
            },
            spaceBetween: 0,
            scrollbar: {
                el: newNavScroll,
            },
            navigation: {
                nextEl: newNavPrev,
                prevEl: newNavNext,
            },
            // observer: true, 
            // observeParents: true,
            // updateOnWindowResize: true,
            slidesOffsetAfter: 0,
            breakpoints: {
                440: {
                    spaceBetween: 20,
                    slidesOffsetAfter: 200,
                },
                767: {
                    spaceBetween: 20,
                    slidesOffsetAfter: 200,
                },
                1280: {
                    spaceBetween: 35,
                    slidesOffsetAfter: 200,
                }
            }
        });
    })





    if (document.querySelector('.swiper-container--companies')) {

        companiesThumbs = new Swiper('.swiper-container--companies-thumbs', {
            direction: 'vertical',
            // spaceBetween: 10,
            slidesPerView: 'auto',
            autoHeight: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,

            threshold: 50,
            breakpoints: {
                1680: {
                    // spaceBetween: 20,
                },
            },
        });

        swiperCompanies = new Swiper('.swiper-container--companies', {
            preloadImages: false,
            autoHeight: true,
            updateOnImagesReady: true,
            // watchSlidesProgress:true,
            watchSlidesVisibility: true,
            // Enable lazy loading
            lazy: {
                loadOnTransitionStart: true,
                lazyLoadingInPrevNext: true,
                lazyLoadingInPrevNextAmount: 1
            },
            thumbs: {
                swiper: companiesThumbs
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            scrollbar: {
                el: '.swiper-scrollbar--companies',
            },
        });
        // swiperCompanies.updateSlidesProgress()
        swiperCompanies.lazy.load()
        swiperCompanies.on('slidePrevTransitionStart', function() {

            let btnCompanies = document.querySelectorAll('.swiper-slide-active .button-more--inner');
            for (let i = 0; i < btnCompanies.length; i++) {
                btnCompanies[i].classList.add('is-inview-line');
            }


            gsap.utils.toArray('.swiper-slide-active .companies__title .title--inner').forEach(element => {
                gsap.fromTo(element, {
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
                    delay: 0,
                });
            });

            gsap.utils.toArray('.swiper-slide:not(.swiper-slide-active) .companies__title .title--inner').forEach(element => {
                gsap.fromTo(element, {
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
                    delay: 0,

                });
            });

            gsap.utils.toArray('.swiper-slide-active .companies__desc').forEach(element => {
                gsap.fromTo(element, {

                    opacity: 0
                }, {

                    opacity: 1,

                    duration: 2,
                    stagger: .13,
                    ease: "power3.out",
                    delay: 2,

                });
            });

            gsap.utils.toArray('.swiper-slide-active .button-more--inner').forEach(element => {
                gsap.fromTo(element, {

                    opacity: 0
                }, {

                    opacity: 1,

                    duration: 2,
                    stagger: .13,
                    ease: "power3.out",
                    delay: 2,

                });
            });

        });
        swiperCompanies.on('slideNextTransitionStart', function() {
            let btnCompanies = document.querySelectorAll('.swiper-slide-active .button-more--inner');
            for (let i = 0; i < btnCompanies.length; i++) {
                btnCompanies[i].classList.add('is-inview-line');

            }

            gsap.utils.toArray('.swiper-slide-active .companies__title .title--inner').forEach(element => {
                gsap.fromTo(element, {
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
                    delay: 0,

                });
            });

            gsap.utils.toArray('.swiper-slide:not(.swiper-slide-active) .companies__title .title--inner').forEach(element => {
                gsap.fromTo(element, {
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
                    delay: 0,

                });
            });

            gsap.utils.toArray('.swiper-slide-active .companies__desc').forEach(element => {
                gsap.fromTo(element, {
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
                    delay: 2,

                });
            });

            gsap.utils.toArray('.swiper-slide-active .button-more--inner').forEach(element => {
                gsap.fromTo(element, {
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
                    delay: 2,

                });
            });


        });


    }
    if (document.querySelector('.swiper-container--hero')) {
        function checkActiveSlideForVideo() {
            if (swiperHero.realIndex == 0) {
                videoMain.play();
                btnPlay.classList.add('active');

            } else {
                videoMain.pause();
                btnPlay.classList.remove('active');



            }
        }
        swiperHero = new Swiper('.swiper-container--hero', {
            loop: true,
            updateOnImagesReady: true,
            // watchSlidesProgress:true,
            watchSlidesVisibility: true,
            // Enable lazy loading
            // lazy: {
            //     // loadOnTransitionStart: true,
            //     lazyLoadingInPrevNext: true,
            //     lazyLoadingInPrevNextAmount: 5
            // },
            autoplay: {
                delay: transitionSlide,
                disableOnInteraction: false,
                // disableOnInteraction: true,

            },
            navigation: {
                nextEl: '.hero__slider-controls .swiper-button-prev',
                prevEl: '.hero__slider-controls .swiper-button-next',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },



        });
        if (swiperHero) {
            swiperHero.autoplay.stop();
        }
        // swiperHero.updateSlidesProgress();
        swiperHero.lazy.load();
        swiperHero.on('transitionStart', function() {
            let titles = document.querySelectorAll('.hero__title');
            for (let i = 0; i < titles.length; i++) {
                titles[i].style.display = "block";
            }
        })
        swiperHero.on('slidePrevTransitionStart', function() {
            checkActiveSlideForVideo();
            gsap.utils.toArray('.swiper-slide-active .hero__title .title--inner').forEach(element => {

                gsap.fromTo(element, {
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
                    delay: 3,

                });

            });

            gsap.utils.toArray('.swiper-slide-active .hero__subtitle').forEach(element => {
                gsap.fromTo(element, {
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
                    delay: 2,

                });
            });
        });
        swiperHero.on('slideNextTransitionStart', function() {
            checkActiveSlideForVideo();
            gsap.utils.toArray('.swiper-slide-active .hero__title .title--inner').forEach(element => {
                gsap.fromTo(element, {
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
                    delay: 3,

                });
            });
            gsap.utils.toArray('.swiper-slide-active .hero__subtitle').forEach(element => {
                gsap.fromTo(element, {
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
                    delay: 2,

                });
            });



        });
    }
    if (document.querySelector('.kirovets_tabs__list-wrap')) {
        swiperTabThumbs = new Swiper('.kirovets_tabs__list-wrap', {
            slidesPerView: 2,

            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });
    }
    if (document.querySelector('.kirovets_tabs__container')) {
        swiperTab = new Swiper('.kirovets_tabs__container', {

            thumbs: {
                swiper: swiperTabThumbs
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
        });
    }

    setTimeout(function() {
        if (document.querySelector('.swiper-container--gallery')) {

            let gallerySlider = document.querySelectorAll('.swiper-container--gallery');

            for (let i = 0; i < gallerySlider.length; i++) {
                let galleryScroll = gallerySlider[i].querySelector('.swiper-scrollbar--gallery');
                swiperGallery[i] = new Swiper(gallerySlider[i], {
                    // slidesPerView: 4,
                    slidesPerView: "auto",
                    spaceBetween: 22,

                    freeMode: true,
                    preloadImages: false,
                    updateOnImagesReady: true,
                    watchSlidesProgress: true,
                    centeredSlides: false,
                    // watchSlidesVisibility: true,
                    // slidesOffsetAfter: 200,
                    // Enable lazy loading
                    lazy: {
                        threshold: 50,
                        loadPrevNext: true,
                        loadPrevNextAmount: 5,
                        // lazyLoadingInPrevNextAmount: 5
                    },

                    grabCursor: true,
                    scrollbar: {
                        el: galleryScroll,
                    },
                    breakpoints: {
                        768: {

                            // slidesOffsetAfter: 200
                        },
                        1280: {
                            spaceBetween: 15,

                            // slidesOffsetAfter: 200
                        }

                    },
                });


                swiperGallery[i].on('lazyImageReady', function(swiper, slideEl, imageEl) {

                    imageEl.onload = function() {


                        slideEl.style.width = (imageEl.offsetWidth - 10) + 'px';
                        swiperGallery[i].scrollbar.updateSize();
                        swiperGallery[i].update();
                        swiperGallery[i].updateProgress();
                        swiperGallery[i].updateSize();
                        swiperGallery[i].updateSlides();

                    }

                })
                swiperGallery[i].on('slideChange', function() {
                    swiperGallery[i].scrollbar.updateSize();
                    swiperGallery[i].update();
                    swiperGallery[i].updateProgress();
                    swiperGallery[i].updateSize();
                    swiperGallery[i].updateSlides();
                });


            }

        }
    }, 10)

}
let slidersPress = document.querySelectorAll('.press__container');
let InnerSliders = document.querySelectorAll('.kirovets_tabs__features');
let slidersHistory = document.querySelectorAll('.history__photos');

let flagBreakPointForMobileScroll = false;
let flagBreakPointForDesktopAndLower = false;

let scrollbar;

let light;
let dark;
let historyBg;

let parallaxImg;
let parallaxImgSlide;
let parallaxImgSlide2;
let parallaxImgSlideTwo;
let parallaxImgSlideNews;
let parallaxImgSlideCompanies;

// Брейкпоинты Менять тут
const breakpointCheckerForDesktopAndLower = function() {
    // Все что выше десктопа 1280
    if (breakpointDesktop.matches === true) {

        light = document.querySelectorAll('.history_light');
        dark = document.querySelectorAll('.history_dark');
        historyBg = document.querySelector('.history__bg');

        parallaxImg = document.querySelectorAll('.parallax__img');
        parallaxImgSlide = document.querySelectorAll('.main__hero .parallax__img--slide');
        parallaxImgSlide2 = document.querySelectorAll('.companies .parallax__img--slide');

        parallaxImgSlideTwo = document.querySelectorAll('.parallax__img--two');
        parallaxImgSlideNews = document.querySelectorAll('.news .parallax__img--slide');

        let parallaxSlideCompWrap = document.querySelectorAll('.container--news--eng');
        parallaxImgSlideCompanies = document.querySelectorAll('.container--news--eng .parallax__img--slide');



        window.addEventListener('resize', knowHeightOfElement('.history__photos--animate', '.history__photos__item'));

        // document.addEventListener('DOMContentLoaded', function() {
        knowHeightOfElement('.history__photos--animate', '.history__photos__item');


        flagBreakPointForDesktopAndLower = true;



        if (containerScroll) {
            scrollbar = ScrollbarSmoth.init(containerScroll, options);
        }




        // Определения координат для GSAP относительно плавного скролла
        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                if (arguments.length) {
                    scrollbar.scrollTop = value;
                }
                return scrollbar.scrollTop;
            },
            // getBoundingClientRect() {
            //   return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            // }
        });

        scrollbar.addListener(ScrollTrigger.update);
        eventAllOnScroll();

        // document.addEventListener('DOMContentLoaded', function() {
        if (!isInternetExplorer()) {
            parallaxOnLoad(document.querySelectorAll('.parallax__img'));
            parallaxOnLoad(document.querySelectorAll('.parallax__img--slide'));

        }
        // })



        gsap.utils.toArray('.is-animate').forEach(element => {
            let parallax = element.getAttribute('data-speed');
            let speed = parallax * 100 + 'px';

            ScrollTrigger.matchMedia({
                "(min-width: 1280px)": function() {

                    gsap.fromTo(element, {
                        // duration: 5,
                        y: speed
                    }, {
                        y: "0",
                        scrollTrigger: {
                            force3D: true,
                            trigger: element,
                            scrub: 1.1,
                        }

                        // start: "top top"
                    })


                }
            });
        });


        gsap.utils.toArray('.history__photos--animate').forEach(element => {

            let parallax = element.getAttribute('data-speed');
            let speed = parallax * 100 + '%';
            ScrollTrigger.matchMedia({
                "(min-width: 1280px)": function() {
                    gsap.fromTo(element, {
                        // duration: 5,
                        y: speed
                    }, {
                        y: "0",
                        force3D: true,
                        scrollTrigger: {
                            trigger: element,
                            scrub: 1.1,
                            // start: "top top"
                        }
                    });
                }
            });
        });

        horParallax();
        // Слайдеры
        for (let i = 0; i < swiperPress.length; i++) {
            if (swiperPress[i] != null) {
                swiperPress[i].destroy(true, true);
            }
        }

        for (let i = 0; i < slidersPress.length; i++) {
            slidersPress[i].classList.remove('swiper-container');
            slidersPress[i].querySelector('.swiper-wrapper--press').classList.remove('swiper-wrapper');
            let pressSlides = slidersPress[i].querySelectorAll('.press-news__item');
            for (let i = 0; i < pressSlides.length; i++) {

                pressSlides[i].classList.remove('swiper-slide');
            }
        }

        if (swiperPurchase != null) {
            swiperPurchase.destroy(true, true);
        }

        if (document.querySelector('.swiper-purchase')) {
            document.querySelector('.swiper-purchase').classList.remove('swiper-container');
            document.querySelector('.swiper-wrapper--purchase').classList.remove('swiper-wrapper');
            let purchasesSlides = document.querySelectorAll('.purchase_card');
            for (let i = 0; i < purchasesSlides.length; i++) {

                purchasesSlides[i].classList.remove('swiper-slide');
            }
        }

        // Все что ниже десктопа 1280
    } else if (breakpointDesktop.matches === false) {

        scrollProgress = Math.round(pageYOffset);
        twoScreen = document.querySelector('.two-screen');

        coordinateTwoScreenTop = getCoordsFrame(twoScreen).top;

        parallaxImg = document.querySelectorAll('.parallax__img');

        parallaxImgSlide = document.querySelectorAll('.parallax__img--slide');

        parallaxImgSlideTwo = document.querySelectorAll('.parallax__img--two');

        flagBreakPointForDesktopAndLower = false;

        window.removeEventListener('resize', knowHeightOfElement('.history__photos--animate', '.history__photos__item'));

        // document.addEventListener('DOMContentLoaded', function() {



        // })

        // if (scrollbar) {

        ScrollbarSmoth.destroy(containerScroll);
        ScrollTrigger.refresh();
        ScrollTrigger.update();
        // initAnimation();
        eventAllOnScrollMobile();

        // Слайдеры
        for (let i = 0; i < slidersPress.length; i++) {
            slidersPress[i].classList.add('swiper-container');
            slidersPress[i].querySelector('.swiper-wrapper--press').classList.add('swiper-wrapper');
            let pressSlides = slidersPress[i].querySelectorAll('.press-news__item');
            for (let i = 0; i < pressSlides.length; i++) {

                pressSlides[i].classList.add('swiper-slide');
            }
        }
        if (document.querySelector('.swiper-purchase')) {
            document.querySelector('.swiper-purchase').classList.add('swiper-container');
            document.querySelector('.swiper-wrapper--purchase').classList.add('swiper-wrapper');
            let purchasesSlides = document.querySelectorAll('.purchase_card');
            for (let i = 0; i < purchasesSlides.length; i++) {

                purchasesSlides[i].classList.add('swiper-slide');
            }
        }
        enableSwiperForPress();

        let isAnimate = document.querySelectorAll('.is-animate');
        for (let i = 0; i < isAnimate.length; i++) {
            isAnimate[i].removeAttribute('style');
        }


        let isAnimateH = document.querySelectorAll('.history__photos--animate');
        for (let i = 0; i < isAnimateH.length; i++) {
            isAnimateH[i].removeAttribute('style');
        }

        let iswidhtH = document.querySelectorAll('.history__photos__item');
        for (let i = 0; i < iswidhtH.length; i++) {
            iswidhtH[i].removeAttribute('style');
        }



    }
}

const breakpointCheckerForDesktopAndLowerOnce = function() {
    // Все что выше десктопа 1280
    if (breakpointDesktop.matches === true) {
        btnMore = document.querySelectorAll('.traktors__text-wrap--desktop .button-more--traktors');
        // Меню в контактах
        let contacts = document.getElementById('contacts');
        if (contacts) {

            contacts.classList.remove('no-barba');
            contacts.removeEventListener('click', showMenu);
        }

        function checkPositionLink(classes) {
            let allLinks = document.querySelectorAll(classes);

            for (let i = 0; i < allLinks.length; i++) {

                if (allLinks[i].href == window.localStorage.getItem('prevHref')) {

                    scrollToTopStaticLink(allLinks[i]);
                }
            }
        }

        checkPositionLink('.press-newspage-link');
        if (!videoMain) {
            checkPositionLink('.news__link');
        }

        checkPositionLink('.press-video-gallery-link');
        checkPositionLink('.press-about__item');
        checkPositionLink('.press-about-us__item-hover');

        setTimeout(function() {
            checkPositionLink('.vacancies_vacancy-desc');
        }, 500)

        if (traktorsContainer) {
            coordinateTraktorsWrapperBottom = getCoordsFrame(traktorsContainer).bottom;
            coordinateTraktorsWrapperTop = getCoordsFrame(traktorsContainer).top;
        }

        coordinateTwoScreenTop = getCoordsFrame(twoScreen).top;
        if (museumContainer) {
            coordinateMuseumWrapperBottom = getCoordsFrame(museumContainer).bottom;
            coordinateMuseumWrapperTop = getCoordsFrame(museumContainer).top;
        }

        if (historyContainer) {
            coordinatehistoryContainerBottom = getCoordsFrame(historyContainer).bottom;
            coordinatehistoryContainerTop = getCoordsFrame(historyContainer).top;
        }

        window.addEventListener('load', function() {
            if (historyContainer) {
                coordinatehistoryContainerBottom = getCoordsFrame(historyContainer).bottom;
                coordinatehistoryContainerTop = getCoordsFrame(historyContainer).top;
            }
        })


        // Все что ниже десктопа 1280
    } else if (breakpointDesktop.matches === false) {
        btnMore = document.querySelectorAll('.traktors__text-wrap--tablet .button-more--traktors');
        // Меню в контактах

        if (traktorsContainer) {
            coordinateTraktorsWrapperBottom = getCoordsFrame(traktorsContainer).bottom;
            coordinateTraktorsWrapperTop = getCoordsFrame(traktorsContainer).top;
        }

        coordinateTwoScreenTop = getCoordsFrame(twoScreen).top;




        if (museumContainer) {
            coordinateMuseumWrapperBottom = getCoordsFrame(museumContainer).bottom;
            coordinateMuseumWrapperTop = getCoordsFrame(museumContainer).top;
        }

        if (historyContainer) {
            coordinatehistoryContainerBottom = getCoordsFrame(historyContainer).bottom;
            coordinatehistoryContainerTop = getCoordsFrame(historyContainer).top;
        }


        let contacts = document.getElementById('contacts');
        if (contacts) {
            contacts.classList.add('no-barba');

            contacts.addEventListener('click', showMenu);

            let contactsItem = document.querySelectorAll('.contacts-menu__nav-item');
            for (let i = 0; i < contactsItem.length; i++) {
                contactsItem[i].addEventListener('click', closeMenu)
            }

            document.addEventListener('click', function(event) {
                if (event.target != menuItem) {
                    closeMenu();
                }

            })

        }

    }
}



const breakpointCheckerForMobile = function() {
    // if larger viewport and multi-row layout needed

    if (breakpointMobile.matches === true) {


        flagBreakPointForMobileScroll = true;
        // Слайдеры
        if (swiperStatistics != null) {
            swiperStatistics.destroy(true, true);
            // swiperStatistics.update();
        }
        if (document.querySelector('.statistics__slider')) {
            document.querySelector('.statistics__slider').classList.remove('swiper-container');
            document.querySelector('.statistics__list').classList.remove('swiper-wrapper');
            let statSlides = document.querySelectorAll('.statistics__item');
            for (let i = 0; i < statSlides.length; i++) {

                statSlides[i].classList.remove('swiper-slide');
            }
        }

        for (let i = 0; i < swipersHistory.length; i++) {
            if (swipersHistory[i] != null) {
                swipersHistory[i].destroy(true, true);
                // swipersHistory[i].update();
            }
        }
        for (let i = 0; i < slidersHistory.length; i++) {
            slidersHistory[i].classList.remove('swiper-container');
            slidersHistory[i].querySelector('.history__photos--container').classList.remove('swiper-wrapper');
            let historySlides = slidersHistory[i].querySelectorAll('.history__photos__item');
            for (let i = 0; i < historySlides.length; i++) {

                historySlides[i].classList.remove('swiper-slide');
            }
        }

        if (document.querySelector('.kirovets_tabs__container')) {
            if (swiperTabFeature1 != null) {
                swiperTabFeature1.destroy(true, true);
                // swiperTabFeature1.update();

            }
            if (swiperTabFeature2 != null) {
                swiperTabFeature2.destroy(true, true);
                // swiperTabFeature2.update();

            }
            for (let i = 0; i < InnerSliders.length; i++) {
                InnerSliders[i].classList.remove('swiper-container');
                InnerSliders[i].querySelector('.kirovets_tabs__features-list').classList.remove('swiper-wrapper');
                let slides = InnerSliders[i].querySelectorAll('.kirovets_tabs__features-item');
                for (let i = 0; i < slides.length; i++) {

                    slides[i].classList.remove('swiper-slide');
                }

                InnerSliders[i].removeEventListener('mouseover', setMainSwiperMouseOver);
                InnerSliders[i].removeEventListener('mouseout', setMainSwiperMouseOut);

            }
        }

        if (swiperAchieves != null) {
            swiperAchieves.destroy(true, true);
            // swiperAchieves.update();
        }
        if (document.querySelector('.history_slider')) {
            document.querySelector('.history_slider').classList.remove('swiper-container');
            document.querySelector('.history_achieves--list').classList.remove('swiper-wrapper');
            let achievesSlides = document.querySelectorAll('.history_achieves--list-item');
            for (let i = 0; i < achievesSlides.length; i++) {

                achievesSlides[i].classList.remove('swiper-slide');
            }
        }


    } else if (breakpointMobile.matches === false) {
        paragraphOpen();
        // Слайдеры
        if (document.querySelector('.kirovets_tabs__container')) {

            for (let i = 0; i < InnerSliders.length; i++) {
                InnerSliders[i].addEventListener('mouseover', setMainSwiperMouseOver);
                InnerSliders[i].addEventListener('mouseout', setMainSwiperMouseOut);
                InnerSliders[i].classList.add('swiper-container');
                InnerSliders[i].querySelector('.kirovets_tabs__features-list').classList.add('swiper-wrapper');
                let slides = InnerSliders[i].querySelectorAll('.kirovets_tabs__features-item');
                for (let i = 0; i < slides.length; i++) {

                    slides[i].classList.add('swiper-slide');
                }

            }
        }

        if (document.querySelector('.statistics__slider')) {
            document.querySelector('.statistics__slider').classList.add('swiper-container');
            document.querySelector('.statistics__list').classList.add('swiper-wrapper');
            let statSlides = document.querySelectorAll('.statistics__item');
            for (let i = 0; i < statSlides.length; i++) {

                statSlides[i].classList.add('swiper-slide');
            }
        }

        for (let i = 0; i < slidersHistory.length; i++) {
            slidersHistory[i].classList.add('swiper-container');
            slidersHistory[i].querySelector('.history__photos--container').classList.add('swiper-wrapper');
            let historySlides = slidersHistory[i].querySelectorAll('.history__photos__item');
            for (let i = 0; i < historySlides.length; i++) {

                historySlides[i].classList.add('swiper-slide');
            }
        }

        if (document.querySelector('.history_slider')) {
            document.querySelector('.history_slider').classList.add('swiper-container');
            document.querySelector('.history_achieves--list').classList.add('swiper-wrapper');
            let achievesSlides = document.querySelectorAll('.history_achieves--list-item');
            for (let i = 0; i < achievesSlides.length; i++) {

                achievesSlides[i].classList.add('swiper-slide');
            }
        }

        enableSwiper();

        if (traktorsContainer) {
            coordinateTraktorsWrapperBottom = getCoordsFrame(traktorsContainer).bottom;
            coordinateTraktorsWrapperTop = getCoordsFrame(traktorsContainer).top;
        }

        if (museumContainer) {
            coordinateMuseumWrapperBottom = getCoordsFrame(museumContainer).bottom;
            coordinateMuseumWrapperTop = getCoordsFrame(museumContainer).top;
        }

        if (historyContainer) {
            coordinatehistoryContainerBottom = getCoordsFrame(historyContainer).bottom;
            coordinatehistoryContainerTop = getCoordsFrame(historyContainer).top;
        }

    }
};

let ticking = false;

function eventAllOnScroll() {
    scrollProgress = 0;
    if (document.querySelector('.vac-f__nav-list')) {
        makeNavLinksSmooth('.vac-f__form-title', '.vac-f__nav-item');
    }
    scrollbar.addListener(({ offset }) => {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                scrollProgress = offset.y;
                if (header) {
                    headerShowAndHideDesktop();
                }
                showAndHidebtnUp()

                // Поставить видео на паузе если при скролле его стало не видно
                if (videoMain) {
                    let flagScrollVideo = scrollbar.isVisible(videoMain);
                    if (!flagScrollVideo) {
                        if (!videoMain.paused) {
                            videoMain.pause();
                            btnPlay.classList.remove('active');
                        }
                    }

                }

                // Прекратить автоплей у свайпера на главной странице если его не видно
                if (document.querySelector('.swiper-container--hero')) {
                    let flagScrollHero = scrollbar.isVisible(document.querySelector('.swiper-container--hero'));
                    if (flagScrollHero) {
                        swiperHero.autoplay.start();
                        document.body.classList.add('load')
                    } else {
                        swiperHero.autoplay.stop();
                        document.body.classList.remove('load')
                    }
                }

                // Плавные ссылки для вакансий
                if (document.querySelector('.vac-f__nav-list')) {
                    makeNavLinksSmooth('.vac-f__form-title', '.vac-f__nav-item');
                    spyScrolling('.vac-f__form-title', '.vac-f__nav-item.active');
                    fixedNavForm(scrollProgress, '.vac-f__nav-list');
                }

                // Фиксированное меню в музеях
                if (document.querySelector('.museum-nav')) {
                    stickyNav('.museum-nav');
                    makeNavLinksSmoothMuseum('.museum-zal', '.museum-nav__link');
                    spyScrolling('.museum-zal', '.museum-nav__link.active');
                }

                eventOnScrollDesktop()

                if (flagBreakPointForMobileScroll) {
                    eventOnScrollStartWithTablet();

                }

                ticking = false;
            });

            ticking = true;
        }
    }, false);
}

function eventAllOnScrollMobile() {

    for (let i = 0; i < parallaxImg.length; i++) {
        parallaxRemove(parallaxImg[i]);
    }
    for (let i = 0; i < parallaxImgSlide.length; i++) {
        parallaxRemove(parallaxImgSlide[i]);
    }
    for (let i = 0; i < parallaxImgSlide.length; i++) {
        parallaxRemove(parallaxImgSlideTwo[i]);
    }


    let scrollMobile = function() {


        if (!ticking) {
            window.requestAnimationFrame(function() {
                scrollProgress = Math.round(pageYOffset);



                coordinateTwoScreenTop = getCoordsFrame(twoScreen).top;




                if (header) {
                    headerShowAndHideDesktop();
                }
                showAndHidebtnUp()

                if (flagBreakPointForMobileScroll) {
                    eventOnScrollStartWithTablet();

                }
                // Плавные ссылки для вакансий
                if (document.querySelector('.vac-f__nav-list')) {
                    makeNavLinksSmooth('.vac-f__form-title', '.vac-f__nav-item');
                    spyScrolling('.vac-f__form-title', '.vac-f__nav-item.active');
                    // fixedNavForm(offset, '.vac-f__nav-list');
                }

                // Фиксированное меню в музеях
                if (document.querySelector('.museum-nav')) {
                    stickyNav('.museum-nav');
                    makeNavLinksSmoothMuseum('.museum-zal', '.museum-nav__link');
                    spyScrolling('.museum-zal', '.museum-nav__link.active');
                }


                // Поставить видео на паузе если при скролле его стало не видно
                if (videoMain) {
                    let flagScrollVideo = Visible(videoMain);
                    if (!flagScrollVideo) {

                        if (!videoMain.paused) {
                            videoMain.pause();
                            btnPlay.classList.remove('active');
                        }
                    }

                }

                // Прекратить автоплей у свайпера на главной странице если его не видно
                if (document.querySelector('.swiper-container--hero')) {
                    let flagScrollHero = Visible(document.querySelector('.swiper-container--hero'));
                    if (flagScrollHero) {
                        swiperHero.autoplay.start();
                        document.body.classList.add('load')
                    } else {
                        swiperHero.autoplay.stop();
                        document.body.classList.remove('load')
                    }
                }

                ticking = false;
            });
            ticking = true;
        }
    }


    window.addEventListener('scroll', scrollMobile);
}

let videoHero = document.querySelector('.parallax__img-video--hero');
let srcVideo;

const breakpointMobileVideo = window.matchMedia('(min-width:400px)');

const breakpointCheckerForVideo = function() {
    // Все что выше десктопа 1280
    if (breakpointMobileVideo.matches === true) {

        srcVideo = videoMain.dataset.src;

        let slide = document.querySelectorAll('.swiper-slide--companies-bg')

        for (let i = 0; i < slide.length; i++) {
            slide[i].dataset.background = slide[i].dataset.background;
        }

    } else if (breakpointMobileVideo.matches === false) {

        srcVideo = videoMain.dataset.srcMobile;

        let slide = document.querySelectorAll('.swiper-slide--companies-bg')

        for (let i = 0; i < slide.length; i++) {
            slide[i].dataset.background = slide[i].dataset.backgroundMob;
        }
    }
}

window.onload = function() {
    if (videoHero) {
        if (!flagBtnVideo) {
            videoHero.getElementsByTagName('source')[0].src = srcVideo;
            videoHero.load();
            videoHero.addEventListener('canplaythrough', function() {

                videoHero.style.opacity = "1";
                videoHero.play();
                btnPlay.classList.add('active');

                if (swiperHero) {
                    videoHero.addEventListener('ended', function() {
                        swiperHero.autoplay.start();
                        swiperHero.slideNext(500, true);

                        // swiperHero.update();
                        // let lines = document.querySelectorAll('.swiper-container--hero .swiper-slide .hero__slide-line-time');
                        // for (let i = 0; i < lines.length; i++) {
                        //     lines[i].style.animationDuration = '10000ms';
                        // }
                        // document.querySelector('.swiper-slide--hero-video .hero__slide-line-time').style.animationDuration = '49000ms';

                    });
                    document.body.classList.add('load');
                }

                flagBtnVideo = true;
            });
        }
    }


    if (videoMain) {
        if (!videoHero) {


            setTimeout(function() {
                if (!flagBtnVideo) {

                    videoMain.getElementsByTagName('source')[0].src = srcVideo;
                    videoMain.load();


                    videoMain.addEventListener('canplaythrough', function() {
                        videoMain.style.opacity = "1";
                        videoMain.play();
                        btnPlay.classList.add('active');
                        if (overlay) {
                            overlay.style.opacity = "1";
                        }

                        flagBtnVideo = true;
                    })
                }
            }, 4000);

        }

    }


}
let galleryImage;
// Вызовфункций
document.addEventListener('DOMContentLoaded', function() {

    galleryImage = document.querySelectorAll('.press-photogallery-item');

    breakpointDesktop.addListener(breakpointCheckerForDesktopAndLower);
    breakpointCheckerForDesktopAndLower();


    breakpointDesktop.addListener(breakpointCheckerForDesktopAndLowerOnce);
    breakpointCheckerForDesktopAndLowerOnce();

    breakpointMobile.addListener(breakpointCheckerForMobile);
    breakpointCheckerForMobile();

    // Видео
    if (videoMain) {
        btnPlay.addEventListener('click', playPauseMedia);
        let btnsPlaySlider = document.querySelector('.button__video-controls--hero');
        if (btnsPlaySlider) {
            btnsPlaySlider.addEventListener('click', function() {
                if (swiperHero.realIndex != 0) {
                    swiperHero.slideToLoop(0, 100, true);
                    videoMain.currentTime = 0;
                }
            })
        }
        breakpointMobileVideo.addListener(breakpointCheckerForVideo);
        breakpointCheckerForVideo();
    }

    // Меню
    let burger = document.querySelector('.js-nav-toggle');
    let dropList = document.querySelectorAll('.js-dropdown');
    let navList = document.querySelector('.nav_list');
    let navLink = navList.querySelectorAll('.js-dropdown-toggle');
    let navItem = navList.querySelectorAll('.js-dropdown');
    let allNavItem = navList.querySelectorAll('.nav_item');

    let allNavLink = navList.querySelectorAll('.nav_link');
    if (burger) {
        let btnSearch = document.querySelector('.js-search-text');

        burger.addEventListener('click', function() {
            document.body.classList.toggle('has-nav-open');
            document.body.classList.remove('has-search-open');

            if (window.screen.width > 1280) {

                for (let i = 0; i < allNavItem.length; i++) {
                    allNavLink[i].addEventListener('mouseover', function() {

                        let active = navList.querySelectorAll('.nav_item.active');
                        for (let i = 0; i < active.length; i++) {
                            if (active[i]) {
                                active[i].classList.remove('active');

                            }
                        }


                        if (allNavItem[i].classList.contains('js-dropdown')) {
                            allNavItem[i].classList.add('active');
                        }

                    })


                }
            }

            for (let i = 0; i < dropList.length; i++) {


                navItem[i].addEventListener('click', function(event) {

                    navLink[i].classList.toggle('active');
                    navItem[i].classList.toggle('active');

                    let dropdown = navItem[i].querySelector('.nav_dropdown');

                    dropdown.classList.toggle('active');

                })
            }
        })
        btnSearch.addEventListener('click', function() {
            document.body.classList.toggle('has-search-open');

        })
    }



    ajaxSearch();

    if (!window.localStorage.getItem('preloaderIsShown')) {
        document.querySelector('.cookie').classList.add('show');
        let btnCloseCookie = document.querySelector('.cookie__ok');
        btnCloseCookie.addEventListener('click', function() {
            document.querySelector('.cookie').classList.remove('show');
        });
        window.localStorage.setItem('preloaderIsShown', true);
    }

    setTimeout(function() {
        initAnimation();



    }, 500)



    checkUrl('.tabs-common-links--barba');
    checkUrl('.contacts-sidebar__nav-link');
    checkUrl('.contacts-sidebar__nav-link--mobile');
    checkUrl('.actioner-sidebar-item__link');
    checkUrlForTitle('.contacts-header-title');
    checkUrlForTitle('.press-header-title');
    checkUrlForTitle('.tender-header-title');

    checkUrlForBg('.parallax__img--inner-tender');
    checkUrlForTabs('.tabs-common-links-js');

    checkUrlForSide();


    customSelect();
    createMap();

    if (!document.querySelector('.main') && !document.querySelector('.hero-common') && !document.querySelector('.main__hero') && !document.querySelector('.main--person')) {
        header.classList.add('js-scroll-noshadow');
        header.querySelector('br').style.display = "block";

    }

    hideGalleryImage(galleryImage);



    // initSlider();



    if (/iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (document.querySelector('.vac-f__nav-list')) {
            document.querySelector('.vac-f__nav-list').classList.add('hidden')
        }
    }


    yearSelection();

    // Скролл к контактам при клике
    let contactMuseum = document.querySelector('.hero-common_info__item--phone');
    if (contactMuseum) {
        contactMuseum.addEventListener('click', function() {
            let contactBlock = document.querySelector('.contact-block');
            scrollToTopStatic(contactBlock);
        })
    }

    let rentLink = document.querySelector('.rent_link');
    if (rentLink) {
        rentLink.addEventListener('click', function() {
            let text = document.querySelector('#text__down');
            scrollToTopStatic(text);
        })
    }
    // Стрелка вниз
    let btnDown = document.querySelector('.btn-down');

    if (btnDown) {
        btnDown.addEventListener('click', function() {
            let twoScreen = document.querySelector('.two-screen');
            scrollToTopStatic(twoScreen);
        })
    }

    // Аккордеон
    if (document.getElementById('accordion')) {
        accordion();
        subMenuAccordion()
    }

    // Соц.сети
    socialInteraction();

    // Выбор языка в пресс центре


    // Табы
    let tabsEvent = document.getElementById('tabs_event');
    if (tabsEvent) {
        tabsEvent.addEventListener('click', openList)
    }


    // Кнопка больше в пресс-центре


    let btnGallery = document.querySelector('.button--galleryin');
    if (btnGallery) {

        btnGallery.addEventListener('click', function(event) {
            showGalleryImage(galleryImage, btnGallery);
        });
    }


    //валидация большой формы вакансий 
    if ($('.vac-f__main-form')) {
        let validName = false;
        let validSecName = false;
        let validPhone = false;

        $('#vac-form').submit(function(event) {
            event.preventDefault();

            let name = $('.form-name-input');
            let secName = $('.vac-f__second-name');
            let number = $('.input-phone-field');

            if (number.val() === "") {
                number.css('border', '1px solid #C30215');
                if (number.next().is('.form-invalid-error') === false) {
                    $("<div class='form-invalid-error'>обязательное поле<div/>").insertAfter($(number));
                    scrollToTopForm(number, 400);
                    validPhone = false;
                } else if (number.next().is('.form-invalid-error') === true && number.val() === "") {
                    scrollToTopForm(number, 400);
                }
            } else {
                number.next('.form-invalid-error').remove();
                number.css('border', '1px solid #dce0e3');
                validPhone = true;
            }

            if (name.val() === "") {
                name.css('border', '1px solid #C30215');
                if (name.next().is('.form-invalid-error') === false) {
                    $("<div class='form-invalid-error'>обязательное поле<div/>").insertAfter($(name));
                    scrollToTopForm(name, 1600);
                    validName = false;
                } else if (name.next().is('.form-invalid-error') === true && name.val() === "") {
                    scrollToTopForm(name, 1600);
                }
            } else {
                name.next('.form-invalid-error').remove();
                name.css('border', '1px solid #dce0e3');
                validName = true;
            }

            if (secName.val() === "") {
                secName.css('border', '1px solid #C30215');
                if (secName.next().is('.form-invalid-error') === false) {
                    $("<div class='form-invalid-error'>обязательное поле<div/>").insertAfter($(secName));
                    scrollToTopForm(secName, 1700);
                    validSecName = false;
                } else if (secName.next().is('.form-invalid-error') === true && secName.val() === "") {
                    scrollToTopForm(secName, 1700);
                }
            } else {
                secName.next('.form-invalid-error').remove();
                secName.css('border', '1px solid #dce0e3');
                validSecName = true;
            }

            if (validName === true && validSecName === true && validPhone === true) {
                $("#vac-form").unbind('submit').submit();
            }
        });
    }
    //валидация большой формы аренды помещений
    if ($('.rent-form__main-form')) {
        let validName = false;
        let validPhone = false;
        $('.rent-form__main-form').submit(function(event) {
            event.preventDefault();
            let name = $('.rent-form-name');
            let number = $('.rent-details-number');
            if (number.val() === "") {
                number.css('border', '1px solid #C30215');
                if (number.next().is('.form-invalid-error') === false) {
                    $("<div class='form-invalid-error'>обязательное поле<div/>").insertAfter($(number));
                    scrollToTopForm(number, 600);
                    validPhone = false;
                } else if (number.next().is('.form-invalid-error') === true && number.val() === "") {
                    scrollToTopForm(number, 600);
                }
            } else {
                number.next('.form-invalid-error').remove();
                number.css('border', '1px solid #dce0e3');
                validPhone = true;
            }
            if (name.val() === "") {
                name.css('border', '1px solid #C30215');
                if (name.next().is('.form-invalid-error') === false) {
                    $("<div class='form-invalid-error'>обязательное поле<div/>").insertAfter($(name));
                    scrollToTopForm(number, 700);
                    validName = false;
                } else if (name.next().is('.form-invalid-error') === true && name.val() === "") {
                    scrollToTopForm(number, 700);
                }
            } else {
                name.next('.form-invalid-error').remove();
                name.css('border', '1px solid #dce0e3');
                validName = true;
            }
            if (validName === true && validPhone === true) {
                $(".rent-form__main-form").unbind('submit').submit();
            }
        })
    }


    //Все что относится к панораме на главной
    let panorama = document.querySelector('.frame');
    let swiperFrame;

    if (panorama) {
        swiperFrame = new Swiper(panorama, {
            init: function(swiperFrame) {
                breakpointForFrame.addListener(breakpointCheckerForFrame);

                breakpointCheckerForFrame();
            },
            direction: 'horizontal',
            slidesPerView: 'auto',
            freeMode: true,
            // updateOnImagesReady: true,
            resistance: true,
            resistanceRatio: 0,
            freeModeMomentumBounce: false,

            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },

            grabCursor: true,
            scrollbar: {
                el: '.swiper-scrollbar',

                snapOnRelease: false,
            },

        });


        let wrapper = document.querySelector('.frame-container');
        const breakpointForFrame = window.matchMedia('(min-width:1280px)');
        const breakpointCheckerForFrame = function() {
            if (breakpointForFrame.matches === true) {

                if (window.innerWidth < 1920) {
                    swiperFrame.translateTo(-300, 0, false, true);
                    swiperFrame.setTranslate(-300);


                }

                wrapper.classList.remove('init');

            } else if (breakpointForFrame.matches === false) {
                swiperFrame.translateTo(-900, 0, false, true);
                swiperFrame.setTranslate(-900);

                wrapper.classList.add('init');

            }
        }


        breakpointForFrame.addListener(breakpointCheckerForFrame);

        breakpointCheckerForFrame();

        if (window.screen.width < 768) {

            wrapper.classList.add('init');
        }

        swiperFrame.on('touchStart', function() {
            wrapper.classList.remove('init');
            if (window.screen.width < 768) {
                swiperFrame.translateTo(-900, 0, false, false);
            }
        })
    }


    let frameLayer = document.querySelector('.frame__layer');
    let pin = document.querySelectorAll('.pin-block');
    for (let i = 0; i < pin.length; i++) {
        let pinLink = pin[i].querySelector('.pin-link');
        pinLink.addEventListener('click', function(event) {
            event.preventDefault();
            let popup = pin[i].querySelector('.pin-popup');
            if (popup.classList.contains('popup-hidden')) {
                panorama.classList.add('active');
                pin[i].style.zIndex = 3;
                popup.classList.remove('popup-hidden');
                swiperFrame.translateTo(-getCoordsFrame(popup).left + swiperFrame.getTranslate(), 0, false, true);
            } else {
                panorama.classList.remove('active');
                pin[i].style.zIndex = 1;
                popup.classList.add('popup-hidden');
            }
            frameLayer.addEventListener('click', function() {
                popup.classList.add('popup-hidden');
                panorama.classList.remove('active');
                pin[i].style.zIndex = 1;
            });
        });

    }



    // Глобус на главной
    if (document.querySelector('.geography')) {

        var toggleActiveClass = function() {
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
        }

        var elements = document.querySelectorAll('.section-geography__map-item');
        var startTogglingActiveClass = function() {

            elements[0].classList.add('active');
            return setInterval(toggleActiveClass, 2000);
        }

        var intervalID = startTogglingActiveClass();

    }


    showModalForm(window.location.hash);
    closeModalForm(window.location.hash);



    $('#Ing .common-pagination').find('a').each(function() {
        $(this).attr('href', $(this).attr('href') + '#Ing');
    });
    $('#Managers .common-pagination').find('a').each(function() {
        $(this).attr('href', $(this).attr('href') + '#Managers');
    });
    $('#All .common-pagination').find('a').each(function() {
        $(this).attr('href', $(this).attr('href') + '#All');
    });


    let mapsR = document.getElementById('yandexmapa');

    if (mapsR) {
        let lat = document.getElementById('lat').textContent;
        let lon = document.getElementById('lon').textContent;
        let name = document.querySelector('.rent-details__title').textContent;
        let geo = [lat, lon];

        let tag;
        if (typeof(ymaps) == 'undefined') {
            tag = document.createElement('script');
            tag.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            tag.onload = function() {
                ymaps.ready(init);
            }
        } else {
            ymaps.ready(init);
        }

        function init() {
            // ymaps.ready(function() {
            let map = new ymaps.Map(mapsR, {
                // center: [59.880069, 30.259939],
                center: geo,
                zoom: 15
            });

            let place = new ymaps.Placemark(
                geo, {
                    hintContent: name,
                }, {
                    iconImageHref: '/local/templates/kzgroup/img/contacts/ya_maps_pin.svg',
                    // iconImageHref: '/img/contacts/ya_maps_pin.svg',
                    iconImageSize: [64, 64],
                    iconLayout: 'default#image',
                }
            );
            map.geoObjects.add(place);
            map.behaviors.disable('scrollZoom');
            // map.behaviors.disable('multiTouch');
            map.behaviors.disable('drag');

            mapsR.addEventListener('click', function() {
                map.behaviors.enable('drag');
                map.behaviors.disable('scrollZoom');
            })
        };

    }

    form();

    instagramFeedInit();
    let popup = document.querySelectorAll('.popup_kirovets');

    for (let i = 0; i < popup.length; i++) {
        let number = popup[i].querySelector('.traktors__number--popup');
        let numbers = number.querySelectorAll('.traktors__number-icon');
        for (let i = 0; i < numbers.length; i++) {
            numbers[i].classList.remove('is-inview');
        }
        btnMore[i].addEventListener('click', function(event) {
            event.preventDefault();
            popup[i].classList.add('active');
            for (let i = 0; i < numbers.length; i++) {
                numbers[i].classList.add('is-inview');
            }

            let btnBack = popup[i].querySelector('.popup_kirovets__back');
            btnBack.addEventListener('click', function(event) {
                popup[i].classList.remove('active');
                for (let i = 0; i < numbers.length; i++) {
                    numbers[i].classList.remove('is-inview');
                }
            });

            let btnClose = popup[i].querySelector('.popup_kirovets__close');

            btnClose.addEventListener('click', function(event) {
                popup[i].classList.remove('active');
                for (let i = 0; i < numbers.length; i++) {
                    numbers[i].classList.remove('is-inview');
                }
            });

        })


    }

    let popupHistory = document.querySelectorAll('.popup_history');
    let linkPopupHistory = document.querySelectorAll('.history__link-popup');
    for (let i = 0; i < popupHistory.length; i++) {

        linkPopupHistory[i].addEventListener('click', function(event) {
            event.preventDefault();
            popupHistory[i].classList.add('active');


            let btnBack = popupHistory[i].querySelector('.popup_kirovets__back');

            btnBack.addEventListener('click', function(event) {
                popupHistory[i].classList.remove('active');
            });

            let btnClose = popupHistory[i].querySelector('.popup_kirovets__close');

            btnClose.addEventListener('click', function(event) {
                popupHistory[i].classList.remove('active');
            });

        })


    }

    let popupMuseum = document.querySelectorAll('.popup_museum');
    let linkPopupMuseum = document.querySelectorAll('.museum__link-popup');
    for (let i = 0; i < popupMuseum.length; i++) {

        linkPopupMuseum[i].addEventListener('click', function(event) {
            event.preventDefault();
            popupMuseum[i].classList.add('active');


            let btnBack = popupMuseum[i].querySelector('.popup_kirovets__back');

            btnBack.addEventListener('click', function(event) {
                popupMuseum[i].classList.remove('active');
            });

            let btnClose = popupMuseum[i].querySelector('.popup_kirovets__close');

            btnClose.addEventListener('click', function(event) {
                popupMuseum[i].classList.remove('active');
            });

        })


    }


})
window.addEventListener('load', function() {
    initSlider();

    instagramFeedInit();
});

window.addEventListener('beforeunload', function() {
    if (videoMain) {
        videoMain.style.opacity = '0';
    }
    window.localStorage.setItem('prevHref', window.location.href);


});


// Код с форм которые делала не я вакансий
function form() {
    $(".share_butt").on("click", function() {
            $(".share_wrap").fadeIn(),
                $(".vac-d-form2").show(300)
        }),

        $('.press-photo-subscribe-button').on('click', function() {
            $('.vacancies-d__form-wrapper--feedback').fadeIn();
            $('.vacancies-d__form-wrapper--feedback .vacancies-d__form').show(300);

        });
    $('.button--details__myzey').click(function() {
        $('.vacancies-d__form-wrapper--feedback__muzey').fadeIn();
        $('.vacancies-d__form-wrapper--feedback__muzey .vacancies-d__form').show(300);


    });
    $('.vacancies-d__download').click(function() {
        $('.vacancies-d__form-wrapper--feedback__vacanciessmall').fadeIn();
        $('.vacancies-d__form-wrapper--feedback__vacanciessmall .vacancies-d__form').show(300);


    });

    $('.rent-details__button').click(function() {
        $('.vacancies-d__form-wrapper--feedback__activy').fadeIn();
        $('.vacancies-d__form-wrapper--feedback__activy .vacancies-d__form').show(300);
    });

    $('.social__link--newspopup').on('click', function(event) {
        event.preventDefault();
        $('.vacancies-d__form-wrapper--feedback').fadeIn();
        $('.vacancies-d__form-wrapper--feedback .vacancies-d__form').show(300);

    });

    $('.press-internal-pages-subscribe-button').on('click', function() {
        $('.vacancies-d__form-wrapper--feedback').fadeIn();
        $('.vacancies-d__form').show(300);

    });

    $('.vacancies-d__response-btn').on('click', function() {
        $('.vacancies-d__form-container--order').fadeIn();
        $('.vacancies-d__form').show(300);

    });


    $('.vac-d-form-test').on('click', function() {
        $('.vacancies-d__form').hide(200);
        $('.vacancies-d__form-wrapper').fadeOut(200);
    });

    $('.vacancies-d__form-layer').on('click', function() {
        $('.vacancies-d__form').hide(200);
        $('.vacancies-d__form-wrapper').fadeOut(200);
    });

    let validName = false;
    let validPhone = false;
    $('#vac-d-form').submit(function(event) {
        event.preventDefault();
        let name = $('#vac-d-form__name');
        let number = $('#vac-d-form__number');

        if (number.val() === "") {
            number.css('border', '1px solid #C30215');
            if (number.next().is('.form-invalid-error') === false) {
                $("<div class='form-invalid-error'>обязательное поле<div/>").insertAfter($(number));

                validPhone = false;
            } else if (number.next().is('.form-invalid-error') === true && number.val() === "") {

            }
        } else {
            number.next('.form-invalid-error').remove();
            number.css('border', '1px solid #dce0e3');
            validPhone = true;
        }

        if (name.val() === "") {
            name.css('border', '1px solid #C30215');
            if (name.next().is('.form-invalid-error') === false) {
                $("<div class='form-invalid-error'>обязательное поле<div/>").insertAfter($(name));

                validName = false;
            } else if (name.next().is('.form-invalid-error') === true && name.val() === "") {

            }
        } else {
            name.next('.form-invalid-error').remove();
            name.css('border', '1px solid #dce0e3');
            validName = true;
        }
        if (validName === true && validPhone === true) {
            $("#vac-d-form").unbind('submit').submit();
        }
    })

    function InputMask(options) {
        this.el = this.getElement(options.selector);
        if (!this.el) return console.log('Что-то не так с селектором');
        this.layout = options.layout || '+_ (___) ___-__-__';
        this.maskreg = this.getRegexp();

        this.setListeners();
    }

    InputMask.prototype.getRegexp = function() {
        let str = this.layout.replace(/_/g, '\\d')
        str = str.replace(/\(/g, '\\(')
        str = str.replace(/\)/g, '\\)')
        str = str.replace(/\+/g, '\\+')
        str = str.replace(/\s/g, '\\s')

        return str;
    }

    InputMask.prototype.mask = function(e) {
        let _this = e.target,
            matrix = this.layout,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = _this.value.replace(/\D/g, "");

        if (def.length >= val.length) val = def;

        _this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });

        if (e.type == "blur") {
            var regexp = new RegExp(this.maskreg);
            if (!regexp.test(_this.value)) _this.value = "";
        } else {
            this.setCursorPosition(_this.value.length, _this);
        }
    }

    InputMask.prototype.setCursorPosition = function(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
    }

    InputMask.prototype.setListeners = function() {
        this.el.addEventListener("input", this.mask.bind(this), false);
        this.el.addEventListener("focus", this.mask.bind(this), false);
        this.el.addEventListener("blur", this.mask.bind(this), false);
        this.el.addEventListener('keyup', function(evt) {
            let length = this.value.length
            if (length < 18) {
                // this.style.border = "1px solid #de4145";

            } else {
                // this.style.border = "1px solid rgba(155, 159, 174, 0.2)";
            }
        });
    }

    InputMask.prototype.getElement = function(selector) {
        if (selector === undefined) return false;
        if (this.isElement(selector)) return selector;
        if (typeof selector == 'string') {
            var el = document.querySelector(selector);
            if (this.isElement(el)) return el;
        }
        return false
    }

    InputMask.prototype.isElement = function(element) {
        return element instanceof Element || element instanceof HTMLDocument;
    }



    let inputs = document.querySelectorAll('input[type="tel"]');

    Array.prototype.forEach.call(inputs, function(input) {
        new InputMask({
            selector: input, // в качестве селектора может быть элемент, или, собственно css селектор('#input', '.input', 'input'). Если селектор - тег или класс - будет получен только первый элемент
            layout: input.dataset.mask
        })
    })

    $('.jd-branch-style').on('click', function() {
        $('.rent-form__radio--style--nomatter').addClass('rent-form__radio--style-none');
    });
    $('.rent-form__radio-label').on('click', function() {
        $('.rent-form__radio--style--nomatter').removeClass('rent-form__radio--style-none');
    })



    let fields = document.querySelectorAll('.field__file');
    Array.prototype.forEach.call(fields, function(input) {
        let label = input.nextElementSibling,
            labelVal = label.querySelector('.field__file-fake').innerText;

        input.addEventListener('change', function(e) {
            let countFiles = '';
            if (this.files && this.files.length >= 1)
                countFiles = this.files.length;

            if (countFiles)
                label.querySelector('.field__file-fake').innerText = 'Выбрано файлов: ' + countFiles;
            else
                label.querySelector('.field__file-fake').innerText = labelVal;
        });
    });



    let clickCounter = 0,
        newPrefix = 2,
        newPrefixW = 2,
        copyNumber = 1,
        mainEducBlock = $('.education-block'),
        mainWorkBlock = $('.working-main-block'),
        addEducationBtn = $('.vac-f__form-education-adding'),
        addWorkBtn = $('.vac-f__form-works-btn'),
        copyBlockName = 'education-block-copy' + '-' + copyNumber,
        copyBlockNameWork = 'working-block-copy' + '-' + copyNumber;

    //функция создания новый атрибутов name при добавлении повторных блоков
    let setAttrNames = function(block) {
        let newNameFunc = function(old) {
            if (newPrefix === 2) {
                return old + '-' + newPrefix;
            } else if (newPrefix > 2) {
                return old.substring(0, old.length - 1) + newPrefix
            }
        };
        block.children('label').children().find('input').each(function(i, el) {
            let firstName = $(el).attr('name');
            $(el).attr('name', newNameFunc(firstName));
        });
        block.children('label').children().find('select').each(function(i, el) {
            let firstName = $(el).attr('name');
            $(el).attr('name', newNameFunc(firstName));
        });
        block.children('label').children().find('textarea').each(function(i, el) {
            let firstName = $(el).attr('name');
            $(el).attr('name', newNameFunc(firstName));
        });
        newPrefix++;
    };
    let setAttrNamesWorks = function(block) {
        let newNameFunc = function(old) {
            if (newPrefixW === 2) {
                return old + '-' + newPrefix;
            } else if (newPrefixW > 2) {
                return old.substring(0, old.length - 1) + newPrefixW
            }
        };
        block.children('label').children().find('input').each(function(i, el) {
            let firstName = $(el).attr('name');
            $(el).attr('name', newNameFunc(firstName));
        });
        block.children('label').children().find('select').each(function(i, el) {
            let firstName = $(el).attr('name');
            $(el).attr('name', newNameFunc(firstName));
        });

        newPrefixW++;
    };
    //инициализация кастомных селектов
    let selectInit = function(selector) {
        const _this = $(selector),
            selectOption = _this.find('option'),
            selectOptionLength = selectOption.length,
            selectedOption = selectOption.filter(':selected'),
            duration = 450;
        const selectHead = _this.next('.new-select');
        $('<div>', {
            class: 'new-select__list'
        }).insertAfter(selectHead);
        const selectList = selectHead.next('.new-select__list');
        for (let i = 1; i < selectOptionLength; i++) {
            $('<div>', {
                    class: 'new-select__item',
                    html: $('<span>', {
                        text: selectOption.eq(i).text()
                    })
                })
                .attr('data-value', selectOption.eq(i).val())
                .appendTo(selectList);
        }
        const selectItem = selectList.find('.new-select__item');
        selectList.slideUp(0);
        selectHead.on('click', function() {
            if (!$(this).hasClass('on')) {
                $(this).addClass('on');
                $(this).parent('.c-select').addClass('c-select-rotate');
                selectList.slideDown(duration);
                selectItem.on('click', function() {
                    let chooseItem = $(this).data('value');
                    $('select').val(chooseItem).attr('selected', 'selected');
                    selectHead.text($(this).find('span').text());
                    selectList.slideUp(duration);
                    selectHead.removeClass('on');
                });
            } else {
                $(this).removeClass('on');
                $(this).parent('.c-select').removeClass('c-select-rotate');
                selectList.slideUp(duration);
            }
        });
    };

    addEducationBtn.on('click', function() {
        let newBlockNameSelector = '.' + copyBlockName + ' ' + '.c-select';
        if (addEducationBtn.attr('data-click') === '0') {
            let copy = mainEducBlock.clone();
            copy.addClass(copyBlockName);
            copy.removeClass('education-block');
            setAttrNames(copy);
            copy.find('.new-select__list').detach();
            $.each(copy.find('input'), function(index, elem) {
                $(elem).html();
            });
            copy.insertBefore('.add-education');
            selectInit(newBlockNameSelector);
            addEducationBtn.attr('data-click', ++clickCounter);
            ++copyNumber;
        } else if (addEducationBtn.attr('data-click') > '0') {
            let closestBlock = addEducationBtn.closest('.add-education').prev('.' + copyBlockName);
            let copy = closestBlock.clone();
            copy.removeClass(copyBlockName);
            copyBlockName = copyBlockName.substring(0, copyBlockName.length - 1) + copyNumber;
            copy.addClass(copyBlockName);
            newBlockNameSelector = '.' + copyBlockName + ' ' + '.c-select';
            setAttrNames(copy);
            copy.find('.new-select__list').detach();
            copy.insertBefore('.add-education');
            selectInit(newBlockNameSelector);
            addEducationBtn.attr('data-click', ++clickCounter);
            ++copyNumber;
        }
    });

    addWorkBtn.on('click', function() {
        let thisNewBlock = '.' + copyBlockNameWork;
        let firstSelect = thisNewBlock + ' ' + '.c-select-1',
            secondSelect = thisNewBlock + ' ' + '.c-select-2';
        if (addWorkBtn.attr('data-click') === '0') {
            let copy = mainWorkBlock.clone();
            copy.removeClass('working-main-block');
            copy.addClass(copyBlockNameWork);
            setAttrNamesWorks(copy);
            copy.find('.new-select__list').detach();
            copy.insertBefore('.add-work');
            selectInit(firstSelect);
            selectInit(secondSelect);
            addWorkBtn.attr('data-click', ++clickCounter);
            ++copyNumber;
        } else if (addWorkBtn.attr('data-click') > '0') {
            let closestBlock = addWorkBtn.closest('.add-work').prev('.' + copyBlockNameWork);
            // console.log(closestBlock);
            let copy = closestBlock.clone();
            copy.removeClass(copyBlockNameWork);
            copyBlockNameWork = copyBlockNameWork.substring(0, copyBlockNameWork.length - 1) + copyNumber;
            copy.addClass(copyBlockNameWork);
            firstSelect = '.' + copyBlockNameWork + ' ' + '.c-select-1';
            secondSelect = '.' + copyBlockNameWork + ' ' + '.c-select-2';
            setAttrNamesWorks(copy);
            copy.find('.new-select__list').detach();
            copy.insertBefore('.add-work');
            selectInit(firstSelect);
            selectInit(secondSelect);
            addWorkBtn.attr('data-click', ++clickCounter);
            ++copyNumber;
        }
    });




    function inputCheck(a) {
        $(a).submit(function(e) {
            e.preventDefault();
            var self = $(this);
            var field = ['name', 'phone', 'email'];
            var error = 0;
            $(this).find('input').each(function() {
                for (var i = 0; i < field.length; i++) {

                    if (!$(this).val()) {
                        $(this).css('border', '1px solid #C30215');
                        $('<div class="form-invalid-error">обязательное поле</div>').insertAfter(this);
                        error = 1;
                    } else {
                        $(this).next().remove();
                        $(this).css('border', '1px solid #d9d9d9');
                        error = 0;
                    }

                }
            });

            if (error === 0) {
                return $.ajax({
                    type: self.attr('method'),
                    url: self.attr('action'),
                    data: self.serialize(),
                    success: function() {
                        $('.vacancies-d__form-wrapper--feedback__muzey').css('display', 'none');
                        var url = window.location.href;
                        document.location.href = url + '#modal-success';
                        location.reload();
                    },
                });
            } else {
                return false;
            }
        })
    }
    inputCheck($('.footer__contact-form'));
    inputCheck($('.contacts__email-input'));
    inputCheck($('#vac-d-form-muz'));
}


// Поделиться в соц сетях
var Shares = {
    title: 'Поделиться',
    width: 800,
    height: 800,
    init: function() {
        var share = document.querySelectorAll('.social');
        for (var i = 0, l = share.length; i < l; i++) {
            var url = share[i].getAttribute('data-url') || location.href,
                title = share[i].getAttribute('data-title') || '',
                desc = share[i].getAttribute('data-desc') || '',
                el = share[i].querySelectorAll('a');
            for (var a = 0, al = el.length; a < al; a++) {
                var id = el[a].getAttribute('data-id');
                if (id) this.addEventListener(el[a], 'click', {
                    id: id,
                    url: url,
                    title: title,
                    desc: desc
                });
            }
        }
    },
    addEventListener: function(el, eventName, opt) {
        var _this = this,
            handler = function() {
                _this.share(opt.id, opt.url, opt.title, opt.desc);
            };
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            el.attachEvent('on' + eventName, function() {
                handler.call(el);
            });
        }
    },
    share: function(id, url, title, desc) {
        url = encodeURIComponent(url);
        desc = encodeURIComponent(desc);
        title = encodeURIComponent(title);
        switch (id) {
            case 'fb':
                this.popupCenter('https://www.facebook.com/sharer/sharer.php?u=' + url, this.title, this.width, this.height);
                break;
            case 'vk':
                this.popupCenter('https://vk.com/share.php?url=' + url + '&description=' + title + '. ' + desc, this.title, this.width, this.height);
                break;
            case 'tw':
                var text = title || desc || '';
                if (title.length > 0 && desc.length > 0) text = title + ' - ' + desc;
                if (text.length > 0) text = '&text=' + text;
                this.popupCenter('https://twitter.com/intent/tweet?url=' + url + text, this.title, this.width, this.height);
                break;
            case 'gp':
                this.popupCenter('https://plus.google.com/share?url=' + url, this.title, this.width, this.height);
                break;
            case 'pin':
                this.popupCenter('https://pinterest.com/pin/create/button/?url=' + url, this.title, this.width, this.height);
                break;
            case 'viber':
                this.popupCenter('viber://forward?text=' + url, this.title, this.width, this.height);
                break;
            case 'ok':
                this.popupCenter('https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=' + url, this.title, this.width, this.height);
                break;
            case 'whatsapp':
                this.popupCenter('https://api.whatsapp.com/send?text=' + url, this.title, this.width, this.height);
                break;
        }
    },
    newTab: function(url) {
        var win = window.open(url, '_blank');
        win.focus();
    },
    popupCenter: function(url, title, w, h) {
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 3) - (h / 3)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        if (window.focus) {
            newWindow.focus();
        }
    }
};
jQuery(document).ready(function($) {
    $('.social a').on('click', function() {
        var id = $(this).data('id');
        if (id) {
            var data = $(this).parent('.social');
            var url = data.data('url') || location.href,
                title = data.data('title') || '',
                desc = data.data('desc') || '';
            Shares.share(id, url, title, desc);
        }
    });
});

jQuery(function($) {
    let newsImg = $(".press-news-in-main-text-item img");
    newsImg.after(function() {
        imgTitle = $(this).attr("title");
        if (imgTitle) return '<div class="press-news-in-main-photo-description">' + imgTitle + '</div>';
    });
});



window.addEventListener("resize", function() {
    updateSlider(swiperStatistics);
    updateSlider(swiperTabFeature1);
    updateSlider(swiperTabFeature2);
    updateSlider(swiperTab);
    updateSlider(swiperTabThumbs);
    updateSlider(swiperNews);
    updateSlider(swiperCompanies);
    updateSlider(companiesThumbs);
    updateSlider(swiperHero);
    updateSlider(swiperGallery);
    updateSlider(swiperPurchase);
    updateSlider(swiperFrame);
    if (videoMain) {
        breakpointMobileVideo.addListener(breakpointCheckerForVideo);
        breakpointCheckerForVideo();
    }


    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);



    if (containerTabsScroll) {
        scrollbarTabs.update()
    }

    breakpointMobile.addListener(breakpointCheckerForMobile);
    breakpointCheckerForMobile();


    breakpointDesktop.addListener(breakpointCheckerForDesktopAndLower);

    breakpointCheckerForDesktopAndLower();

    breakpointDesktop.addListener(breakpointCheckerForDesktopAndLowerOnce);
    breakpointCheckerForDesktopAndLowerOnce();
});


function scrollTable() {
    initAnimation();

    if (scrollbar) {
        scrollbar.scrollTo(0, elementTopPositionTable, 1000);
    } else {
        scrollbarTable.scrollTo(0, 0, 1500);
    }
};

let table = document.querySelector('.b-table')
if (table) {
    let elementTopPositionTable = getCoordsFrame(table).top;

    BX.addCustomEvent('onAjaxSuccess', scrollTable);
}

$('.vacancies-d__form').submit(function(e) {
    if (grecaptcha.getResponse() == "") {
        e.preventDefault();
        $('.result_captcha').text('Пройдите пожалуйста проверку');
    } else {
        $('.result_captcha').text('');
        return true;
    }
});
$('.press-contact-us__form').submit(function(e) {
    if (grecaptcha.getResponse() == "") {
        e.preventDefault();
        $('.result_captcha').text('Пройдите пожалуйста проверку');
    } else {
        $('.result_captcha').text('');
        return true;
    }
});


function fixedHeaderTable(headerTable, scrollTable) {

    if (scrollTable) {
        scrollTable.addListener(({ offset }) => {

            document.querySelector(headerTable).style.top = offset.y + 'px';

        })
    }

}



fixedHeaderTable('.p-table__header', scrollbarTableProd);

fixedHeaderTable('.b-table__header', scrollbarTable);

// fixedHeaderTable('.dp-table table tr:first-child', scrollbarTablePurchase);