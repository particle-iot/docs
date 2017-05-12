module.exports = function (value, test, options) {
  if (value && test && value.indexOf(test) === 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};
