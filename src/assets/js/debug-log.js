$(document).ready(function () {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.apiHelperDebugLog').each(async function() {
        const thisPartial = $(this);

        logDecoder.urlPrefix = '/assets/files/';
        logUserInterface.outputElem = $('.logDecoderOutputDiv');


        $('.logDecoderInputTextArea').on('input change blur', async function() {
            const text = $(this).val();

            logDecoder.clear();
            await logDecoder.parse(text);
            await logUserInterface.render();
        });
        $('.logDecoderDownloadButton').on('click', function() {
            const str = logDecoder.getRawLogs();

            let blob = new Blob([str], {type:'text/plain'});
            saveAs(blob, 'log.txt');			
        });
        $('.logDecoderCopyButton').on('click', function() {
            const str = logDecoder.getRawLogs();
            $('.logDecoderInputTextArea').val(str);

            const t = $('.logDecoderInputTextArea')[0];
            t.select();
            document.execCommand("copy");
        });
        $('.logDecoderClearButton').on('click', function() {
            logDecoder.clear();
            logUserInterface.saveLogAndSettings();
        });

        logDecoder.load();
        logUserInterface.setupHandlers();
        await logUserInterface.loadLogAndSettings();

    });

});


