'use strict';

import gulp     from 'gulp';
import path     from 'path';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import fs       from 'fs';
import yargs    from 'yargs';
import lodash   from 'lodash';
import gutil    from 'gulp-util';
import del      from 'del';
import autoRegister from './autoRegister.js'

let root = 'src';

// helper method for resolving paths
let resolveToApp = (glob = '') =>{
    return path.join(root,'pages',glob); // app/{glob}
};

let resolveToPages = (glob = '') =>{
    return path.join(root,'router',glob); // app/pages/{glob}
};

// map of all paths
let paths = {
    // js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files

    output: root,
    blankTemplates: path.join(__dirname,'template','**/*.**'),
    dest: path.join(__dirname,'dist')
};


gulp.task('page', () => {
    const cap = (val) => {
        return val
            .charAt(0)
            .toUpperCase() + val.slice(1);
    };
    const name = yargs.argv.name;
    const parentPath = yargs.argv.parent || '';
    const destPath = path.join(resolveToApp(), parentPath, name);
    const pagefile = path.join(resolveToPages(), 'index.js');
    let upperName = name.substr(0,1).toUpperCase() + name.substr(1, name.length-1)
    console.log(upperName)
    autoRegister(name, pagefile);
    return gulp
        .src(paths.blankTemplates)
        .pipe(template({name: name, upCaseName: cap(upperName)}))
        .pipe(rename((path) => {
            path.basename = path
                .basename
                .replace('template', name);
        }))
        .pipe(gulp.dest(destPath))

});
gulp.task('clean',(cb) =>{
    del([paths.dest]).then(function(paths){
        gutil.log("[clean]",paths);
        cb();
    })
});

gulp.task('default',['serve']);