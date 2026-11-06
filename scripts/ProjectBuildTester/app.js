#!/usr/bin/env node

/**
 * Project Build Tester
 *
 * Test compiles the sample projects in src/assets/files/projects against a set of Device OS
 * versions and platforms using the Particle CLI (`particle compile`, cloud compiler).
 *
 * Only directories that contain a project.properties file are tested. The settings and the
 * results of the last builds are stored in config/projectBuildTester.json. See README.md.
 *
 * Usage:
 *   npm start                                (from scripts/ProjectBuildTester)
 *   npm run project-build-tester             (from the top level)
 *   npm run project-build-tester -- --help
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { execFile } = require('child_process');

const argv = require('yargs')
    .usage('Usage: $0 [options]')
    .option('force', { type: 'boolean', default: false, describe: 'Rebuild even if the source is unchanged and a result is stored' })
    .option('retry-failed', { type: 'boolean', default: false, describe: 'Rebuild combinations whose stored result is a failure (source unchanged)' })
    .option('project', { type: 'string', array: true, describe: 'Only test these projects (directory name, repeatable)' })
    .option('os-version', { type: 'string', array: true, describe: 'Test only these Device OS versions (any version in deviceOsVersions.json, repeatable)' })
    .option('platform', { type: 'string', array: true, describe: 'Only test these platforms (repeatable)' })
    .option('dry-run', { type: 'boolean', default: false, describe: 'Show what would be built; do not compile or save results' })
    .option('concurrency', { type: 'number', default: 4, describe: 'Number of compiles to run at the same time' })
    .option('timeout', { type: 'number', default: 600, describe: 'Seconds before a single compile is abandoned (counts as a failure)' })
    .option('verbose-fail', { type: 'boolean', default: false, describe: 'Print the full compiler output of failed builds instead of the last lines' })
    .help()
    .argv;

const topDir = path.join(__dirname, '..', '..');
const projectsDir = path.join(topDir, 'src', 'assets', 'files', 'projects');
const deviceOsVersionsPath = path.join(topDir, 'src', 'assets', 'files', 'deviceOsVersions.json');
const configPath = path.join(topDir, 'config', 'projectBuildTester.json');
const carriersPath = path.join(topDir, 'src', 'assets', 'files', 'carriers.json');
const logsDir = path.join(__dirname, 'logs'); // git ignored
const lastRunPath = path.join(logsDir, 'lastRun.txt'); // copy of the console output of the latest run

// Copy everything written with console.log to lastRun.txt (replaced at the start of each run)
fs.mkdirSync(logsDir, { recursive: true });
fs.writeFileSync(lastRunPath, '');
const origConsoleLog = console.log;
console.log = (...args) => {
    origConsoleLog(...args);
    try {
        fs.appendFileSync(lastRunPath, args.map((a) => typeof a === 'string' ? a : require('util').inspect(a)).join(' ') + '\n');
    }
    catch (e) {}
};

// Platform names (as used by the Particle CLI) by platform ID, as used in deviceOsVersions.json
const platformIds = {
    6: 'photon',
    8: 'p1',
    10: 'electron',
    12: 'argon',
    13: 'boron',
    15: 'esomx',
    23: 'bsom',
    25: 'b5som',
    26: 'tracker',
    28: 'trackerm',
    32: 'p2',
    35: 'msom',
};

const defaultConfig = {
    // Defaults for all projects. Each project can override these in projects.<name>.config
    defaults: {
        platforms: ['boron', 'b5som', 'p2', 'argon', 'electron', 'photon', 'msom'],
        majorVersions: [6, 5, 4, 3, 2], // Latest GA of each of these is tested
        includePreview: true,           // Also test the latest preview if newer than the latest GA
        extraVersions: [],              // Additional specific versions to test, such as ["6.2.1"]
    },
    // Features that a project can list in requiresFeatures. Each has any of minVersion, maxVersion
    // (inclusive) and deviceConstants (see matchDeviceConstants). Added here if missing from the config file.
    features: {
        'Variant': { minVersion: '6.1.0' },
        'ApplicationAsset': { minVersion: '5.5.0' },
        'System.getEnv': { minVersion: '6.4.0' },
        'CloudEvent': { minVersion: '6.3.0' },
        'Ledger': { minVersion: '6.1.0' },
        'BLE.setAdvertisingPhy': { minVersion: '3.1.0', deviceConstants: { generation: 3 } },
    },
    projects: {},
};

// ---------------------------------------------------------------------------------------------
// Small helpers

/** Parses "6.2.1" or "3.2.1-p2.3" into [6, 2, 1]. Returns null if it doesn't look like a version. */
function parseVersion(str) {
    const m = /^(\d+)\.(\d+)\.(\d+)/.exec(String(str));
    return m ? [+m[1], +m[2], +m[3]] : null;
}

