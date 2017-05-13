// Render to the appropriate name for the setup button for the current device
// Usage in a page that has the "devices" front-matter key:
// {{system-button}}
module.exports = function(context) {
  var metadata = context.data.root;
  return metadata.device == 'Photon' ?  'SETUP' : 'MODE';
};
