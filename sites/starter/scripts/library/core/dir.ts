import { BaseComponent } from "../base/basecomponent";

export class Dir extends BaseComponent {
	private readonly CLASS_WRAPPER: string = "js-dir-console";
    private readonly SELECTOR_WRAPPER: string = "." + this.CLASS_WRAPPER;
	private readonly CLASS_TITLE: string = "js-dir-console-title";
    private readonly SELECTOR_TITLE: string = "." + this.CLASS_TITLE;
	private readonly CLASS_TRIGGER: string = "js-trigger-dir";
    private readonly SELECTOR_TRIGGER: string = "." + this.CLASS_TRIGGER;
	private readonly CLASS_TOGGLE: string = "js-toggle-dir";
    private readonly SELECTOR_TOGGLE: string = "." + this.CLASS_TOGGLE;

    private wrapperElement: HTMLElement;
    private titleElement: HTMLElement;
    private triggerElement: HTMLElement;
    private toggleElement: HTMLElement;

    constructor(element: HTMLElement) {
        super(element);
        this.init();
    }

    init(): void {
		this.wrapperElement = this.element.querySelector(this.SELECTOR_WRAPPER);
		this.titleElement = this.wrapperElement.querySelector(this.SELECTOR_TITLE);
		this.triggerElement = this.wrapperElement.querySelector(this.SELECTOR_TRIGGER);
		this.titleElement = this.wrapperElement.querySelector(this.SELECTOR_TITLE);
		this.toggleElement = this.wrapperElement.querySelector(this.SELECTOR_TOGGLE);

		document.dir = localStorage.getItem('dir');
		if(document.dir == "rtl") {
			this.wrapperElement.style.right = "auto";
			this.wrapperElement.style.left = "10px";
			this.titleElement.innerHTML = "Right to left";
		} else {
			this.wrapperElement.style.right = "10px";
			this.wrapperElement.style.left = "auto";
			this.titleElement.innerHTML = "Left to right";
		}

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

			if (document.dir == "rtl") {
				document.dir = "ltr";
			} else {
				document.dir = "rtl";
			}

			localStorage.setItem('dir', document.dir);
			location.reload();
		})

		if(!this.toggleElement) {
            return;
        }

		this.toggleElement.addEventListener("click", (e) => {
			e.preventDefault();
			var toggle = <HTMLInputElement>e.currentTarget;
			if (toggle == null) return;

			if (!toggle.classList.contains(this.CLASS_TOGGLE)) {
				return;
			}

			this.wrapperElement.style.display = "none";
		});
    }
}
