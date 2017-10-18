import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

/* gulp */
import gulp from 'gulp';
import through from 'through2';
/* gulp — md to pdf */
import replace from 'gulp-replace';
import markdown from 'gulp-markdown';
import header from 'gulp-header';
import footer from 'gulp-footer';
/* gulp — css */
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
/* gulp — utilities */
import rename from 'gulp-rename';

/* browserSync */
// import browserSync from 'browser-sync';

/* utilities */
import del from 'del';

/* ---------------- */

// browserSync.create();
process.chdir('../..'); // go back to repo dir

const paths = {
    build: '_pdf-datasheets-build',
    distrib: '_pdf-datasheets',
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
        // console.dir({ path: filePath, name: fileName }, { colors: true });
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
    .pipe(replace(/^[\s\S]*?<!--.*✂.*-->/, '')) // strip top of the file before cut comment
    .pipe(replace(/\/assets\//g, './assets/')) // fix related paths
    .pipe(replace(/{{assets}}/g, './assets')) // fix related paths
    .pipe(markdown())
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
