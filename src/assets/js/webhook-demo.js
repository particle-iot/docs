$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    let webhookDemo = {      
        started: false,  
    };

    $('.webhookDemo[data-control="start"]').each(async function() {
        console.log('has start');
        $(this).data('webhookDemo', webhookDemo);

        // Do stuff for browser compatibility checks here

        $('#canStart').show();

        $('#startButton').on('click', async function() {
            webhookDemo.started = true;
            $(this).trigger('webhookDemoStarted');

            const embedObject = $('.stackblitzEmbed').data('embedObject');
            embedObject.load();
        })
    

    });


});
