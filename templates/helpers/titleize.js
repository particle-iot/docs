// Tranform a dasherized and lower case string to a human-readable
// string with the first letter of each name uppercased.
// Usage:
// {{titleize device}}
module.exports = function(string) {
  var stringNoDashes = string.replace(/-/g, ' ');
  var stringToTitleCase = stringNoDashes.replace(/\w\S*/g, function(txt){
	return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  return stringToTitleCase;
}
