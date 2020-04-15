// Tranform a dasherized and lower case string to a human-readable
// string with the first letter of each name uppercased.
// Usage:
// {{titleize device}}
module.exports = function(string) {
  // Convert dash to space
  var tmp = string.replace(/-/g, ' ');

  var stringToTitleCase = tmp.replace(/\w\S*/g, function(txt){
	txt = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

	switch(txt) {
	case 'Boron':
		txt = 'Boron / B Series';
		break;

	case 'Electron':
		txt = 'Electron / E Series';
		break;
	
	case 'Faq':
		txt = 'FAQ';
		break;
	
	case 'Iot':
		txt = 'IoT';
		break;
		
	case 'Os':
		txt = 'OS';
		break;
		
	case 'Sdks':
		txt = 'SDKs';
		break;
		
	case 'Som':
		txt = 'SoM';
		break;
		
	case 'And':
		txt = 'and';
		break;
		
	case 'Le':
		txt = 'LE'; // As in Bluetooth LE
		break;
	
	default:
		break;
	}

	return txt;
  });

  // Special case for Wi-Fi which should preserve the dash
  stringToTitleCase = stringToTitleCase.replace('Wi Fi', 'Wi-Fi');

  return stringToTitleCase;
}