function compareVersions(a, b) {
    const pa = parseVersion(a);
    const pb = parseVersion(b);
    for (let i = 0; i < 3; i++) {
        if (pa[i] !== pb[i]) {
            return pa[i] - pb[i];
        }
    }
    return 0;
}

function sortedObject(obj) {
    if (Array.isArray(obj) || obj === null || typeof obj !== 'object') {
        return obj;
    }
    const out = {};
    for (const key of Object.keys(obj).sort()) {
        out[key] = sortedObject(obj[key]);
    }
    return out;
}

function exec(cmd, args, options) {
    return new Promise((resolve) => {
        execFile(cmd, args, Object.assign({ maxBuffer: 64 * 1024 * 1024 }, options), (error, stdout, stderr) => {
            resolve({ error, stdout: stdout || '', stderr: stderr || '' });
        });
    });
}

// ---------------------------------------------------------------------------------------------
// Device OS versions

/**
 * Returns the list of Device OS versions to test by default as [{version, reason, platforms}]
 * platforms is the list of platform names that the version supports.
 */
function loadDeviceOsVersions() {
    const list = JSON.parse(fs.readFileSync(deviceOsVersionsPath, 'utf8'));
    const byVersion = {};
    for (const item of list) {
        item.platformNames = (item.supported_platforms || []).map((id) => platformIds[id]).filter(Boolean);
        byVersion[item.version] = item;
    }
    return { list, byVersion };
}

// Release candidates, alphas and the P2 specific 3.x versions (3.2.1-p2.3) have a "-" and are not
// considered when picking the latest of a major version.
const isPlainVersion = (item) => !item.version.includes('-') && parseVersion(item.version);

function selectDefaultVersions(deviceOs, defaults) {
    const selected = []; // {version, reason}
    const gaList = deviceOs.list.filter((item) => item.release_state === 'ga' && isPlainVersion(item));

    if (defaults.includePreview) {
        const latestGa = gaList.reduce((best, item) => (!best || compareVersions(item.version, best.version) > 0) ? item : best, null);
        const previews = deviceOs.list.filter((item) => item.release_state === 'preview' && isPlainVersion(item) &&
            (!latestGa || compareVersions(item.version, latestGa.version) > 0));
        const latestPreview = previews.reduce((best, item) => (!best || compareVersions(item.version, best.version) > 0) ? item : best, null);
        if (latestPreview) {
            selected.push({ version: latestPreview.version, reason: 'latest preview' });
        }
    }

    for (const major of defaults.majorVersions) {
        const inMajor = gaList.filter((item) => parseVersion(item.version)[0] === major);
        const latest = inMajor.reduce((best, item) => (!best || compareVersions(item.version, best.version) > 0) ? item : best, null);
        if (latest) {
            selected.push({ version: latest.version, reason: 'latest GA ' + major + '.x' });
        }
        else {
            console.log('warning: no GA version found for major version ' + major);
        }
    }

    for (const version of defaults.extraVersions || []) {
        if (!selected.find((s) => s.version === version)) {
            selected.push({ version, reason: 'extra version' });
        }
    }
    return selected;
}

// ---------------------------------------------------------------------------------------------
// Configuration

function loadConfig() {
    let config;
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    else {
        config = {};
    }
    config.defaults = Object.assign({}, defaultConfig.defaults, config.defaults);
    config.features = config.features || JSON.parse(JSON.stringify(defaultConfig.features));
    config.projects = config.projects || {};
    return config;
}

