

$(document).ready(function() {
    // auth not required for apiHelperTrackerEdge

    if ($('.apiHelperTrackerEdge').each(function() {
        const thisPartial = $(this);

        const setStatus = function(status) {
            $(thisPartial).find('.apiHelperTrackerEdgeStatus').html(status);
        };

        const menuElem = $(thisPartial).find('.apiHelperTrackerEdgeVersion');

        fetch('/assets/files/tracker/trackerEdgeVersions.json')
            .then(response => response.json())
            .then(function(res) {
                let versions = Array.isArray(res) ? res : res.versions; // Older file was a top level array
                for(const obj of versions) {
                    const optionElem = document.createElement('option');

                    $(optionElem).attr('value', obj.v);
                    $(optionElem).text(obj.title);

                    $(menuElem).append(optionElem);
                }
            });

        $(thisPartial).find('.apiHelperTrackerEdgeDownload').on('click', function() {
            const thisButton = $(this);
            $(thisButton).attr('disabled', 'disabled');   

            let options = {
                version: $(thisPartial).find('.apiHelperTrackerEdgeVersion').val(),
                main: $(thisPartial).attr('data-main'),
                project: $(thisPartial).attr('data-project'),
                libraries: $(thisPartial).attr('data-libraries'),
                src: $(thisPartial).attr('data-src'),
                setStatus: setStatus,
                next: function() {
                    $(thisButton).removeAttr('disabled');
                    setStatus('')
                }
            };


            buildTrackerDownload(options);
        });
    }));

    // The following items require auth
    if (!apiHelper || !apiHelper.auth) {
        return;
    }

    if ($('.apiHelperEdgeFirmware').each(function() {
        const thisPartial = $(this);

        const setStatus = function(status) {
            $(thisPartial).find('.apiHelperEdgeFirmwareStatus').text(status);
        };

        const apiHelperEdgeVersionSelectElem = $(thisPartial).find('.apiHelperEdgeVersionSelect');
        const edgeTargetVersionElem = $(thisPartial).find('.edgeTargetVersion');
        const edgeSchemaVersionElem = $(thisPartial).find('.edgeSchemaVersion');
        const edgeReleaseNotesElem = $(thisPartial).find('.edgeReleaseNotes');
        const productFirmwareVersionsElem = $(thisPartial).find('.productFirmwareVersions');

        // const Elem = $(thisPartial).find('.');

        let settings = {};

        settings.options = $(thisPartial).data('options').split(',');

        settings.versionsFile = '/assets/files/tracker/';
        if (settings.options.includes('monitor')) {
            settings.versionsFile += 'monitorEdgeVersions.json';
        }
        else
        if (settings.options.includes('tracker')) {
            settings.versionsFile += 'trackerEdgeVersions.json';            
        }
        else {
            console.log('options do not specify edge kind');
            return;
        }

        const loadVersionInfo = function() {
            const version = parseInt($(apiHelperEdgeVersionSelectElem).val());
            const obj = settings.versionsJson.versions.find(e => e.version == version);
            console.log('obj', obj);

            $(edgeTargetVersionElem).text(obj.target);
            if (obj.schemaVersion) {
                $(edgeSchemaVersionElem).text(obj.schemaVersion.toString());
            }
            else {
                $(edgeSchemaVersionElem).text('Not available');
            }
            if (obj.releaseNotes) {
                $(edgeReleaseNotesElem).text(obj.releaseNotes);
            }
        }
        $(apiHelperEdgeVersionSelectElem).on('change', loadVersionInfo);

        $('.apiHelperTrackerProductSelect').on('change', async function() {
            let productId = $(thisPartial).find('.apiHelperTrackerProductSelect').val();
            console.log('productId=' + productId);

            const firmwareRes = await apiHelper.particle.listProductFirmware({ 
                product: productId,
                auth: apiHelper.auth.access_token 
            });

            console.log('firmwareRes', firmwareRes);


            $(productFirmwareVersionsElem).empty();
            for(const v of firmwareRes.body) {
                const trElem = document.createElement('tr');

                {
                    const tdElem = document.createElement('td');
                    $(tdElem).text(v.version.toString());
                    $(trElem).append(tdElem);
                }
                {
                    const tdElem = document.createElement('td');
                    $(tdElem).html(v.product_default ? '&check;' : '&nbsp;');
                    $(trElem).append(tdElem);
                }
                {
                    const tdElem = document.createElement('td');
                    $(tdElem).text(v.title);
                    $(trElem).append(tdElem);
                }
                {
                    const tdElem = document.createElement('td');
                    $(tdElem).text(v.description.replace(/#+/, ' ').replace('\n', ' ').substring(0, 50));
                    $(trElem).append(tdElem);
                }
                {
                    const tdElem = document.createElement('td');
                    $(tdElem).text(v.uploaded_on.substring(0, 10));
                    $(trElem).append(tdElem);
                }

                $(productFirmwareVersionsElem).append(trElem);
            }

        });

        fetch(settings.versionsFile)
            .then(response => response.json())
            .then(function(res) {
                console.log(settings.versionsFile, res);
                settings.versionsJson = res;


                for(const v of settings.versionsJson.versions) {
                    const optionElem = document.createElement('option');
                    $(optionElem).text(v.title);
                    $(optionElem).attr('value', v.version.toString());
                    $(apiHelperEdgeVersionSelectElem).append(optionElem);
                }

                loadVersionInfo();

                /*
                "v": "v2",
                "title": "Monitor Edge Firmware v2",
                "releaseNotes": "# Monitor Edge v2 Release\r\nBuilt against device OS 4.2.0\r\n\r\n### COMPATIBILTY\r\n\r\nMust be built using device OS v4.0.2 or greater.\r\n\r\n### FEATURES\r\n\r\n- Added Modbus RTU client library\r\n- Added configurable Modbus polling for three devices\r\n\r\n### ENHANCEMENTS\r\n\r\n- Updated compile actions to build with the latest device OS releases for 4.x and 5.x\r\n- Included *.def file patterns for cloud compiles to pick up Memfault includes\r\n\r\n### BUGFIXES\r\n\r\n- Fixed an outdated reset pin assignment to an interrupt pin\r\n",
                "bin": "monitor-edge-2@4.2.0.bin",
                "version": 2,
                "zip": "monitor-edge-2.zip",
                "target": "4.2.0",
                "schemaVersion": 2,
                "filename": "monitor-config-schema-2.json"
                */
            });

                
    }));
});


async function buildTrackerDownload(options) {
    const project = options.project || 'tracker-edge';

    const trackerAssetsDir = '/assets/files/tracker/'; 
    const trackerEdgeUrl = trackerAssetsDir + options.version + '.zip';
    const vsCodeSettingsUrl = trackerAssetsDir + 'vscode.zip';

    // https://gildas-lormeau.github.io/zip.js/fs-api.html
    const zipFs = new zip.fs.FS();

    options.setStatus('Getting tracker edge source...')
    await zipFs.importHttpContent(trackerEdgeUrl);

    let zipFsTrackerDir = zipFs.find('tracker-edge');
    zipFsTrackerDir.name = project;

    const zipFsVsCodeDir = zipFsTrackerDir.addDirectory('.vscode');
    await zipFsVsCodeDir.importHttpContent(vsCodeSettingsUrl);

    if (options.version == 'v18') {
        const incResp = await fetch(trackerAssetsDir + 'particle.include');
        const incBlob = await incResp.blob();

        zipFsTrackerDir.addBlob('particle.include', incBlob);
    }

    const srcDir = zipFs.find(zipFsTrackerDir.getFullname() + '/src');

    if (options.main) {
        const oldMain = zipFs.find(zipFsTrackerDir.getFullname() + '/src/main.cpp');
        zipFs.remove(oldMain);

        await srcDir.addHttpContent('main.cpp', options.main);
    }

    if (options.src) {
        for(const src of options.src.split(' ')) {
            let name;
            const lastSlashIndex = src.lastIndexOf('/');
            if (lastSlashIndex > 0) {
                name = src.substr(lastSlashIndex + 1);
            }
            else {
                name = src;
            }
            
            await srcDir.addHttpContent(name, src);
        }
    }

    if (options.libraries) {
        const projectPropertiesEntry = zipFs.find(zipFsTrackerDir.getFullname() + '/project.properties');
        
        const depBlobResp = await fetch(options.libraries);
        const depBlob = await depBlobResp.blob();

        const projectPropertiesBlob = await projectPropertiesEntry.getBlob();
        
        const newProjectPropertiesBlob = new Blob([projectPropertiesBlob, depBlob], {type : 'text/plain'});

        projectPropertiesEntry.replaceBlob(newProjectPropertiesBlob);
    }
    
    const statusPrefix = 'Building zip archive (this will take a minute)...';

    options.setStatus(statusPrefix);

    const blob = await zipFs.exportBlob({
        level:0,
        onprogress:function(progress, max) {
            if (max > 0) {
                options.setStatus(statusPrefix + ' (' + Math.floor(progress * 100 / max) + ' %)');
            }
        }
    });

    const outputFile = project + '.zip';
    options.setStatus('Saving ' + outputFile + ' to Downloads...');
    saveAs(blob, outputFile);

    analytics.track('Success', {category:'Tracker Edge Download', label:project});

    options.next();
}


