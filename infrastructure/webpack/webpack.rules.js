const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MediaQueryPlugin = require("media-query-plugin");


function getRules(isDevelopment) {
	return (rules = [
		// Add the loader for .ts files.
		{
			test: /\.tsx?$/,
			loader: "ts-loader",
			exclude: /(node_modules)/,
		},
		// handle url's
		{
			test: /\.(png|woff|woff2|eot|ttf|svg|svgz|gif|jpg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url-loader",
		},
		{
			test: /\.css$/,
			use: ["style-loader", "css-loader"],
		},
		{
			test: /\.scss$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
				},
				{
					loader: "css-loader",
					options: {
						sourceMap: isDevelopment,
						url: false,
					},
				},
				{
					loader: MediaQueryPlugin.loader,
				},
				{
					loader: "postcss-loader",
					options: {
						sourceMap: isDevelopment,
						postcssOptions: {
							plugins:  [
								["autoprefixer",{}],
								["postcss-custom-media",{
									preset: 'default',
								}]
							],
						}
					},
				},
				{
					loader: "sass-loader",
					options: {
						sourceMap: isDevelopment,
						implementation: require("sass"), // Use dart-sass, instead of node-sass, for SASS compilation (no dependencies)
					},
				},
			],
		},
		{
			test: /\.(html|hbs)$/,
			loader: "handlebars-loader",
		},
	]);
}

module.exports = getRules;