function saveConfig(config) {
    // Written to a temp file and renamed so Ctrl-C can't leave a half-written file
    const tmpPath = configPath + '.tmp';
    fs.writeFileSync(tmpPath, JSON.stringify(sortedObject({
        defaults: config.defaults,
        features: config.features,
        projects: config.projects,
    }), null, 4) + '\n');
    fs.renameSync(tmpPath, configPath);
}

/** Directories in the projects directory that contain a project.properties file */
function findProjects() {
    return fs.readdirSync(projectsDir, { withFileTypes: true })
        .filter((ent) => ent.isDirectory() && fs.existsSync(path.join(projectsDir, ent.name, 'project.properties')))
        .map((ent) => ent.name)
        .sort();
}

// Files that don't affect the compiled result, so changing them doesn't cause a rebuild
const hashIgnore = (name) => name === '.DS_Store' || name === '.gitignore' || /\.md$/i.test(name) || /^LICENSE/i.test(name);

function hashProject(projectName) {
    const hash = crypto.createHash('sha256');
    const baseDir = path.join(projectsDir, projectName);

    const walk = (dir) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
        for (const ent of entries) {
            const full = path.join(dir, ent.name);
            if (ent.isDirectory()) {
                if (ent.name !== '.git' && ent.name !== 'target') {
                    walk(full);
                }
            }
            else if (ent.isFile() && !hashIgnore(ent.name)) {
                hash.update(path.relative(baseDir, full).split(path.sep).join('/') + '\0');
                // Normalize line endings so a checkout on Windows gives the same hash
                const content = fs.readFileSync(full);
                hash.update(content.toString('latin1').replace(/\r\n/g, '\n'), 'latin1');
                hash.update('\0');
            }
        }
    };
    walk(baseDir);
    return hash.digest('hex');
}


// ---------------------------------------------------------------------------------------------
// Restrictions: features and device constants

/** Loads the deviceConstants from carriers.json, keyed by platform name */
function loadDeviceConstants() {
    const carriers = JSON.parse(fs.readFileSync(carriersPath, 'utf8'));
    return carriers.deviceConstants;
}

/**
 * Checks device constants conditions for a platform.
 *
 *   generation:       number or array of numbers; the platform's generation must match one
 *   baseMcu:          string or array of strings; the platform's baseMcu must match one
 *   features:         array; the platform must have all of these deviceConstants features (wifi, ble, cellular, ...)
 *   excludeFeatures:  array; the platform must have none of these
 */
function matchDeviceConstants(cond, platform, deviceConstants) {
    const dc = deviceConstants[platform];
    if (!dc) {
        return false;
    }
    const arr = (v) => Array.isArray(v) ? v : [v];
    if (cond.generation !== undefined && !arr(cond.generation).includes(dc.generation)) {
        return false;
    }
    if (cond.baseMcu !== undefined && !arr(cond.baseMcu).includes(dc.baseMcu)) {
        return false;
    }
    const features = dc.features || [];
    if (cond.features && !cond.features.every((f) => features.includes(f))) {
        return false;
    }
    if (cond.excludeFeatures && cond.excludeFeatures.some((f) => features.includes(f))) {
        return false;
    }
    return true;
}

/**
 * Checks a restriction object with any of minVersion, maxVersion, and deviceConstants against a
 * version and platform (and platforms, an explicit list of allowed platform names). Features in config.features and per-project config use this same format.
 */
function matchRestriction(r, version, platform, deviceConstants) {
    if (r.minVersion && compareVersions(version, r.minVersion) < 0) {
        return false;
    }
    if (r.maxVersion && compareVersions(version, r.maxVersion) > 0) {
        return false;
    }
    if (r.platforms && platform && !r.platforms.includes(platform)) {
        return false;
    }
    if (r.deviceConstants && platform && !matchDeviceConstants(r.deviceConstants, platform, deviceConstants)) {
        return false;
    }
    return true;
}

/**
 * Determine the version/platform combinations to build for a project.
 * Returns [{version, platform}] sorted.
 */
