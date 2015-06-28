interface TimeItem {
	name: String;
	start: number;
}

export = function(webConsole: any) {

	var timings: TimeItem[] = [];

	webConsole.registerApi("time", function(name) {
		timings.push({
			name: name,
			start: Date.now()
		});
	});

	webConsole.registerApi("timeEnd", function(name, logFile) {
		var duration: number,
			now: number = Date.now();

		timings.every(function (item: TimeItem, index: number) {
			var ret: boolean = true;

			if (item.name === name) {
				duration = now - item.start;
				if (logFile) {
					webConsole.log(name + ": " + duration + "ms", logFile);
				} else {
					webConsole.print(name + ": " + duration + "ms");
				}
				timings.splice(index, 1);
				ret = false;
			}

			return ret;
		});
	});

	webConsole.registerApi("timeStatus", function(name) {
		var duration: number,
			now: number = Date.now();

		timings.every(function (item: TimeItem, index: number) {
			var ret: boolean = true;

			if (item.name === name) {
				duration = now - item.start;
				webConsole.print(name + ": " + duration + "ms");
				ret = false;
			}

			return ret;
		});
	});

};
