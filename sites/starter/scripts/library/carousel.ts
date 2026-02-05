// var owlCarousel = require('owl.carousel');
// import { BaseComponent } from "./base/basecomponent";
// import * as jQuery from "jquery";

// export class Carousel extends BaseComponent {
// 	private readonly CLASS_WRAPPER: string = "js-carousel";
//     private readonly SELECTOR_WRAPPER: string = "." + this.CLASS_WRAPPER;

//     private wrapperElement: HTMLElement;

//     constructor(element: HTMLElement) {
//         super(element);
//         this.init();
//     }

//     init(): void {
// 		this.wrapperElement = this.element;

//         var direction;
// 		(document.dir !=undefined)? direction =document.dir : direction =document.getElementsByTagName("html")[0].getAttribute("dir");

// 		if (direction=="rtl") {
// 			var rtl = true;
// 		} else {
// 			var rtl = false;
// 		}

// 		$('.owl-carousel').owlCarousel({
// 			rtl: rtl,
// 			loop:false,
// 			margin:0,
// 			items:1,
// 			dots: true,
// 			navText: ["<div class='c-carousel-navigation__button prev'><svg class='a-svg' width='12px' height='24px' role='img' aria-labelledby='Arrow left' focusable='false'><use xlink:href='/sites/netafim/assets/svg/svg-symbols.svg#chevron-left'></use></svg></div>","<div class='c-carousel-navigation__button next'><svg class='a-svg' width='12px' height='24px' role='img' aria-labelledby='Arrow right' focusable='false'><use xlink:href='/sites/netafim/assets/svg/svg-symbols.svg#chevron-right'></use></svg></div>"],
// 			autoHeight: true,
// 			responsive : {
// 				0 : {
// 					nav : false
// 				},
// 				1024 : {
// 					nav : true
// 				}
// 			}
// 		}).on("changed.owl.carousel", pauseVideo);

//         function pauseVideo(e) {
//             const current = e.item.index;
//             const next = parseFloat(current + 1);

//             // pause all videos
// 			const videoCurrentItem = <HTMLVideoElement> document.querySelector(".owl-item:nth-child("+current+") .js-video");

// 			if(videoCurrentItem) {
// 				if(videoCurrentItem.classList.contains('is-youtube')) {
// 					// PAUSE IFRAME NOT WORKING
// 					//videoCurrentItem.find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
// 				} else {
// 					if(videoCurrentItem.classList.contains('is-playing') || videoCurrentItem.getAttribute('autoplay') != "") {
// 						videoCurrentItem.pause();
// 					}
// 				}
// 			}

// 			// stop pausing mp4 autoplay videos
//             const videoNextItem = <HTMLVideoElement> document.querySelector(".owl-item:nth-child("+next+") .js-video");
//             if(videoNextItem) {
//                 if(!videoNextItem.classList.contains('is-youtube') && videoNextItem.getAttribute('autoplay') != "") {
//                     videoNextItem.play();
//                 }
//             }

//         }
//     }
// }
