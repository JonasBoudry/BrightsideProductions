module.exports = function sortByTitle(values) {
	if (values == null) return;

	let vals = [...values];

	return vals.sort((a, b) => {
		if (hasValidTitle(a) && hasValidTitle(b)) {
			return a.data.title.localeCompare(b.data.title);
		}
	});
};

function hasValidTitle(page) {
	if (!page.data.title) {
		console.log(
			`Filter 'sortByTitle' cannot sort page '${page.data.page.inputPath}'' because there is no page title configured.`
		);
		return false;
	}

	return true;
}
