const glob = require("glob");
const path = require("path");
const fs = require("fs");

// TODO: config file with entry files, instead of picking up entry files automatically

// Return an array of entry points for WebPack
function getEntries(sites, isDevelopment) {
	var scriptEntries = getScriptEntries(sites, isDevelopment);
	var styleEntries = getStyleEntries(sites, isDevelopment);

	return {
		...scriptEntries,
		...styleEntries,
	};
}

// Entry files for (Type)Script files
function getScriptEntries(sites, isDevelopment) {
	return sites.reduce((acc, site) => {
		var entryName = site.replace("./sites/", "");
		var siteName = site + "/assets/js/" + entryName;
		var webpackEntry = site + "/scripts/webpack-entry.ts";

		if (fs.existsSync(webpackEntry)) {
			acc[siteName] = webpackEntry;
		}

		return acc;
	}, {});
}

// Each SCSS file is an entry file for WebPack
// This method will find all SCSS files within each site and create an entry for WebPack
// Mini CSS Extract Plugin will pick them up and convert to CSS and store at sites/[site]/scss/[folders]/theme.css
function getStyleEntries(sites, isDevelopment) {
	return sites.reduce((acc, site) => {
		// Find all scss files within site
		let scssFiles = glob.sync(site + "/**/[^_]*.scss");

		scssFiles.forEach((file) => {
			// Get name
			let name = path.parse(file).name;
			let destination = path.join(site, "assets", "css", name);

			// Create entry for WebPack: "html/sites/[site]/scss/[folders]/theme.[min].css"
			acc[destination] = file;
		});

		return acc;
	}, {});
}

module.exports = getEntries;
