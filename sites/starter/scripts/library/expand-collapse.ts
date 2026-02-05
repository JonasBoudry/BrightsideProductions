import { BaseComponent } from "./base/basecomponent";

export class ExpandCollapse extends BaseComponent {
	private readonly CLASS_PARENT: string = "js-expand-collapse";
    private readonly SELECTOR_PARENT: string = "." + this.CLASS_PARENT;
	private readonly CLASS_TRIGGER: string = "js-trigger-expand";
    private readonly SELECTOR_TRIGGER: string = "." + this.CLASS_TRIGGER;
	private readonly CLASS_ACTIVE: string = "is-collapsed";
    private readonly SELECTOR_ACTIVE: string = "." + this.CLASS_ACTIVE;

	private parentElement: HTMLElement;
    private triggerElements: NodeListOf<HTMLElement>;

    constructor(element: HTMLElement) {
        super(element);
        this.init();
    }

    init(): void {
		this.triggerElements = this.element.querySelectorAll(this.SELECTOR_TRIGGER);
        this.parentElement = this.element;

        if(!this.triggerElements) {
            return;
        }

		this.triggerElements.forEach(trigger =>
			trigger.addEventListener("click", (e) => {
				e.preventDefault();

				if (trigger == null) return;

				if (!trigger.classList.contains(this.CLASS_TRIGGER)) {
					return;
				}

				this.parentElement = trigger.closest(this.SELECTOR_PARENT);

				if (this.parentElement.classList.contains(this.CLASS_ACTIVE)) {
					this.parentElement.classList.remove(this.CLASS_ACTIVE);
				} else {
					this.parentElement.classList.add(this.CLASS_ACTIVE);
				}
			})
		);
    }
}