function computeTargets(projectCfg, defaultVersions, deviceOs, config, deviceConstants) {
    let platforms = projectCfg.platforms || config.defaults.platforms;
    platforms = platforms.concat(projectCfg.addPlatforms || []);
    const exclude = projectCfg.excludePlatforms || [];
    platforms = [...new Set(platforms)].filter((p) => !exclude.includes(p));

    // Versions: the common set (or command line override) plus the project's extra versions
    let versions = defaultVersions.map((v) => v.version);
    for (const v of projectCfg.extraVersions || []) {
        if (!argv['os-version'] && !versions.includes(v)) {
            versions.push(v);
        }
    }

    const targets = [];
    for (const version of versions) {
        const info = deviceOs.byVersion[version];
        if (!info) {
            continue; // already warned about
        }
        // minVersion and maxVersion are inclusive, and ignore any suffix (3.2.1-p2.3 is treated as 3.2.1)
        if (!matchRestriction(projectCfg, version, null, {})) {
            continue;
        }
        for (const platform of platforms) {
            if (!info.platformNames.includes(platform)) {
                continue; // This Device OS version does not support this platform
            }
            if (argv.platform && !argv.platform.includes(platform)) {
                continue;
            }
            // Project's own deviceConstants conditions
            if (projectCfg.deviceConstants && !matchDeviceConstants(projectCfg.deviceConstants, platform, deviceConstants)) {
                continue;
            }
            // Features the project requires (see config.features)
            const featuresOk = (projectCfg.requiresFeatures || []).every((name) =>
                matchRestriction(config.features[name], version, platform, deviceConstants));
            if (!featuresOk) {
                continue;
            }
            targets.push({ version, platform });
        }
    }
    targets.sort((a, b) => compareVersions(b.version, a.version) || (a.platform < b.platform ? -1 : 1));
    return targets;
}

// ---------------------------------------------------------------------------------------------
// Building

async function compile(projectName, version, platform) {
    const projectDir = path.join(projectsDir, projectName);
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pbt-'));
    try {
        // Projects that include assets (assetOtaDir in project.properties) produce a .zip bundle
        const props = fs.readFileSync(path.join(projectDir, 'project.properties'), 'utf8');
        const outName = /^assetOtaDir\s*=/m.test(props) ? 'firmware.zip' : 'firmware.bin';
        const args = ['compile', platform, projectDir, '--target', version, '--saveTo', path.join(tmpDir, outName)];
        const result = await exec('particle', args, { timeout: argv.timeout * 1000, cwd: tmpDir });
        const log = result.stderr + '\n' + result.stdout;

        const logDir = path.join(logsDir, projectName);
        fs.mkdirSync(logDir, { recursive: true });
        fs.writeFileSync(path.join(logDir, version + '-' + platform + '.log'), log);

        const binaryOk = fs.existsSync(path.join(tmpDir, outName));
        return { success: !result.error && binaryOk, log, timedOut: !!(result.error && result.error.killed) };
    }
    finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
    }
}

/**
 * Reduces compiler output to the interesting lines: errors (not the long compiler command lines),
 * or the last lines if there are none.
 */
function tail(log, lines) {
    const arr = log.split('\n').filter((l) => l.trim().length);
    const isCommand = (l) => /^(ccache |arm-none-eabi-|make|mkdir|Invoking|Building)/.test(l);
    const errors = arr.filter((l) => /error|undefined reference|ld:|Compile failed/i.test(l) && !isCommand(l));
    return (errors.length ? errors : arr.filter((l) => !isCommand(l))).slice(0, lines).map((l) => l.slice(0, 240)).join('\n');
}

/** Runs async tasks (functions) with limited concurrency */
async function runPool(tasks, concurrency) {
    let next = 0;
    const worker = async () => {
        while (next < tasks.length) {
            const task = tasks[next++];
            await task();
        }
    };
    await Promise.all(Array.from({ length: Math.max(1, concurrency) }, worker));
}

// ---------------------------------------------------------------------------------------------
// Main

