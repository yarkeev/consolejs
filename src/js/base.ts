import WebConsole = require("console");

export = function(webConsole: WebConsole) {

	webConsole.registerApi("log", function(message: string, fileName: string = null) {
		var file: any;

		if (!fileName) {
			webConsole.print(message);
		} else {
			file = webConsole.fileSystem.getFileByName(fileName);
			if (!file) {
				file = webConsole.fileSystem.createFile(fileName);
			}
			file.write(message);
		}
	});

	webConsole.registerCommand("clear", false, function() {
		webConsole.clear();
	});

	webConsole.registerCommand("grep", false, function(output: string, args: string[]) {
		var str = String(output).toLowerCase(),
			search = String(args[0]).toLowerCase(),
			result: string = "",
			i: number = -1,
			start: number,
			end: number;

		while ((i = str.indexOf(search, i + 1)) !== -1) {
			start = str.lastIndexOf("<br/>", i);
			end = str.indexOf("<br/>", i);
			end = end === -1 ? String(output).length : end;
			result += String(output).slice(start, end);
		}

		return result;
	});

	webConsole.registerCommand("cat", false, function(output: string, args: string[]) {
		var result: string,
			fileName: string = args[0],
			file = webConsole.fileSystem.getFileByName(fileName);

		if (file) {
			result = file.getContent();
		} else {
			result = fileName + ": No such file or directory";
		}

		return result;
	});

	webConsole.registerCommand("tail", true, function(output: string, args: string[]) {
		var result: string,
			fileName: string = args[0],
			file = webConsole.fileSystem.getFileByName(fileName),
			lastResult: string = "";

		if (file) {
			result = file.getContent();
		} else {
			result = fileName + ": No such file or directory";
		}

		return function () {
			var ret: string = null,
				fileContent: string;

			if (file) {
				fileContent = file.getContent();

				ret = fileContent.slice(lastResult.length);
				if (ret) {
					lastResult += ret;
				}
			}

			return ret;
		};
	});

};
