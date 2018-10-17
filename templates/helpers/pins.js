// Fixes the grammar of "a Electron" to "an Electron"
// Usage in a page that has the "devices" front-matter key:
// {{pins}}
module.exports = function(context) {
  var metadata = context.data.root;
  
  var op = context.hash.op;
  
  if (metadata.stm32) {
	  if (op === 'last-a') {
		  return 'A7';
	  }
	  else 
	  if (op === 'all-a') {
		  return 'A0 - A7';
	  }
	  else
	  if (op === 'last-d') {
		  return 'D7';
	  }
	  else
	  if (op === 'all-d') {
		  return 'D0 - D7';
	  }
  }
  else {
	  if (op === 'last-a') {
		  return 'A5';
	  }	  
	  else
	  if (op === 'last-d') {
		  return 'D19';
	  }	 
	  else
	  if (op === 'all-a') {
		  return 'A0 - A5';
	  }	  
	  else
	  if (op === 'all-d') {
		  return 'D0 - D19';
	  }	  
  }
  
  return '';
};
