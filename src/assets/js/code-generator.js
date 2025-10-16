$(document).ready(function () {
    // auth not required

    $('.codeGeneratorSingleton').each(function() {
        const thisElem = $(this);

        const setStatus = function(str) {
            $(thisElem).find('.apiHelperStatus').text(str);
        };

        let className;
        let sources;

        const generateCode = function() {
            className = $(thisElem).find('.className').val();

            sources = codeGenerator.run({
                name: className,
                singleton: true,
                mutex: $(thisElem).find('.generateMutex').prop('checked'),
                thread: $(thisElem).find('.generateThread').prop('checked'),
                setup: true,
                loop: true
            });
            
            ['source','header'].forEach(function(which) {
                let thisCodeElem = $(thisElem).find('.' + which + 'File > pre > code');
                $(thisCodeElem).text(sources[which]);
                $(thisCodeElem).removeClass('prettyprinted');
                if (prettyPrint) {
                    prettyPrint();
                }
            });
        };

        $(thisElem).find('.className').on('blur', generateCode);
        $(thisElem).find('.generateMutex').on('click', generateCode);
        $(thisElem).find('.generateThread').on('click', function() {
            if ($(this).prop('checked')) {
                $(thisElem).find('.generateMutex').prop('checked', true);
            }
            generateCode();
        });
        $(thisElem).find('.apiHelperActionButton').on('click', generateCode);

        $(thisElem).find('.downloadButton').on('click', async function() {
            const zipFs = new zip.fs.FS();

            zipFs.addText(className + '.cpp', sources.source);
            zipFs.addText(className + '.h', sources.header);

            const blob = await zipFs.exportBlob({
                level:0
            });
        
            const outputFile = className + '.zip';
            setStatus('Saving ' + outputFile + ' to Downloads...');
            saveAs(blob, outputFile);
        
            analytics.track('Success', {category:'Singleton Download'});
        
        });

        generateCode();
    });

    $('.codeGeneratorLibrary').each(function() {
        const thisElem = $(this);

        const setStatus = function(str) {
            $(thisElem).find('.apiHelperStatus').text(str);
        };

        let options = {};

        const fieldConfig = {
            valFields: ['libraryName', 'license', 'copyright', 'github', 'description', 'examples'],
            checkboxes: ['generateSingleton', 'generateMutex', 'generateThread'],
            licenses: [
                {
                    title: 'MIT',
                    file: 'MIT.txt',
                },
                {
                    title: 'Apache 2.0',
                    file: 'apache2.txt',
                },
                {
                    title: 'BSD',
                    file: 'BSD.txt',
                },
                {
                    title: 'LGPL',
                    file: 'LGPL.txt',
                },
                {
                    title: 'GPL v3',
                    file: 'GPLv3.txt',
                },
                {
                    title: 'GPL v2',
                    file: 'GPLv2.txt',
                },
            ],
            replaceWithKey: [
                'copyright',
                'libraryName',
                'description',
                'github',
                'licenseTitle',
                'libraryHeader',
            ],
            githubDefault: 'https://github.com/username/repo',
            copyFiles: [
                {
                    src: 'README.md',
                },
                {
                    src: 'library.properties',
                },
                {
                    src: 'particle.ignore',
                },
                {
                    src: 'gitignore',
                    dst: '.gitignore',
                },
                {
                    src: 'doxygen.config',
                },
            ],
        };

        for(const licenseObj of fieldConfig.licenses) {
            const optionElem = document.createElement('option');
            $(optionElem).attr('value', licenseObj.file);
            $(optionElem).text(licenseObj.title);

            $(thisElem).find('.license').append(optionElem);
        }

        const loadOptions = function() {
            // Fields retrievable using val() like input text and select
            for(const field of fieldConfig.valFields) {
                if (typeof options[field] != 'undefined') {
                    $(thisElem).find('.' + field).val(options[field]);
                }
            }

            // Checkboxes
            for(const field of fieldConfig.checkboxes) {
                $(thisElem).find('.' + field).prop('checked', !!options[field]);
            }
        }

        const saveOptions = function() {
            // Fields retrievable using val() like input text and select
            for(const field of fieldConfig.valFields) {
                options[field]= $(thisElem).find('.' + field).val();
            }

            // Checkboxes
            for(const field of fieldConfig.checkboxes) {
                options[field] = $(thisElem).find('.' + field).prop('checked');
            }

            options.licenseTitle = fieldConfig.licenses.find(e => e.file == options.license).title;
            options.libraryHeader = options.libraryName + '.h';
        }

        const restoreDefaults = function() {
            const d = new Date();
            options.libraryName = 'MyLibrary';
            options.license = 'MIT.txt';
            options.copyright = 'Copyright (c) ' + d.getFullYear() + ' [your name]';
            options.github = fieldConfig.githubDefault;
            options.description = 'My new library for Particle devices';
            options.examples = '1-Simple';
            options.generateSingleton = options.generateMutex = options.generateThread = true;
            loadOptions();
            validateOptions();
        }

        const validateOptions = function() {
            saveOptions();
        
            $(thisElem).find('.downloadButton').prop('disabled', false); // TEMPORARY

            try {
                const s = options.libraryName.replace(/[-A-Za-z0-9_]/g, '');
                if (s != '') {
                    setStatus('Library Name can only contain alphanumeric, underscore, and dash. No spaces or special characters!');
                    return;
                }
                
                if (typeof options.github == 'string' && options.github.trim().length != 0) {
                    if (options.github == fieldConfig.githubDefault || !options.github.startsWith('https://') || options.github.endsWith('.git')) {
                        setStatus('Github repository must be a URL to your Github repository for this project, or an empty string if you don\'t have one. It must not end with .git');
                        return;
                    }
                }

                $(thisElem).find('.downloadButton').prop('disabled', false);
                setStatus('');
            }
            catch(e) {
                console.log('validateOptionsException', e);
            }
        }

        const updateString = function(s) {
            for(const key of fieldConfig.replaceWithKey) {
                s = s.replaceAll('{{' + key + '}}', options[key]);
            }

            s = s.replaceAll('{{licenseTitle}}', fieldConfig.licenses.find(e => e.file == options.license).title);
            s = s.replaceAll('{{libraryHeader}}', options.libraryName + '.h');

            return s;
        }

        $(thisElem).find('.libraryName').on('input blur', validateOptions);

        $(thisElem).find('.restoreDefaults').on('click', function() {
            $(thisElem).find('.restoreDefaults').prop('disabled', true);
            restoreDefaults();
            setTimeout(function() {
                $(thisElem).find('.restoreDefaults').prop('disabled', false);
            }, 500);
        });


        $(thisElem).find('.downloadButton').on('click', async function() {
            saveOptions();
            localStorage.setItem('libraryGenerator', JSON.stringify(options));

            let headerTop = '';
            if (options.github && options.github.length) {
                headerTop += '// Repository: ' + options.github + '\n';
            }
            headerTop += '// License: ' + options.licenseTitle + '\n';

            const sources = codeGenerator.run({
                name: options.libraryName,
                singleton: options.generateSingleton,
                mutex: options.generateMutex,
                thread: options.generateThread,
                setup: true,
                loop: true,
                headerTop,
            });

            const sourceFileZipFs = new zip.fs.FS();
            setStatus('Getting project template source...')
            await sourceFileZipFs.importHttpContent('/assets/files/projects/library-generator.zip');

            setStatus('Generating your library...');
            const zipFs = new zip.fs.FS();

            const libDir = zipFs.addDirectory(options.libraryName);

            {
                const zipEntry = sourceFileZipFs.find('library-generator/license/' + options.license);
                const fileText = await zipEntry.getText();
                libDir.addText('LICENSE', updateString(fileText));
            }

            for(const copyObj of fieldConfig.copyFiles) {
                if (!copyObj.dst) {
                    copyObj.dst = copyObj.src;
                }
                const zipEntry = sourceFileZipFs.find('library-generator/' + copyObj.src);
                const fileText = await zipEntry.getText();
                libDir.addText(copyObj.dst, updateString(fileText));
            }

            const srcDir = libDir.addDirectory('src');
            srcDir.addText(options.libraryName + '.cpp', sources.source);
            srcDir.addText(options.libraryName + '.h', sources.header);

            {
                const zipEntry = sourceFileZipFs.find('library-generator/example.cpp');
                const fileText = await zipEntry.getText();
                const exampleCpp = updateString(fileText);

                const examplesDir = libDir.addDirectory('examples');
                for(let exampleName of options.examples.split(',')) {
                    exampleName = exampleName.trim();
                    const thisExampleDir = examplesDir.addDirectory(exampleName);
    
                    thisExampleDir.addText(exampleName + '.cpp', exampleCpp);

                }
            }

            const blob = await zipFs.exportBlob({
                level:0
            });
        
            const outputFile = options.libraryName + '.zip';
            setStatus('Saving ' + outputFile + ' to Downloads...');
            saveAs(blob, outputFile);
        
            analytics.track('Success', {category:'Library Project Download'});
        
        });

        let doRestoreDefaults = true;

        const stor = localStorage.getItem('libraryGenerator');
        if (typeof stor == 'string' && stor.length > 2) {
            try {
                options = JSON.parse(stor);
                loadOptions();
                doRestoreDefaults = false;
            }
            catch(e) {                
            }
        }
        if (doRestoreDefaults) {
            restoreDefaults();
        }

        validateOptions();
    });

});
