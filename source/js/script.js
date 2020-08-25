'use strict';

import Swiper, { Scrollbar, Thumbs,  Navigation, EffectFade, Autoplay} from 'swiper';

Swiper.use([Scrollbar, Thumbs,EffectFade, Navigation, Autoplay ]);

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import ScrollbarSmoth from 'smooth-scrollbar';




//  высота вьюпорта
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Функция получения координат элемента
function getCoords(elem) {
	
	let box = elem.getBoundingClientRect();

	return {
		top: Math.round(box.top + scrollbar.offset.y),
		bottom: Math.round(box.bottom + scrollbar.offset.y)
	};
}

// Скролл к определенному элементу
function scrollToTop( element) {
	let elementTopPosition = getCoords(element).top;

	scrollbar.scrollTo(0, elementTopPosition, 600);

}

// Паралакс эффект на картинках


function parallax() {
	let layers = document.getElementsByClassName("parallax__img");
	let layer, speed, yPos;

	for (let i = 0; i < layers.length; i++) {
		layer = layers[i];
		let top = scrollbar.offset.y- getCoords(layer).top;
	
		speed = layer.getAttribute('data-speed');
		let yPos = -(top * speed / 100);
		
		layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
	}
}

// Соц.сети

function socialInteraction() {
	let socialBtn = document.querySelectorAll('.social__btn');
	let socialDrop = document.querySelectorAll('.social__dropdown');
	let btnWrap = document.querySelectorAll('.social__btn-item');
	for(let i = 0; i<socialBtn.length; i++){
		socialBtn[i].addEventListener('click', function(){
			socialDrop[i].classList.toggle('active');
			btnWrap[i].classList.toggle('active');


			let socialWrap = document.querySelectorAll('.social__btn-item');

			document.addEventListener('click', function(event){
				for(let i = 0; i<socialWrap.length; i++){
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


// Шапка

function headerShowAndHideDesktop() {
	let traktorsContainer = document.querySelector('.traktors__container');
	let twoScreen = document.querySelector('.two-screen');
	
		// if(videoMain){
		
		// 	if(getCoords(twoScreen).top < scrollbar.offset.y){
		// 		videoMain.pause();
			
		// 	}else if(getCoords(twoScreen).top >= scrollbar.offset.y){
		// 		if(document.querySelector('.button__video-controls--play').classList.contains('active')) {
		// 			videoMain.play();
		// 		}
		// 	}
		// }
	
	
	if(getCoords(header).top > 50 && getCoords(twoScreen).top >= scrollbar.offset.y){
		header.classList.add('hide')
	}else if(getCoords(header).top < 0  || getCoords(header).top > 100 && getCoords(twoScreen).top <= scrollbar.offset.y){
		header.classList.remove('hide')
	
		
	}
	if(getCoords(twoScreen).top >= scrollbar.offset.y){
		header.classList.remove('js-scroll');
	}else if(getCoords(header).top > 50 && getCoords(twoScreen).top <= scrollbar.offset.y){
		header.classList.add('js-scroll');
	}
	
	if(traktorsContainer){
		if(getCoords(header).top > getCoords(traktorsContainer).top && getCoords(header).bottom < getCoords(traktorsContainer).bottom){
			header.classList.add('js-hide');
			header.classList.add('js-scroll-hide');
			
		}else if(getCoords(header).top < getCoords(traktorsContainer).top || getCoords(header).bottom > getCoords(traktorsContainer).bottom){
			header.classList.remove('js-hide');
			header.classList.remove('js-scroll-hide');
		}
	}

}


function hideAndShowHeaderMobile() {
	if(scrollbar.offset.y > 0){
		header.classList.add('hide')
	}else if(scrollbar.offset.y == 0 ){
		header.classList.remove('hide')

	}
}
// Инициализация плавного скролла

let options  = {
	damping: 0.04,
	delegateTo: document
}
let options2  = {
	damping: 0.04,
	continuousScrolling: false
	// delegateTo: document
}
let options3  = {
	damping: 0.04,
	continuousScrolling: false
	// delegateTo: document
}


const breakpoint = window.matchMedia( '(min-width:767px)' );
const header = document.querySelector('.header');

// Кнопка для вызова попапа на стр кировец
let btnMore;
// Определения координат для GSAP относительно плавного скролла
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      scrollbar.scrollTop = value;
    }
    return scrollbar.scrollTop;
  },
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  }
});

let containerScroll = document.querySelector('.scroll');
let scrollbar;
	if(containerScroll){
		scrollbar = ScrollbarSmoth.init(containerScroll, options);
		scrollbar.addListener(ScrollTrigger.update);


		scrollbar.addListener(() => {
			parallax();
			showAndHideYearNav()
		})
		if ( breakpoint.matches === true ) {
			scrollbar.addListener(() => {
				
				if(header){	
	
					headerShowAndHideDesktop();

				}
			})
		}else if ( breakpoint.matches === false ) {
			scrollbar.addListener(() => {
				hideAndShowHeaderMobile();
			})
		}
		
		
	}


let popupWrap = document.querySelectorAll('.scroll-popup');
for(let i=0; i<popupWrap.length; i++){
	let scrollbarPopup = ScrollbarSmoth.init(popupWrap[i], options2);
	scrollbarPopup.addListener(ScrollTrigger.update);
}
let containerNavScroll = document.querySelector('.nav_list-wrap');
let scrollbarNav;
if(containerNavScroll){
	scrollbarNav = ScrollbarSmoth.init(containerNavScroll, options3);
	scrollbarNav.addListener(ScrollTrigger.update);
}





// Инициализация свайперов
	let swiperStatistics;
	let swiperTabFeature1;
	let swiperTabFeature2;
	let swiperTab;
	let swiperTabThumbs;
	let swiperNews;
	let swiperCompanies;
	let companiesThumbs;
	let swiperHero;
	const transitionSlide = 15000;

	const enableSwiper = function(){
		// document.addEventListener('DOMContentLoaded', function(){
			if(document.querySelector('.statistics__slider')){
				swiperStatistics = new Swiper('.statistics__slider',{
					observer: true,
					observeParents: true,
					scrollbar: {
						el: '.swiper-scrollbar',
					},
				});
			}
			if(document.querySelector('.kirovets_tabs__features--1')){
				let tabFeatures1 = document.querySelector('.kirovets_tabs__features--1');

			
				swiperTabFeature1 = new Swiper(tabFeatures1,{
					observer: true,
					observeParents: true,
					scrollbar: {
						el: '.swiper-scrollbar',
					},
				});
			}
			if(document.querySelector('.kirovets_tabs__features--2')){
			
				let tabFeatures2 = document.querySelector('.kirovets_tabs__features--2');

					swiperTabFeature2 = new Swiper(tabFeatures2,{
						observer: true,
						observeParents: true,
						scrollbar: {
							el: '.swiper-scrollbar',
						},
					});
				
			}
				
	}
		// })
		
		
	

	
	document.addEventListener('DOMContentLoaded', function(){
		if(document.querySelector('.news__container')){
			let newNavPrev = document.querySelector('.news__container .swiper-button-next');
			let newNavNext = document.querySelector('.news__container .swiper-button-prev');
	
	
			swiperNews = new Swiper('.news__container',{
				// autoHeight: true,
				// observer: true,
				// 	observeParents: true,
				slidesPerView: 'auto',
				spaceBetween: 0,
				scrollbar: {
					el: '.swiper-scrollbar--news',
				},
				navigation: {
					nextEl: newNavPrev,
					prevEl: newNavNext,
				},
				observer: true, 
				observeParents: true,
				// updateOnWindowResize: true,
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
					1280:{
						spaceBetween: 35,
						slidesOffsetAfter: 200,
						
					}
				}
			});
			
		}
		if(document.querySelector('.swiper-container--companies')){

			companiesThumbs = new Swiper('.swiper-container--companies-thumbs', {
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
					spaceBetween: 45,
					
					},
			
				},
			  });
	
	
			swiperCompanies = new Swiper('.swiper-container--companies',{
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
					el: '.swiper-scrollbar--companies',
				},
			});


			swiperCompanies.on('slidePrevTransitionStart', function () {

				let btnCompanies = document.querySelectorAll('.swiper-slide-active .button-more--inner');
				for(let i = 0; i<btnCompanies.length; i++){
					btnCompanies[i].classList.add('is-inview-line');
				}
				
			
			
				gsap.utils.toArray('.swiper-slide-active .companies__title .title--inner').forEach(element => {
					gsap.fromTo(element,{
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
					
						}
					);
				});

				gsap.utils.toArray('.swiper-slide:not(.swiper-slide-active) .companies__title .title--inner').forEach(element => {
					gsap.fromTo(element,{
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
					
						}
					);
				});

				gsap.utils.toArray('.swiper-slide-active .companies__desc').forEach(element => {
					gsap.fromTo(element,{
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
					
						}
					);
				});
	
				gsap.utils.toArray('.swiper-slide-active .button-more--inner').forEach(element => {
					gsap.fromTo(element,{
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
					
						}
					);
				});

			});
			swiperCompanies.on('slideNextTransitionStart', function () {
				let btnCompanies = document.querySelectorAll('.swiper-slide-active .button-more--inner');
				for(let i = 0; i<btnCompanies.length; i++){
					btnCompanies[i].classList.add('is-inview-line');

				}
				
				gsap.utils.toArray('.swiper-slide-active .companies__title .title--inner').forEach(element => {
					gsap.fromTo(element,{
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
					
						}
					);
				});



				gsap.utils.toArray('.swiper-slide:not(.swiper-slide-active) .companies__title .title--inner').forEach(element => {
					gsap.fromTo(element,{
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
					
						}
					);
				});
				
				gsap.utils.toArray('.swiper-slide-active .companies__desc').forEach(element => {
					gsap.fromTo(element,{
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
					
						}
					);
				});
				
				gsap.utils.toArray('.swiper-slide-active .button-more--inner').forEach(element => {
					gsap.fromTo(element,{
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
					
						}
					);
				});
			
			
			});
			
			
		}
		if(document.querySelector('.swiper-container--hero')){

			
		
			swiperHero = new Swiper('.swiper-container--hero',{
				loop: true,
			   autoplay: {
				   delay: transitionSlide,
				   disableOnInteraction: true,
				 },
   
			   navigation: {
			   	nextEl: '.hero__slider-controls .swiper-button-prev',
			   	prevEl: '.hero__slider-controls .swiper-button-next',
			   },
			   observer: true,
					observeParents: true,
			   effect: 'fade',
			   fadeEffect: {
				   crossFade: true
			   },
		   
		   });

		   swiperHero.on('slidePrevTransitionStart', function () {
			checkActiveSlideForVideo();
			gsap.utils.toArray('.swiper-slide-active .hero__title .title--inner').forEach(element => {
				
					gsap.fromTo(element,{
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
						
							}
						);
					
			});

			gsap.utils.toArray('.swiper-slide-active .hero__subtitle').forEach(element => {
				gsap.fromTo(element,{
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
				
					}
				);
			});
		});
		swiperHero.on('slideNextTransitionStart', function () {
			checkActiveSlideForVideo();
			gsap.utils.toArray('.swiper-slide-active .hero__title .title--inner').forEach(element => {
				gsap.fromTo(element,{
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
				
					}
				);
			});
				gsap.utils.toArray('.swiper-slide-active .hero__subtitle').forEach(element => {
				gsap.fromTo(element,{
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
				
					}
				);
			});

		
		
		});

		function checkActiveSlideForVideo(){
			if(swiperHero.activeIndex == 1){
				videoMain.play();

			}else{
				videoMain.pause();
				
				
			}
		}
		

		
	   }
	   if(document.querySelector('.kirovets_tabs__list-wrap')){
			swiperTabThumbs = new Swiper('.kirovets_tabs__list-wrap', {
				observer: true,
					observeParents: true,
				slidesPerView: 2,

				watchSlidesVisibility: true,
				watchSlidesProgress: true,
			});
		}
		if(document.querySelector('.kirovets_tabs__container')){
			swiperTab = new Swiper('.kirovets_tabs__container',{
				observer: true,
					observeParents: true,
				thumbs: {
					swiper: swiperTabThumbs
				},
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				},
			});
		}

	
	})

	

	
	
	

	function updateSlider(slider){
		if(slider!= undefined){
			slider.update();
		}
	}

	window.addEventListener("resize", function(){
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
		swiperTab.detachEvents();
		// swiperTab.mousewheel.disable();
	}

	function setMainSwiperMouseOut() {
		swiperTab.attachEvents();
		// swiperTab.mousewheel.enable();

			
	}



	let InnerSliders = document.querySelectorAll('.kirovets_tabs__features');



	const breakpointChecker = function() {
		// if larger viewport and multi-row layout needed
		if ( breakpoint.matches === true ) {
			

				if (swiperStatistics != null) {
					swiperStatistics.destroy(true, true);
					swiperStatistics.update();
				}
				if(document.querySelector('.statistics__slider')){
					document.querySelector('.statistics__slider').classList.remove('swiper-container');
					document.querySelector('.statistics__list').classList.remove('swiper-wrapper');
					let statSlides = document.querySelectorAll('.statistics__item');
					for (let i = 0; i < statSlides.length; i++) {
						
						statSlides[i].classList.remove('swiper-slide');
					}
				}
			
				if(document.querySelector('.kirovets_tabs__container')){
					if (swiperTabFeature1 != null) {
						swiperTabFeature1.destroy(true, true);
						swiperTabFeature1.update();
						
					}
					if (swiperTabFeature2 != null) {
						swiperTabFeature2.destroy(true, true);
						swiperTabFeature2.update();
						
					}
					for(let i = 0; i<InnerSliders.length; i++){
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
				
			
					// Анимация элементов
				gsap.utils.toArray('.is-animate').forEach(element => {

					let parallax = element.getAttribute('data-speed');
					let speed = parallax * 100 + '%';
					gsap.fromTo(element, {
						// duration: 5,
						y: speed
					}, {
						y: "0%",
						force3D: true,
						scrollTrigger: {
							trigger: element,
							scrub: true,
							// start: "top top"
						} 
					});
				});

				btnMore = document.querySelectorAll('.traktors__text-wrap--desktop .button-more--traktors');

		} else if ( breakpoint.matches === false ) {
			
	
			if(document.querySelector('.kirovets_tabs__container')){

				for(let i = 0; i<InnerSliders.length; i++){
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

			if(document.querySelector('.statistics__slider')){
				document.querySelector('.statistics__slider').classList.add('swiper-container');
				document.querySelector('.statistics__list').classList.add('swiper-wrapper');
				let statSlides = document.querySelectorAll('.statistics__item');
				for (let i = 0; i < statSlides.length; i++) {
					
					statSlides[i].classList.add('swiper-slide');
				}
			}
				enableSwiper();
			

			btnMore = document.querySelectorAll('.traktors__text-wrap--tablet .button-more--traktors');

		}
	};


	breakpoint.addListener(breakpointChecker);

	breakpointChecker();

// Конец свайперов


// Плавный ссылки в годах
	const makeNavLinksSmooth = ( ) => {
		const navLinks = document.querySelectorAll( '.traktors__nav-link' );
		const section  = document.querySelectorAll('.traktors');
		for ( let n = 0; n<navLinks.length; n++ ) {
			// if ( navLinks.hasOwnProperty( n ) ) {
				navLinks[ n ].addEventListener( 'click', e => {
					// const id = section[ n ].id;
					e.preventDefault( );
				
			
					scrollToTop(section[n]);
				
				} );
			// }
		}
	}
	
// Наблюдение за ссылками при скролле
	const spyScrolling = ( ) => {
		const sections = document.querySelectorAll( '.traktors' );
	
			const scrollPos = scrollbar.offset.y
	
			// считывает или устанавливает количество пикселей, прокрученных от верха элемент 
			for ( let s in sections )
				if ( sections.hasOwnProperty( s ) && getCoords(sections[ s ]).top-100  <= scrollPos ) {

					const id = sections[ s ].id;
					document.querySelector( '.traktors__nav-link.active' ).classList.remove( 'active' );
					document.querySelector( `a[href*=${ id }]` ).classList.add( 'active' );

				}
		
	}


	// Скрытие / открытие навигации по годам
	function showAndHideYearNav() {
		let yearNav = document.querySelector('.traktors__nav');
		if(yearNav){
			document.addEventListener('DOMContentLoaded', function(){
				yearNav.style.opacity = "0";
			})
			let containerNav = document.querySelector('.traktors__container');
			let yearNavTopY = getCoords(yearNav).top;
			let yearNavBottomY = getCoords(yearNav).bottom;		
			let containerNavTopY = getCoords(containerNav).top;
			let containerNavBottomY = getCoords(containerNav).bottom;
	
			if(yearNavTopY >= containerNavTopY && yearNavBottomY < containerNavBottomY){
				yearNav.style.opacity = "1";
				yearNav.style.pointerEvents = "auto";
				yearNav.style.zIndex = "5";
				spyScrolling( );
		
			}else if(yearNavTopY <= containerNavTopY || yearNavBottomY >= containerNavBottomY){
				yearNav.style.opacity = "0";
				yearNav.style.pointerEvents = "none";
				yearNav.style.zIndex = "-1";
			}
			
			makeNavLinksSmooth( );

		}
	}
	
		
	


	


	// Видео
	let videoMain = document.querySelector('.parallax__img-video');

	if(videoMain){
		let btnPlay = document.querySelector('.button__video-controls--play');
	
	
	

		function playPauseMedia() {
			if(videoMain.paused) {
				videoMain.style.display = "block";
				videoMain.play();
			
				btnPlay.classList.add('active');
			} else {
				videoMain.pause();
				btnPlay.classList.remove('active');
			
			}
		}


		
		btnPlay.addEventListener('click', playPauseMedia);

		let btnsPlaySlider = document.querySelectorAll('.button__video-controls--other');

		for(let i = 0; i<btnsPlaySlider.length; i++){

		
			btnsPlaySlider[i].addEventListener('click', function(){
				console.log('hi');
				swiperHero.slideToLoop(0, 100, true);
				videoMain.currentTime = 0;
			})
		}
	}
	

// Анимация
	document.onreadystatechange = function () {
	
		if (document.readyState === "complete") {
	
			setTimeout(function () {
				document.querySelector('.preloader').style.display = "none";
				



				gsap.utils.toArray('.traktors__number-icon').forEach(element => {
					ScrollTrigger.create({
						trigger: element,
						scrub: true,
						toggleClass: 'is-inview',
						// this toggles the class again when you scroll back up:
						toggleActions: 'play none none none',
						// this removes the class when the scrolltrigger is passed:
						// once: true,
					});
				});
		
				gsap.utils.toArray('.company_group__item-icon').forEach(element => {
					ScrollTrigger.create({
						trigger: element,
						scrub: true,
						toggleClass: 'is-inview',
						// this toggles the class again when you scroll back up:
						toggleActions: 'play none none none',
						// this removes the class when the scrolltrigger is passed:
						// once: true,
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
						// once: true,
					});
				});
		
					gsap.utils.toArray('.traktors__info-wrap').forEach(element => {
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
				
		
				gsap.utils.toArray('.title--inner-main').forEach(element => {
					gsap.fromTo(element,{
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
		
						}
					);
				});
		
				gsap.utils.toArray('.title--inner').forEach(element => {
					gsap.fromTo(element,{
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
						}
					);
				});
		
					gsap.fromTo(".footer__outer",{
						y: '-20%',
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
							toggleActions: "play reverse play reverse"
							// scrub: true,
							// pinSpacing: false
							// start: "top c"
						} 
					}
					);
		
		
				gsap.utils.toArray('.statictics--inner').forEach(element => {
					gsap.fromTo(element, {
						opacity: 0,
						y: "25px"
					}, {
						y: "0%",
						duration: 1,
						opacity: 1 ,
						// stagger: .2,
						// ease: "ease",
						scrollTrigger: {
							trigger: element,
							// scrub: true,
							start: "bottom bottom"
						} 
					});
				});
		
		
		
				gsap.utils.toArray('.hero__subtitle').forEach(element => {
					gsap.fromTo(element,{
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
					
						}
					);
				});
				
		
		
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
			
			}, 6000);
		
		}
	}

	


let socialContainer = document.querySelector('.social__btn-list');
if(socialContainer){
	socialInteraction()
}


// Меню

let burger = document.querySelector('.js-nav-toggle');

if(burger){
	let btnSearch = document.querySelector('.js-search-text');
	let dropList = document.querySelectorAll('.js-dropdown');

	let navList = document.querySelector('.nav_list');

	let navLink = navList.querySelectorAll('.js-dropdown-toggle');
	let navItem = navList.querySelectorAll('.js-dropdown');

	burger.addEventListener('click', function(){
		document.body.classList.toggle('has-nav-open');
		document.body.classList.remove('has-search-open');

		for (let i = 0; i < navItem.length; i++) {
			navItem[i].addEventListener('mouseover', function() {
				navItem[i].querySelector('.js-dropdown-toggle').classList.add('active');
			})
			navItem[i].addEventListener('mouseleave', function() {
				navItem[i].querySelector('.js-dropdown-toggle').classList.remove('active');
			})
			
		}
	})
	btnSearch.addEventListener('click', function(){
		document.body.classList.toggle('has-search-open');
		
	})

	if ( window.screen.width < 1199 ) {

		for(let i = 0; i<dropList.length; i++){
			navItem[i].addEventListener('click', function(event){
				navLink[i].classList.toggle('active');
				navItem[i].classList.toggle('active');
				// this.querySelector('.c-nav_dropdown').classList.add('active');
				navItem[i].querySelector('.nav_dropdown').classList.toggle('active');

				// if(!this.contains(event.target)){
				// 	navItem[i].classList.remove('active');
				// 	navItem[i].querySelector('.nav_dropdown').classList.remove('active');
				// 	navLink[i].classList.remove('active');
				// }
			})
		}
	}	
}

let popup = document.querySelectorAll('.popup_kirovets');

			for(let i = 0; i<popup.length; i++){
				let number = popup[i].querySelector('.traktors__number--popup');
				let numbers = number.querySelectorAll('.traktors__number-icon');
				for(let i = 0; i<numbers.length; i++){
					numbers[i].classList.remove('is-inview');
				}
				btnMore[i].addEventListener('click', function(event){
					event.preventDefault();
					popup[i].classList.add('active');
					for(let i = 0; i<numbers.length; i++){
						numbers[i].classList.add('is-inview');
					}
					
					let btnBack = popup[i].querySelector('.popup_kirovets__back');




					btnBack.addEventListener('click', function(event){
						popup[i].classList.remove('active');
						for(let i = 0; i<numbers.length; i++){
							numbers[i].classList.remove('is-inview');
						}
				});
				
					let btnClose = popup[i].querySelector('.popup_kirovets__close');

					btnClose.addEventListener('click', function(event){
							popup[i].classList.remove('active');
							for(let i = 0; i<numbers.length; i++){
								numbers[i].classList.remove('is-inview');
							}
					});

			})

			
		}



// Добавление видимость параграфам 



if(window.screen.width< 767){
	let paragraph = document.querySelector('.zavod-text--main');
let paragraphBtnMore = document.querySelector('.button-more--zavod ');
let wrapper = document.querySelector('.zavod');
	if(paragraph){
		paragraphBtnMore.addEventListener('click', function(){
			
				paragraph.classList.add('show');
				paragraphBtnMore.style.display ="none";
				wrapper.classList.add('active');
		})
		
	}
	
}




// accordion
let acc = document.getElementsByClassName("akcioner-info__accordion-item");
let menu = document.getElementsByClassName("akcioner-info__menu-icon");
let contactNavItem = document.getElementsByClassName("contacts-sidebar__nav-item");
let navItem = document.getElementsByClassName("contacts-navigation-list__item");
let actionerNavItem = document.getElementsByClassName('akcioner-navigation-list__item-active');
let contactsMenuItem = document.getElementsByClassName('contacts-navigation-list__item-active');
let contactsMenu = document.getElementsByClassName("contacts-menu-container");


acc.forEach(function(item, i, acc) {
	item.addEventListener('click', function(e) {
		//show new thingy;
		this.classList.add('active');
		//hide old thingy
		if (activePanel) {
			activePanel.classList.remove('panel-active');
		}
		//update thingy
		activePanel = (activePanel === this) ? 0 : this;
	});
});


for (let i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function() {
		this.classList.toggle("active");
	});
}

for (let i = 0; i < menu.length; i++) {
	menu[i].addEventListener("click", function() {
		this.classList.toggle("active");
	});
}

for (let i = 0; i < contactsMenuItem.length; i++) {
	contactsMenuItem[i].addEventListener("click", function() {
		this.classList.toggle("active");
	});
}

for (let i = 0; i < actionerNavItem.length; i++) {
	actionerNavItem[i].addEventListener("click", function() {
		this.classList.toggle("active");
	});
}

for (let i = 0; i < contactNavItem.length; i++) {
	contactNavItem[i].addEventListener("click", function() {
		let current = document.getElementsByClassName("active");
		current[0].className = current[0].className.replace(" active", "");
		this.className += " active";
	});
}

for (let i = 0; i < navItem.length; i++) {
	navItem[i].addEventListener("click", function() {
		let current = document.getElementsByClassName("contacts-navigation-list__item-active");
		current[0].className = current[0].className.replace(" contacts-navigation-list__item-active", "");
		this.className += " contacts-navigation-list__item-active";
	});
}






if(document.querySelector('.geography')){
	//Добавление класса active к городам section-geography__map-item в рандомном порядке 
	var toggleActiveClass = function () {
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
	  var startTogglingActiveClass = function () {
		
		elements[0].classList.add('active');
		 return setInterval (toggleActiveClass, 2000);
	  }
	  
	  var intervalID = startTogglingActiveClass();
	  
}


  
if(screen.width>=1280){
	let body = document.body;
	let parallaxHor = document.querySelectorAll(".parallax__img--horizontal");

	for(let i = 0; i<parallaxHor.length; i++){
		body.addEventListener('mousemove', function(e) {
			let speed = parallaxHor[i].getAttribute('data-speed');
			let x = -(e.pageX + this.offsetLeft) / speed;
		
			parallaxHor[i].style.transform = 'translate3d(' + x + 'px,'  + '0px, 0px)';

			// blobs[0].style.transform = 'translate3d(' + -x + 'px,' + -y + 'px, 0px)';
		})
	}
}



// let preloader = document.querySelector('.preloader');

// preloader.classList.add('animate');