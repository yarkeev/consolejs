module.exports = function (grunt) {
    'use strict';

    grunt.config.set('wrap-dist', {
        main: {
            src: ['out/dist/web-console.js']
        }
    });
};
