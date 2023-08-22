

$(document).ready(function() {
    // auth not required

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

    gtag('event', 'Success', {'event_category':'Tracker Edge Download', 'event_label':project});

    options.next();
}


