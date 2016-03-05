var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    concat = require('gulp-concat-util');
 
function host(){
    var port = 8000;

    var app = connect();

    app.use(serveStatic(__dirname + '/src/'));
    app.listen(port);

    console.log('Server running at http://localhost:' + port);
}


gulp.task('build.app', function () {
    return gulp.src('app/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            target: 'ES5',
            module: 'umd',
            removeComments: true,
            outFile: 'app.js'
        }))
        .pipe(gulp.dest('src/scripts/'));
});

gulp.task('build.tests', function () {
    return gulp.src('tests/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            target: 'ES5',
            module: 'amd',
            removeComments: true,
            outFile: 'runJasmine.js'
        }))
        .pipe(concat.header('// file: <%= file.path %>\n'))
        .pipe(concat.footer('\n// end\n'))
        .pipe(gulp.dest('src/scripts/tests/'));
});

gulp.task('watch', ['build.app', 'build.tests'], function() {
    host();
    gulp.watch('app/**/*.ts', ['build.app','build.tests']);
    gulp.watch('tests/**/*.ts', ['build.tests']);
});