
$(document).ready(function() {
    $('.apiHelperTable').each(function() {
        const thisPartial = $(this);

        const fieldSelectorDivElem = $(thisPartial).find('.fieldSelectorDiv');
        const exportOptionsDivElem = $(thisPartial).find('.exportOptionsDiv');
        const tableDivElem = $(thisPartial).find('.tableDiv');
        const tableHeadElem = $(tableDivElem).find('thead');
        const tableBodyElem = $(tableDivElem).find('tbody');
        

        const downloadDivElem = $(thisPartial).find('.downloadDiv');
        const formatSelectElem = $(thisPartial).find('.formatSelect');
        const includeHeaderCheckboxElem = $(thisPartial).find('.includeHeaderCheckbox');
        const dateFormatSelectElem = $(thisPartial).find('.dateFormatSelect');
        const downloadButtonElem = $(thisPartial).find('.downloadButton');
        const copyButtonElem = $(thisPartial).find('.copyButton');

        const fieldSelectorElem = $(thisPartial).find('.apiHelperFieldSelector');

        let configObj;
        let tableData;

        $(thisPartial).data('getOptions', function(options) {
            // Download format options
            options.format = $(formatSelectElem).val();
            options.header = $(includeHeaderCheckboxElem).prop('checked');
            options.dateFormat = $(dateFormatSelectElem).val();

            $(copyButtonElem).prop('disabled', (options.format == 'xlsx'));

        });
        
        $(thisPartial).data('setConfigObj', function(configObjIn) {
            configObj = configObjIn;

            $(fieldSelectorElem).data('setConfigObj')(configObjIn);


            if (configObj.exportOptions) {
                console.log('exportOptions', configObj.exportOptions);

                // showControl (boolean)
                // showDateOptions (boolean)
                // additionalFormats (array)

                if (configObj.exportOptions.showControl) {
                    $(exportOptionsDivElem).show();   
                }

                for(const obj of configObj.exportOptions.additionalFormats) {
                    const optionElem = document.createElement('option');
                    $(optionElem).attr('value', obj.key);
                    $(optionElem).text(obj.title);
                    $(formatSelectElem).append(optionElem);
                }
            }
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

        $(thisPartial).data('clearList', function() {
            $(tableBodyElem).empty();
            $(tableDivElem).hide();
            $(downloadDivElem).hide();
        });

        $(thisPartial).data('refreshTable', function(tableDataIn, options) {
            tableData = tableDataIn;
            console.log('tableData', tableData);

            $(tableHeadElem).html('');
            {
                const rowElem = document.createElement('tr');
                let col = 0;
                for(const title of tableData.titles) {
                    const thElem = document.createElement('th');
                    $(thElem).text(title);
                    $(rowElem).append(thElem);
                }
                $(tableHeadElem).append(rowElem);
            }
    
            $(tableBodyElem).html('');
    
            if (tableData.data) {
                $(downloadDivElem).show();
    
                for(const d of tableData.data) {
                    const rowElem = document.createElement('tr');
    
                    for(let col = 0; col < tableData.keys.length; col++) {
                        const key = tableData.keys[col];
    
                        const tdElem = document.createElement('td');
                        $(tdElem).css('width', tableData.widths[col] + 'ch');
        
                        if (d[key]) {
                            $(tdElem).text(d[key]);
                        }
        
                        $(rowElem).append(tdElem);
                    }
    
                    $(tableBodyElem).append(rowElem);
    
                }
            }
            else {
                $(downloadDivElem).hide();
            }
        });


        const getXlsxData = async function(options) {
            console.log('getXlsxData options', options);
            if (!options) {
                options = {};
            }
            if (!options.sheetName) {
                options.sheetName = 'Devices';
            }
            let xlsxData = {};

            xlsxData.options = {};
            $(thisPartial).data('getOptions')(xlsxData.options);

            xlsxData.configObj = $(thisPartial).data('getConfigObj')();

            xlsxData.options.convertDates = (xlsxData.options.dateFormat != 'iso');
            xlsxData.options.export = true;

            console.log('getXlsxData tableData', tableData);
            xlsxData.tableData = tableData;

            let conversionOptions = {
                header: xlsxData.tableData.keys
            };
            if (!xlsxData.options.header) {
                conversionOptions.skipHeader = true;
            }
            if (xlsxData.options.dateFormat != 'iso') {
                conversionOptions.dateNF = xlsxData.options.dateFormat;
            }

            if (!options.fileName) {
                switch(xlsxData.options.format) {
                    case 'deviceId':
                        options.fileName = 'devices.txt';
                        conversionOptions.skipHeader = true;
                        break;

                    case 'iccid':
                        options.fileName = 'iccids.txt';
                        conversionOptions.skipHeader = true;
                        break;

                    default:
                        options.fileName = 'devices.' + xlsxData.options.format;
                        break;
                }
            }
            let stats = {
                format: xlsxData.options.format,
                cols: xlsxData.tableData.keys.length,
                count: xlsxData.tableData.data.length
            };


            xlsxData.worksheet = XLSX.utils.json_to_sheet(xlsxData.tableData.data, conversionOptions);

            xlsxData.workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(xlsxData.workbook, xlsxData.worksheet, options.sheetName);

            if (xlsxData.options.header) {
                XLSX.utils.sheet_add_aoa(xlsxData.worksheet, [xlsxData.tableData.titles], { origin: "A1" });
            }

            // Columns widths
            if (!xlsxData.worksheet['!cols']) {
                xlsxData.worksheet['!cols'] = [];
            }
            for(let ii = 0; ii < xlsxData.tableData.widths.length; ii++) {
                if (!xlsxData.worksheet['!cols'][ii]) {
                    xlsxData.worksheet['!cols'][ii] = {};
                }
                xlsxData.worksheet['!cols'][ii].wch = xlsxData.tableData.widths[ii];
            }

            switch(xlsxData.options.format) {
                case 'xlsx':
                    // toFile/toClipboard is ignored; cannot create 
                    XLSX.writeFile(xlsxData.workbook, options.fileName);
                    if (configObj.gaCategory) {
                        ga('send', 'event', configObj.gaCategory, 'Download', JSON.stringify(stats));
                    }
                    break;

                case 'deviceId':
                case 'iccid':
                case 'csv':
                    xlsxData.textOut = XLSX.utils.sheet_to_csv(xlsxData.worksheet);
                    break;

                case 'tsv':
                    xlsxData.textOut = XLSX.utils.sheet_to_csv(xlsxData.worksheet, {FS:'\t'});
                    break;
            }
            if (xlsxData.textOut) {
                if (options.toClipboard) {
                    var t = document.createElement('textarea');
                    document.body.appendChild(t);
                    $(t).text(xlsxData.textOut);
                    t.select();
                    document.execCommand("copy");
                    document.body.removeChild(t);

                    if (configObj.gaCategory) {
                        ga('send', 'event', configObj.gaCategory, 'Clipboard', JSON.stringify(stats));
                    }
                }
                if (options.toFile) {
                    let blob = new Blob([xlsxData.textOut], {type:'text/' + xlsxData.options.format});
                    saveAs(blob, options.fileName);	        
                    if (configObj.gaCategory) {
                        ga('send', 'event', configObj.gaCategory, 'Download', JSON.stringify(stats));
                    }
                }
            }

            return xlsxData;
        }

        console.log('registering button handlers', thisPartial);

        $(downloadButtonElem).on('click', async function() {
            console.log('download button');
            await getXlsxData({toFile: true});

        });

        $(copyButtonElem).on('click', async function(event) {
            console.log('copy button');
            await getXlsxData({toClipboard: true});
            
        });

        $(formatSelectElem).on('change', function() {
            $(thisPartial).trigger('updateSearchParam');
        });
        $(dateFormatSelectElem).on('change', function() {
            $(thisPartial).trigger('updateSearchParam');
        });

        $(includeHeaderCheckboxElem).on('click', function() {
            $(thisPartial).trigger('updateSearchParam');
        });

        /*
        $(thisPartial).on('fieldSelectorUpdate', async function(event, config) {
            await refreshTable(config);
            $(thisPartial).trigger('updateSearchParam');
        });
*/
    });


    $('.apiHelperFieldSelector').each(function() {
        const thisPartial = $(this);

        const apiHelperTableElem = $(thisPartial).parents('.apiHelperTable');

        let configObj;

        const fieldSelectorTableDivElem = $(thisPartial).find('.fieldSelectorTableDiv');
        
        // console.log('configObj', configObj);


        const refreshTable = function() {   
            // Trigger an event in the containing apiHelperTable element to refresh its table based on the 
            // field selector settings.
            $(apiHelperTableElem).trigger('fieldSelectorUpdate', [configObj]);
        };

        const moveField = function(fromKey, toKey, afterTarget) {
            let fromIndex = -1;
            let toIndex = -1;
            for(let ii = 0; ii < configObj.fieldSelector.fields.length; ii++) {
                if (configObj.fieldSelector.fields[ii].key == fromKey) {
                    fromIndex = ii;
                }
                if (configObj.fieldSelector.fields[ii].key == toKey) {
                    toIndex = ii;
                }
            }

            if (fromIndex == toIndex || fromIndex < 0 || toIndex < 0) {
                return;
            }

            // Reorder items in the DOM
            $(configObj.fieldSelector.fields[fromIndex].trElem).detach();
            if (afterTarget) {
                $(configObj.fieldSelector.fields[toIndex].trElem).after(configObj.fieldSelector.fields[fromIndex].trElem);

            }
            else {
                $(configObj.fieldSelector.fields[toIndex].trElem).before(configObj.fieldSelector.fields[fromIndex].trElem);

            }

            // Reorder items in array
            const fromArrayItem = configObj.fieldSelector.fields[fromIndex];
            configObj.fieldSelector.fields.splice(fromIndex, 1);
            if (toIndex > fromIndex) {
                toIndex--;
            }
            if (afterTarget) {
                toIndex++;
            }
            configObj.fieldSelector.fields.splice(toIndex, 0, fromArrayItem);

            //console.log('fields', configObj.fieldSelector.fields);
            refreshTable();
            
        };

        $(thisPartial).data('setConfigObj', function(configObjIn) {
            configObj = configObjIn;

            if (!configObj.fieldSelector.fields || configObj.fieldSelector.fields.length == 0) {
                return;
            }
            if (!configObj.fieldSelector || !configObj.fieldSelector.showControl) {
                return;
            }

            $(thisPartial).show();

            for(const field of configObj.fieldSelector.fields) {
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

                for(const field of configObj.fieldSelector.fields) {
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
            if (!configObj.fieldSelector || !configObj.fieldSelector.showControl) {
                return;
            }

            let index = 0;

            for(const field of configObj.fieldSelector.fields) {

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
            if (!configObj.fieldSelector || !configObj.fieldSelector.showControl) {
                return;
            }

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

                const field = configObj.fieldSelector.fields.find(f => f.key == key);
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

            for(const field of configObj.fieldSelector.fields) {
                const inNew = !!newFields.find(f => f.key == field.key);
                if (!inNew) {
                    field.checked = false;
                    newFields.push(field);
                }
            }

            configObj.fieldSelector.fields = newFields;                
        });


    });

});
