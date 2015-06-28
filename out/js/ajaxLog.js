define(["require", "exports"], function (require, exports) {
    return function (webConsole) {
        var lastEntries = [];
        performance.onwebkitresourcetimingbufferfull = function () {
            performance.webkitSetResourceTimingBufferSize(10000);
        };
        setInterval(function () {
            var entries = window.performance.getEntries();
            entries.slice(lastEntries.length).forEach(function (item) {
                if (item.initiatorType === "xmlhttprequest") {
                    webConsole.log(item.name + " " + (item.responseEnd - item.responseStart).toFixed(2) + "ms", "/logs/ajax");
                }
            });
            lastEntries = entries;
        }, 1000);
    };
});
