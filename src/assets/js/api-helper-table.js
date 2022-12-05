
$(document).ready(function() {
    $('.apiHelperTable').each(function() {
        const thisPartial = $(this);

        const fieldSelectorDivElem = $(thisPartial).find('.fieldSelectorDiv');
        const exportOptionsDivElem = $(thisPartial).find('.exportOptionsDiv');
        const tableDivElem = $(thisPartial).find('.tableDiv');
        
        const downloadDivElem = $(thisPartial).find('.downloadDiv');
        const formatSelectElem = $(thisPartial).find('.formatSelect');
        const includeHeaderCheckboxElem = $(thisPartial).find('.includeHeaderCheckbox');
        const dateFormatSelectElem = $(thisPartial).find('.dateFormatSelect');
        const downloadButtonElem = $(thisPartial).find('.downloadButton');
        const copyButtonElem = $(thisPartial).find('.copyButton');

        const fieldSelectorElem = $(thisPartial).find('.apiHelperFieldSelector');

        let configObj;

        $(thisPartial).data('setConfigObj', function(configObjIn) {
            configObj = configObjIn;

            $(fieldSelectorElem).data('setConfigObj')(configObjIn);
        });

        $(thisPartial).data('getConfigObj', function() {
            return configObj;
        });

        $(thisPartial).data('getUrlConfigObj', function(resultObj) {
            $(fieldSelectorElem).data('getUrlConfigObj')(resultObj);

        });


        
        $(thisPartial).data('loadUrlParams', function(urlParams) {
            $(fieldSelectorElem).data('loadUrlParams')(urlParams);
        });

    });


    $('.apiHelperFieldSelector').each(function() {
        const thisPartial = $(this);

        const apiHelperTableElem = $(thisPartial).parents('.apiHelperTable');

        let configObj;

        const fieldSelectorTableDivElem = $(thisPartial).find('.fieldSelectorTableDiv');
        
        // console.log('configObj', configObj);
        console.log('load field selector');


        const refreshTable = function() {   
            // Trigger an event in the containing apiHelperTable element to refresh its table based on the 
            // field selector settings.
            $(apiHelperTableElem).trigger('fieldSelectorUpdate', [configObj]);
        };

        const moveField = function(fromKey, toKey, afterTarget) {
            let fromIndex = -1;
            let toIndex = -1;
            for(let ii = 0; ii < configObj.fields.length; ii++) {
                if (configObj.fields[ii].key == fromKey) {
                    fromIndex = ii;
                }
                if (configObj.fields[ii].key == toKey) {
                    toIndex = ii;
                }
            }

            if (fromIndex == toIndex || fromIndex < 0 || toIndex < 0) {
                return;
            }

            // Reorder items in the DOM
            $(configObj.fields[fromIndex].trElem).detach();
            if (afterTarget) {
                $(configObj.fields[toIndex].trElem).after(configObj.fields[fromIndex].trElem);

            }
            else {
                $(configObj.fields[toIndex].trElem).before(configObj.fields[fromIndex].trElem);

            }

            // Reorder items in array
            const fromArrayItem = configObj.fields[fromIndex];
            configObj.fields.splice(fromIndex, 1);
            if (toIndex > fromIndex) {
                toIndex--;
            }
            if (afterTarget) {
                toIndex++;
            }
            configObj.fields.splice(toIndex, 0, fromArrayItem);

            //console.log('fields', configObj.fields);
            refreshTable();
            
        };

        $(thisPartial).data('setConfigObj', function(configObjIn) {
            configObj = configObjIn;

            if (!configObj.fields || configObj.fields.length == 0) {
                return;
            }

            $(thisPartial).show();

            for(const field of configObj.fields) {
                if (!field.width) {
                    field.width = '10';
                }
            }


            const tableElem = document.createElement('table');
            {
                $(tableElem).addClass('apiHelperTableNoMargin');

                {
                    const theadElem = document.createElement('thead');
                    const trElem = document.createElement('tr');

                    {
                        // Drag to reorder
                        const thElem = document.createElement('th');
                        $(thElem).text('Reorder');
                        $(trElem).append(thElem);
                    }
                    {
                        const thElem = document.createElement('th');
                        $(thElem).text('Include');
                        $(trElem).append(thElem);
                    }
                    {
                        const thElem = document.createElement('th');
                        $(thElem).text('Column Name');
                        $(trElem).append(thElem);
                    }
                    {
                        const thElem = document.createElement('th');
                        $(thElem).text('Key');
                        $(trElem).append(thElem);
                    }
                    {
                        const thElem = document.createElement('th');
                        $(thElem).text('Width');
                        $(trElem).append(thElem);
                    }

                    $(theadElem).append(trElem);

                    $(tableElem).append(theadElem);
                }

                const tbodyElem = document.createElement('tbody');

                for(const field of configObj.fields) {
                    const trElem = field.trElem = document.createElement('tr');

                    let tdElem;

                    // Drag icon
                    tdElem = document.createElement('td');
                    $(tdElem).attr('style', 'vertical-align: middle !important');
                    const imgElem = document.createElement('img');
                    $(imgElem).attr('src', '/assets/images/drag-handle-black.png');
                    $(imgElem).attr('width', '20');
                    $(imgElem).attr('height', '20');
                    $(imgElem).attr('style', 'margin:0px !important');
                    $(imgElem).attr('draggable', 'true');
                    $(imgElem).on('dragstart', function(ev) {
                        ev.originalEvent.dataTransfer.setData('text', field.key);
                    });
                    $(tdElem).append(imgElem);
                    trElem.append(tdElem);

                    // Checkbox
                    tdElem = document.createElement('td');
                    $(tdElem).attr('style', 'vertical-align: middle !important');

                    const checkboxElem = document.createElement('input');
                    $(checkboxElem).prop('type', 'checkbox');
                    if (field.checked) {
                        $(checkboxElem).prop('checked', 'checked');
                    }
                    $(checkboxElem).on('click', function() {
                        refreshTable();
                    });
                    $(tdElem).append(checkboxElem);
                    trElem.append(tdElem);

                    field.isChecked = function() {
                        return $(checkboxElem).prop('checked');
                    };

                    // Field Name
                    tdElem = document.createElement('td');
                    $(tdElem).attr('style', 'vertical-align: middle !important');

                    const titleInputElem = document.createElement('input');
                    $(titleInputElem).attr('type', 'text');
                    $(titleInputElem).attr('value', field.customTitle ? field.customTitle : field.title);
                    $(titleInputElem).on('blur', function() {
                        field.customTitle = $(titleInputElem).val();
                        refreshTable();
                    });
                    $(tdElem).append(titleInputElem);
                    trElem.append(tdElem);

                    // Key
                    tdElem = document.createElement('td');
                    $(tdElem).attr('style', 'vertical-align: middle !important');
                    $(tdElem).text(field.key);
                    $(tdElem).on('click', function() {
                        $(checkboxElem).trigger('click');
                    });
                    trElem.append(tdElem);

                    // Width
                    tdElem = document.createElement('td');
                    const widthInputElem = document.createElement('input');
                    $(widthInputElem).attr('type', 'text');
                    $(widthInputElem).attr('value', field.customWidth ? field.customWidth : field.width); 
                    $(widthInputElem).attr('size', '5'); 
                    $(widthInputElem).on('blur', function() {
                        field.customWidth = $(widthInputElem).val();                    
                        refreshTable();
                    });
                    $(tdElem).append(widthInputElem);
                    trElem.append(tdElem);


                    $(trElem).on('dragover', function(ev) {
                        const key = ev.originalEvent.dataTransfer.getData("text");                    
                        if (key != field.key) {
                            ev.preventDefault();
                        }
                    });
                    $(trElem).on('drop', function(ev) {
                        const key = ev.originalEvent.dataTransfer.getData("text");                    
                        console.log('ev', ev);

                        const targetClientHeight = ev.currentTarget.clientHeight;
                        const afterTarget = (ev.originalEvent.offsetY >= (targetClientHeight / 2));

                        moveField(key, field.key, afterTarget);
                    });
        

                    $(tbodyElem).append(trElem);
                }

                $(tableElem).append(tbodyElem);
            }

            $(fieldSelectorTableDivElem).html(tableElem);
        
        });

        $(thisPartial).data('getConfigObj', function() {
            return configObj;
        });

        $(thisPartial).data('getUrlConfigObj', function(resultObj) {
            let index = 0;

            for(const field of configObj.fields) {

                resultObj['k' + index] = (field.isChecked() ? '*' : '') + field.key;
                    
                if (field.customTitle && field.customTitle != field.title) {
                    resultObj['t' + index] = field.customTitle;
                }

                if (field.customWidth && field.customWidth != field.width) {
                    resultObj['w' + index] = field.customWidth;
                }

                index++;
            }
        });


        
        $(thisPartial).data('loadUrlParams', function(urlParams) {
            if (!urlParams.has('k0')) {
                return;
            }
            let newFields = [];

            for(let index = 0; ; index++) {
                let key = urlParams.get('k' + index);
                if (!key) {
                    break;
                }
                let checked = false;    
                if (key.startsWith('*')) {
                    checked = true;
                    key = key.substring(1);
                }

                const field = configObj.fields.find(f => f.key == key);
                if (field) {
                    field.checked = checked;
                    const customTitle = urlParams.get('t' + index);
                    if (customTitle) {
                        field.customTitle = customTitle;
                    }
                    const customWidth = urlParams.get('w' + index);
                    if (customWidth) {
                        field.customWidth = customWidth;
                    }
                    newFields.push(field);
                }
            }

            for(const field of configObj.fields) {
                const inNew = !!newFields.find(f => f.key == field.key);
                if (!inNew) {
                    field.checked = false;
                    newFields.push(field);
                }
            }

            configObj.fields = newFields;                
        });


    });

});
