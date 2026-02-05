// Shortcode for joining path parths to any file.
// Pass any number of path sections, with the last
var eleventyUrlFilter = require("@11ty/eleventy/src/Filters/Url");

module.exports = function (...urlParts) {
	// Last argument is the current data object that Eleventy passes
	// Get the data object (pop), and access the root path of this site.
	let eleventyData = urlParts.pop();
	var globalData = eleventyData.data.root;

	if (!globalData.paths) {
		console.log(`No 'paths' configuration found. Please configure.`);
		return eleventyUrlFilter(urlParts.join("/"));
	}

	if (!globalData.paths.root) {
		console.log(
			`No 'root' configuration found within 'paths'. Please configure.`
		);
		return eleventyUrlFilter(urlParts.join("/"));
	}

	// Get root of the site
	let site = globalData.paths.root;

	// Add at the beginning of the array
	urlParts.unshift(site);

	// Use ELeventy's url filter to create path to file.
	// Eleventy takes care of the pathPartial (see global Eleventy settings)
	return eleventyUrlFilter(urlParts.join("/"));
};
