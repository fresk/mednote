var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var envify = require('envify/custom');
var partialify = require('partialify');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var rimraf = require('gulp-rimraf');
var notify = require('gulp-notify');
var markdown = require('gulp-markdown');
var browserSync = require('browser-sync');
var reactify = require('reactify');

// default task /////////////////////////////////////////////////
gulp.task('default', ['build'], function() {
    browserSync({
        tunnel: true,
        open: false,
        files: ['./build/**/*', '!./build/lib/**/*'],
        ghostMode: false,
        reloadDelay: 200,
        notify: false,
        server: {
            baseDir: './build',
        },
    });

    gulp.watch('public/**/*.js', ['browserify']);
    gulp.watch('public/img/**/*', ['files']);
    gulp.watch('public/content/**/*', ['files']);
    gulp.watch('public/**/*.css', ['files']);
    gulp.watch('public/**/*.less', ['files']);

});

gulp.task('clean', function() {
    return gulp.src(['build/**/*'], {
        read: false
    }).pipe(rimraf());
});






// build tasks //////////////////////////////////////////////////
gulp.task('build', ['browserify', 'files']);

gulp.task('browserify', ['files'], function() {
    var environ = {
        NODE_ENV: process.env.NODE_ENV
    };

    browserify()
        .add('./public/main.js')
        .require('react')
        .transfrom('brfs')
        .transform(envify(environ))
        .transform(partialify)
        .transform(reactify)
        .bundle({
            debug: process.env.NODE_ENV != 'production'
        })
        .on('error', function(err) {
            notify.onError('Error: <%= error.message %>')(err);
            this.end();
        })
        .pipe(source('index.js'))
        .pipe(gulp.dest('build/'));
});



// assets //////////////////////////////////////////////////////
gulp.task('files', ['css', 'markdown'], function() {
     gulp.src(['./public/content/**/*'])
         .pipe(gulp.dest('build/'));
});


gulp.task('markdown', function() {
    return gulp.src(['./public/**/*.md'])
        .pipe(markdown())
        .pipe(gulp.dest('public/'));
});


gulp.task('css', ['less'], function() {
    return gulp.src(['public/**/*.css'])
        .pipe(autoprefixer('last 1 version'))
        .pipe(gulp.dest('./build'))
});

gulp.task('less', function() {
    var less_transform = less();
    less_transform.on('error', function(err) {
        notify.onError('<%= error.message %>')(err);
        this.end();
    });
    return gulp.src('./public/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less_transform)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build'));
});


gulp.task('favicon', function() {
    return gulp.src('public/img/favicon.ico')
        .pipe(gulp.dest('build/'));
});
