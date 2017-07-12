// Generate a link to edit the current file on GitHub
// Usage:
// {{edit-link branch path.href path.name}}
module.exports = function(branch, path, file) {
	var content = "src/content" + path + file + ".md";
	var base = "https://github.com/spark/docs/tree/" + branch + "/";
	return base + content;
}
