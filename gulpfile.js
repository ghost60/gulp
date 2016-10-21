var gulp = require('gulp');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
 
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
        .pipe(gulp.dest('app/dist/css'));
});

// 预处理sass
gulp.task('sass', function(){
  return gulp.src('app/css/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('app/dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//合并压缩js css 在html里面加注释不能少
gulp.task('useref', function(){
  return gulp.src('app/*.html')
  		.pipe(gulpIf('*.css', minifyCSS()))
    	.pipe(gulpIf('*.js', uglify()))
    	.pipe(useref())
   	    .pipe(gulp.dest('dist'))
});

//压缩css
gulp.task('comcss', function(){
  return gulp.src('dist/css/*.css')
  		.pipe(minifyCSS())
   	    .pipe(gulp.dest('dist'))
});
//压缩js
gulp.task('comjs', function(){
  return gulp.src('dist/js/*.js')
  		.pipe(useref())
   	    .pipe(gulp.dest('dist'))
});

//压缩图片
var imagemin = require('gulp-imagemin');
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
});

//监听文件
//在watch任务之前告知Gulp，先把browserSync和Sass任务执行了再说
gulp.task('watch', ['browserSync', 'sass', 'uncss'], function (){
  gulp.watch('app/css/**/*.scss', ['sass']);
  // Other watchers
})
//现在你执行gulp watch命令，在执行完browserSync和Sass，才会开始监听



//通配
// 1. *.scss ： * 号匹配当前目录任意文件，所以这里 *.scss 匹配当前目录下所有scss文件
// 2. **/*.scss ：匹配当前目录及其子目录下的所有scss文件。
// 3. !not-me.scss ：！号移除匹配的文件，这里将移除not-me.scss
// 4. *.+(scss|sass) ：+号后面会跟着圆括号，里面的元素用|分割，匹配多个选项。这里将匹配scss和sass文件。