// var owlCarousel = require('owl.carousel');
// import { BaseComponent } from "./base/basecomponent";
// import * as jQuery from "jquery";

// export class carouselGrid extends BaseComponent {

//     constructor(element: HTMLElement) {
//         super(element);
//         this.init();
//     }

//     init(): void {
//         var direction;
// 		(document.dir !=undefined)? direction =document.dir : direction =document.getElementsByTagName("html")[0].getAttribute("dir");

// 		if (direction=="rtl") {
// 			var rtl = true;
// 		} else {
// 			var rtl = false;
// 		}

// 		if ($(window).width() >= 768) {
// 			$(".js-carousel-grid").owlCarousel({
// 				rtl: rtl,
// 				loop:false,
// 				slideBy: 1,
// 				nav: false,
// 				navText: ["<div class='c-carousel-navigation__button prev'><svg class='a-svg' width='12px' height='24px' role='img' aria-labelledby='Arrow left' focusable='false'><use xlink:href='/sites/netafim/assets/svg/svg-symbols.svg#chevron-left'></use></svg></div>","<div class='c-carousel-navigation__button next'><svg class='a-svg' width='12px' height='24px' role='img' aria-labelledby='Arrow right' focusable='false'><use xlink:href='/sites/netafim/assets/svg/svg-symbols.svg#chevron-right'></use></svg></div>"],
// 				autoHeight: false,
// 				dots: true,
// 				responsive : {
// 					0 : {
// 						items:1,
// 					},
// 					768 : {
// 						items:2,
// 						margin: 40,
// 						onInitialized: function(e) {
// 							alignArrows(e);
// 						}
// 					},
// 					1024 : {
// 						items:3,
// 						margin: 60,
// 						nav: true,
// 						dots : false,
// 						onInitialized: function(e) {
// 							alignArrows(e);
// 						}
// 					}
// 				}
// 			});

// 			$(".js-carousel-grid-5").owlCarousel({
// 				rtl: rtl,
// 				loop:false,
// 				slideBy: 1,
// 				nav: false,
// 				navText: ["<div class='c-carousel-navigation__button prev'><svg class='a-svg' width='12px' height='24px' role='img' aria-labelledby='Arrow left' focusable='false'><use xlink:href='/sites/netafim/assets/svg/svg-symbols.svg#chevron-left'></use></svg></div>","<div class='c-carousel-navigation__button next'><svg class='a-svg' width='12px' height='24px' role='img' aria-labelledby='Arrow right' focusable='false'><use xlink:href='/sites/netafim/assets/svg/svg-symbols.svg#chevron-right'></use></svg></div>"],
// 				dots : true,
// 				autoHeight: false,
// 				responsive : {
// 					0 : {
// 						items:1
// 					},
// 					768 : {
// 						items:5,
// 						margin: 15,
// 						onInitialized: function(e) {
// 							alignArrows(e);
// 						}
// 					},
// 					1024 : {
// 						items:5,
// 						margin: 15,
// 						nav: true,
// 						dots: false,
// 						onInitialized: function(e) {
// 							alignArrows(e);
// 						}
// 					}
// 				}
// 			});
// 		} else {
// 			$(".js-carousel-grid").owlCarousel('destroy');
// 			$(".js-carousel-grid").removeClass("owl-carousel");
// 		}

//         function alignArrows(e) {
// 			const el = <HTMLElement>e.target;
//             if(el.classList.contains('js-align-arrows')) {
//                 const owlItem = el.querySelectorAll('.owl-item');

// 				setTimeout(function() {
// 					el.style.cssText = "--set-owl-nav--top:" + owlItem[0].querySelector('img').offsetTop + (owlItem[0].querySelector('img').offsetHeight / 2) + "px";
// 				}, 250);
//             }
//         }

//         window.dispatchEvent(new Event('resize'));
//     }
// }
