import WebConsole = require("console");

class File {
	private path: string;
	private content: string = "";

	constructor(path: string, content: string = "") {
		this.path = path;
		this.content = content;
	}

	public write(str: string) {
		this.content += "\n" + str;
	}

	public getContent(): string {
		return this.content.replace(/\n/g, "<br/>");
	}
}

class FileSystem {
	private files: any;
	private console: WebConsole;
	private intervalSaveBuffer;

	constructor(console: WebConsole) {
		this.console = console;

		setInterval(function() {
			this.console.saveToLocalStorage();
		}.bind(this), this.intervalSaveBuffer);
	}

	public setState(state: any) {
		state = state || {};
		this.files = {};

		Object.keys(state).forEach(function (fileName) {
			this.files[fileName] = new File(fileName, state[fileName]);
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
		return this.files[fileName] = new File(fileName);
	}
}

export = FileSystem;
