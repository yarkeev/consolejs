module.exports = function (grunt) {
    'use strict';

    grunt.config.set('typescript', {
        main: {
            src: ['src/js/**/*.ts'],
            dest: 'out/js/',
            options: {
                module: 'amd', //or commonjs 
                target: 'es5' //or es3 
            }
        }
    });
};