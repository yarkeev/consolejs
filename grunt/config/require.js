module.exports = function (grunt) {
    'use strict';

    grunt.config.set('requirejs', {
        main: {
            options: {
                mainConfigFile: 'grunt/config/build.js',
                baseUrl: 'out/js',
                name: 'main',
                wrap: {
                    startFile: 'src/components/almond/almond.js'
                },
                optimize: 'none',
                out: 'out/dist/web-console.js'
            }
        }
    });
};
