var glob = require("glob");
var sites = glob.sync("./sites/!(epishell)*/");
var yaml = require("js-yaml");

var pathShortCode = require("./infrastructure/eleventy/shortcodes/buildUrl");
var sortByTitle = require("./infrastructure/eleventy/filters/sortByTitle");

module.exports = function (eleventyConfig) {
	eleventyConfig.setTemplateFormats(["hbs"]);

	// Use handlebars, and expand with handlebars-helpers
	let handlebars = require("handlebars");
	require("handlebars-helpers")({ handlebars: handlebars });
	eleventyConfig.setLibrary("hbs", handlebars);

	// Copy assets for each website, except epishell.
	sites.forEach((element) => {
		console.log(element);
		eleventyConfig.addPassthroughCopy(`${element}/assets`);
		eleventyConfig.addPassthroughCopy(`${element}/admin`);
	});

	eleventyConfig.addShortcode("buildUrl", pathShortCode);
	eleventyConfig.addFilter("sortByTitle", sortByTitle);

	handlebars.registerHelper("svg", function (filePath) {
		let path = "." + filePath;
		let content = fs.readFileSync(path, "utf8");
		return new handlebars.SafeString(content);
	});

	// Copy Static Files to /_Site

	// To Support .yaml Extension in _data
	// You may remove this if you can use JSON
	eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

	// Ignore gitignore
	eleventyConfig.setUseGitIgnore(false);

	// Configuration
	return {
		pathPrefix: "/sites/",
		dir: {
			includes: "_partials",
			layouts: "_layouts",
			data: "_data",
			output: "dist/html/",
		},
	};
};
