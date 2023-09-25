
$(document).ready(function() {
    $('.apiHelperTable').each(function() {
        const thisPartial = $(this);

        const exportOptionsDivElem = $(thisPartial).find('.exportOptionsDiv');
        const tableDivElem = $(thisPartial).find('.tableDiv');
        const tableHeadElem = $(tableDivElem).find('thead');
        const tableBodyElem = $(tableDivElem).find('tbody');
        

        const downloadDivElem = $(thisPartial).find('.downloadDiv');
        const formatSelectElem = $(thisPartial).find('.formatSelect');
        const includeHeaderCheckboxElem = $(thisPartial).find('.includeHeaderCheckbox');
        const omitEmptyCheckboxElem = $(thisPartial).find('.omitEmptyCheckbox');
        const dateFormatSelectElem = $(thisPartial).find('.dateFormatSelect');
        const downloadButtonElem = $(thisPartial).find('.downloadButton');
        const copyButtonElem = $(thisPartial).find('.copyButton');

        const fieldSelectorElem = $(thisPartial).find('.apiHelperFieldSelector');


        const tableObj = {
        };
        $(thisPartial).data('table', tableObj);



        tableObj.getOptions = function(options) {
            // Download format options
            options.format = $(formatSelectElem).val();
            options.header = $(includeHeaderCheckboxElem).prop('checked');
            options.dateFormat = $(dateFormatSelectElem).val();
            if (tableObj.sort) {
                if (tableObj.sort.sortBy) {
                    options.sortBy = tableObj.sort.sortBy;
                    if (tableObj.sort.sortDir) {
                        options.sortDir = tableObj.sort.sortDir;
                    }
                    $(omitEmptyCheckboxElem).prop('disabled', false);
                    options.omitEmpty = $(omitEmptyCheckboxElem).prop('checked');
                }
                else {
                    $(omitEmptyCheckboxElem).prop('disabled', true);
                    options.omitEmpty = false;    
                }
            }

            $(copyButtonElem).prop('disabled', !tableObj.tableData || !tableObj.tableData.data || (options.format == 'xlsx'));
        }
        
        tableObj.setConfig = function(configObjIn) {
            tableObj.tableConfig = configObjIn;
            tableObj.sort = {
                indicatorElements: {},
                rowElems: [],
                // sortBy
                // sortDir
            };
            
            tableObj.fieldSelectorObj = $(fieldSelectorElem).data('fieldSelector');
            tableObj.fieldSelectorObj.setConfigObj(configObjIn);

            if (tableObj.tableConfig.exportOptions) {

                // showControl (boolean)
                // showDateOptions (boolean)
                // additionalFormats (array)

                if (tableObj.tableConfig.exportOptions.showControl) {
                    $(exportOptionsDivElem).show();   
                }

                if (tableObj.tableConfig.exportOptions.additionalFormats) {
                    for(const obj of tableObj.tableConfig.exportOptions.additionalFormats) {
                        const optionElem = document.createElement('option');
                        $(optionElem).attr('value', obj.key);
                        $(optionElem).text(obj.title);
                        $(formatSelectElem).append(optionElem);
                    }    
                }
            }
            if (tableObj.tableConfig.tableOptions) {
                if (tableObj.tableConfig.tableOptions.showAlways) {
                    $(tableDivElem).show();
                }
            }
        }

        tableObj.getUrlConfigObj = function(resultObj) {
            let options = {};
            tableObj.getOptions(options);

            resultObj.format = options.format;
            resultObj.header = options.header;
            resultObj.dateFormat = options.dateFormat;
            resultObj.sortBy = options.sortBy;
            resultObj.sortDir = options.sortDir;
            resultObj.omitEmpty = options.omitEmpty;

            tableObj.fieldSelectorObj.getUrlConfigObj(resultObj);            
        }


        
        tableObj.loadUrlParams = function(urlParams) {
            tableObj.fieldSelectorObj.loadUrlParams(urlParams);

            let value = urlParams.get('format');
            if (value) {
                $(formatSelectElem).val(value);
            }
            value = urlParams.get('header');
            if (value !== null) {
                $(includeHeaderCheckboxElem).prop('checked', !!value);   
            }
            value = urlParams.get('dateFormat');
            if (value) {
                $(dateFormatSelectElem).val(value);
            }
                
            value = urlParams.get('sortBy');
            if (value) {
                tableObj.sort.sortBy = value;
            }

            value = urlParams.get('sortDir');
            if (value) {
                tableObj.sort.sortDir = parseInt(value);
            }

            value = urlParams.get('omitEmpty');
            if (value !== null) {
                $(omitEmptyCheckboxElem).prop('checked', !!value);   
            }
        }

        tableObj.clearList = function() {
            $(tableBodyElem).empty();
            $(tableDivElem).hide();
            $(downloadDivElem).hide();
            $(downloadButtonElem).attr('disabled', true);
            $(copyButtonElem).attr('disabled', true);
        };

        const getTableFormat = function(options) {
            if (!options) {
                options = {};
                tableObj.getOptions(options);
            }

            let tableFormat  = {
                keys:[],
                titles:[],
                widths:[],
            };

            let tableKeysOverride;
            if (tableObj.tableConfig.tableKeysOverride) {
                tableKeysOverride = tableObj.tableConfig.tableKeysOverride(options);
            }
            if (tableKeysOverride) {
                for(const key of tableKeysOverride) {
                    tableFormat.keys.push(key);
                    for(const field of tableObj.tableConfig.fieldSelector.fields) {
                        if (field.key == key) {
                            tableFormat.titles.push(field.customTitle ? field.customTitle : field.title);
                            tableFormat.widths.push(parseInt(field.customWidth ? field.customWidth : field.width));
                            break;    
                        }
                    }
                }
            }
            else {
                for(const field of tableObj.tableConfig.fieldSelector.fields) {
                    if (!tableObj.tableConfig.fieldSelector.showControl || field.isChecked()) {
                        tableFormat.keys.push(field.key);
                        tableFormat.titles.push(field.customTitle ? field.customTitle : field.title);
                        tableFormat.widths.push(parseInt(field.customWidth ? field.customWidth : field.width));
                    }
                }  
            }
            return tableFormat;
        }

        tableObj.sortBy = function(key) {
            let options = {};
            tableObj.getOptions(options);

            if (key) {
                if (key == tableObj.sort.sortBy) {
                    // Change direction
                    tableObj.sort.sortDir = -tableObj.sort.sortDir;
                }
                else {
                    // Change sort criteria
                    tableObj.sort.sortBy = key;
                    tableObj.sort.sortDir = 1;
                }    
                $(thisPartial).trigger('updateSearchParam');
            }
            else {
                key = tableObj.sort.sortBy;
            }

            let sortDirStr;
            if (tableObj.sort.sortDir < 0) {
                sortDirStr = 'ion-chevron-down';
            }
            else {
                sortDirStr = 'ion-chevron-up';
            }

            $(tableHeadElem).find('.sortDirection').removeClass('ion-chevron-up').removeClass('ion-chevron-down');
            $(tableObj.sort.indicatorElements[key]).addClass(sortDirStr);

            tableObj.sort.rows = [];
            for(let ii = 0; ii < tableObj.tableData.data.length; ii++) {
                if (!options.omitEmpty || tableObj.tableData.data[ii][key]) {
                    tableObj.sort.rows.push(ii);
                }
            }

            tableObj.sort.rows.sort(function(a, b) {
                let sort = 0;

                if (!tableObj.tableData.data[a][key] && tableObj.tableData.data[b][key]) {
                    sort = -1;
                }
                else
                if (tableObj.tableData.data[a][key] && !tableObj.tableData.data[b][key]) {
                    sort = 1;
                }
                else
                if (!tableObj.tableData.data[a][key] && !tableObj.tableData.data[b][key]) {
                    sort = 0;
                }
                else {
                    sort = tableObj.tableData.data[a][key].localeCompare(tableObj.tableData.data[b][key]);
                }
                
                if (tableObj.sort.sortDir < 0) {
                    sort = -sort;
                }

                return sort;
            });          

            $(tableBodyElem).empty();
            for(let ii = 0; ii < tableObj.sort.rows.length; ii++) {
                $(tableBodyElem).append(tableObj.sort.rowElems[tableObj.sort.rows[ii]]);    
            }
        };

    
        tableObj.addRow = function(obj, options = {}) {
            if (!tableObj.sort.rowElems) {
                tableObj.sort.rowElems = [];
            }

            const rowElem = document.createElement('tr');

            const tableFormat = getTableFormat(options);

            for(let col = 0; col < tableFormat.keys.length; col++) {
                const key = tableFormat.keys[col];

                const tdElem = document.createElement('td');
                $(tdElem).css('width', tableFormat.widths[col] + 'ch');

                if (obj[key]) {
                    $(tdElem).text(obj[key]);
                }

                $(rowElem).append(tdElem);
            }

            $(tableBodyElem).append(rowElem);
            tableObj.sort.rowElems.push(rowElem);
            
            if (options.addToTableData) {
                if (!tableObj.tableData) {
                    tableObj.tableData = {};
                }
                if (!tableObj.tableData.data) {
                    tableObj.tableData.data = [];
                }
                tableObj.tableData.data.push(obj);
            }

            if (options.sort) {
                if (tableObj.sort.sortBy) {
                    tableObj.sortBy();
                }    
            }


            $(downloadButtonElem).attr('disabled', false);
            $(copyButtonElem).attr('disabled', (options.format == 'xlsx'));    

        }

        tableObj.addRows = function(array, options) {
        
            for(const obj of array) {
                tableObj.addRow(obj, options);
            }
        }

        tableObj.refreshTable = function(tableDataIn, options = {}) {
            if (tableDataIn) {
                tableObj.tableData = tableDataIn;
            }

            const tableFormat = getTableFormat(options);

            $(tableHeadElem).empty();
            {
                const rowElem = document.createElement('tr');
                let col = 0;
                for(let ii = 0; ii < tableFormat.titles.length; ii++) {
                    const title = tableFormat.titles[ii];
                    const key = tableFormat.keys[ii];

                    const thElem = document.createElement('th');
                    $(thElem).append(document.createTextNode(title + ' '));

                    const iElem = document.createElement('i');
                    $(iElem).addClass('sortDirection');
                    $(thElem).append(iElem);
                    tableObj.sort.indicatorElements[key] = iElem;
                    
                    $(rowElem).append(thElem);

                    $(thElem).on('click', function() {
                        tableObj.sortBy(key);                    
                    });
                }
                $(tableHeadElem).append(rowElem);
            }
    
            $(tableBodyElem).empty();
    
            if (tableObj.tableData.data) {
                $(tableDivElem).show();
                $(downloadDivElem).show();
                if (tableObj.tableConfig.exportOptions && tableObj.tableConfig.exportOptions.showControl) {
                    $(exportOptionsDivElem).show();   
                }

                tableObj.sort.rowElems = [];

                for(const d of tableObj.tableData.data) {
                    tableObj.addRow(d, options);
                }
            }
            else {
                $(downloadDivElem).hide();
                $(exportOptionsDivElem).hide();   
                $(downloadButtonElem).attr('disabled', true);
                $(copyButtonElem).attr('disabled', true);
            }
            if (tableObj.sort.sortBy) {
                tableObj.sortBy();
            }
        }


        tableObj.getXlsxData = async function(options) {
            if (!options) {
                options = {};
            }
            if (!options.sheetName) {
                options.sheetName = 'Devices';
            }
            let xlsxData = {};

            xlsxData.options = {};
            tableObj.getOptions(xlsxData.options);

            xlsxData.configObj = tableObj.tableConfig;

            xlsxData.options.convertDates = (xlsxData.options.dateFormat != 'iso');
            xlsxData.options.export = true;

            xlsxData.tableFormat = getTableFormat(xlsxData.options);
            xlsxData.tableData = {
                data: [],
            };
            
            for(let ii = 0; ii < tableObj.tableData.data.length; ii++) {
                const obj = tableObj.sort.rows ? tableObj.tableData.data[tableObj.sort.rows[ii]] : tableObj.tableData.data[ii];

                const filteredObj = {};
                for(const key of xlsxData.tableFormat.keys) {
                    filteredObj[key] = obj[key];
                }
                if (tableObj.tableConfig.filterData) {
                    if (tableObj.tableConfig.filterData(filteredObj, xlsxData)) {
                        continue;
                    }
                }
                xlsxData.tableData.data.push(filteredObj);
            }    



            let conversionOptions = {
                header: xlsxData.tableFormat.keys,
            };
            if (!xlsxData.options.header) {
                conversionOptions.skipHeader = true;
            }
            if (xlsxData.options.dateFormat != 'iso') {
                conversionOptions.dateNF = xlsxData.options.dateFormat;
            }

            // TODO: Refactor this to put it in the caller 
            if (!options.fileName) {
                if (tableObj.tableConfig.generateFilename) {
                    options.fileName = tableObj.tableConfig.generateFilename(xlsxData.options);
                }
            }
            if (!options.fileName) {
                options.fileName = 'export.' + xlsxData.options.format;
            }

            let stats = {
                format: xlsxData.options.format,
                cols: xlsxData.tableFormat.keys.length,
                count: xlsxData.tableData.data.length
            };


            xlsxData.worksheet = XLSX.utils.json_to_sheet(xlsxData.tableData.data, conversionOptions);

            xlsxData.workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(xlsxData.workbook, xlsxData.worksheet, options.sheetName);

            if (xlsxData.options.header) {
                XLSX.utils.sheet_add_aoa(xlsxData.worksheet, [xlsxData.tableFormat.titles], { origin: "A1" });
            }

            // Columns widths
            if (!xlsxData.worksheet['!cols']) {
                xlsxData.worksheet['!cols'] = [];
            }
            for(let ii = 0; ii < xlsxData.tableFormat.widths.length; ii++) {
                if (!xlsxData.worksheet['!cols'][ii]) {
                    xlsxData.worksheet['!cols'][ii] = {};
                }
                xlsxData.worksheet['!cols'][ii].wch = xlsxData.tableFormat.widths[ii];
            }

            switch(xlsxData.options.format) {
                case 'xlsx':
                    // toFile/toClipboard is ignored; cannot create 
                    XLSX.writeFile(xlsxData.workbook, options.fileName);
                    if (tableObj.tableConfig.gaCategory) {
                        analytics.track('Download', {category:tableObj.tableConfig.gaCategory, label:JSON.stringify(stats)});
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

                    if (tableObj.tableConfig.gaCategory) {
                        analytics.track('Clipboard', {category:tableObj.tableConfig.gaCategory, label:JSON.stringify(stats)});
                    }
                }
                if (options.toFile) {
                    let blob = new Blob([xlsxData.textOut], {type:'text/' + xlsxData.options.format});
                    saveAs(blob, options.fileName);	        
                    if (tableObj.tableConfig.gaCategory) {
                        analytics.track('Download', {category:tableObj.tableConfig.gaCategory, label:JSON.stringify(stats)});
                    }
                }
            }

            return xlsxData;
        }

        $(downloadButtonElem).on('click', async function() {
            await tableObj.getXlsxData({toFile: true});

        });

        $(copyButtonElem).on('click', async function(event) {
            await tableObj.getXlsxData({toClipboard: true});            
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

        $(omitEmptyCheckboxElem).on('click', function() {
            $(thisPartial).trigger('updateSearchParam');
            tableObj.sortBy();
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

        const fieldSelectorObj = {};
        $(thisPartial).data('fieldSelector', fieldSelectorObj);

        // const fieldSelectorDivElem = $(thisPartial).find('.fieldSelectorDiv');

        const fieldSelectorTableDivElem = $(thisPartial).find('.fieldSelectorTableDiv');
        

        // Only used internally
        const refreshTable = function() {   
            // Trigger an event in the containing apiHelperTable element to refresh its table based on the 
            // field selector settings.
            $(apiHelperTableElem).trigger('fieldSelectorUpdate', [fieldSelectorObj.configObj]);
        };

        const moveField = function(fromKey, toKey, afterTarget) {
            let fromIndex = -1;
            let toIndex = -1;
            for(let ii = 0; ii < fieldSelectorObj.configObj.fieldSelector.fields.length; ii++) {
                if (fieldSelectorObj.configObj.fieldSelector.fields[ii].key == fromKey) {
                    fromIndex = ii;
                }
                if (fieldSelectorObj.configObj.fieldSelector.fields[ii].key == toKey) {
                    toIndex = ii;
                }
            }

            if (fromIndex == toIndex || fromIndex < 0 || toIndex < 0) {
                return;
            }

            // Reorder items in the DOM
            $(fieldSelectorObj.configObj.fieldSelector.fields[fromIndex].trElem).detach();
            if (afterTarget) {
                $(fieldSelectorObj.configObj.fieldSelector.fields[toIndex].trElem).after(fieldSelectorObj.configObj.fieldSelector.fields[fromIndex].trElem);

            }
            else {
                $(fieldSelectorObj.configObj.fieldSelector.fields[toIndex].trElem).before(fieldSelectorObj.configObj.fieldSelector.fields[fromIndex].trElem);

            }

            // Reorder items in array
            const fromArrayItem = fieldSelectorObj.configObj.fieldSelector.fields[fromIndex];
            fieldSelectorObj.configObj.fieldSelector.fields.splice(fromIndex, 1);
            if (toIndex > fromIndex) {
                toIndex--;
            }
            if (afterTarget) {
                toIndex++;
            }
            fieldSelectorObj.configObj.fieldSelector.fields.splice(toIndex, 0, fromArrayItem);

            refreshTable();
            
        };

        const updateTable = function() {
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

                for(const field of fieldSelectorObj.configObj.fieldSelector.fields) {
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

                        const targetClientHeight = ev.currentTarget.clientHeight;
                        const afterTarget = (ev.originalEvent.offsetY >= (targetClientHeight / 2));

                        moveField(key, field.key, afterTarget);
                    });
        

                    $(tbodyElem).append(trElem);
                }

                $(tableElem).append(tbodyElem);
            }

            $(fieldSelectorTableDivElem).html(tableElem);
        
        }

        fieldSelectorObj.setConfigObj = function(configObjIn) {
            fieldSelectorObj.configObj = configObjIn;

            if (!fieldSelectorObj.configObj.fieldSelector.fields || fieldSelectorObj.configObj.fieldSelector.fields.length == 0) {
                return;
            }
            if (!fieldSelectorObj.configObj.fieldSelector || !fieldSelectorObj.configObj.fieldSelector.showControl) {
                return;
            }

            if (fieldSelectorObj.configObj.fieldSelector.height) {
                $(fieldSelectorTableDivElem).css('height', fieldSelectorObj.configObj.fieldSelector.height);
                $(fieldSelectorTableDivElem).css('overflow-y', 'auto');
            }

            $(thisPartial).show();

            for(const field of fieldSelectorObj.configObj.fieldSelector.fields) {
                if (!field.width) {
                    field.width = '10';
                }
            }

            updateTable();
            
        }

        fieldSelectorObj.getFieldByKey = function(key) {
            return fieldSelectorObj.configObj.fieldSelector.fields.find(e => e.key == key);
        }

        fieldSelectorObj.addField = function(obj) {
            fieldSelectorObj.configObj.fieldSelector.fields.push(obj);
            fieldSelectorObj.setConfigObj(fieldSelectorObj.configObj);
        };

        fieldSelectorObj.getUrlConfigObj = function(resultObj) {
            if (!fieldSelectorObj.configObj.fieldSelector || !fieldSelectorObj.configObj.fieldSelector.showControl) {
                return;
            }

            let index = 0;

            for(const field of fieldSelectorObj.configObj.fieldSelector.fields) {

                resultObj['k' + index] = (field.isChecked() ? '*' : '') + field.key;
                    
                if (field.customTitle && field.customTitle != field.title) {
                    resultObj['t' + index] = field.customTitle;
                }

                if (field.customWidth && field.customWidth != field.width) {
                    resultObj['w' + index] = field.customWidth;
                }

                index++;
            }
        }


        
        fieldSelectorObj.loadUrlParams = function(urlParams) {
            if (!fieldSelectorObj.configObj.fieldSelector || !fieldSelectorObj.configObj.fieldSelector.showControl) {
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

                const field = fieldSelectorObj.configObj.fieldSelector.fields.find(f => f.key == key);
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

            for(const field of fieldSelectorObj.configObj.fieldSelector.fields) {
                const inNew = !!newFields.find(f => f.key == field.key);
                if (!inNew) {
                    field.checked = false;
                    newFields.push(field);
                }
            }

            fieldSelectorObj.configObj.fieldSelector.fields = newFields;                
            updateTable();
        }


    });

});

