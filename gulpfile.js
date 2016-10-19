var gulp = require('gulp');

var uncss = require('gulp-uncss');
 
gulp.task('default', function () {
    return gulp.src('app/css/**/*.css')
        .pipe(uncss({
            html: ['index.html', '**/*.html', 'http://example.com']
        }))
        .pipe(gulp.dest('.dist/css'));
});