var gulp = require('gulp');
var gutil = require('gulp-util');
//var shell = require('gulp-shell');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");


// 默认的任务
gulp.task('default', ['webpack'], function () {
    console.log('default');
    gulp.src('./src/asset/**')
        .pipe(gulp.dest('./dist/asset'));
});

gulp.task("webpack", function (callback) {
    // run webpack
    webpack(require('./webpack.config'), function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function (callback) {
    // Start a webpack-dev-server
    var compiler = webpack(require('./webpack.config'));
    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8090, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8090/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});


// 编译(build|compile) -> 打包(packager) -> 发布(publish|deploy)

gulp.task('init', function () {
    console.log('init');
});

gulp.task('install', function () {
    console.log('install');
});

gulp.task('serve', function () {
    console.log('serve');
});

gulp.task('build', ['clean', 'lint', 'parser', 'standard', 'optimizer', 'packager', 'deploy'], function () {
    console.log('build');
});

gulp.task('watch', function () {
    console.log('watch');
});

gulp.task('test', function () {
    console.log('test');
});

gulp.task('clean', function () {
    console.log('clean');
});

gulp.task('lint', function () {
    console.log('lint');
});

gulp.task('parser', function () {
    console.log('parser');
});

gulp.task('standard', function () {
    console.log('preprocessor');
    console.log('standard');
    console.log('postprocessor');
});

gulp.task('optimizer', function () {
    console.log('optimizer');
});

gulp.task('packager', function () {
    console.log('prepackager');
    console.log('packager');
    console.log('spriter');
    console.log('postpackager');
});

gulp.task('deploy', function () {
    console.log('deploy');
});

// gulp.task('dev', function () {
//     console.log('development');
// });
//
// gulp.task('sit', function () {
//     console.log('testing');
// });
//
// gulp.task('uat', function () {
//     console.log('testing');
// });
//
// gulp.task('prd', function () {
//     console.log('production');
// });
