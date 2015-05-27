define(["require", "exports", "console", "timing", "base"], function (require, exports, Console, timing, base) {
    var webConsole;
    webConsole = new Console();
    window.webConsole = webConsole;
    timing(webConsole);
    base(webConsole);
});
