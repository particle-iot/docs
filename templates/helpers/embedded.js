module.exports = function(context) {
	return ["Photon", "Electron", "Core"].includes(context.data.root.device);
}
