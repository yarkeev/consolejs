module.exports = function (grunt) {
	'use strict';

	grunt.config.set('handlebars', {
		main: {
			options: {
				amd: ['handlebars'],
				processName: function(filePath) {
					grunt.log.ok(filePath);
					return filePath.replace(/(src\/tmpl\/)|(\.hbs)/g, '');
				},
			},
			files: {
				'out/tmpl/tmpl.js' : ['src/tmpl/*.hbs']
			}
		}
	});
};