define(["require", "exports", "console", "timing"], function (require, exports, Console, timing) {
    var webConsole;
    webConsole = new Console();
    window.webConsole = webConsole;
    timing(webConsole);
});
