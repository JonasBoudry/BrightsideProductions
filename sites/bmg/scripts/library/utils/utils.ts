export default {
	initializeComponents(componentLibrary: any) {
		Array.from(document.querySelectorAll("[data-component-class]")).forEach(
			(element) => {
				let componentNames = element.getAttribute(
					"data-component-class"
				);

				for (const componentName of componentNames.split(/[ ]+/)) {
					var component = componentLibrary[componentName];
					if (!component) return;
					var init = new component(<HTMLElement>element);
				}
			}
		);
	},

	isHidden(element: HTMLElement) {
		var style = window.getComputedStyle(element);
		return style.display === "none" || style.visibility === "hidden";
	},
};
