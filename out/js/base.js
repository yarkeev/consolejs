define(["require", "exports"], function (require, exports) {
    return function (webConsole) {
        webConsole.registerApi("log", function (message) {
            webConsole.print(message);
        });
        webConsole.registerCommand("clear", function (message) {
            webConsole.clear();
        });
    };
});
