define(["require", "exports"], function (require, exports) {
    var File = (function () {
        function File(path, content) {
            if (content === void 0) { content = ""; }
            this.content = "";
            this.path = path;
            this.content = content;
        }
        File.prototype.write = function (str) {
            this.content += "\n" + str;
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
            setInterval(function () {
                this.console.saveToLocalStorage();
            }.bind(this), this.intervalSaveBuffer);
        }
        FileSystem.prototype.setState = function (state) {
            state = state || {};
            this.files = {};
            Object.keys(state).forEach(function (fileName) {
                this.files[fileName] = new File(fileName, state[fileName]);
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
            return this.files[fileName] = new File(fileName);
        };
        return FileSystem;
    })();
    return FileSystem;
});
