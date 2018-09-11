// Fixes the grammar of "a Electron" to "an Electron"
// Usage in a page that has the "devices" front-matter key:
// {{a-device}}
module.exports = function(context) {
  var metadata = context.data.root;
  var device = metadata.device;
  var article = 'a';
  if (device === 'Electron') {
    article = 'an';
  }
  return article + ' ' + device;
};
