define(["require", "exports"], function (require, exports) {
    return function (webConsole) {
        webConsole.registerApi("log", function (message) {
            webConsole.print(message);
        });
    };
});
