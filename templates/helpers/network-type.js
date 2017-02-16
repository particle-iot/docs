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
