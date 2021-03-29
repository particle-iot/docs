$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.apiHelperMustacheTester').each(function() {
        const thisPartial = $(this);

        let codeMirrors = [];

        $(thisPartial).find('.apiHelperJsonLinter').each(function(index) {
            const dataIndex = parseInt($(this).attr('data-index'));

            codeMirrors[index] = apiHelper.jsonLinterCodeMirror[dataIndex];
        });

        const renderTemplate = function() {
            $(thisPartial).find('.apiHelperMustacheTesterExpanded').val('');
            $(thisPartial).find('.apiHelperRenderedJson').hide();

            let env = {};

            const inputStr = codeMirrors[0].getValue();
            try {
                env = JSON.parse(inputStr);
            }
            catch(e) {
            }
            env['PARTICLE_EVENT_VALUE'] = inputStr;
            env['PARTICLE_EVENT_NAME'] = 'testEvent';
            env['PARTICLE_DEVICE_ID'] = '3f002b000000000000000000';
            env['PARTICLE_PUBLISHED_AT'] = '2016-04-16T13:37:08.755Z';

            const templateStr = $(thisPartial).find('.apiHelperMustacheTesterTemplate').val();

            const template = Hogan.compile(templateStr);

            const output = template.render(env);
            
            $(thisPartial).find('.apiHelperMustacheTesterExpanded').val(output);

            if (output.startsWith('{') || output.startsWith('[')) {
                $(thisPartial).find('.apiHelperRenderedJson').show();
                codeMirrors[1].setValue(output);    
            }

        };

        $(thisPartial).on('linted', function(event) {
            renderTemplate();
        });

        $(thisPartial).find('.apiHelperMustacheTesterTemplate').on('input', function() {
            // Mustache template change
            renderTemplate();
        });

        renderTemplate();
    });

});
