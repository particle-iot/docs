module.exports = function(device, animation) {
  // Catch the 3rd to before last arguments. Last arguments is an options hash
  var params = Array.prototype.slice.call(arguments, 2, arguments.length - 1);
  
  return "<div class='device-animation' data-device-type='" + device + "' " +
    "data-device-animation='" + animation + "' " +
    "data-device-params='" + JSON.stringify(params) + "'></div>";
}
