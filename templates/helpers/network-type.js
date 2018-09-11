// Render to the appropriate network type for the current device, either
// cellular or Wi-Fi. Defaults to the generic "network"
// Usage in a page that has the "devices" front-matter key:
// {{network-type}}
module.exports = function(context) {
  var metadata = context.data.root;
  if (metadata['has-wifi']) {
	return 'Wi-Fi';
  } else if (metadata['has-cellular']) {
	return 'cellular';
  } else {
	return 'network';
  }
};
