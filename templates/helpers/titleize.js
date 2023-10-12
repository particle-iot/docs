// Tranform a dasherized and lower case string to a human-readable
// string with the first letter of each name uppercased.
// Usage:
// {{titleize device}}
// This function is copied to src/assets/js/navmenu.js - try to keep in sync
module.exports = function(string) {
  var stringNoDashes = string.replace(/-/g, ' ');
  var stringToTitleCase = stringNoDashes.replace(/\w\S*/g, function(txt){
	txt = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

	switch(txt) {
	case 'Faq':
		txt = 'FAQ';
		break;
	
	case 'Iot':
		txt = 'IoT';
		break;
		
	case 'Os':
		txt = 'OS';
		break;
		
	case 'Apis':
		txt = 'APIs';
		break;

	case 'Sdks':
		txt = 'SDKs';
		break;
		
	case 'Som':
		txt = 'SoM';
		break;

	case 'Usb':
		txt = 'USB';
		break;

	case 'Jtag':
		txt = 'JTAG';
		break;
		
	case 'And':
		txt = 'and';
		break;
		
	case 'Le':
		txt = 'LE'; // As in Bluetooth LE
		break;

	case 'Ml':
		txt = 'ML'; // Machine Learning
		break;
	
	default:
		break;
	}

	return txt;
  });
  return stringToTitleCase;
}