async function main() {
    const deviceOs = loadDeviceOsVersions();
    const config = loadConfig();
    const deviceConstants = loadDeviceConstants();
    const isFullRun = !argv.project && !argv['os-version'] && !argv.platform;

    // Common versions
    let defaultVersions;
    if (argv['os-version']) {
        defaultVersions = [];
        for (const version of argv['os-version'].map(String)) {
            if (!deviceOs.byVersion[version]) {
                console.log('version ' + version + ' is not in deviceOsVersions.json');
                process.exit(2);
            }
            defaultVersions.push({ version, reason: 'command line' });
        }
    }
    else {
        defaultVersions = selectDefaultVersions(deviceOs, config.defaults);
    }
    for (const v of config.defaults.extraVersions || []) {
        if (!deviceOs.byVersion[v]) {
            console.log('warning: extraVersions entry ' + v + ' is not in deviceOsVersions.json, ignoring');
        }
    }
    console.log('Device OS versions: ' + defaultVersions.map((v) => v.version + ' (' + v.reason + ')').join(', '));

    // Check that the feature names used by projects exist, and the platforms are in deviceConstants
    for (const name of Object.keys(config.projects)) {
        const pc = (config.projects[name] && config.projects[name].config) || {};
        for (const f of pc.requiresFeatures || []) {
            if (!config.features[f]) {
                console.log('project ' + name + ' requires feature ' + f + ' that is not in the features list of the config');
                process.exit(2);
            }
        }
    }
    for (const p of config.defaults.platforms) {
        if (!deviceConstants[p]) {
            console.log('warning: platform ' + p + ' is not in deviceConstants in carriers.json');
        }
    }

    // Projects: add entries for new projects, report removed ones
    const projectNames = findProjects();
    for (const name of projectNames) {
        if (!config.projects[name]) {
            config.projects[name] = { config: {} };
            console.log('added new project ' + name + ' to config');
        }
        config.projects[name].config = config.projects[name].config || {};
    }
    const removed = Object.keys(config.projects).filter((name) => !projectNames.includes(name));
    for (const name of removed) {
        console.log('project ' + name + ' is in the config but not in the projects directory' + (isFullRun && !argv['dry-run'] ? ', removing' : ''));
        if (isFullRun && !argv['dry-run']) {
            delete config.projects[name];
        }
    }

    if (argv.project) {
        for (const name of argv.project) {
            if (!projectNames.includes(name)) {
                console.log('project ' + name + ' not found (no directory with a project.properties)');
                process.exit(2);
            }
        }
    }

    // Work out what needs to be built
    const jobs = [];
    const summary = { projects: {}, built: 0, failed: 0, skippedOk: 0, skippedFailed: 0 };

    for (const name of projectNames) {
        if (argv.project && !argv.project.includes(name)) {
            continue;
        }
        const entry = config.projects[name];
        const projectCfg = entry.config;
        const sum = summary.projects[name] = { failures: [], disabled: false, builds: 0 };

        if (projectCfg.disabled) {
            sum.disabled = true;
            continue;
        }

        const targets = computeTargets(projectCfg, defaultVersions, deviceOs, config, deviceConstants);
        const hash = hashProject(name);

        if (!entry.results || entry.results.hash !== hash) {
            // Source changed (or never built). Old results no longer apply.
            if (!argv['dry-run']) {
                entry.results = { hash, builds: {} };
            }
            else {
                entry.results = { hash: entry.results ? entry.results.hash : '', builds: {}, stale: true };
            }
        }
        const results = entry.results;

        if (isFullRun && !argv['dry-run']) {
            // Drop results for versions and platforms that are no longer being tested
            for (const version of Object.keys(results.builds)) {
                for (const platform of Object.keys(results.builds[version])) {
                    if (!targets.find((t) => t.version === version && t.platform === platform)) {
                        delete results.builds[version][platform];
                    }
                }
                if (!Object.keys(results.builds[version]).length) {
                    delete results.builds[version];
                }
            }
        }

        for (const target of targets) {
            const stored = results.builds[target.version] && results.builds[target.version][target.platform];
            const upToDate = !argv.force && !results.stale && stored && (stored === 'success' || !argv['retry-failed']);
            if (upToDate) {
                if (stored === 'success') {
                    summary.skippedOk++;
                }
                else {
                    summary.skippedFailed++;
                    sum.failures.push({ version: target.version, platform: target.platform, stored: true });
                }
                continue;
            }
            jobs.push({ name, hash, target, results });
        }
        if (!targets.length) {
            console.log(name + ': nothing to test (no version/platform combinations after restrictions)');
        }
    }

    console.log('\n' + jobs.length + ' build(s) to run, ' + (summary.skippedOk + summary.skippedFailed) + ' skipped (source unchanged)\n');

    if (argv['dry-run']) {
        for (const job of jobs) {
            console.log('would build ' + job.name + ' ' + job.target.platform + ' ' + job.target.version);
        }
        return 0;
    }

    if (jobs.length) {
        // Check that the CLI is installed and logged in so we don't record a pile of bogus failures
        const who = await exec('particle', ['whoami'], { timeout: 60000 });
        if (who.error) {
            console.log('The Particle CLI is not installed, or you are not logged in (particle whoami failed).');
            console.log('Install it and run "particle login", then try again.');
            return 2;
        }
        saveConfig(config);
    }

    let done = 0;
    const startTime = Date.now();
    let aborted = false;
    process.on('SIGINT', () => {
        // Results are saved after each build, so nothing is lost
        console.log('\ninterrupted; results of completed builds have been saved');
        aborted = true;
        process.exit(130);
    });

    const tasks = jobs.map((job) => async () => {
        if (aborted) {
            return;
        }
        const label = job.name + ' ' + job.target.platform + ' ' + job.target.version;
        const result = await compile(job.name, job.target.version, job.target.platform);
        done++;
        const progress = '[' + done + '/' + jobs.length + '] ';

        const results = job.results;
        results.builds[job.target.version] = results.builds[job.target.version] || {};
        results.builds[job.target.version][job.target.platform] = result.success ? 'success' : 'failure';
        saveConfig(config);

        const sum = summary.projects[job.name];
        sum.builds++;
        if (result.success) {
            summary.built++;
            console.log(progress + 'ok    ' + label);
        }
        else {
            summary.failed++;
            sum.failures.push({ version: job.target.version, platform: job.target.platform, stored: false });
            console.log(progress + 'FAIL  ' + label + (result.timedOut ? ' (timed out)' : ''));
            console.log('      ' + (argv['verbose-fail'] ? result.log : tail(result.log, 12)).split('\n').join('\n      '));
            console.log('      full log: ' + path.join(logsDir, job.name, job.target.version + '-' + job.target.platform + '.log'));
        }
    });
    await runPool(tasks, argv.concurrency);

    // Summary
    console.log('\n==================== Summary ====================');
    console.log('Built now: ' + (summary.built + summary.failed) + ' (' + summary.built + ' succeeded, ' + summary.failed + ' failed) in ' +
        Math.round((Date.now() - startTime) / 1000) + ' seconds');
    console.log('Skipped, source unchanged: ' + (summary.skippedOk + summary.skippedFailed) +
        ' (' + summary.skippedOk + ' succeeded previously, ' + summary.skippedFailed + ' failed previously)');

    const disabled = Object.keys(summary.projects).filter((n) => summary.projects[n].disabled);
    if (disabled.length) {
        console.log('Disabled projects: ' + disabled.join(', '));
    }

    let failureCount = 0;
    for (const name of Object.keys(summary.projects)) {
        const failures = summary.projects[name].failures;
        if (!failures.length) {
            continue;
        }
        failureCount += failures.length;
        console.log('\n' + name + ':');
        for (const f of failures) {
            console.log('  FAILED ' + f.platform + ' ' + f.version + (f.stored ? ' (stored result, use --retry-failed to rebuild)' : ''));
        }
    }

    if (failureCount === 0) {
        console.log('\nAll tests succeeded');
        return 0;
    }
    console.log('\n' + failureCount + ' build(s) failed');
    return 1;
}

main().then((code) => {
    process.exit(code);
}).catch((e) => {
    console.log('unexpected error', e);
    process.exit(2);
});
