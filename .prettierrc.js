module.exports = {
	singleQuote: false,
	trailingComma: "es5",
	tabWidth: 4,
	semi: true,
	overrides: [
		{
			files: ["*.css", "*.scss"],
			options: {
				bracketSpacing: true,
				printWidth: 120, // For long css variable declarations
			},
		},
		{
			files: ["*.yml"],
			options: {
				singleQuote: true,
				tabWidth: 2,
			},
		},
	],
};
