const { execSync } = require('child_process');
const { existsSync, mkdirSync } = require('fs');

/* gulp */
const gulp = require('gulp');
const through = require('through2');
/* gulp — md to pdf */
const replace = require('gulp-replace');
const markdown = require('gulp-markdown');
const header = require('gulp-header');
const footer = require('gulp-footer');
/* gulp — css */
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
/* gulp — utilities */
const rename = require('gulp-rename');
const ignore = require('gulp-ignore');

/* utilities */
const del = require('del');
const md5 = require('md5');
const fs = require('fs');
// const browserSync = require('browser-sync'); // for dev purposes, `npm i browser-sync`

/* ---------------- */

// browserSync.create();
process.chdir('../..'); // go back to repo dir

const paths = {
    build: '_pdf-datasheets-build',
    distrib: 'src/assets/pdfs/datasheets',
    md: ['src/content/reference/datasheets/**/*.md', 'src/content/reference/technical-advisory-notices/*.md'],
    assets: 'src/assets/**/*',
    css: 'scripts/pdf-generation/styles/**/*.{css,less}',
    cssEntry: 'scripts/pdf-generation/styles/datasheets.less',
    covers: 'src/content/datasheets/covers', // for wkHTMLtoPDF
    xsl: 'scripts/pdf-generation/styles/toc.xsl', // for wkHTMLtoPDF
    hashes: 'scripts/pdf-generation/hashes.json'
};


/* ---------------- determine unchanged files from hash ---------------- */
function filterUnchanged(vf) {
	// Passed to ignore.include (gulp-ignore)
	// https://www.npmjs.com/package/gulp-ignore

    if (vf.relative.startsWith('app-notes')) { 
        return false;
    }

	var md = md5(vf.contents);
	
	var hashes = {};
	try {
		hashes = JSON.parse(fs.readFileSync(paths.hashes, 'utf8'));
	}
	catch (e) {		
		console.log('hashes file ' + paths.hashes + ' not valid or not found');
	}
	
	if (hashes[vf.relative] === md) {
		// Matches
		console.log(vf.relative + ' matches hash, not processing again');
		return false;
	}
	
	hashes[vf.relative] = md;
	fs.writeFileSync(paths.hashes, JSON.stringify(hashes, Object.keys(hashes).sort(), 2));

	console.log(vf.relative + ' changed, will rebuild');

	return true;
}
/* ---------------- handlebars substitutions ---------------- */

