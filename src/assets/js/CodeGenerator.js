var codeGenerator = {};

(function(cg) {
    cg.defaultOptions = {
        indent: 4,
        singleton: false,
        notCopyable: false,
        protectedConstructor: false,
        thread: false,
        mutex: false,
        setup: false,
        loop: false
    };


    cg.run = function(options) {
        let result = {};

        cg.options = Object.assign(Object.assign({}, cg.defaultOptions), options);

        if (cg.options.singleton) {
            cg.options.protectedConstructor = true;
            cg.options.notCopyable = true;
        }
        if (cg.options.thread || cg.options.mutex) {
            cg.options.setup = true;
        }

        result.source = cg.generateSource();
        result.header = cg.generateHeader();

        return result;
    };

    cg.indent = function(n) {
        if (typeof cg.options.indent === 'number') {
            return '                                                                                   '.substr(0, n * cg.options.indent);
        }
        else {
            return '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'.substr(0, n);
        }
    }

    cg.wrapComment = function(indent, star, text) {
        let result = '';

        for(const line of text.split('\n')) {
            result += cg.indent(indent);
            if (star) {
                result += ' * ';
            }
            else {
                result += '// ';
            }
    
            result += line + '\n';    
        }

        return result;
    };

    cg.generateDoxygen = function(indent, commentOptions) {
        let result = '';

        result += cg.indent(indent) + '/**\n';

        needsSeparator = false;

        const handleSeparator = function() {
            if (needsSeparator) {
                result += cg.wrapComment(indent, true, '');
            }
            needsSeparator = true;
        };

        if (commentOptions.brief) {
            handleSeparator();
            result += cg.wrapComment(indent, true, '@brief ' + commentOptions.brief);
        }
        if (commentOptions.param) {
            // param (name, details)
            for(const p of commentOptions.param) {
                handleSeparator();
                result += cg.wrapComment(indent, true, '@param ' + p.name + ' ' + p.details);
            }
        }

        if (commentOptions.return) {
            handleSeparator();
            result += cg.wrapComment(indent, true, '@return ' + commentOptions.return);
        }

        if (commentOptions.details) {
            handleSeparator();
            result += cg.wrapComment(indent, true, commentOptions.details);
        }

        result += cg.indent(indent) + ' */\n';

        return result;
    };

    cg.generateSource = function() {
        let code = '';
        
        code += '#include "' + cg.options.name + '.h"\n';
        code += '\n';

        if (cg.options.singleton) {
            code += cg.options.name + ' *' + cg.options.name + '::_instance;\n';
            code += '\n';
        
            code += '// [static]\n';
            code += cg.options.name + ' &' + cg.options.name + '::instance() {\n';
            code += cg.indent(1) + 'if (!_instance) {\n';
            code += cg.indent(2) + '_instance = new ' + cg.options.name + '();\n';
            code += cg.indent(1) + '}\n';
            code += cg.indent(1) + 'return *_instance;\n';
            code += '}\n';
            code += '\n';
        }

        // Constructor
        code += cg.options.name + '::' + cg.options.name + '() {\n';
        code += '}\n';
        code += '\n';

        // Destructor
        code += cg.options.name + '::~' + cg.options.name + '() {\n';
        code += '}\n';
        code += '\n';

        if (cg.options.setup) {
            code += 'void ' + cg.options.name + '::setup() {\n';

            if (cg.options.mutex) {
                code += cg.indent(1) + 'os_mutex_create(&mutex);\n';
                code += '\n';
            }
            if (cg.options.thread) {
                code += cg.indent(1) + 'thread = new Thread("' + cg.options.name + '", [this]() { return threadFunction(); }, OS_THREAD_PRIORITY_DEFAULT, 3072);\n';
            }

            code += '}\n';
            code += '\n';
        }
        if (cg.options.loop) {
            code += 'void ' + cg.options.name + '::loop() {\n';
            code += cg.wrapComment(1, false, 'Put your code to run during the application thread loop here');
            code += '}\n';
            code += '\n';
        }


        if (cg.options.thread) {
            code += 'os_thread_return_t ' + cg.options.name + '::threadFunction(void) {\n';
            code += cg.indent(1) + 'while(true) {\n';
            code += cg.wrapComment(2, false, 'Put your code to run in the worker thread here');
            code += cg.indent(2) + 'delay(1);\n';
            code += cg.indent(1) + '}\n';
            code += '}\n';

            code += '\n';
        }


        return code;
    };

    cg.generateHeader = function() {
        let code = '';

        const guard = '__' + cg.options.name.toUpperCase() + '_H';

        code += '#ifndef ' + guard + '\n';
        code += '#define ' + guard + '\n';

        code += '\n';
        code += '#include "Particle.h"\n';
        code += '\n';

        if (cg.options.headerTop) {
            code += cg.options.headerTop + '\n';
        }

        let classDetails = '';
        if (cg.options.singleton) {
            classDetails += 'This class is a singleton; you do not create one as a global, on the stack, or with new.';

            if (cg.options.setup) {
                if (classDetails) {
                    classDetails += '\n\n';
                }

                classDetails += 'From global application setup you must call:\n' + cg.options.name + '::instance().setup();'
            }

            if (cg.options.loop) {
                if (classDetails) {
                    classDetails += '\n\n';
                }
                classDetails += 'From global application loop you must call:\n' + cg.options.name + '::instance().loop();'
            }
        }

        code += cg.generateDoxygen(0, {
            details: classDetails
        });
        code += 'class ' + cg.options.name + ' {\n';
        code += 'public:\n';

        if (!cg.options.protectedConstructor) {
            code += cg.indent(1) + cg.options.name + '();\n';
            code += cg.indent(1) + 'virtual ~' + cg.options.name + '();\n';
        }

        if (cg.options.singleton) {
            code += cg.generateDoxygen(1, {
                brief: 'Gets the singleton instance of this class, allocating it if necessary',
                details: 'Use ' + cg.options.name + '::instance() to instantiate the singleton.'
            });
            code += cg.indent(1) + 'static ' + cg.options.name + ' &instance();\n';
            code += '\n';
        }

        if (cg.options.setup) {
            code += cg.generateDoxygen(1, {
                brief: 'Perform setup operations; call this from global application setup()',
                details: 'You typically use ' + cg.options.name + '::instance().setup();'
            });
            code += cg.indent(1) + 'void setup();\n';
            code += '\n';
        }
        if (cg.options.loop) {
            code += cg.generateDoxygen(1, {
                brief: 'Perform application loop operations; call this from global application loop()',
                details: 'You typically use ' + cg.options.name + '::instance().loop();'
            });
            code += cg.indent(1) + 'void loop();\n';
            code += '\n';
        }

        if (cg.options.mutex) {
            code += cg.generateDoxygen(1, {
                brief: 'Locks the mutex that protects shared resources',
                details: 'This is compatible with `WITH_LOCK(*this)`.\n\nThe mutex is not recursive so do not lock it within a locked section.'
            });
            code += cg.indent(1) + 'void lock() { os_mutex_lock(mutex); };\n';
            code += '\n';

            code += cg.generateDoxygen(1, {
                brief: 'Attempts to lock the mutex that protects shared resources',
                return: 'true if the mutex was locked or false if it was busy already.'
            });
            code += cg.indent(1) + 'bool tryLock() { return os_mutex_trylock(mutex); };\n';
            code += '\n';

            code += cg.generateDoxygen(1, {
                brief: 'Unlocks the mutex that protects shared resources'
            });
            code += cg.indent(1) + 'void unlock() { os_mutex_unlock(mutex); };\n';
            code += '\n';
        }

        
    

        code += '\n';
        code += 'protected:\n';

        if (cg.options.protectedConstructor) {
            code += cg.generateDoxygen(1, {
                brief: 'The constructor is protected because the class is a singleton',
                details: 'Use ' + cg.options.name + '::instance() to instantiate the singleton.'
            });
            code += cg.indent(1) + cg.options.name + '();\n';
            code += '\n';

            code += cg.generateDoxygen(1, {
                brief: 'The destructor is protected because the class is a singleton and cannot be deleted',
            });
            code += cg.indent(1) + 'virtual ~' + cg.options.name + '();\n';
            code += '\n';
        }

        if (cg.options.notCopyable) {
            code += cg.generateDoxygen(1, {
                details: 'This class is a singleton and cannot be copied'
            });
            code += cg.indent(1) + cg.options.name + '(const ' + cg.options.name + '&) = delete;\n';
            code += '\n';

            code += cg.generateDoxygen(1, {
                details: 'This class is a singleton and cannot be copied'
            });
            code += cg.indent(1) + cg.options.name + '& operator=(const ' + cg.options.name + '&) = delete;\n';
            code += '\n';
        }

        if (cg.options.thread) {
            code += cg.generateDoxygen(1, {
                brief: 'Worker thread function',
                details: 'This method is called to perform operations in the worker thread.\n\nYou generally will not return from this method.'
            });
            code += cg.indent(1) + 'os_thread_return_t threadFunction(void);\n';
            code += '\n';
        }

        if (cg.options.mutex) {
            code += cg.generateDoxygen(1, {
                brief: 'Mutex to protect shared resources',
                details: 'This is initialized in setup() so make sure you call the setup() method from the global application setup.'
            });
            code += cg.indent(1) + 'os_mutex_t mutex = 0;\n';
            code += '\n';
        }

        if (cg.options.thread) {
            code += cg.generateDoxygen(1, {
                brief: 'Worker thread instance class',
                details: 'This is initialized in setup() so make sure you call the setup() method from the global application setup.'
            });
            code += cg.indent(1) + 'Thread *thread = 0;\n';
            code += '\n';
        }

        if (cg.options.singleton) {
            code += cg.generateDoxygen(1, {
                brief: 'Singleton instance of this class',
                details: 'The object pointer to this class is stored here. It\'s NULL at system boot.'
            });
            code += cg.indent(1) + 'static ' + cg.options.name + ' *_instance;\n';
            code += '\n';
        }
        code += '};\n';

        code += '#endif  /* ' + guard + ' */\n';

        return code;
    };


}(codeGenerator));

