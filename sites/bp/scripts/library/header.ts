import { BaseComponent } from "./base/basecomponent";
import * as debounce from "debounce";

export class Header extends BaseComponent {
	private readonly HEADER__SELECTOR = ".js-header";
	private readonly MENU__SELECTOR = ".js-header-menu";
	private readonly HAMBURG__TRIGGER__SELECTOR = ".js-header-menu__trigger";
	private readonly NAV__SELECTOR = ".js-navigation";
	private readonly NAV__TRIGGER__SELECTOR = ".js-navigation-item-link";
	private readonly ACTIVE__CLASS = "is-active";
	private readonly OPEN__CLASS = "is-open";

	protected header: HTMLElement;
	protected menu: HTMLElement;
	protected hamburg: HTMLElement;
	protected scrollPosition: number;

	constructor(element: HTMLElement) {
		super(element);

		if (!this.element) return;
		this.init();
	}

	init(): void {
		this.header = this.element;
		this.menu = this.header.querySelector(this.MENU__SELECTOR);

		this.hamburg = this.header.querySelector(
			this.HAMBURG__TRIGGER__SELECTOR
		);

		this.initializeEvents();
	}

	private initializeEvents(): void {
		this.initiateClickEventHamburger();
		this.initiateResizeHeaderMenu();
		this.initiateClickEventPrimaryMenu();

		// Click outside to close panel.
		document.addEventListener("click", (e) => {
			if (this.hamburg) {
				var isClickInsideMenu =
					this.header
						.querySelector(this.MENU__SELECTOR)
						.contains(e.target as Node) ||
					this.hamburg.contains(e.target as Node);
				if (!isClickInsideMenu) {
					this.closeMenu();
				}
			}
		});
	}

	private initiateClickEventHamburger() {
		if (!this.hamburg) return;
		this.hamburg.addEventListener("click", (e) => {
			var trigger = <HTMLInputElement>e.target;
			if (trigger == null) return;

			if (this.header.classList.contains(this.OPEN__CLASS)) {
				this.resetMenu();
			} else {
				this.header.classList.add(this.OPEN__CLASS);
			}
		});
	}

	private initiateClickEventPrimaryMenu() {
		let navItems = this.header.querySelectorAll(
			this.NAV__TRIGGER__SELECTOR
		);

		var $largeBreakpoint = parseInt(
			getComputedStyle(document.documentElement).getPropertyValue(
				"--brand__mq--large"
			)
		);
		var $mediaQuery = window.matchMedia(
			"(min-width: " + $largeBreakpoint + "px)"
		);

		navItems.forEach((element) => {
			element.addEventListener("click", (e) => {
				let trigger = <HTMLInputElement>e.target;
				if (trigger == null) return;

				if (!$mediaQuery.matches) return;

				//remove all visible classes
				this.header
					.querySelectorAll(this.NAV__TRIGGER__SELECTOR)
					.forEach((element) => {
						element.closest(this.NAV__SELECTOR);
					});
				//add  visible classes
				trigger.closest(this.NAV__SELECTOR);
			});
		});
	}

	private initiateResizeHeaderMenu() {
		var $largeBreakpoint = parseInt(
			getComputedStyle(document.documentElement).getPropertyValue(
				"--brand__mq--large"
			)
		);
		var $mediaQuery = window.matchMedia(
			"(min-width: " + $largeBreakpoint + "px)"
		);

		window.addEventListener(
			"resize",
			debounce(() => {
				if (!$mediaQuery.matches) {
					//	this.activateCollapse();
				} else {
					this.resetMenu();
				}
			}, 250)
		);
	}

	private resetMenu() {
		this.closeMenu();

		let activeItems = this.header.querySelectorAll(
			`.${this.ACTIVE__CLASS}`
		);

		activeItems.forEach((element) => {
			element.classList.remove(this.ACTIVE__CLASS);
		});
	}

	private closeMenu() {
		if (!this.header.classList.contains(this.OPEN__CLASS)) return;
		this.header.classList.remove(this.OPEN__CLASS);
	}
}
