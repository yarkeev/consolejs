define(["require", "exports"], function (require, exports) {
    return function (webConsole) {
        var timings = [];
        webConsole.registerApi("time", function (name) {
            timings.push({
                name: name,
                start: Date.now()
            });
        });
        webConsole.registerApi("timeEnd", function (name, logFile) {
            var duration, now = Date.now();
            timings.every(function (item, index) {
                var ret = true;
                if (item.name === name) {
                    duration = now - item.start;
                    if (logFile) {
                        webConsole.log(name + ": " + duration + "ms", logFile);
                    }
                    else {
                        webConsole.print(name + ": " + duration + "ms");
                    }
                    timings.splice(index, 1);
                    ret = false;
                }
                return ret;
            });
        });
        webConsole.registerApi("timeStatus", function (name, logFile) {
            var duration, now = Date.now();
            timings.every(function (item, index) {
                var ret = true;
                if (item.name === name) {
                    duration = now - item.start;
                    if (logFile) {
                        webConsole.log(name + ": " + duration + "ms", logFile);
                    }
                    else {
                        webConsole.print(name + ": " + duration + "ms");
                    }
                    ret = false;
                }
                return ret;
            });
        });
    };
});
