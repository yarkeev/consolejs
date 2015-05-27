module.exports = function (grunt) {
    'use strict';

    grunt.config.set('watch', {
        css: {
            files: ['src/css/**/*.styl'],
            tasks: ['stylus'],
            options: {
                spawn: false
            }
        },
        handlebars: {
            files: ['src/tmpl/**/*.hbs'],
            tasks: ['js'],
            options: {
                spawn: false
            }
        },
        typescript: {
            files: ['src/js/**/*.ts'],
            tasks: [
                'js',
                'tslint'
            ],
            options: {
                spawn: false
            }
        }
    });
};
