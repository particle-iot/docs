
$(document).ready(function() {

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

			ga('send', 'event', 'Codebox', 'Codebox Download', contentUrl);
		});

		$(codeboxElem).find('.codeboxCopyButton').on('click', function() {
			const thisCodeElem = $(codeboxElem).find('code');
			
			var t = document.createElement('textarea');
			document.body.appendChild(t);
			$(t).text($(thisCodeElem).text());
			t.select();
			document.execCommand("copy");
			document.body.removeChild(t);

			ga('send', 'event', 'Codebox', 'Codebox Copy', $(codeboxElem).attr('data-content'));
		});

		$(codeboxElem).find('.codeboxWebIdeButton').on('click', function() {
			var a = document.createElement('a');
			a.href = 'https://go.particle.io/shared_apps/' + $(this).attr('data-appid');
			a.target = '_blank';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			ga('send', 'event', 'Codebox', 'Codebox Open WebIDE', $(codeboxElem).attr('data-content'));
		});
		
		$(codeboxElem).find('.codeboxTryItButton').on('click', function() {
			var a = document.createElement('a');
			a.href = 'https://stackblitz.com/edit/' + $(this).attr('data-project') + '?devtoolsheight=33&file=index.js&hideNavigation=1%3B';
			a.target = '_blank';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			ga('send', 'event', 'Codebox', 'Codebox Try It', $(codeboxElem).attr('data-project'));
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

			ga('send', 'event', 'Codebox', 'Codebox Flash', $(codeboxElem).attr('data-content'));
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

			ga('send', 'event', 'Codebox', 'Codebox Upload Schema');
		});
		
	});
});

function collapseToggle(id) {	 
	if ($('#i' + id).attr('src').includes('down')) {
		$('#s' + id).hide();
		$('#i' + id).attr('src', '/assets/images/disclosure-right.png');
	}
	else {	
		$('#s' + id).show();
		$('#i' + id).attr('src', '/assets/images/disclosure-down.png');
	}
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

function showOverlay(imgPath) {
	var html = '<img src="' + imgPath + '" onclick="hideOverlay()" class="imageOverlay no-darken" style="cursor:zoom-out"/>';

	$('body').keydown(function(ev) {
		hideOverlay();
	});

	$('#imageOverlay').html(html);
	$('#imageOverlay').show();
}

function hideOverlay() {
	$('body').off('keydown');
	$('#imageOverlay').hide();
}


