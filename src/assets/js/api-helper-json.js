

$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.apiHelperJsonLinter').each(function() {
        
        var myCodeMirror = CodeMirror.fromTextArea($(this).find('textarea')[0], {
            lineNumbers: true,
            lint: true,
            mode:  "json"
        });
    });
});
