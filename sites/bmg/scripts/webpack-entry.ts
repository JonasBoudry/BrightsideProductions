import * as Components from "./components";
import Utils from "./library/utils/utils";

document.addEventListener("DOMContentLoaded", function () {
	// Intialize components exported in components.ts
	Utils.initializeComponents(Components);
});
