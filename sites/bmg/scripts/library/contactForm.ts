// import { BaseComponent } from "./base/basecomponent";
// import * as jQuery from "jquery";

// export class ContactForm extends BaseComponent {
// 	constructor(element: HTMLElement) {
// 		super(element);

// 		if (!this.element) return;
// 		this.init();
// 	}

// 	init(): void {
// 		this.initializeEvents();
// 	}

// 	private initializeEvents(): void {
// 		this.initiateFormSubmit();
// 	}

// 	private initiateFormSubmit() {
// 		jQuery(document).ready(function() {
// 			jQuery("#contactForm").on("submit", function() {
// 				// Add text 'loading...' right after clicking on the submit button.
// 				console.log("Loading...");

// 				var form = $(this);
// 				$.ajax({
// 					url: "/sites/sprs/contactform.php",
// 					method: form.attr("method"),
// 					data: form.serialize(),
// 					success: function(result) {
// 						if (result == "success") {
// 							console.log("Message Sent!");
// 						} else {
// 							console.log("Error Sending email!");
// 						}
// 					},
// 				});

// 				// Prevents default submission of the form after clicking on the submit button.
// 				return false;
// 			});
// 		});
// 	}
// }
