
$(document).ready(function() {

	$('input.collapseDefault').each(function(index) {
		var genericCssClass = $(this).attr('name');
		var defaultValue = $(this).attr('value');

		var switchTo = localStorage.getItem(genericCssClass) || defaultValue;
    	collapseSelector(genericCssClass, switchTo);
	});
	$('input.collapseForce').each(function(index) {
		var genericCssClass = $(this).attr('name');
		var defaultValue = $(this).attr('value');

    	collapseSelector(genericCssClass, defaultValue);
	});

	$('code.codebox').each(function(index) {
		var content = $(this).attr('data-content');

		var elem = $(this);

		$.ajax({url:content, dataType:'text'})
  			.done(function(data) {
				elem.text(data);
				elem.removeClass('prettyprinted');
				if (prettyPrint) {
					prettyPrint();
				}
			})
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

	if (event.altKey) {
		$('span.' + genericCssClass + 'optionHide').show();			
	}

	$('div.' + genericCssClass).hide();
	$('div.' + genericCssClass + switchTo).show();			

	$('input.' + genericCssClass).removeProp('checked');
	$('input.' + genericCssClass + switchTo).prop('checked', 'checked');

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
	var html = '<img src="' + imgPath + '" onclick="hideOverlay()" class="imageOverlay" style="cursor:zoom-out"/>';

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

function codeboxDownload(url) {
	var a = document.createElement('a');
	a.href = url;
	a.download = url.split('/').pop();
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function codeboxCopy(id) {	
	var t = document.createElement('textarea');
	document.body.appendChild(t);
	$(t).text($('#' + id).text());
	t.select();
	document.execCommand("copy");
	document.body.removeChild(t);
}

function codeboxOpenWebIDE(appid) {
	var a = document.createElement('a');
	a.href = 'https://go.particle.io/shared_apps/' + appid;
	a.target = '_blank';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function codeboxFlash(id) {	
	const codebox = $('#' + id).closest('div.codebox');
	console.log('codebox ', codebox);

	const device = $(codebox).find('select.codeboxFlashDeviceSelect').val();
	if (!device || device == 'select') {
		return;
	}

	console.log('device', device);

	const warning = 'Flashing firmware to a device replaces the existing user firmware binary on the device. This can only be undone by locating and flashing the previous firmware on the device.';

	if (!confirm(warning)) {
		return;
	}

	const code = $('#' + id).text();

	apiHelper.flashDevice(device, code);
}
