
let imageOverlay = {};

$(document).ready(function() {
	imageOverlay.setupOverlay();
	
	$('input.collapseDefault').each(function(index) {
		var genericCssClass = $(this).attr('name');
		var defaultValue = $(this).attr('value');

		var switchTo = localStorage.getItem(genericCssClass) || defaultValue;
    	collapseSelector(null, genericCssClass, switchTo);
	});
	$('input.collapseForce').each(function(index) {
		var genericCssClass = $(this).attr('name');
		var defaultValue = $(this).attr('value');

    	collapseSelector(null, genericCssClass, defaultValue);
	});

	$('div.codebox').each(function(index) {
		const codeboxElem = $(this);

		$.ajax({url:$(codeboxElem).attr('data-content'), dataType:'text'})
  			.done(function(data) {
				const thisCodeElem = $(codeboxElem).find('code');
				$(thisCodeElem).text(data);
				$(thisCodeElem).removeClass('prettyprinted');
				if (prettyPrint) {
					prettyPrint();
				}
		})

		$(codeboxElem).find('.codeboxDownloadButton').on('click', function() {
			const contentUrl = $(codeboxElem).attr('data-content');
	
			var a = document.createElement('a');
			a.href = contentUrl;
			a.download = contentUrl.split('/').pop();
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			analytics.track('Codebox Download', {category:'Codebox', label:contentUrl});
		});

		$(codeboxElem).find('.codeboxCopyButton').on('click', function() {
			const thisCodeElem = $(codeboxElem).find('code');
			
			var t = document.createElement('textarea');
			document.body.appendChild(t);
			$(t).text($(thisCodeElem).text());
			t.select();
			document.execCommand("copy");
			document.body.removeChild(t);

			analytics.track('Codebox Copy', {category:'Codebox', label:$(codeboxElem).attr('data-content')});
		});

		$(codeboxElem).find('.codeboxWebIdeButton').on('click', function() {
			var a = document.createElement('a');
			a.href = 'https://go.particle.io/shared_apps/' + $(this).attr('data-appid');
			a.target = '_blank';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			analytics.track('Codebox Open WebIDE', {category:'Codebox', label:$(codeboxElem).attr('data-content')});
		});
		
		$(codeboxElem).find('.codeboxTryItButton').on('click', function() {
			var a = document.createElement('a');
			a.href = 'https://stackblitz.com/edit/' + $(this).attr('data-project') + '?devtoolsheight=33&file=index.js&hideNavigation=1%3B';
			a.target = '_blank';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			analytics.track('Codebox Try It', {category:'Codebox', label:$(codeboxElem).attr('data-project')});
		});


		$(codeboxElem).find('.codeboxFlashDeviceButton').on('click', function() {
			const thisCodeElem = $(codeboxElem).find('code');

			const device = $(codeboxElem).find('select.codeboxFlashDeviceSelect').val();
			if (!device || device == 'select') {
				return;
			}
		
            if (!apiHelper.confirmFlash()) {
                return;
            }
							
			apiHelper.flashDevice(device, $(thisCodeElem).text(), codeboxElem);		

			analytics.track('Codebox Flash', {category:'Codebox', label:$(codeboxElem).attr('data-content')});
		});

		$(codeboxElem).find('.codeboxUploadSchemaButton').on('click', function() {
			const thisCodeElem = $(codeboxElem).find('code');

			const product = $(codeboxElem).find('.apiHelperTrackerProductSelect').val();

			const warning = 'Uploading a configuration schema replaces the existing configuration schema for all users of this product! An incorrect schema can cause errors opening your product in the console. A backup will be saved in your Downloads directory but you should still exercise caution.';
			
			if (!confirm(warning)) {
				return;
			}
		
			const schema = $(thisCodeElem).text();
		
			apiHelper.uploadSchemaCodebox(schema, product, 'default', function() {
				
			});

			analytics.track('Codebox Upload Schema', {category:'Codebox'});
		});
		
	});
});

function collapseToggle(id) {	 
	const isOpen = $('#id' + id).is(':visible');
	console.log('collapseToggle isOpen=' + isOpen + ' id=' + id);
	if (isOpen) {
		$('#id' + id).css('display', 'none');
		$('#ir' + id).css('display', 'inline');
		$('#s' + id).hide();
	}
	else {
		$('#id' + id).css('display', 'inline');
		$('#ir' + id).css('display', 'none');
		$('#s' + id).show();
	}
	/*
	if ($('#i' + id).attr('src').includes('down')) {
		$('#s' + id).hide();
		$('#i' + id).attr('src', '/assets/images/disclosure-right.png');
	}
	else {	
		$('#s' + id).show();
		$('#i' + id).attr('src', '/assets/images/disclosure-down.png');
	}
	*/
}

