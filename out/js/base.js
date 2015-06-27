define(["require", "exports"], function (require, exports) {
    return function (webConsole) {
        webConsole.registerApi("log", function (message) {
            webConsole.print(message);
        });
        webConsole.registerCommand("clear", function () {
            webConsole.clear();
        });
        webConsole.registerCommand("grep", function (output, args) {
            var str = String(output).toLowerCase(), search = String(args[0]).toLowerCase(), result = "", i = -1;
            while ((i = str.indexOf(search, i + 1)) !== -1) {
                result += String(output).slice(i - 100, i + 100) + "<br/>";
            }
            return result;
        });
    };
});