function sinceHandler(src) {
    const when = src.match(/when=\"([^\"]+)\"/);
    if (when && when.length >= 2 && when[1]) {
        return '\n_Since ' + when[1] + '_:\n\n';
    }
    else {
        return '';
    }
}

function noteHandler(src) {
    if (src.includes('op="end"')) {
        return '';
    }
    const type = src.match(/type=\"([^\"]+)\"/);
    if (type && type.length >= 2 && type[1]) {
        let message = '';

        if (type[1].indexOf("warning") >= 0) {
            message = 'Warning:';
        }
        else
        if (type[1].indexOf("note") >= 0) {
            message = 'Note:';
        }
        else
        if (type[1].indexOf("cellular") >= 0) {
            if (type[1].indexOf("gen3") >= 0) {
                message = 'Gen 3 Cellular Devices:';
            }
            else if (type[1].indexOf("gen2") >= 0) {
                message = 'Gen 2 Cellular Devices:';
            }
            else {
                message = 'Cellular Devices:';
            }
        }
        else
        if (type[1].indexOf("wifi") >= 0) {
            if (type[1].indexOf("gen3") >= 0) {
                message = 'Gen 3 Wi-Fi Devices:';
            }
            else if (type[1].indexOf("gen2") >= 0) {
                message = 'Gen 2 Wi-Fi Devices:';
            }
            else {
                message = 'Wi-Fi Devices:';
            }
        }
        else
        if (type[1].indexOf("gen3") >= 0) {
            message = 'Gen 3 Devices:';
        }
        else
        if (type[1].indexOf("gen2") >= 0) {
            message = 'Gen 2 Devices:';
        }

        return '\n**' + message + '**\n\n';
    }
    else {
        return '';
    }
}

/* ---------------- wkHTMLtoPDF ---------------- */

function toPDF() {
    return through.obj((file, encoding, callback) => {
        const filePath = [...file.history].pop();
        const fileName = filePath.split('/').pop().replace(/\.[^.]*$/, '');
        const coverPath = `${paths.covers}/${fileName}.html`;
        const commandArgs = [
            `wkhtmltopdf`,
            `--enable-local-file-access`,
            `--dpi 300`,
            existsSync(coverPath) ? `cover ${coverPath}` : '',
            `toc --xsl-style-sheet ${paths.xsl}`,
            `${filePath}`,
            `${paths.distrib}/${fileName}.pdf`,
        ];
        const command = commandArgs.join(' ');
        console.log('');
        if (!existsSync(coverPath)) {
            console.warn(`⚠️   There is no cover for ${fileName} datasheet.`);
        }
        console.dir({ Running: command }, { colors: true });
        execSync(command);
        callback(null, file);
    });
}

/* ---------------- CSS ---------------- */

const processors = [
    autoprefixer({ browsers: ['Safari >= 6'] }),
];

gulp.task('css', () => gulp.src(paths.cssEntry)
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(paths.build))
    // .pipe(browserSync.stream())
);

/* ---------------- Assets ---------------- */

gulp.task('assets', () => gulp.src(paths.assets)
    .pipe(gulp.dest(`${paths.build}/assets`))
);

/* ---------------- Transfrom MD to PDF ---------------- */

gulp.task('transfrom md to pdf', () => gulp.src(paths.md)
    .pipe(replace(/^---$[^]*?^---$/m, '')) // strip frontmatter
    .pipe(replace(/{{#unless pdf-generation}}[^]*?{{\/unless}} {{!-- pdf-generation --}}/mg, '')) // strip sections from the pdf
    .pipe(ignore.include(filterUnchanged))
    .pipe(replace(/{{imageOverlay (.*)}}/g, '<img $1>')) // Convert imageOverlay to img tags
    .pipe(replace(/{{migration-guide (.*)}}/g, '')) 
    .pipe(replace(/{{title (.*)}}/g, '')) 
    .pipe(replace(/{{box (.*)}}/g, '')) // Strip out box helper
    .pipe(replace(/{{api (.*)}}/g, '')) 
    .pipe(replace(/{{since (.*)}}/g, sinceHandler)) 
    .pipe(replace(/{{note (.*)}}/g, noteHandler)) 
    .pipe(replace(/\/assets\//g, '../assets/')) // fix relative paths
    .pipe(replace(/{{assets}}/g, '../assets')) // fix relative paths
    .pipe(replace(/{{!--(.*)--}}/g, '')) // Remove comments
    .pipe(replace(/\]\(\//g, '](https://docs.particle.io/')) // point to website in non-assets cases
    .pipe(markdown())
    .pipe(replace(/href="\./g, 'href="https://docs.particle.io')) // point to website's assets (to pdfs mostly)
    .pipe(header('<!DOCTYPE html> <html> <head> <meta charset="utf-8"> <link rel="stylesheet" href="../style.css"> </head> <body>'))
    .pipe(footer('</body> </html>'))
    .pipe(gulp.dest(paths.build))
    .pipe(toPDF())
);

/* ---------------- */

gulp.task('prepare dirs', (cb) => {
    del.sync(paths.build);
    if (!existsSync(paths.build)) {
        mkdirSync(paths.build);
    }
    if (!existsSync(paths.distrib)) {
        mkdirSync(paths.distrib);
    }
    cb();
});

gulp.task('default', gulp.series('prepare dirs', 'assets', 'css', 'transfrom md to pdf'), (cb) => {
    // browserSync.init({
    //     server: {
    //         baseDir: paths.build,
    //     },
    //     port: 2017,
    //     notify: false,
    // });
    // gulp.watch(paths.md, ['md']);
    // gulp.watch(paths.css, ['css']);
    // gulp.watch(paths.assets, ['assets']);
    cb();
});
