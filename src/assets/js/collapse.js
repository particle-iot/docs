
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
				if ($('#' + hash).is(':hidden')) {
					$(anchor).parent('li').hide();
				}
				else {
					$(anchor).parents('li').show();
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