function collapseSelector(event, genericCssClass, switchTo) {

	if (event && event.altKey) {
		$('span.' + genericCssClass + 'optionHide').show();			
	}

	$('div.' + genericCssClass).hide();
	$('div.' + genericCssClass + switchTo).show();			

	$('input.' + genericCssClass).prop('checked', false);
	$('input.' + genericCssClass + switchTo).prop('checked', true);

	// Hide navigation menu items for sections that are hidden
	$('div.in-page-toc-container').each(function(index, toc) {		
		$(toc).find('a').each(function(index, anchor) {
			var href = $(anchor).prop('href');
			var hashOffset = href.lastIndexOf('#');
			if (hashOffset >= 0) {
				var hash = href.substring(hashOffset + 1);
				if (hash) {
					if ($('#' + hash).is(':hidden')) {
						$(anchor).parent('li').hide();
					}
					else {
						$(anchor).parents('li').show();
					}	
				}
			}
		});
	});

	localStorage.setItem(genericCssClass, switchTo);
}

function collapseCopy(id) {
	var elem = document.getElementById(id);
	$(elem).show();
	elem.select();
	document.execCommand("copy");
	$(elem).hide();
}

function collapseDrag(ev, id) {
    ev.dataTransfer.setData("text", $('#' + id).text());
}

imageOverlay.setupOverlay = function() {
	imageOverlay.backgroundColor = '#ffffff';
	imageOverlay.toolsHeight = $('#imageToolsContainer ').height();

	$('.imageOverlayCloseIcon').on('click', function() {
		imageOverlay.hideOverlay();
	});
	$('.imageOverlayMinusIcon').on('click', function() {
		imageOverlay.zoomOut();
	});
	$('.imageOverlayPlusIcon').on('click', function() {
		imageOverlay.zoomIn();
	});

	/*
	$('#imageOverlayContainer').on('click', function() {
		imageOverlay.hideOverlay();
	});
	*/


    $('#imageOverlay').on('mousedown', function(ev) {
        // ev.originalEvent is the MouseEvent
        //   .offsetX, .offsetY coordinates relative to the DOM element

		imageOverlay.showMove = {
			startX: ev.originalEvent.offsetX,
			startY: ev.originalEvent.offsetY,
			elemStartX: imageOverlay.panX,
			elemStartY: imageOverlay.panY,
		};
	});

	$('#imageOverlay').on('mousemove', function(ev) {
        // ev.originalEvent is the MouseEvent
        //   .offsetX, .offsetY coordinates relative to the DOM element
        if (ev.originalEvent.buttons) {
			if (imageOverlay.showMove) {
				imageOverlay.panX = Math.round(imageOverlay.showMove.elemStartX + (ev.originalEvent.offsetX - imageOverlay.showMove.startX) / imageOverlay.zoom);
				imageOverlay.panY = Math.round(imageOverlay.showMove.elemStartY + (ev.originalEvent.offsetY - imageOverlay.showMove.startY) / imageOverlay.zoom);
				imageOverlay.draw();
			}

            // console.log('mousemove', ev);
        }
    });

	$('#imageOverlay').on('mouseup', function(ev) {
        // ev.originalEvent is the MouseEvent
        //   .offsetX, .offsetY coordinates relative to the DOM element
        // Note: click occurs after releasing the mouse button!
		imageOverlay.showMove = null;   
	});

	$('#imageOverlay').on('resize', function(ev) {
		imageOverlay.resize();
	});

	window.addEventListener('beforeprint', function() {
		if ($('#imageOverlayContainer').is(':visible')) {
			$('.content-root').hide();
			$('#imageToolsContainer').hide();
			imageOverlay.resize({isPrint: true});
		}
	});
	window.addEventListener('afterprint', function() {
		if ($('#imageOverlayContainer').is(':visible')) {
			$('.content-root').show();
			$('#imageToolsContainer').show();
			imageOverlay.resize();
		}
	});


}



imageOverlay.zoomIn = function() {
	imageOverlay.zoom *= 2;
	imageOverlay.draw();
}

imageOverlay.zoomOut = function() {
	imageOverlay.zoom /= 2;
	imageOverlay.draw();
}

