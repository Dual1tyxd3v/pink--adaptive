const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const cssMin = require("gulp-csso");
const rename = require("gulp-rename");
const imageMin = require("gulp-imagemin");
const jsMin = require("gulp-jsmin");
const webP = require("gulp-webp");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(cssMin())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

const images = () => {
  return gulp.src("source/img/*.{jpg,png,svg}")
    .pipe(imageMin([
      imageMin.optipng({optimizationLevel: 3}),
      imageMin.mozjpeg({progressive: true}),
      imageMin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
}

const webPIMG = () => {
  return gulp.src("build/img/*.{jpg,png}")
    .pipe(webP({quality: 90}))
    .pipe(gulp.dest("build/img"));
}

const js = () => {
  return gulp.src("source/js/*.js")
    .pipe(gulp.dest("build/js"))
    .pipe(jsMin())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"));
}

const build = () => {
  styles();
  js();
  images();
  webPIMG();
  copyHTML();
  copyFonts();
}
exports.build = build;

const copyHTML = () => {
  return gulp.src("source/*.html")
  .pipe(gulp.dest("build"));
}

const copyFonts = () => {
  return gulp.src("source/fonts/*.{woff,woff2}")
  .pipe(gulp.dest("build/fonts"));
}

exports.styles = styles;
exports.js = js;
exports.images = images;
exports.copyHTML = copyHTML;
exports.copyFonts = copyFonts;
exports.webPIMG = webPIMG;


// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher, js, images, copyHTML, copyFonts, build
);
