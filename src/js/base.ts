import WebConsole = require("console");

export = function(webConsole: WebConsole) {

	webConsole.registerApi("log", function(message: string) {
		webConsole.print(message);
	});

	webConsole.registerCommand("clear", function(message: string) {
		webConsole.clear();
	});

};