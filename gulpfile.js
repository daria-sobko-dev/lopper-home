const { src, dest, watch, series, parallel } = require('gulp');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS    = require('gulp-clean-css');
const terser      = require('gulp-terser');
const htmlmin     = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const sharp       = require('sharp');
const path        = require('path');
const fs          = require('fs');

// Paths
const paths = {
    scss:   'src/scss/**/*.scss',
    js:     'src/js/**/*.js',
    html:   'src/*.html',
    img:    'src/img/**/*.{jpg,jpeg,png,svg,webp}',
    fonts:  'src/fonts/**/*',
    dest:   'dist',
};

// ---- SCSS → CSS ----
function styles() {
    return src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(dest(paths.dest + '/css'))
        .pipe(browserSync.stream());
}

// ---- JS ----
function scripts() {
    return src(paths.js)
        .pipe(terser())
        .pipe(dest(paths.dest + '/js'))
        .pipe(browserSync.stream());
}

// ---- HTML ----
function html() {
    return src(paths.html)
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(dest(paths.dest))
        .pipe(browserSync.stream());
}

// ---- Images (optimize with sharp, originals untouched) ----
async function images() {
    const srcDir  = 'src/img';
    const destDir = path.join(paths.dest, 'img');
    fs.mkdirSync(destDir, { recursive: true });

    const files = fs.readdirSync(srcDir);

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        const srcPath  = path.join(srcDir, file);
        const destPath = path.join(destDir, file);

        if (ext === '.jpg' || ext === '.jpeg') {
            // Resize large JPGs to max 1440px wide, optimize with mozjpeg
            await sharp(srcPath)
                .resize({ width: 1440, withoutEnlargement: true })
                .jpeg({ quality: 85, mozjpeg: true })
                .toFile(destPath);
        } else if (ext === '.png') {
            await sharp(srcPath)
                .png({ quality: 85, compressionLevel: 9 })
                .toFile(destPath);
        } else if (ext === '.webp') {
            // WebP already pre-generated in src — copy as-is
            fs.copyFileSync(srcPath, destPath);
        } else {
            // SVG and other formats — copy as-is
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// ---- Fonts ----
function fonts() {
    return src(paths.fonts, { encoding: false })
        .pipe(dest(paths.dest + '/fonts'));
}

// ---- Swiper CSS (from node_modules) ----
function vendorCSS() {
    return src('node_modules/swiper/swiper-bundle.min.css')
        .pipe(dest(paths.dest + '/css'));
}

// ---- Swiper JS (from node_modules) ----
function vendorJS() {
    return src('node_modules/swiper/swiper-bundle.min.js')
        .pipe(dest(paths.dest + '/js'));
}

// ---- Dev Server ----
function serve() {
    browserSync.init({
        server: { baseDir: paths.dest },
        open: false,
        notify: false,
    });

    watch(paths.scss, styles);
    watch(paths.js, scripts);
    watch(paths.html, html);
    watch(paths.img, images);
}

// ---- Clean ----
async function clean() {
    const { deleteAsync } = await import('del');
    return deleteAsync([paths.dest]);
}

// ---- Tasks ----
const build = series(clean, parallel(styles, scripts, html, images, fonts, vendorCSS, vendorJS));
const dev   = series(build, serve);

exports.styles  = styles;
exports.scripts = scripts;
exports.html    = html;
exports.images  = images;
exports.build   = build;
exports.default = dev;
