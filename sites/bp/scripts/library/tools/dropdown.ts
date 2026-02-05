import { BaseComponent } from "../base/basecomponent";

export default class DropDown extends BaseComponent {
	private readonly CLASS_TRIGGER: string = "js-dropdown__trigger";
	private readonly SELECTOR_TRIGGER: string = "." + this.CLASS_TRIGGER;
	private readonly CLASS_PANEL: string = "js-dropdown__panel";
	private readonly SELECTOR_PANEL: string = "." + this.CLASS_PANEL;
	private readonly CLASS_ACTIVE: string = "is-active";

	private triggerElement: HTMLElement;
	private panelElement: HTMLElement;

	constructor(element: HTMLElement) {
		super(element);
		this.init();
	}

	init(): void {
		this.triggerElement = this.element.querySelector(this.SELECTOR_TRIGGER);
		this.panelElement = this.element.querySelector(this.SELECTOR_PANEL);

		// Initial
		this.triggerElement.setAttribute("aria-haspopup", true.toString());
		this.triggerElement.setAttribute("aria-expanded", false.toString());
		this.panelElement.setAttribute("aria-hidden", true.toString());
		this.panelElement.setAttribute("aria-labelledby", this.element.id);
		this.panelElement.setAttribute("tabindex", "-1");

		// TODO: use matches, needs polyfill Babel?
		this.element.addEventListener("click", (e) => {
			var trigger = <HTMLInputElement>e.target;
			if (trigger == null) return;

			if (!trigger.classList.contains(this.CLASS_TRIGGER)) return;

			if (!this.element.classList.contains(this.CLASS_ACTIVE)) {
				this.showPanel();
			} else {
				this.closePanel();
			}
		});

		// Click outside to close panel.
		document.addEventListener("click", (e) => {
			var isClickInside = this.element.contains(e.target as Node);

			if (!isClickInside) {
				this.closePanel();
			}
		});

		// Escape
		document.addEventListener("keydown", (e) => {
			if (e.which === 27) {
				e.preventDefault();
				this.closePanel();
			}
		});
	}

	private showPanel() {
		this.element.classList.add(this.CLASS_ACTIVE);

		// Change aria properties
		this.triggerElement.setAttribute("aria-expanded", true.toString());
		this.panelElement.setAttribute("aria-hidden", false.toString());
	}

	private closePanel() {
		// Remove active class to container
		this.element.classList.remove(this.CLASS_ACTIVE);

		// Change aria properties
		this.triggerElement.setAttribute("aria-expanded", false.toString());
		this.panelElement.setAttribute("aria-hidden", true.toString());
	}
}
