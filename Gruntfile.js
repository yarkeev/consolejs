module.exports = function (grunt) {
	'use strict';

	require('./grunt/config/main')(grunt);
	require('./grunt/utils/load-npm-tasks')(grunt);
	grunt.loadTasks('grunt/tasks');

	grunt.registerTask('js', [
		'handlebars',
		'typescript',
		'requirejs',
		'wrap-dist'
	]);

};