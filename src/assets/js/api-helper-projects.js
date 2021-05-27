
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }
    $('.apiHelperProjectBrowser').each(function() {
        const thisElem = $(this);

        const project = $(thisElem).data('project');
        const defaultFile = $(thisElem).data('default-file');
  
        const projectUrlBase = '/assets/files/projects/' + project;

        const outputCodeElem = $(thisElem).find('.apiHelperProjectBrowserOutputCode');
        const outputPreElem = $(thisElem).find('.apiHelperProjectBrowserOutputPre');
        const outputDivElem = $(thisElem).find('.apiHelperProjectBrowserOutputDiv');
        const fileSelect = $(thisElem).find('.apiHelperProjectSelect');

        const setStatus = function(str) {
            $('.apiHelperProjectBrowserStatus').text(str);
        };

        // Default file, before fetching the whole zip
        const optionElem = document.createElement('option');
        $(optionElem).prop('name', defaultFile);
        $(optionElem).text(defaultFile);
        $(fileSelect).html(optionElem);

        let projectZip;

        $(fileSelect).on('click', async function() {
            // Load the zip on first click
            if (!projectZip) {
                projectZip = new zip.fs.FS();

                setStatus('Getting project source...')
                await projectZip.importHttpContent(projectUrlBase + '.zip');
                setStatus('');

                $(fileSelect).html('');
                
                const addDir = function(path, zipDir) {
                    for(const d of zipDir.children) {
                        const p = (path ? path + '/' : '') + d.name;
                        if (d.directory) {
                            addDir(p, d);
                        }
                        else {
                            const optionElem = document.createElement('option');
                            $(optionElem).prop('name', p);
                            $(optionElem).text(p);

                            if (p == defaultFile) {
                                $(optionElem).prop('selected', true);
                            }

                            $(fileSelect).append(optionElem);
                        }
                    }
                }
                addDir('', projectZip.root.children[0]);
            }
        });

        const showFile = function(path, text) {
            let name, ext = '';
            let index = path.lastIndexOf('/');
            if (index >= 0) {
                name = path.substr(index + 1);
            }
            else {
                name = path;
            }
            index = name.lastIndexOf('.');
            if (index > 0) {
                ext = name.substr(index + 1);
            }
            ext = ext.toLowerCase();

            $(outputCodeElem).hide();
            $(outputPreElem).hide();
            $(outputDivElem).hide();

            if (['cpp', 'c++', 'cxx', 'c', 'h', 'hpp'].includes(ext)) {
                $(outputCodeElem).show();

                const thisCodeElem = $(outputCodeElem).find('code');
                $(thisCodeElem).text(text);
                $(thisCodeElem).removeClass('prettyprinted');
                if (prettyPrint) {
                    prettyPrint();
                }        
            }
            else {
                $(outputPreElem).show();
                $(outputPreElem).find('pre').text(text);
            }
        };

        $(fileSelect).on('change', async function() {
            const path = project + '/' + $(fileSelect).val();

            const ze = projectZip.find(path);

            const text = await ze.getText();

            showFile(path, text);
        });


        const showDefaultFile = async function() {
            const path = projectUrlBase + '/' + $(fileSelect).val();
            fetch(path)
                .then(response => response.text())
                .then(function(text) {

                    showFile(path, text);
                });
        };

        showDefaultFile();
    });

});

