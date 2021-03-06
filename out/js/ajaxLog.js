define(["require", "exports"], function (require, exports) {
    return function (webConsole) {
        var lastEntries = [];
        if (performance && performance.getEntries) {
            performance.onresourcetimingbufferfull = function () {
                performance.setResourceTimingBufferSize(10000);
            };
            setInterval(function () {
                var entries = performance.getEntries(), timeStr;
                entries.slice(lastEntries.length).forEach(function (item) {
                    if (item.initiatorType === "xmlhttprequest") {
                        timeStr = " <span style='color:#2AFF00'>" + (item.responseEnd - item.requestStart).toFixed(2) + "ms</span>";
                        webConsole.log(item.name + timeStr, "/logs/ajax");
                    }
                });
                lastEntries = entries;
            }, 1000);
        }
    };
});
