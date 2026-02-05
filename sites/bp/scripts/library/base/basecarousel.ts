// var slick = require("slick-carousel");
// import * as jQuery from "jquery";
// import { BaseConfiguredComponent } from "./baseconfiguredcomponent";

// export interface ICarouselInit {
// 	Autoplay: boolean;
// 	ScrollInterval: number;
// 	RandomStartSlide: boolean;
// }

// export class BaseCarousel extends BaseConfiguredComponent<ICarouselInit> {
// 	protected slides: HTMLElement;

// 	private readonly SLIDES_SELECTOR = ".js-carousel-slides";
// 	private readonly PREV_SELECTOR = ".js-carousel-prev";
// 	private readonly NEXT_SELECTOR = ".js-carousel-next";
// 	private readonly CURRENT_SELECTOR = ".js-carousel-current";
// 	private readonly TOTAL_SELECTOR = ".js-carousel-total";

// 	constructor(protected element: HTMLElement) {
// 		super(element);
// 	}

// 	init(): void {
// 		if (!this.element) return;

// 		// Slides container
// 		this.slides = this.element.querySelector(this.SLIDES_SELECTOR);
// 		if (this.slides == null) {
// 			console.log("Cannot find slides container.");
// 			return;
// 		}
// 	}

// 	// How can we force this method to be called?
// 	protected initCarousel(options: JQuerySlickOptions) {
// 		this.updateCounters();

// 		// Initiliaze Slick
// 		jQuery(this.slides).slick(options);

// 		// Attach events to navigation buttons
// 		this.attachNavigate(this.PREV_SELECTOR, false);
// 		this.attachNavigate(this.NEXT_SELECTOR, true);
// 	}

// 	// Use before slick Initialize
// 	private updateCounters(): void {
// 		let currentSlidePlaceholder: HTMLElement = this.element.querySelector(
// 			this.CURRENT_SELECTOR
// 		);
// 		let totalCountPlaceholder: HTMLElement = this.element.querySelector(
// 			this.TOTAL_SELECTOR
// 		);

// 		// Count and total
// 		jQuery(this.slides).on("init", (e, slick) => {
// 			this.setSlideNumber(
// 				currentSlidePlaceholder,
// 				slick.currentSlide + 1
// 			);
// 			this.setSlideNumber(totalCountPlaceholder, slick.slideCount);
// 		});

// 		jQuery(this.slides).on("afterChange", (e, slick) => {
// 			this.setSlideNumber(
// 				currentSlidePlaceholder,
// 				slick.currentSlide + 1
// 			);
// 		});
// 	}

// 	private attachNavigate(selector: string, next: boolean): void {
// 		var prev = this.element.querySelector(selector);
// 		if (prev == null) return;
// 		prev.addEventListener("click", (e) => this.navigate(next));
// 	}

// 	private navigate(forward: boolean = true): void {
// 		jQuery(this.slides).slick(forward ? "slickNext" : "slickPrev");
// 	}

// 	private setSlideNumber(element: HTMLElement, number: number) {
// 		if (element == null) return;
// 		element.textContent = this.parseSlideNumber(number);
// 	}

// 	private parseSlideNumber(number: number) {
// 		return parseInt(number.toString()).toLocaleString("en", {
// 			minimumIntegerDigits: 2,
// 		});
// 	}

// 	protected getStartSlide(parm: ICarouselInit): number {
// 		if (parm == null) return;

// 		var startSlide = 0;
// 		if (parm.RandomStartSlide) {
// 			var slides = this.slides;
// 			var i = slides.querySelectorAll(".c-carousel__slide").length;
// 			startSlide = Math.floor(Math.random() * i);
// 		}
// 		return startSlide;
// 	}
// }
