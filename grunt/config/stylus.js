module.exports = function (grunt) {
	'use strict';

	grunt.config.set('stylus', {
		compile: {
			options: {
				urlfunc: {
					name: 'embedurl',
					paths: ['src/img']
				}
			},
			files: {
				'out/css/web-console.css': ['src/css/**/*.styl']
			}
		}
	});
};