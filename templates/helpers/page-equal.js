// Checks if two paths are the same
// Usage:
// Not quite sure...
module.exports = function(href1, name1, href2, name2, options) {
  if(href1 + name1 === href2 + name2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};
