import { BaseComponent } from "./base/basecomponent";

export class Modal extends BaseComponent {
    private readonly CLASS_WRAPPER: string = "js-modal";
    private readonly SELECTOR_WRAPPER: string = "." + this.CLASS_WRAPPER;
    private readonly CLASS_TRIGGER: string = "js-toggle-modal";
    private readonly SELECTOR_TRIGGER: string = "." + this.CLASS_TRIGGER;
    private readonly CLASS_ACTIVE: string = "is-active";
    private readonly SELECTOR_ACTIVE: string = "." + this.CLASS_ACTIVE;

    private triggerElement: NodeListOf<HTMLElement>;
    private wrapperElement: HTMLElement;
    private isActive: boolean;

    constructor(element: HTMLElement) {
        super(element);
        this.init();
    }

    init(): void {
        this.triggerElement = this.element.querySelectorAll(this.SELECTOR_TRIGGER);
        this.wrapperElement = this.element.querySelector(this.SELECTOR_WRAPPER);

        if(!this.triggerElement) {
            return;
        }

        this.triggerElement.forEach(trigger =>
			trigger.addEventListener("click", (e) => {
				e.preventDefault();

				if (trigger == null) return;

				if (!trigger.classList.contains(this.CLASS_TRIGGER)) {
					return;
				}


				if (this.wrapperElement.classList.contains(this.CLASS_ACTIVE)) {
					this.wrapperElement.classList.remove(this.CLASS_ACTIVE);
					trigger.setAttribute("aria-expanded", false.toString());
				} else {
					trigger.setAttribute("aria-expanded", true.toString());
					this.wrapperElement.classList.add(this.CLASS_ACTIVE);
				}
			})
		);
    }
}
