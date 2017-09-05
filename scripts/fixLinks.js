'use strict';

/* Fixes the previous/next links on collections to avoid linking to a page that doesn't exist for a device.
 * For example, there's no billing guide for the Photon, so the next link on the previous page (code examples) should
 * skip billing and go directly to the next page (open source).
 */
module.exports = function(options) {
	var key = options.key;
	var keySingular = key.replace(/s$/, "") + 'Value';

	return function(files, metalsmith, done) {
		Object.keys(files).forEach(function (fileName) {
			var file = files[fileName];
			var forks = file[key];
			var thisFork = file[keySingular];

			if (!forks) {
				return;
			}

			if (file.next) {
				file.next = updateLinks('next');
			}

			if (file.previous) {
				file.previous = updateLinks('previous');
			}

			function updateLinks(direction) {
				var target = file[direction];
				while (target && target[key] && !target[key].includes(thisFork)) {
					target = target[direction];
				}
				return target;
			}
		});

		done();
	};
};
