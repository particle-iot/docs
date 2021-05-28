
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }
    $('.apiHelperProjectBrowser').each(function() {
        const thisElem = $(this);
        const gaCategory = 'Project Browser';

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

        const getProjectZip = async function() {
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
            return projectZip;
        }

        $(fileSelect).on('click', async function() {
            // Load the zip on first click
            getProjectZip();
        });

        let curText;
        let curPath;

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

            curText = text;
            curPath = path;

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

            setStatus('Opening ' + path + '...');

            const ze = projectZip.find(path);

            const text = await ze.getText();

            const fullUrlPath = projectUrlBase + '/' + $(fileSelect).val();
            showFile(fullUrlPath, text);

			ga('send', 'event', gaCategory, 'View File', path);
            setStatus('');
        });



		$(thisElem).find('.apiHelperProjectDownloadButton').on('click', function() {	
			var a = document.createElement('a');
			a.href = curPath;
			a.download = curPath.split('/').pop();
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			ga('send', 'event', gaCategory, 'File Download', curPath);
		});

		$(thisElem).find('.apiHelperProjectCopyButton').on('click', function() {			
			var t = document.createElement('textarea');
			document.body.appendChild(t);
			$(t).text(curText);
			t.select();
			document.execCommand("copy");
			document.body.removeChild(t);

			ga('send', 'event', gaCategory, 'File Copy', curPath);
		});

        $(thisElem).find('.apiHelperProjectDownloadZipButton').on('click', function() {
			var a = document.createElement('a');
			a.href = projectUrlBase + '.zip';
			a.download = project + '.zip';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			ga('send', 'event', gaCategory, 'Zip Download', project);
        });

        const flashDeviceButton = $(thisElem).find('.codeboxFlashDeviceButton');

        $(flashDeviceButton).on('click', async function() {

			const device = $(thisElem).find('select.codeboxFlashDeviceSelect').val();
			if (!device || device == 'select') {
				return;
			}
		
            if (!apiHelper.confirmFlash()) {
                return;
            }
		
            $(flashDeviceButton).prop('disabled', true);
            
            await getProjectZip();

            let formData = new FormData();

            formData.append('deviceId', device);
            // formData.append('build_target_version', 'latest');
            let fileNum = 0;

            const addDir = async function(path, zipDir) {
                for(const d of zipDir.children) {
                    const p = (path ? path + '/' : '') + d.name;
                    if (d.directory) {
                        await addDir(p, d);
                    }
                    else {
                        const blob = await d.getBlob('text/plain');
                        formData.append('file' + (++fileNum), blob, p);
                    }
                }
            }
            await addDir('', projectZip.root.children[0]);

            setStatus('Starting compile and flash...');
            let startTimer = setTimeout(function() {
                setStatus('Compile still in progress...');
                startTimer = null;
            }, 3000);

            const request = {
                contentType: false,
                data: formData,
                dataType: 'json',
                error: function (jqXHR) {
                    ga('send', 'event', gaCategory, 'Flash Device Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));
                    if (startTimer) {
                        clearTimeout(startTimer);
                        startTimer = null;
                    }
                    setStatus('Compile and flash failed');
                    $(flashDeviceButton).prop('disabled', false);
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'PUT',
                processData: false,
                success: function (resp, textStatus, jqXHR) {
                    ga('send', 'event', gaCategory, 'Flash Device Success');
                    if (startTimer) {
                        clearTimeout(startTimer);
                        startTimer = null;
                    }
                    setStatus('Compile succeeded, flash started!');
                    $(flashDeviceButton).prop('disabled', false);

                    setTimeout(function() {
                        setStatus('');
                    }, 8000);                
                },
                url: 'https://api.particle.io/v1/devices/' + device
            };

            $.ajax(request);
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

