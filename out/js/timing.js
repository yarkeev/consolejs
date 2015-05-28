define(["require", "exports"], function (require, exports) {
    return function (webConsole) {
        var timings = [];
        webConsole.registerCommand("now", function () {
            return new Date();
        });
        webConsole.registerApi("time", function (name) {
            timings.push({
                name: name,
                start: Date.now()
            });
        });
        webConsole.registerApi("timeEnd", function (name) {
            var duration, now = Date.now();
            timings.every(function (item, index) {
                var ret = true;
                if (item.name === name) {
                    duration = now - item.start;
                    webConsole.print(name + ": " + duration + "ms");
                    timings.splice(index, 1);
                    ret = false;
                }
                return ret;
            });
        });
        webConsole.registerApi("timeStatus", function (name) {
            var duration, now = Date.now();
            timings.every(function (item, index) {
                var ret = true;
                if (item.name === name) {
                    duration = now - item.start;
                    webConsole.print(name + ": " + duration + "ms");
                    ret = false;
                }
                return ret;
            });
        });
    };
});
