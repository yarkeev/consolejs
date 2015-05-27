module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('wrap-dist', 'wrap dist file', function () {
        this.filesSrc.forEach(function (item) {
            var content = grunt.file.read(item),
                startWrap = '(function () {\n',
                endWrap = '\nrequire(\'main\');\n}).call({});';

             if (content.indexOf(startWrap) !== 0) {
                content = startWrap + content + endWrap;
             }

             grunt.file.write(item, content);
        });
    });
};
