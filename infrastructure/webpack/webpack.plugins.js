const WriteFilePlugin = require("write-file-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssoWebpackPlugin = require("csso-webpack-plugin").default;
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

var shouldSaveDistFiles = process.argv.indexOf("SAVE") !== -1;

function getPlugins(sites, isDevelopment) {
	let scripts = [];
	let scss = [];
	let images = [];
	let svgSymbols = [];
	let config = [];
	let sitemap = [];
	let yaml = [];

	sites.forEach((site) => {
		scripts.push({
			from: `${site}/scripts/library`,
			to: `scripts/${site}`,
		});

		scss.push({
			from: `${site}/scss`,
			to: `scss/${site}`,
		});

		images.push({
			from: `${site}/assets/media/images`,
			to: `images/${site}`,
		});

		yaml.push({
			from: `${site}/assets/config.yml`,
			to: `yaml/${site}`,
		});

		sitemap.push({
			from: `${site}/sitemap.xml`,
			to: `${site}`,
		});
	});

	svgSymbols.push({
		from: `common/partials/svg-symbols`,
		to: `svgSymbols`,
	});

	config.push({
		from: `Web.config`,
		to: "",
	});


	var productionPlugins = [
		new CleanWebpackPlugin(),
		new CssoWebpackPlugin({
			// pluginOutputPostfix: 'min', //
			comments: false,
			restructure: false,
		}),

		// Plugin to remove useless js chunk file that is emptied after CSS extraction
		// https://github.com/webpack/webpack/issues/7300 - Should be fixed in WebPack 5

		new CopyWebpackPlugin([
			...scripts,
			...scss,
			...images,
			...svgSymbols,
			...config,
			...sitemap,
			...yaml,
		]),
	];

	var plugins = [
		new MiniCssExtractPlugin({
			filename: "[name].css", // in case of contenthash: use this: isDevelopment ? '[name].css' : '[name].[contenthash:8].css'
		}),
		new BrowserSyncPlugin({
			host: "localhost",
			port: 8080,
			server: {
				baseDir: ["dist/html"],
			},
			ghostMode: false,
			notify: false,
			watch: true,
			open: true,
		}),
	];

	// MediaQueryPlugin
	//plugins.push(...MediaQueryPlugin(sites));

	if (shouldSaveDistFiles) {
		console.log("Write dist files plugin activated.");
		plugins.push(new WriteFilePlugin());
	}

	if (!isDevelopment) {
		plugins = [...plugins, ...productionPlugins];
	}

	return plugins;
}

module.exports = getPlugins;
