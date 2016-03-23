module.exports = function(context) {
  return context.data.root.device == "Core" ?  "RST" : "RESET";
};
