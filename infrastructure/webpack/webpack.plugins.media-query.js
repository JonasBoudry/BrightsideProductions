const fs = require("fs");
const path = require("path");
const MediaQueryPlugin = require("media-query-plugin");

module.exports = (sites) => {
	const mediaQueryPlugins = [];

	for (let s of sites) {
		const siteName = path.basename(s);
		const configPath = `/sites/${siteName}/config/media-query.config`;

		if (!fs.existsSync(path.join(process.cwd(), `${configPath}.js`))) {
			continue;
		}

		const config = require(path.join(process.cwd(), configPath));

		if (!config || !config.enabled) {
			continue;
		}

		mediaQueryPlugins.push(
			new MediaQueryPlugin({
				filename: `/sites/${siteName}/assets/css/[name].css`,
				include: config.bundles,
				queries: config.queries,
			})
		);

		console.info(
			`[media-query-plugin] ${siteName} configuration detected.`
		);
	}

	return mediaQueryPlugins;
};
