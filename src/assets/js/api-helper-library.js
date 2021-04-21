$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.apiHelperLibraryBrowser').each(function() {
        const thisPartial = $(this);

        $(thisPartial).find('.apiHelperLibraryViewButton').on('click', function() {
            const libraryName = $(thisPartial).find('.apiHelperLibraryName').val();

            let extractedFiles;

            const updateFileSelector = function() {
                $(thisPartial).find('.apiHelperLibraryBrowserOutput').show();

                const sel = $(thisPartial).find('.apiHelperLibrarySelect');
                $(sel).html('');

                console.log('extractedFiles', extractedFiles);

                for(let ii = 0; ii < extractedFiles.length; ii++) {
                    const f = extractedFiles[ii];

                    if (f.size == 0) { // f.name == '.' || f.name == '.git'
                        continue;
                    }
                    $(sel).append('<option value="' + ii + '">' + f.name + '</option>');
                }
            };

            (thisPartial).find('.apiHelperLibrarySelect').on('change', function() {
                const index = parseInt($(this).val());
                console.log('selected ' + index);

                const outputCodeElem = $(thisPartial).find('.apiHelperLibraryBrowserOutputCode');
                $(outputCodeElem).show();

                const thisCodeElem = $(outputCodeElem).find('code');
				$(thisCodeElem).text(extractedFiles[index].readAsString());
				$(thisCodeElem).removeClass('prettyprinted');
				if (prettyPrint) {
					prettyPrint();
				}
            });

            apiHelper.particle.getLibrary({ name:libraryName, auth: apiHelper.auth.access_token }).then(
                function(libraryData) {
                    fetch(libraryData.body.data.links.download)
                        .then(response => response.arrayBuffer())
                        .then(function(gzipData) {
                            const tarData = window.pako.inflate(gzipData);

                            untar(tarData.buffer)
                                .progress(function(data) {
                                })
                                .then(function(data) {
                                    extractedFiles = data;
                                    updateFileSelector();
                                }); 
                        });
                },
                function(err) {
                }
            );  
        });
    });
});

