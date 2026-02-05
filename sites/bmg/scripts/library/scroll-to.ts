import * as smoothscroll from "smoothscroll-polyfill";
import * as debounce from 'debounce';
import { BaseComponent } from "./base/basecomponent";

// Needs refactoring. Perhaps even use Intersection Observer.
export class ScrollTo extends BaseComponent {

    private anchorRegex: RegExp = /^#[^ ]+$/i;
    private readonly timeOutInMs: number = 150;
    private headerHeight: number;
    private linkElements: NodeListOf<HTMLAnchorElement>;

    constructor(element:HTMLElement) {
        super(element);

        this.init();
        this.initializeEvents();
    }

    public init(): void {
        if (!this.element) return;

        this.linkElements = document.querySelectorAll('[href]');
        this.headerHeight = this.calculateElementHeight();

        // Register polyfill
        smoothscroll.polyfill();
    }

    private initializeEvents(): void {
        this.scrollToOnLoad();
        this.scrollToOnClick();

        window.addEventListener("resize", debounce(() => {
            this.headerHeight = this.calculateElementHeight()
        }, 250));
    }

    private scrollToOnClick() {
        Array.from(this.linkElements).forEach((element) => {
            if(!this.isValidAnchor(element)) return;

            element.addEventListener("click", (e: UIEvent) => {
                var element = <HTMLAnchorElement>e.srcElement;
                if (element == null) return;

                e.preventDefault();

                let link = element.getAttribute('href');

                this.startTimeOut(() => {
                   this.scrollToElement(link);
                }, this.timeOutInMs);
            });
        });
    }

    private startTimeOut(callback: () => void, timeInMs: number) {
        setTimeout(callback, timeInMs);
    }

    private scrollToOnLoad() {
        //scroll to anchor when url has #
        window.addEventListener("load", (e: UIEvent) => {
            if(!this.containsAnchor(window.location)) return;
            e.preventDefault();

            this.scrollToElement(window.location.hash);
        });
    }

    private scrollToElement(hash: string) {
        if(hash === "") return;
        if(!this.isValidAnchor) return;

        // Get target element
        let target: HTMLElement = document.querySelector(hash);
        if (target === null) return;

        var offset = this.getOffset(target.parentElement);

        // Scroll into view. Natively.
        window.scroll({
            'behavior': 'smooth',
            'left': 0,
            'top': (offset.top - this.headerHeight) - 20
          });

        // Add to history
        history.pushState({}, document.title, location.pathname + hash);
    }

    private getOffset(element: HTMLElement): any {
	    var rect = element.getBoundingClientRect(),
	        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	        scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
	}

    // Calculate height of element with class .js-header (this to include absolute positioned elements)
    private calculateElementHeight(): number {
        let headerHeight: number = 0;

        Array.from(this.element.querySelectorAll('.js-header')).forEach(function(e: HTMLElement) {
            headerHeight += e.offsetHeight;
        });

        // Include all elements with specific class, and height of header itself
        return headerHeight + this.element.offsetHeight;
    }

    private isValidAnchor(element: HTMLAnchorElement) {
        if(window.location.pathname.localeCompare(element.pathname, undefined, { sensitivity: 'base' }))
            return false;

        var hash = element.hash;
        return hash != "" && this.anchorRegex.test(hash);
    }

    private containsAnchor(url: Location) {
        var hash = url.hash;
        return hash != "" && this.anchorRegex.test(hash);
    }
}
