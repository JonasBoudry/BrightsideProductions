// import { BaseComponent } from "../base/basecomponent";

// // Unfortunately, Fancybox3 is not available as a module (not ES6, not CommonJS)
// // so we need to add jQuery to the global :'(
// // import jQuery from "jquery";
// declare var window: any;
// window.jQuery = jQuery;
// require("@fancyapps/fancybox");

// export class LightBox extends BaseComponent {
// 	private defaultOptions: any = {
// 		arrows: false,
// 		infobar: false,
// 		buttons: ["zoom", "close"],
// 	};

// 	// element is the container in which LightBox elements are found
// 	constructor(
// 		element: HTMLElement,
// 		private trigger: string = ".js-trigger-lightbox"
// 	) {
// 		super(element);
// 		this.init();
// 	}

// 	public init(): void {
// 		jQuery(this.trigger, this.element).fancybox(this.defaultOptions);
// 	}

// 	public initVideos(specificOptions?: any) {
// 		var videoOptions = {
// 			video: {
// 				// Overwrite template, to remove "poster={{poster}}". This to prevent animation effect of the button icon
// 				tpl:
// 					'<video class="fancybox-video" controls controlsList="nodownload">' +
// 					'<source src="{{src}}" type="{{format}}" />' +
// 					'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
// 					"</video>",
// 			},
// 			animationEffect: false,
// 			fullScreen: {
// 				autoStart: window.innerWidth < 980,
// 			},
// 		};

// 		var options = {
// 			...this.defaultOptions,
// 			...videoOptions,
// 			...specificOptions,
// 		};
// 		jQuery(this.trigger, this.element).fancybox(options);
// 	}
// }
