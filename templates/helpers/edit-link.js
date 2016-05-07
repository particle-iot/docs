module.exports = function(branch, path, file) {
	/* todo - we could check if the file is a symlink and rewrite the path to the target. 
	  For now we take the simple, trustworthy appraoch. */
	var content;
	var base;
	if (file==="firmware") {
		content =  "firmware/firmware.md";
	}
	else {
		content = "src/content"+path+file+".md";
	}
	base = "https://github.com/spark/docs/tree/"+branch+"/";
	return base + content;
}
