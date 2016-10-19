var gulp = require('gulp');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var browserSync = require('browser-sync');
 
gulp.task('hello', function() {
  console.log('Hello World!');
});

//实时刷新浏览器
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
})

//除去无用css
gulp.task('uncss', function () {
    return gulp.src('app/css/**/*.css')
        .pipe(uncss({
            html: ['index.html', '**/*.html', 'http://example.com']
        }))
        .pipe(gulp.dest('dist/css'));
});

// 预处理sass
gulp.task('sass', function(){
  return gulp.src('app/css/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//监听文件
//在watch任务之前告知Gulp，先把browserSync和Sass任务执行了再说
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  // Other watchers
})
//现在你执行gulp watch命令，在执行完browserSync和Sass，才会开始监听



//通配
// 1. *.scss ： * 号匹配当前目录任意文件，所以这里 *.scss 匹配当前目录下所有scss文件
// 2. **/*.scss ：匹配当前目录及其子目录下的所有scss文件。
// 3. !not-me.scss ：！号移除匹配的文件，这里将移除not-me.scss
// 4. *.+(scss|sass) ：+号后面会跟着圆括号，里面的元素用|分割，匹配多个选项。这里将匹配scss和sass文件。