module.exports = function (grunt) {
	'use strict';

	require('./handlebars')(grunt);
	require('./require')(grunt);
	require('./stylus')(grunt);
	require('./tslint')(grunt);
	require('./typescript')(grunt);
	require('./watch')(grunt);
	require('./wrap-dist')(grunt);
};