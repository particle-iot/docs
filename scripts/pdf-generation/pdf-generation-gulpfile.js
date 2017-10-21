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

/* utilities */
const del = require('del');
// const browserSync = require('browser-sync'); // for dev purposes, `npm i browser-sync`

/* ---------------- */

// browserSync.create();
process.chdir('../..'); // go back to repo dir

const paths = {
    build: '_pdf-datasheets-build',
    distrib: 'src/assets/pdfs/datasheets',
    md: 'src/content/datasheets/**/*.md',
    assets: 'src/assets/**/*',
    css: 'scripts/pdf-generation/styles/**/*.{css,less}',
    cssEntry: 'scripts/pdf-generation/styles/datasheets.less',
    covers: 'src/content/datasheets/covers', // for wkHTMLtoPDF
    xsl: 'scripts/pdf-generation/styles/toc.xsl', // for wkHTMLtoPDF
};

/* ---------------- wkHTMLtoPDF ---------------- */

function toPDF() {
    return through.obj((file, encoding, callback) => {
        const filePath = [...file.history].pop();
        const fileName = filePath.split('/').pop().replace(/\.[^.]*$/, '');
        const coverPath = `${paths.covers}/${fileName}.html`;
        const commandArgs = [
            `wkhtmltopdf`,
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

gulp.task('transfrom md to pdf', ['assets', 'css'], () => gulp.src(paths.md)
    .pipe(replace(/^---$[^]*?^---$/m, '')) // strip frontmatter
    .pipe(replace(/{{#unless pdf-generation}}[^]*?{{\/unless}} {{!-- pdf-generation --}}/mg, '')) // strip sections from the pdf
    .pipe(replace(/\/assets\//g, './assets/')) // fix relative paths
    .pipe(replace(/{{assets}}/g, './assets')) // fix relative paths
    .pipe(replace(/\]\(\//g, '](https://docs.particle.io/')) // point to website in non-assets cases
    .pipe(markdown())
    .pipe(replace(/href="\./g, 'href="https://docs.particle.io')) // point to website's assets (to pdfs mostly)
    .pipe(header('<!DOCTYPE html> <html> <head> <meta charset="utf-8"> <link rel="stylesheet" href="style.css"> </head> <body>'))
    .pipe(footer('</body> </html>'))
    .pipe(gulp.dest(paths.build))
    .pipe(toPDF())
);

/* ---------------- */

gulp.task('prepare dirs', () => {
    del.sync(paths.build);
    del.sync(paths.distrib);
    if (!existsSync(paths.build)) {
        mkdirSync(paths.build);
    }
    if (!existsSync(paths.distrib)) {
        mkdirSync(paths.distrib);
    }
});

gulp.task('default', ['prepare dirs', 'assets', 'css', 'transfrom md to pdf'], () => {
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
});
