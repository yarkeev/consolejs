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
        webConsole.registerApi("error", function (message, fileName) {
            if (fileName === void 0) { fileName = null; }
            var file;
            if (!fileName) {
                console.error(message);
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
        webConsole.registerCommand({
            name: "clear",
            description: "clear screen",
            isLocked: false,
            fn: function () {
                webConsole.clear();
            }
        });
        webConsole.registerCommand({
            name: "help",
            description: "display a list of registered commands",
            isLocked: false,
            fn: function () {
                return webConsole.getCommands().map(function (item) {
                    return item.name + " - " + item.description;
                }).join("<br/>");
            }
        });
        webConsole.registerCommand({
            name: "grep",
            description: "filter output",
            isLocked: false,
            fn: function (output, args) {
                var str = String(output).toLowerCase(), search = String(args[0]).toLowerCase(), result = "", i = -1, start, end;
                while ((i = str.indexOf(search, i + 1)) !== -1) {
                    start = str.lastIndexOf("<br/>", i);
                    end = str.indexOf("<br/>", i);
                    end = end === -1 ? String(output).length : end;
                    result += String(output).slice(start, end);
                }
                return result;
            }
        });
        webConsole.registerCommand({
            name: "cat",
            description: "display the contents of a virtual file",
            isLocked: false,
            fn: function (output, args) {
                var result, fileName = args[0], file = webConsole.fileSystem.getFileByName(fileName);
                if (file) {
                    result = file.getContent();
                }
                else {
                    result = fileName + ": No such file or directory";
                }
                return result;
            }
        });
        webConsole.registerCommand({
            name: "tail",
            description: "watched display the contents of a virtual file",
            isLocked: true,
            fn: function (output, args) {
                var result, fileName = args[0], file = webConsole.fileSystem.getFileByName(fileName), lastResult = "";
                if (file) {
                    result = file.getContent();
                }
                else {
                    result = fileName + ": No such file or directory";
                }
                return function () {
                    var ret = null, fileContent;
                    if (file) {
                        fileContent = file.getContent();
                        ret = fileContent.slice(lastResult.length);
                        if (ret) {
                            lastResult += ret;
                        }
                    }
                    return ret;
                };
            }
        });
    };
});
