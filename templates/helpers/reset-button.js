// Render to the appropriate name for the reset button for the current device
// Usage in a page that has the "devices" front-matter key:
// {{reset-button}}
module.exports = function(context) {
  var metadata = context.data.root;
  return metadata.device == 'Core' ?  'RST' : 'RESET';
};
