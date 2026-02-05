export abstract class BaseComponent {
	constructor(protected element: HTMLElement) {
		if (this.element == null) {
			console.log("Cannot find element.");
			return;
		}
	}
}
