$(document).ready(function() {
    let deviceSelector = {
    };

    $('.deviceSelector').each(function() {
        const thisPartial = $(this);

        deviceSelector.elem = thisPartial;
        $(thisPartial).data('deviceSelector', deviceSelector);

        console.log('deviceSelector', deviceSelector);

    });
});