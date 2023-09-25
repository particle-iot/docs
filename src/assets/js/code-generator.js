$(document).ready(function () {
    // auth not required

    $('.codeGeneratorSingleton').each(function() {
        const thisElem = $(this);

        const setStatus = function(str) {
            $(thisElem).find('.apiHelperStatus').text(str);
        };

        let className;
        let sources;

        const generateCode = function() {
            className = $(thisElem).find('.className').val();

            sources = codeGenerator.run({
                name: className,
                singleton: true,
                mutex: $(thisElem).find('.generateMutex').prop('checked'),
                thread: $(thisElem).find('.generateThread').prop('checked'),
                setup: true,
                loop: true
            });
            
            ['source','header'].forEach(function(which) {
                let thisCodeElem = $(thisElem).find('.' + which + 'File > pre > code');
                $(thisCodeElem).text(sources[which]);
                $(thisCodeElem).removeClass('prettyprinted');
                if (prettyPrint) {
                    prettyPrint();
                }
            });
        };

        $(thisElem).find('.className').on('blur', generateCode);
        $(thisElem).find('.generateMutex').on('click', generateCode);
        $(thisElem).find('.generateThread').on('click', function() {
            if ($(this).prop('checked')) {
                $(thisElem).find('.generateMutex').prop('checked', true);
            }
            generateCode();
        });
        $(thisElem).find('.apiHelperActionButton').on('click', generateCode);

        $(thisElem).find('.downloadButton').on('click', async function() {
            const zipFs = new zip.fs.FS();

            zipFs.addText(className + '.cpp', sources.source);
            zipFs.addText(className + '.h', sources.header);

            const blob = await zipFs.exportBlob({
                level:0
            });
        
            const outputFile = className + '.zip';
            setStatus('Saving ' + outputFile + ' to Downloads...');
            saveAs(blob, outputFile);
        
            analytics.track('Success', {category:'Singleton Download'});
        
        });

        generateCode();
    });
});
