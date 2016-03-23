module.exports = function(context) {
  return context.data.root.device == "Photon" ?  "SETUP" : "MODE";
};
