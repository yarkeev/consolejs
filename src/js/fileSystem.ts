import WebConsole = require("console");

class File {
	private console: WebConsole;
	private path: string;
	private content: string = "";

	constructor(console: WebConsole, path: string, content: string = "") {
		this.console = console;
		this.path = path;
		this.content = content;
	}

	public write(str: string) {
		var lines: string[],
			start: number;

		this.content += "\n" + str;

		lines = this.content.split("\n");
		start = lines.length - this.console.getSetting("fileSystem.linesLimit");
		if (start > 0) {
			lines = lines.slice(start);
		}
		this.content = lines.join("\n");
	}

	public getContent(): string {
		return this.content.replace(/\n/g, "<br/>");
	}

	public setContent(content: string) {
		return this.content = content;
	}
}

class FileSystem {
	private files: any;
	private console: WebConsole;
	private intervalSaveBuffer;

	constructor(console: WebConsole) {
		this.console = console;
		this.files = {};

		setInterval(function() {
			this.console.saveToLocalStorage();
		}.bind(this), this.intervalSaveBuffer);
	}

	public setState(state: any) {
		state = state || {};
		this.files = {};

		Object.keys(state).forEach(function (fileName) {
			this.files[fileName] = new File(this.console, fileName, state[fileName]);
		}.bind(this));
	}

	public toJSON() {
		var json = {};

		Object.keys(this.files).forEach(function(fileName) {
			json[fileName] = this.files[fileName].content;
		}.bind(this));

		return json;
	}

	public getFileByName(fileName: string): File {
		return this.files[fileName];
	}

	public createFile(fileName: string): File {
		return this.files[fileName] = new File(this.console, fileName, "");
	}
}

export = FileSystem;
