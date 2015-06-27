import WebConsole = require("console");

export = function(webConsole: WebConsole) {

	webConsole.registerApi("log", function(message: string) {
		webConsole.print(message);
	});

	webConsole.registerCommand("clear", function() {
		webConsole.clear();
	});

	webConsole.registerCommand("grep", function(output: string, args: string[]) {
		var str = String(output).toLowerCase(),
			search = String(args[0]).toLowerCase(),
			result: string = "",
			i: number = -1;

		while ((i = str.indexOf(search, i + 1)) !== -1) {
			result += String(output).slice(i - 100, i + 100) + "<br/>";
		}

		return result;
	});

};
