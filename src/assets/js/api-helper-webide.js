
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }
    let deviceRestoreInfo;



    $('.apiHelperWebIdeExporter').each(function() {
        const thisElem = $(this);
        const gaCategory = 'Web IDE Exporter';
        const sessionStorageKey = 'webideApps';

        const getProjectsButtonElem = $(thisElem).find('.apiHelperGetProjects');
        const exportOptionsElem = $(thisElem).find('.exportOptions');
        const sortByElem = $(thisElem).find('.sortBy');
        const appsTableElem = $(thisElem).find('.appsTable');
        const selectAllElem = $(thisElem).find('.selectAll');
        const selectNoneElem = $(thisElem).find('.selectNone');
        const exportButtonElem = $(thisElem).find('.apiHelperExport');

        const setStatus = function(str) {
            $('.apiHelperStatus').text(str);
        };

        let applications;
        let applicationCheckboxes;

        const checkboxChange = function() {
            if (applications.length) {
                let numSelected = 0;
                for(const checkboxElem of applicationCheckboxes) {
                    if ($(checkboxElem).prop('checked')) {
                        numSelected++;
                    }
                }

                if (numSelected) {
                    $(selectAllElem).prop('disabled', (numSelected == applications.length));
                    $(selectNoneElem).prop('disabled', false);
                    $(exportButtonElem).prop('disabled', false);
                }
                else {
                    $(selectAllElem).prop('disabled', false);
                    $(selectNoneElem).prop('disabled', true);
                    $(exportButtonElem).prop('disabled', true);
                }            
            }
            else {
                $(selectNoneElem).prop('disabled', true);
                $(selectAllElem).prop('disabled', true);
                $(exportButtonElem).prop('disabled', true);    
            }
        };

        const loadApplications = function() {
            //console.log('applications', applications);
            $(exportOptionsElem).show();
            $(appsTableElem).show();

            const sortBy = $(sortByElem).val();

            $(appsTableElem).find('tbody').html('');

            applications.sort(function(a, b) {
                if (sortBy == 'date') {
                    // last_updated_at: "2014-09-21T18:49:15.893Z"
                    const aDate = new Date(a.last_updated_at);
                    const bDate = new Date(b.last_updated_at);

                    // Actually reverse date sort (newest first)
                    return bDate.getTime() - aDate.getTime();
                }
                else {
                    // sort by name
                    return a.title.localeCompare(b.title);
                }
            });

            applicationCheckboxes = [];

            for(const app of applications) {
                const trElem = document.createElement('tr');

                let tdElem;

                tdElem = document.createElement('td');
                const checkboxElem = document.createElement('input');
                $(checkboxElem).attr('type', 'checkbox');
                $(checkboxElem).on('click', checkboxChange);
                $(tdElem).append(checkboxElem);
                applicationCheckboxes.push(checkboxElem);
                $(trElem).append(tdElem);

                tdElem = document.createElement('td');
                $(tdElem).text(app.title);
                $(trElem).append(tdElem);

                tdElem = document.createElement('td');
                let updated = app.last_updated_at;
                const tIndex = updated.indexOf('T');
                if (tIndex >= 0) {
                    updated = updated.substr(0, tIndex);
                }
                $(tdElem).text(updated);
                $(trElem).append(tdElem);

                tdElem = document.createElement('td');
                let desc = app.description;
                if (desc) {
                    if (desc.length > 50) {
                        desc = desc.substr(0, 50);
                    }

                    $(tdElem).text(desc);
                }
                $(trElem).append(tdElem);

                $(appsTableElem).find('tbody').append(trElem);
            }

            checkboxChange();
        };

        $(selectNoneElem).on('click', function() {
            for(const checkboxElem of applicationCheckboxes) {
                $(checkboxElem).prop('checked', false);
            }
            checkboxChange();
        });
        $(selectAllElem).on('click', function() {
            for(const checkboxElem of applicationCheckboxes) {
                $(checkboxElem).prop('checked', true);
            }
            checkboxChange();
        });

        $(sortByElem).on('change', loadApplications);

        applications = sessionStorage.getItem(sessionStorageKey);
        if (applications) {
            applications = JSON.parse(applications);
            loadApplications();
        }

        $($('.apiHelper')[0]).on('ssoLogout', function() {
            sessionStorage.removeItem(sessionStorageKey);

            applications = [];
            loadApplications();
        });

        $(getProjectsButtonElem).on('click', function() {
            $(getProjectsButtonElem).prop('disabled', true);

            $(exportOptionsElem).hide();
            $(appsTableElem).hide();

            const request = {
                dataType: 'json',
                error: function (jqXHR) {
                    ga('send', 'event', gaCategory, 'Error GetApps', (jqXHR.responseJSON ? jqXHR.responseJSON.error : ''));
                    setStatus('Request failed');

                    $(getProjectsButtonElem).prop('disabled', false);
                },
                headers: {
                    'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                    'Accept': 'application/json'
                },
                method: 'GET',
                success: function (resp, textStatus, jqXHR) {
                    ga('send', 'event', gaCategory, 'Success GetApps');
                    setStatus('Retrieved apps');

                    $(getProjectsButtonElem).prop('disabled', false);
                    
                    try {
                        sessionStorage.setItem(sessionStorageKey, JSON.stringify(resp.applications));
                    }
                    catch(e) {
                        // Failed to save in storage, ignore error
                    }
                    applications = resp.applications;
                    loadApplications();
                },
                url: 'https://api.particle.io/v1/apps/'
            };

            $.ajax(request);
        });

        $(exportButtonElem).on('click', async function() {
            $(exportButtonElem).prop('disabled', true);

            let numSelected = 0;
            for(const checkboxElem of applicationCheckboxes) {
                if ($(checkboxElem).prop('checked')) {
                    numSelected++;
                }
            }

            setStatus('Preparing source file');

            const trackerAssetsDir = '/assets/files/tracker/'; 
            const vsCodeSettingsUrl = trackerAssetsDir + 'vscode.zip';
            const exportBaseName = 'export'; // .zip added to zip archive name
        
            const zipFs = new zip.fs.FS();

            let topDir = zipFs;
            if (numSelected != 1) {
                topDir = zipFs.addDirectory(exportBaseName);
            }

            let titles = [];
                    
            for(let ii = 0; ii < applications.length; ii++) {
                const app = applications[ii];
                const checkboxElem = applicationCheckboxes[ii];

                if ($(checkboxElem).prop('checked')) {
                    setStatus('Exporting ' + app.title);

                    let uniqueTitle = app.title;
                    let index = 1;
                    while (titles.includes(uniqueTitle)) {
                        uniqueTitle = app.title + '-' + index;
                    }
                    titles.push(uniqueTitle);
        
                    const zipFsAppDir = topDir.addDirectory(uniqueTitle);

                    const zipFsVsCodeDir = zipFsAppDir.addDirectory('.vscode');
                    await zipFsVsCodeDir.importHttpContent(vsCodeSettingsUrl);
        
                    const zipFsAppSrcDir = zipFsAppDir.addDirectory('src');

                    let hasProjectProperties = false;

                    for(const file of app.files) {
                        // title, content, extension, id
                        let name = file.title;
                        if (file.extension) {
                            name += '.' + file.extension;
                        }
                        if (name == 'project.properties') {
                            // This file goes in the top level of the project directory
                            zipFsAppDir.addText(file.title + '.' + file.extension, file.content);
                            hasProjectProperties = true;              
                        }
                        else {
                            zipFsAppSrcDir.addText(file.title + '.' + file.extension, file.content);                            
                        }
                    }

                    if (!hasProjectProperties) {
                        zipFsAppDir.addText('project.properties', '');
                    }

                    // console.log('app', app);
                }
            }
            const statusPrefix = 'Building zip archive (this will take a minute)...';

            setStatus(statusPrefix);
        
            const blob = await zipFs.exportBlob({
                level:0,
                onprogress:function(progress, max) {
                    if (max > 0) {
                        setStatus(statusPrefix + ' (' + Math.floor(progress * 100 / max) + ' %)');
                    }
                }
            });
        
            const outputFile = exportBaseName + '.zip';
            setStatus('Saving ' + outputFile + ' to Downloads...');
            saveAs(blob, outputFile);
        
            ga('send', 'event', gaCategory, 'Success', '');
        
            $(exportButtonElem).prop('disabled', false);
        });
    });
});
