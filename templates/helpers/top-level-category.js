// Parse the current URL to determine the current category.
// This is the first directory in the URL path
// Usage:
// {{top-level-category path.href}}
module.exports = function (url){
  if( typeof url !== 'string' ){
    return;
  }
  var splitString = url.split('/')[1];
  var capitalized = splitString.charAt(0).toUpperCase() + splitString.slice(1);
  return capitalized;
};
