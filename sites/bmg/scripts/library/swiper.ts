import { BaseComponent } from "./base/basecomponent";

import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export class SwiperComponent extends BaseComponent {
    private readonly SWIPER_SELECTOR = ".js-swiper";
    protected swiperInstance: Swiper | null = null;

    constructor(element: HTMLElement) {
        super(element);
        if (!this.element) return;

        this.init();
        this.observeRemoval();

    }

    protected init(): void {
        this.initSwiper();
    }

    private initSwiper(): void {
        if (this.swiperInstance) return;

        // Initialize Swiper
        this.swiperInstance = new Swiper(this.element, {
            modules: [Autoplay],

            loop: true,

            speed: 10000,            // higher = slower movement

            allowTouchMove: false,
            simulateTouch: false,

            slidesPerView: 2,       // default mobile
            spaceBetween: 30,

            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false
            },

            breakpoints: {
                740: {
                    slidesPerView: 3    // tablet view
                },
                980: {
                    slidesPerView: 4    // desktop view
                },
                1260: {
                    slidesPerView: 6    // large view
                },
                1600: {
                    slidesPerView: 7    // large view
                },
            },
        });
    }

    private observeRemoval(): void {
        const observer = new MutationObserver(() => {
            if (!document.body.contains(this.element)) {
                this.destroy();
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    public destroy(): void {
        if (this.swiperInstance) {
            this.swiperInstance.destroy(true, true);
            this.swiperInstance = null;
        }
    }
}