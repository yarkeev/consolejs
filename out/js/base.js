define(["require", "exports"], function (require, exports) {
    return function (webConsole) {
        webConsole.registerApi("log", function (message, fileName) {
            if (fileName === void 0) { fileName = null; }
            var file;
            if (!fileName) {
                webConsole.print(message);
            }
            else {
                file = webConsole.fileSystem.getFileByName(fileName);
                if (!file) {
                    file = webConsole.fileSystem.createFile(fileName);
                }
                file.write(message);
            }
        });
        webConsole.registerCommand("clear", false, function () {
            webConsole.clear();
        });
        webConsole.registerCommand("grep", false, function (output, args) {
            var str = String(output).toLowerCase(), search = String(args[0]).toLowerCase(), result = "", i = -1, start, end;
            while ((i = str.indexOf(search, i + 1)) !== -1) {
                start = str.lastIndexOf("<br/>", i);
                end = str.indexOf("<br/>", i);
                end = end === -1 ? String(output).length : end;
                result += String(output).slice(start, end);
            }
            return result;
        });
        webConsole.registerCommand("cat", false, function (output, args) {
            var result, fileName = args[0], file = webConsole.fileSystem.getFileByName(fileName);
            if (file) {
                result = file.getContent();
            }
            else {
                result = fileName + ": No such file or directory";
            }
            return result;
        });
        webConsole.registerCommand("tail", true, function (output, args) {
            var result, fileName = args[0], file = webConsole.fileSystem.getFileByName(fileName), lastResult = "";
            if (file) {
                result = file.getContent();
            }
            else {
                result = fileName + ": No such file or directory";
            }
            return function () {
                var ret, fileContent = file.getContent();
                ret = fileContent.slice(lastResult.length);
                if (ret) {
                    lastResult += ret;
                }
                return ret;
            };
        });
    };
});
