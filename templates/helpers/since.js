// Generates a "since" header if necessary. For example, since 0.6.0 is relevant for all classic
// platforms, but for mesh platform devices, it's unnecessary since they only run 0.8.0 or later,
// so the _Since 0.6.0:_ is omitted.
// 
// {{since when="0.6.0"}}
module.exports = function(context) {
  var metadata = context.data.root;
  var device = metadata.device;

  var when = stringVerToNum(context.hash.when);
  var platformMin;
  
  if (device === 'Core') {
	  platformMin = stringVerToNum('0.0.0');
  }
  else
  if (device === 'Photon' || device === 'P1') {
	  platformMin = stringVerToNum('0.4.0');	  
  }
  else
  if (device === 'Electron') {
	  platformMin = stringVerToNum('0.4.9');	  	  
  }
  else
  if (device === 'Argon' || device === 'Boron' || device === 'Xenon') {
	  platformMin = stringVerToNum('0.8.0');	  
  }
  else {
	  platformMin = stringVerToNum('0.0.0');	  
  }
	 
  if (platformMin < when) {
	  return '_Since ' + context.hash.when + ':_ ';
  }
  
  return '';
};

function stringVerToNum(s) {
	var stringParts = s.split('.');
	
	return parseInt(stringParts[0]) * 65536 + parseInt(stringParts[1]) * 256 + parseInt(stringParts[2]);
}
