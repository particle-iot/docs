// Works out which JavaScript and CSS files each page needs and stores the result in the page metadata
// for the scripts.hbs and head.hbs partials to render.
//
// Definitions (config/script-definitions.json) describe the files for a feature and what it requires.
// A page's needs are the union of:
//   - includeDefinitions in the front matter (still supported, now optional)
//   - things detected in the page source: code blocks, {{> partial}} usage, and regular expressions
//   - "always" definitions
// That set is expanded through "requires", ordered so dependencies load first, and de-duplicated by URL.
//
// Sets these properties on each page:
//   includeDefinitions  all definition names, including the ones added by requires and auto-detection
//   includeScripts      script URLs in load order
//   includeStyles       stylesheet URLs
//   includeHtml         raw html (inline scripts) to add after the scripts

const fs = require('fs');
const path = require('path');

const defaultDefinitionsPath = path.join(__dirname, '..', 'config', 'script-definitions.json');
const defaultPartialsDir = path.join(__dirname, '..', 'templates', 'partials');

// Partials can declare their requirements in a header comment, either an HTML comment or a Handlebars comment:
//   {{!-- Required includeDefinitions: [api-helper, zip] --}}
const partialHeaderRE = /Required includeDefinitions:\s*\[([^\]]*)\]/;

function parseNameList(value) {
    if (!value) {
        return [];
    }
    if (Array.isArray(value)) {
        return value.map(s => String(s).trim()).filter(s => s.length);
    }
    // Some generators set the front matter value as a string like '[api-helper, zip]'
    return String(value).replace(/[\[\]]/g, '').split(/[\s,]+/).filter(s => s.length);
}

function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function loadDefinitions(definitionsPath) {
    const defs = JSON.parse(fs.readFileSync(definitionsPath, 'utf8')).definitions;

    // Preserves the order from the file, which is used as the tie-breaker for load order
    const order = Object.keys(defs);

    for (const name of order) {
        const def = defs[name];
        def.name = name;
        def.requires = def.requires || [];
        def.scripts = def.scripts || [];
        def.styles = def.styles || [];

        for (const r of def.requires) {
            if (!defs[r]) {
                throw new Error('script-definitions: "' + name + '" requires unknown definition "' + r + '"');
            }
        }

        const detect = def.detect || {};
        def.codeBlockREs = (detect.codeBlocks || []).map(lang => new RegExp('^\\s*(```|~~~)\\s*' + escapeRegExp(lang) + '\\b', 'm'));
        def.patternREs = (detect.patterns || []).map(p => new RegExp(p, 'm'));
        def.partialNames = detect.partials || [];
    }

    // Check for cycles
    const state = {};
    const visit = function (name, stack) {
        if (state[name] === 'done') {
            return;
        }
        if (state[name] === 'active') {
            throw new Error('script-definitions: circular requires: ' + stack.concat(name).join(' -> '));
        }
        state[name] = 'active';
        for (const r of defs[name].requires) {
            visit(r, stack.concat(name));
        }
        state[name] = 'done';
    };
    for (const name of order) {
        visit(name, []);
    }

    return { defs, order };
}

// Returns an object mapping partial name to { requires: [definition names], partials: [partials it uses] }
function loadPartials(partialsDir) {
    const partials = {};

    if (!fs.existsSync(partialsDir)) {
        return partials;
    }

    for (const fileName of fs.readdirSync(partialsDir)) {
        if (!fileName.endsWith('.hbs')) {
            continue;
        }
        const contents = fs.readFileSync(path.join(partialsDir, fileName), 'utf8');
        const m = contents.match(partialHeaderRE);

        partials[fileName.replace(/\.hbs$/, '')] = {
            requires: m ? parseNameList(m[1]) : [],
            partials: usedPartials(contents),
        };
    }

    return partials;
}

