const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
//const gulpPug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
const sourseMaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const webpack = require("webpack-stream");
const imgmin = require("gulp-imagemin");
const change = require("gulp-changed");
const babel = require("gulp-babel");
const fileSystem = require("fs");
const changed = require("gulp-changed");

gulp.task("clean", function (done) {
  if (fileSystem.existsSync("./dist/")) {
    return gulp.src("./dist/", { read: false }).pipe(clean());
  }
  done();
});

const fileIncludeSettins = {
  prefix: "@@",
  basepath: "@file",
};

/////////////////////////Таски для html,css,js

const plumberHtml = {
  errorHandler: notify.onError({
    title: "Html",
    message: "Error <%= error.message %>",
    sound: false,
  }),
};

gulp.task("html", function () {
  return gulp
    .src(["./src/html/**/*.html", "!./src/html/blocks/*.html"])
    .pipe(change("./dist/"))
    .pipe(plumber(plumberHtml))
    .pipe(fileInclude(fileIncludeSettins))
    .pipe(gulp.dest("./dist/"));
});

const plumberSass = {
  errorHandler: notify.onError({
    title: "Styles",
    message: "Error <%= error.message %>",
    sound: false,
  }),
};

gulp.task("sass", function () {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(change("./dist/css/"))
    .pipe(plumber(plumberSass))
    .pipe(sourseMaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(sourseMaps.write())
    .pipe(gulp.dest("./dist/css/"));
});

const plumberJs = {
  errorHandler: notify.onError({
    title: "Script",
    message: "Error <%= error.message %>",
    sound: false,
  }),
};
gulp.task("js", function () {
  //return gulp.src("./src/js/**/*").pipe(gulp.dest("./dist/js/"));
  return gulp
    .src("./src/js/**/*.js")
    .pipe(change("./dist/js/"))
    .pipe(plumber(plumberJs))
    // .pipe(webpack(require("./webpack.config.js")))
    // .pipe(
    //   babel({
    //     presets: ["@babel/env"],
    //   })
    // )
    .pipe(gulp.dest("./dist/js/"));
});

/////////////////////////Таски для прочих файлов

gulp.task("images", function () {
  return gulp
    .src("./src/img/**/*")
    .pipe(change("./dist/img/"))
    //.pipe(imgmin({ verbose: true }))
    .pipe(gulp.dest("./dist/img/"));
});

gulp.task('imageMin', function(){
  return gulp
    .src("./src/img/**/*")
    .pipe(imgmin({ verbose: true }))
    .pipe(gulp.dest("./dist/img/"));
})

gulp.task("fonts", function () {
  return gulp
    .src("./src/fonts/**/*")
    .pipe(change("./dist/fonts/"))
    .pipe(gulp.dest("./dist/fonts/"));
});

gulp.task("files", function () {
  return gulp
    .src("./src/files/**/*")
    .pipe(change("./dist/files/"))
    .pipe(gulp.dest("./dist/files/"));
});

const serverSettings = {
  livereload: true,
  open: true,
};

/////////////////////////Таски для сервера и дефолтный

gulp.task("server", function () {
  return gulp.src("./dist/").pipe(server(serverSettings));
});

gulp.task("watch", function () {
  gulp.watch("./src/**/*.html", gulp.parallel("html"));
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("sass"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("js"));
  gulp.watch("./src/img/**/*", gulp.parallel("images"));
  gulp.watch("./src/fonts/**/*", gulp.parallel("fonts"));
  gulp.watch("./src/files/**/*", gulp.parallel("files"));
});

gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("html", "sass", "images", "fonts", "files", "js"),
    gulp.parallel("server", "watch")
  )
);