imageOverlay.draw = function() {
	const ctx = $(imageOverlay.canvas)[0].getContext("2d");
    ctx.fillStyle = imageOverlay.backgroundColor;
    ctx.fillRect(0, 0, imageOverlay.canvasWidth, imageOverlay.canvasHeight);

	let info = {
		scale: 1,
		dx: 0,
		dy: 0,
	};

	// scaleX, scaleY are 
	// == 1 if the image and canvas as the same size, 
	// < 1 if the image is larger than the canvas
	// > 1 if the canvas is larger than the image
	info.scaleX = imageOverlay.canvasWidth / imageOverlay.imageWidth;
	info.scaleY = imageOverlay.canvasHeight / imageOverlay.imageHeight;

	if (info.scaleX < 1 && info.scaleY < 1) {
		// Image is larger than the canvas in both dimensions (scale down)
		// The smallest value indicates the maximum scaling so the image will fit entirely, possibly with empty space
		info.scale = Math.min(info.scaleX, info.scaleY);
	}
	else
	if (info.scaleX > 1 && info.scaleY > 1) {
		// Canvas is larger than the image in both dimensions (scale up)
		// The largest value indicates the minimum scaling so the image will fit entirely, possibly with empty space
		info.scale = Math.max(info.scaleX, info.scaleY);
	}
	else
	if (info.scaleX < 1 && info.scaleY >= 1) {
		// Image is larger than the canvas in the X dimension
		// Canvas is larger than the image in the Y dimension
		info.scale = info.scaleX;
	}
	else
	if (info.scaleX >= 1 && info.scaleY < 1) {
		// Image is larger than the canvas in the X dimension
		// Canvas is larger than the image in the Y dimension
		info.scale = info.scaleY;
	}
	else {
		// Exactly the same size (unlikely to occur)
		// (info.scale stays at 1)
	}

	info.dWidth = imageOverlay.imageWidth * info.scale * imageOverlay.zoom;
	info.dHeight = imageOverlay.imageHeight * info.scale * imageOverlay.zoom;

	if (info.dWidth < imageOverlay.canvasWidth) {
		info.dx = Math.floor((imageOverlay.canvasWidth - info.dWidth) / 2);
	}
	if (info.dHeight < imageOverlay.canvasHeight) {
		info.dy = Math.floor((imageOverlay.canvasHeight - info.dHeight) / 2);
	}
	info.dx += Math.floor(imageOverlay.panX  * imageOverlay.zoom);
	info.dy += Math.floor(imageOverlay.panY  * imageOverlay.zoom);

	console.log('info', info);

	// drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
	ctx.drawImage(imageOverlay.image, 0, 0, imageOverlay.imageWidth, imageOverlay.imageHeight, info.dx, info.dy, info.dWidth, info.dHeight);
}

imageOverlay.resize = function(resizeOptions = {}) {
	$('#imageOverlayContainer').css('top', '0px');
	$('#imageOverlayContainer').css('height', '100%');
	
	imageOverlay.canvasWidth = Math.floor($('#imageOverlayContainer').width());
	imageOverlay.canvasHeight = Math.floor($('#imageOverlayContainer').height() - imageOverlay.toolsHeight);

	$('#imageOverlayContainer').css('top', imageOverlay.toolsHeight + 'px');
	$('#imageOverlayContainer').css('height', imageOverlay.canvasHeight + 'px');

	$(imageOverlay.canvas).prop('width', imageOverlay.canvasWidth);
	$(imageOverlay.canvas).prop('height', imageOverlay.canvasHeight);

	// imageOverlay.bodyWidth = $('body').width();
	// imageOverlay.bodyHeight = $('body').height();
	imageOverlay.isPrint = resizeOptions.isPrint || false;
	if (imageOverlay.isPrint) {
		imageOverlay.canvasWidth = 750;
		imageOverlay.canvasHeight = 750;
	}
	
	console.log('resize', imageOverlay);

	imageOverlay.draw();	 
}

imageOverlay.showOverlay = function(imgPath) {
	$('#imageOverlayContainer').show();
	$('#imageToolsContainer').show();

	imageOverlay.canvas = $('#imageOverlay > canvas');

	imageOverlay.image = new Image();
	imageOverlay.image.onload = function() {
		imageOverlay.imageWidth = imageOverlay.image.width;
		imageOverlay.imageHeight = imageOverlay.image.height;	
		console.log('loaded', imageOverlay);
		imageOverlay.resize();
	}
	imageOverlay.image.src = imgPath;
	
	imageOverlay.zoom = 1;
	imageOverlay.panX = imageOverlay.panY = 0;

	$('body').keydown(function(ev) {
		switch (ev.key) {
            case 'Esc':
            case 'Escape':
				imageOverlay.hideOverlay();
				ev.preventDefault();
				break;

			// Keyboard shortcuts for zoom in (Cmd-+ on the Mac, for example, are intercepted by the browser)

			default:
				break;
		}
	});

}

imageOverlay.hideOverlay = function() {
	imageOverlay.image = null;
	$('body').off('keydown');
	$('#imageOverlayContainer').hide();
	$('#imageToolsContainer').hide();
}



