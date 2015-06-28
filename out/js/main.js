define(["require", "exports", "console", "timing", "base", "ajaxLog"], function (require, exports, Console, timing, base, ajaxLog) {
    var webConsole;
    webConsole = new Console();
    window.webConsole = webConsole;
    timing(webConsole);
    base(webConsole);
    ajaxLog(webConsole);
});
