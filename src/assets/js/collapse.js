
$(document).ready(function() {
	var d = collapseComputerOsDefault();
	if (d) {
		collapseComputerOs(d);
	}
	else {
		collapseComputerOs('Windows');
	}
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

function collapseComputerOs(switchTo) {
	$('div.collapseComputerOs').hide();
	$('div.collapseComputerOs' + switchTo).show();			

	$('input.collapseComputerOs').removeProp('checked');
	$('input.collapseComputerOs' + switchTo).prop('checked', 'checked');

	// Hide navigation menu items for sections that are hidden
	$('div.in-page-toc-container').each(function(index, toc) {		
		$(toc).find('a').each(function(index, anchor) {
			var href = $(anchor).prop('href');
			var hashOffset = href.lastIndexOf('#');
			if (hashOffset >= 0) {
				var hash = href.substring(hashOffset + 1);
				if ($('#' + hash).is(':hidden')) {
					$(anchor).parents('li').hide();
				}
				else {
					$(anchor).parents('li').show();
				}
			}
		});
	});
	
	collapseComputerOsDefault(switchTo);

}

function collapseComputerOsDefault(switchTo) {
	var localStorageKey = 'collapseComputerOsDefault';
	
	if (switchTo) {
		localStorage.setItem(localStorageKey, switchTo);
	}
	else {
		switchTo = localStorage.getItem(localStorageKey);
	}
	return switchTo;
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

