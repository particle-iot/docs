
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }
    let deviceRestoreInfo;



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
        const targetVersionSelect = $(thisElem).find('.apiHelperProjectTarget');
        const tryItButtonElem = $(thisElem).find('.apiHelperTryItButton');

        const setStatus = function(str) {
            $('.apiHelperProjectBrowserStatus').text(str);
        };

        // Default file, before fetching the whole zip
        const optionElem = document.createElement('option');
        $(optionElem).prop('name', defaultFile);
        $(optionElem).text(defaultFile);
        $(fileSelect).html(optionElem);

        let configFileOrig;
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
            // Load the zip on first click (async)
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

            const langMap = {
                'cpp': ['cpp', 'c++', 'cxx', 'c', 'h', 'hpp'],
                'json': ['json'],
                'js': ['js']
            }
            
            let langFound;
            for(const key in langMap) {
                if (langMap[key].includes(ext)) {
                    langFound = key;
                    break;
                }
            }

            if (langFound) {
                $(outputCodeElem).show();

                const thisCodeElem = $(outputCodeElem).find('code');
                for(const key in langMap) {
                    $(thisCodeElem).removeClass('lang-' + key);
                }
                $(thisCodeElem).addClass('lang-' + langFound);

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

			gtag('send', 'event', gaCategory, 'View File', path);
            setStatus('');
        });


        const dataOptions = $(thisElem).data('options');
        if (dataOptions && dataOptions.includes('stackblitz')) {
            let params = $(thisElem).data('params');
            if (!params) {
                params = {};
            }   
            if (!params.stackblitzProject) {
                params.stackblitzProject = {};
            }
            if (!params.stackblitzOptions) {
                params.stackblitzOptions = {};
            }
            $(thisElem).data('params', params);    
        }

        const updateProject = async function() {
            const params = $(thisElem).data('params');
            if (!params) {
                return;
            }    
            
            if (params.preloadZip) {
                // async
                await getProjectZip();
            }

            if (params.updateConfig) {
                let zipFs = await getProjectZip();

                let newConfigOptions = params.updateConfig();

                for(const ze of zipFs.root.children[0].children) {
                    if (ze.name == 'config.js') {
                        if (!configFileOrig) {
                            configFileOrig = await ze.getText();
                        }
                        let newConfig = '';
                        for(let line of configFileOrig.split('\n')) {
                            for(let key in newConfigOptions) {
                                if (line.includes('config.' + key)) {
                                    line = '    config.' + key + ' = ';
                                    if (typeof newConfigOptions[key] === 'string') {
                                        line += '\'' + newConfigOptions[key] + '\'';
                                    } 
                                    else {
                                        line += newConfigOptions[key];;
                                    }                                
                                }
                            }

                            newConfig += line + '\n';
                        }
                        ze.replaceText(newConfig);
                    }
                }    
                if ($(fileSelect).val() == 'config.js') {
                    $(fileSelect).trigger('change');
                }
            }

            if (params.updateProject) {
                params.updateProject(zipFs);
            }

            if (params.stackblitzProject) {
                const checkFn = function() {
                    if (apiHelper.canUseStackblitz) {
                        if (!apiHelper.canUseStackblitz()) {
                            $(tryItButtonElem).prop('disabled', true);
                        }    
                    } else {
                        setTimeout(checkFn, 1000);
                    }
                }
                checkFn();                

                $(tryItButtonElem).parent('span').show();
            }
        };
        $(thisElem).on('updateProject', updateProject);
        updateProject();


        if ($(tryItButtonElem).data('project')) {
            $(tryItButtonElem).parent('span').show();
        }
        
        $(tryItButtonElem).on('click', async function() {
            if ($(tryItButtonElem).data('project')) {
                // Old way: launches project
                var a = document.createElement('a');
                a.href = 'https://stackblitz.com/edit/' + $(this).attr('data-project') + '?devtoolsheight=33&file=index.js&hideNavigation=1%3B';
                a.target = '_blank';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                gtag('send', 'event', gaCategory, 'Try It', $(tryItButtonElem).attr('data-project'));    
            }
            else {
                const params = $(thisElem).data('params');
                if (!params || !params.stackblitzProject) {
                    return;
                }

                let fileData = {};

                let zipFs = await getProjectZip();

                await updateProject();

                for(const ze of zipFs.root.children[0].children) {
                    if (!ze.directory) {
                        fileData[ze.name] = await ze.getText();
                    }
                }
    
                let stackblitzProject = Object.assign({
                    files: fileData,
                    title: project,
                    description: project + ' example script',
                    template: 'node'
                }, params.stackblitzProject);
    
                let stackblitzOptions = Object.assign({
                    openFile: 'app.js',
                }, params.stackblitzOptions);
    
                StackBlitzSDK.openProject(stackblitzProject, stackblitzOptions);
            }
        });    




		$(thisElem).find('.apiHelperProjectDownloadButton').on('click', function() {	
			var a = document.createElement('a');
			a.href = curPath;
			a.download = curPath.split('/').pop();
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			gtag('send', 'event', gaCategory, 'File Download', curPath);
		});

		$(thisElem).find('.apiHelperProjectCopyButton').on('click', function() {			
			var t = document.createElement('textarea');
			document.body.appendChild(t);
			$(t).text(curText);
			t.select();
			document.execCommand("copy");
			document.body.removeChild(t);

			gtag('send', 'event', gaCategory, 'File Copy', curPath);
		});

        $(thisElem).find('.apiHelperProjectDownloadZipButton').on('click', async function() {
			const zipFs = await getProjectZip();

            const blob = await zipFs.exportBlob({
                level:0
            });
        
            const outputFile = project + '.zip';
            setStatus('Saving ' + outputFile + ' to Downloads...');
            saveAs(blob, outputFile);

			gtag('send', 'event', gaCategory, 'Zip Download', project);
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

            let targetVersion = 'latest';
            if ($(targetVersionSelect).length > 0) {
                targetVersion = $(targetVersionSelect).val();
            }

            formData.append('deviceId', device);
            formData.append('build_target_version', targetVersion);
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
                    gtag('send', 'event', gaCategory, 'Flash Device Error', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));
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
                    gtag('send', 'event', gaCategory, 'Flash Device Success');
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

        $(thisElem).find('.apiHelperProjectTarget').each(async function() {
            const thisTargetElem = $(this);
            const targetOptions = $(thisTargetElem).attr('data-target');

            let versionsArray = await apiHelper.getReleaseAndLatestRcVersionOnly();

            if (targetOptions) {
                versionsArray = versionsArray.filter(function(versionStr) {
                    const ver = apiHelper.parseVersionStr(versionStr);                
                    const targetVer = apiHelper.parseVersionStr(targetOptions);
    
                    if (targetOptions.startsWith('>=')) {
                    const targetVer = apiHelper.parseVersionStr(targetOptions);
                        if (ver.major > targetVer.major) {
                            return true;
                        }
                        else if (ver.major == targetVer.major && ver.minor >= targetVer.minor) {
                            return true;
                        }
                    }
                    else if (targetOptions.startsWith('<')) {
                        if (ver.major < targetVer.major) {
                            return true;
                        }
                        else if (ver.major == targetVer.minor && ver.minor < targetVer.minor) {
                            return true;
                        }                
                    }
                    else if (targetOptions == '2.x') {
                        if (ver.major == 2) {
                            return true;
                        }
                    }
                    else if (targetOptions == 'ble2') {
                        // 1.3.0 to 2.x
                        if (ver.major == 2) {
                            return true;
                        }
                        else
                        if (ver.major == 1 && ver.minor >= 3) {
                            return true;
                        }
                    }

                    return false;
                });    
            }

            //console.log('versionsArray', versionsArray);

            let html = '';
            for(const ver of versionsArray) {
                const optionElem = document.createElement('option');
                $(optionElem).prop('name', ver);
                $(optionElem).text(ver);
                $(thisTargetElem).append(optionElem);                    
            }

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

