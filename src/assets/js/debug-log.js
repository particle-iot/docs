$(document).ready(function () {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.apiHelperDebugLog').each(function() {
        const thisPartial = $(this);

        logDecoder.urlPrefix = '/assets/files/';

        logDecoder.load();
        logUserInterface.setupHandlers();

        logUserInterface.outputElem = $('.logDecodedOutputDiv');


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

    });

});


