module.exports = function (grunt) {
    'use strict';

    grunt.config.set('tslint', {
        options: {
            configuration: grunt.file.readJSON('grunt/config/tslint.json')
        },
        files: {
            src: ['src/js/**/*.ts']
        }
    });
};