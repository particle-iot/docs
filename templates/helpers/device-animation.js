// Insert an SVG of the device with the RGB LED blinking in a certain
// pattern. See src/assets/js/device-animation.js for options
// Usage:
// {{device-animation 'photon' 'breathe' 'cyan'}}
var Handlebars = require('handlebars');
module.exports = function(device, animation) {
  // Catch the 3rd to before last arguments. Last arguments is an options hash
  var params = Array.prototype.slice.call(arguments, 2, arguments.length - 1);
  
  return new Handlebars.SafeString(
    "<div class='device-animation' data-device-type='" + device + "' " +
    "data-device-animation='" + animation + "' " +
    "data-device-params='" + JSON.stringify(params) + "'></div>"
  );
}
