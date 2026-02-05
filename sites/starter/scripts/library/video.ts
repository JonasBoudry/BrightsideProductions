import { BaseComponent } from "./base/basecomponent";

export class Video extends BaseComponent {
	private readonly CLASS_WRAPPER: string = "js-video-wrapper";
    private readonly SELECTOR_WRAPPER: string = "." + this.CLASS_WRAPPER;
    private readonly CLASS_PARENT: string = "js-video";
    private readonly SELECTOR_PARENT: string = "." + this.CLASS_PARENT;
    private readonly CLASS_TRIGGER: string = "js-btn-play";
    private readonly SELECTOR_TRIGGER: string = "." + this.CLASS_TRIGGER;
    private readonly CLASS_ACTIVE: string = "is-playing";
    private readonly SELECTOR_ACTIVE: string = "." + this.CLASS_ACTIVE;

    private triggerElement: HTMLElement;
    private wrapperElement: HTMLElement;
    private parentElement: HTMLMediaElement;
    private isActive: boolean;

    constructor(element: HTMLElement) {
        super(element);
        this.init();
    }

    init(): void {
        this.triggerElement = this.element.querySelector(this.SELECTOR_TRIGGER);
        this.wrapperElement = this.element;
        this.parentElement = this.wrapperElement.querySelector(this.SELECTOR_PARENT);

        if(!this.triggerElement) {
            return;
        }

		this.triggerElement.addEventListener("click", (e) => {
			e.preventDefault();

			var trigger = <HTMLInputElement>e.currentTarget;
			if (trigger == null) return;

			if (!trigger.classList.contains(this.CLASS_TRIGGER)) {
				return;
			}

			if (this.parentElement.classList.contains('is-youtube')) {
				this.parentElement.querySelector('iframe').src += "&autoplay=1";
			} else {
				this.parentElement.play();
			}
			this.wrapperElement.classList.add(this.CLASS_ACTIVE);

			if (window.innerWidth >= 1024) {
				if(this.parentElement.closest('.js-hero-banner')) {
					this.parentElement.closest('.js-hero-banner').classList.add(this.CLASS_ACTIVE);
				}
			}
		})
    }
}
