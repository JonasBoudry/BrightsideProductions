import { BaseComponent } from "./basecomponent";

export abstract class BaseConfiguredComponent<T> extends BaseComponent {
	// Cast to preferred type
	protected parm: T;

	// Attributes
	private static readonly CLIENT_DATA_ATTRIBUTE = "data-component-parm";

	constructor(element: HTMLElement) {
		super(element);
	}

	preInit(): void {
		// Fetch client data from data-component-parm on element
		this.parm = this.getClientData();
	}

	private getClientData(): T {
		var parmText = this.element.attributes[
			BaseConfiguredComponent.CLIENT_DATA_ATTRIBUTE
		];
		var parm = null;
		if (parmText) {
			try {
				parm = JSON.parse(parmText.value);
			} catch (e) {
				parm = parmText;
			}
		}
		return parm as T;
	}
}
