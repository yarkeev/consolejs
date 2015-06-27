import Tmpl = require("tmpl");
import Settings = require("settings");

interface Command {
	name: String;
	fn: Function;
}

class WebConsole {

	private state: any = {};
	private el: HTMLElement;
	private input: HTMLInputElement;
	private output: HTMLElement;
	private commands: Command[] = [];
	private start: String = "$ ";
	private showState: boolean = false;
	private history: string[] = [];
	private historyIndex: number = 0;
	private localStorageKey = "webConsole";
	private settings: Settings;
	private reroutingSymbol: string = "|";
	private defaultSettings: any = {
		"hotkeys.toggle": 192
	};

	constructor() {
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", this.onDocumentReady.bind(this));
		}

		this.loadFromLocalStorage();
	}

	protected loadFromLocalStorage() {
		if (localStorage[this.localStorageKey]) {
			this.state = JSON.parse(localStorage[this.localStorageKey]);

			this.history = this.state.history;
		}
		this.state.settings = this.state.settings || this.defaultSettings;
	}

	protected saveToLocalStorage() {
		this.state.history = this.history;

		localStorage[this.localStorageKey] = JSON.stringify(this.state);
	}

	protected cacheEls() {
		this.input = <HTMLInputElement> this.el.querySelector(".b-web-console__input");
		this.output = <HTMLElement> this.el.querySelector(".b-web-console__output");
	}

	protected bindEvents() {
		if (this.el.addEventListener) {
			this.el.addEventListener("click", this.onClick.bind(this));
			this.input.addEventListener("keydown", this.onInputKeydown.bind(this));
			document.body.addEventListener("keydown", this.onBodyKeyDown.bind(this), false);

			this.el.querySelector(".b-web-console__settings-icon").addEventListener("click", this.onSettingsIconClick.bind(this));
		}
	}

	protected show() {
		this.el.classList.remove("hide");
		this.input.focus();
		this.showState = true;
	}

	protected hide() {
		this.el.classList.add("hide");
		this.showState = false;
	}

	protected toggle() {
		if (this.showState) {
			this.hide();
		} else {
			this.show();
		}
	}

	protected historyBack() {
		if (this.history.length > this.historyIndex) {
			this.historyIndex++;
			this.input.value = this.history[this.history.length - this.historyIndex];
		}
	}

	protected historyForward() {
		if (this.historyIndex > 1) {
			this.historyIndex--;
			this.input.value = this.history[this.history.length - this.historyIndex];
		}
	}

	protected onDocumentReady(event: Event) {
		var html: string = Tmpl.console({});

		this.el = document.createElement("div");
		this.el.innerHTML = html;
		this.el = <HTMLElement> this.el.children[0];
		document.body.appendChild(this.el);

		this.cacheEls();
		this.bindEvents();
	}

	protected onClick(event: Event) {
		this.input.focus();
	}

	protected onInputKeydown(event: KeyboardEvent) {
		switch (event.keyCode) {
			case 13:
				this.processingInput(this.input.value);
				this.input.value = "";
			break;
			case 38:
				this.historyBack();
			break;
			case 40:
				this.historyForward();
			break;
		}
	}

	protected onBodyKeyDown(event: KeyboardEvent) {
		if (event.keyCode === this.getSetting("hotkeys.toggle")) {
			event.preventDefault();
			this.toggle();
		}
	}

	protected onSettingsIconClick(event: KeyboardEvent) {
		this.settings = new Settings(this, {});
	}

	public processingInput(command: string) {
		var isNotFound: Boolean = true,
			commands: string[] = command.split(this.reroutingSymbol),
			output: string;

		console.log(commands);
		commands.forEach(function (item) {
			var commandItem: string = item.trim().split(" ");

			this.commands.forEach(function(item) {
				if (item.name === commandItem[0]) {
					isNotFound = false;
					output = item.fn(output, commandItem.slice(1));
				}
			}.bind(this));
		}.bind(this));

		if (isNotFound) {
			this.print(command + " - command not found");
		} else if (output) {
			this.print(output);
		}

		this.history.push(command);
		this.historyIndex = 0;
		this.saveToLocalStorage();
	}

	public print(message: string) {
		var line: HTMLElement = document.createElement("div");

		line.innerHTML = this.start + message;

		if (this.output) {
			this.output.appendChild(line);
			this.output.scrollTop = this.output.scrollHeight;
		}
	}

	public clear() {
		this.output.innerHTML = "";
	}

	public getSetting(settingId: string): any {
		if (this.state && this.state.settings) {
			return this.state.settings[settingId];
		} else {
			return null;
		}
	}

	public setSetting(settingId: string, value: any) {
		if (this.state && this.state.settings) {
			this.state.settings[settingId] = value;
			this.saveToLocalStorage();
		}
	}

	public registerCommand(command: String, callback: Function) {
		this.commands.push({
			name: command,
			fn: callback
		});
	}

	public registerApi(command: string, callback: Function) {
		try {
			Object.defineProperty(this, command, {
				value: callback
			});
		} catch (ignore) {
			//hack empty block
		}
	}
}

export = WebConsole;
