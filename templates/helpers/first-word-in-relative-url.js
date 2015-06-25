// This helper will return what category of content you are looking at on the docs
module.exports = function(context, options){
  if( typeof context !== 'string' ){
    return;
  }
  var splitString = context.split('/')[1];
  var capitalized = splitString.charAt(0).toUpperCase() + splitString.slice(1);
  return capitalized;
};