function usedPartials(source) {
    const names = [];
    for (const m of source.matchAll(/\{\{>\s*([A-Za-z0-9_\-\/]+)/g)) {
        if (!names.includes(m[1])) {
            names.push(m[1]);
        }
    }
    return names;
}

function metalsmith(options) {
    options = options || {};

    const { defs, order } = loadDefinitions(options.definitions || defaultDefinitionsPath);
    const partials = loadPartials(options.partialsDir || defaultPartialsDir);

    // Definitions to add for each partial name, from the partial header and the detect.partials of definitions
    const partialDefs = {};
    for (const name of Object.keys(partials)) {
        partialDefs[name] = partials[name].requires.slice();
    }
    for (const name of order) {
        for (const p of defs[name].partialNames) {
            partialDefs[p] = (partialDefs[p] || []).concat(name);
        }
    }

    // Including nested partials
    const partialRequires = function (partialName, seen) {
        seen = seen || new Set();
        if (seen.has(partialName)) {
            return [];
        }
        seen.add(partialName);

        let result = (partialDefs[partialName] || []).slice();
        if (partials[partialName]) {
            for (const nested of partials[partialName].partials) {
                result = result.concat(partialRequires(nested, seen));
            }
        }
        return result;
    };

    // Returns the names found in the source of a page
    const detect = function (source) {
        const found = [];
        const add = function (name) {
            if (!found.includes(name)) {
                found.push(name);
            }
        };

        for (const name of order) {
            const def = defs[name];
            if (def.codeBlockREs.some(re => re.test(source)) || def.patternREs.some(re => re.test(source))) {
                add(name);
            }
        }

        for (const partialName of usedPartials(source)) {
            for (const name of partialRequires(partialName)) {
                add(name);
            }
        }

        return found;
    };

    const alwaysNames = order.filter(name => defs[name].always);

    // Expand requires and order the result. Dependencies are emitted immediately before the definition that needs them.
    const resolve = function (requested, filePath) {
        for (const name of requested) {
            if (!defs[name]) {
                throw new Error(filePath + ': unknown includeDefinitions "' + name + '" (see config/script-definitions.json)');
            }
        }

        // Start with everything the page needs, expanded
        const needed = new Set();
        const expand = function (name) {
            if (needed.has(name)) {
                return;
            }
            needed.add(name);
            defs[name].requires.forEach(expand);
        };
        requested.forEach(expand);

        // Walk in definition order so output is stable regardless of the order in the page front matter
        const emitted = new Set();
        const result = [];
        const emit = function (name) {
            if (emitted.has(name)) {
                return;
            }
            emitted.add(name);
            defs[name].requires.forEach(emit);
            result.push(name);
        };
        order.filter(name => needed.has(name)).forEach(emit);

        return result;
    };

    return function (files, metalsmith, done) {
        try {
            for (const filePath in files) {
                const f = files[filePath];

                if (!filePath.endsWith('.md') && !f.layout) {
                    continue;
                }

                let requested = parseNameList(f.includeDefinitions);

                if (filePath.endsWith('.md') && f.contents) {
                    for (const name of detect(f.contents.toString())) {
                        if (!requested.includes(name)) {
                            requested.push(name);
                        }
                    }
                }

                for (const name of alwaysNames) {
                    if (!requested.includes(name)) {
                        requested.push(name);
                    }
                }

                const names = resolve(requested, filePath);

                const scripts = [];
                const styles = [];
                const html = [];
                for (const name of names) {
                    const def = defs[name];
                    for (const url of def.scripts) {
                        if (!scripts.includes(url)) {
                            scripts.push(url);
                        }
                    }
                    for (const url of def.styles) {
                        if (!styles.includes(url)) {
                            styles.push(url);
                        }
                    }
                    if (def.html) {
                        html.push(def.html);
                    }
                }

                f.includeDefinitions = names;
                f.includeScripts = scripts;
                f.includeStyles = styles;
                f.includeHtml = html.join('\n');
            }
        }
        catch (e) {
            return done(e);
        }

        done();
    };
}

module.exports = {
    metalsmith,
    loadDefinitions,
    loadPartials,
    parseNameList,
};
