var path = require("path");
var glob = require("glob");

var getEntries = require("./infrastructure/webpack/webpack.entries");
var getPlugins = require("./infrastructure/webpack/webpack.plugins");
var getRules = require("./infrastructure/webpack/webpack.rules");

const PATHS = {
	dist: path.resolve(__dirname, "dist"),
};

// What sites need to compile
var sites = glob.sync("./sites/*");

module.exports = (env, options) => {
	// Define environment
	var isDevelopment = options.mode == "development";

	// Get WebPack config sections
	var entries = getEntries(sites, isDevelopment);
	var plugins = getPlugins(sites, isDevelopment);
	var rules = getRules(isDevelopment);

	// Webpack config
	return {
		entry: entries,

		// Source maps support ('inline-source-map' also works)
		devtool: isDevelopment ? "source-map" : false,

		devServer: {
			// Display only errors to reduce the amount of output.
			stats: "errors-only",
			overlay: {
				errors: true,
			},
			// Parse host and port from env to allow customization.
			//
			// If you use Docker, Vagrant or Cloud9, set
			// host: "0.0.0.0";
			//
			// 0.0.0.0 is available to all network devices
			// unlike default `localhost`.
			host: process.env.HOST, // Defaults to `localhost`
			port: process.env.PORT, // Defaults to 8080
			open: true, // Open the page in browser,
		},

		module: {
			rules: rules,
		},

		output: {
			filename: "[name].js",
            chunkFilename: "chunks/[id].js",
            path: PATHS.dist + "/html/",
            publicPath: "/",
		},

		plugins: plugins,

		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".css"],
			alias: {
				starter: path.resolve(__dirname, "sites/starter/scss"),
				bp: path.resolve(
					__dirname,
					"sites/bp/scss"
				),
			},
		},

		performance: {
			hints: false, // Turn on for performance hints about assets.
		},

		watchOptions: {
			ignored: ["**/.eleventy.js", "**/assets/**"],
		},
	};
};
