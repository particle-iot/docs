$(document).ready(function () {

    $('.stackblitz').each(function() {
        const thisElem = $(this);

        const projectId = $(thisElem).attr('data-project');
        
        $(thisElem).find('button').on('click', function() {

            const options = {
                openFile: 'index.js',
                hideNavigation: true,
                hideDevTools: false,
                devToolsHeight: 33,
            };

            StackBlitzSDK.openProjectId(projectId, options);
        });  
    });
});
