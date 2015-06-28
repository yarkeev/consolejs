define(["require", "exports"], function (require, exports) {
    var File = (function () {
        function File(console, path, content) {
            if (content === void 0) { content = ""; }
            this.content = "";
            this.console = console;
            this.path = path;
            this.content = content;
        }
        File.prototype.write = function (str) {
            var lines, start;
            this.content += "\n" + str;
            lines = this.content.split("\n");
            start = lines.length - this.console.getSetting("fileSystem.linesLimit");
            if (start > 0) {
                lines = lines.slice(start);
            }
            this.content = lines.join("\n");
        };
        File.prototype.getContent = function () {
            return this.content.replace(/\n/g, "<br/>");
        };
        File.prototype.setContent = function (content) {
            return this.content = content;
        };
        return File;
    })();
    var FileSystem = (function () {
        function FileSystem(console) {
            this.console = console;
            this.files = {};
            setInterval(function () {
                this.console.saveToLocalStorage();
            }.bind(this), this.intervalSaveBuffer);
        }
        FileSystem.prototype.setState = function (state) {
            state = state || {};
            this.files = {};
            Object.keys(state).forEach(function (fileName) {
                this.files[fileName] = new File(this.console, fileName, state[fileName]);
            }.bind(this));
        };
        FileSystem.prototype.toJSON = function () {
            var json = {};
            Object.keys(this.files).forEach(function (fileName) {
                json[fileName] = this.files[fileName].content;
            }.bind(this));
            return json;
        };
        FileSystem.prototype.getFileByName = function (fileName) {
            return this.files[fileName];
        };
        FileSystem.prototype.createFile = function (fileName) {
            return this.files[fileName] = new File(this.console, fileName, "");
        };
        return FileSystem;
    })();
    return FileSystem;
});
