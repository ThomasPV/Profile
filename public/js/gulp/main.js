var g = require('gulp'),
watch = require('gulp-watch'),
postCss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
imports = require('postcss-import'),
vars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
mixins = require('postcss-mixins'),
browserSync = require('browser-sync').create();

g.task('default', function(){
    console.log('Hello Prakash Thomas Varghese...');
    setTimeout(function(){
        console.log('Lets begin building your app.');
    },1000);
});

g.task('watcher', function(){
    browserSync.init({
        server:{
            baseDir:"./"
        }
    });
    watch('./css/**/*.css', function(){
    
        g.start('css-Inject');
    
    });
     watch('./index.html', function(){
        browserSync.reload();
    });
});

g.task('css-Inject',['styles'], function(){
    
    return g.src('./temp/resumeG/resumeG.css').pipe(browserSync.stream());
});

g.task('styles', function(){
   
   
    return  g.src('./css/resumeG.css')
            .pipe(postCss([imports, vars, mixins, nested,autoprefixer]))
            .on('error', function(errorInfo){
                  console.log(errorInfo.toString());
                    this.emit('end');
                })
            .pipe(g.dest('./temp/resumeG'));
  
})