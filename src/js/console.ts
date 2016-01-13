import Tmpl = require("tmpl");
import Settings = require("settings");
import FileSystem = require("fileSystem");
import Command = require("command");


class WebConsole {

	public fileSystem: FileSystem;

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
	private lokedInterval: number;
	private lastKeyDownKey: number = null;
	private isResizeNow: boolean = false;
	private lastPageY: number;
	private defaultSettings: any = {
		"hotkeys.toggle": 192,
		"hotkeys.ctrl": 17,
		"hotkeys.c": 67,
		"fileSystem.linesLimit": 100
	};

	constructor() {
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", this.onDocumentReady.bind(this));
		}

		this.fileSystem = new FileSystem(this);

		this.loadFromLocalStorage();
	}

	protected loadFromLocalStorage() {
		if (localStorage[this.localStorageKey]) {
			this.state = JSON.parse(localStorage[this.localStorageKey]);

			this.history = this.state.history;
			this.fileSystem.setState(this.state.fileSystem);
		}
		this.state.settings = this.state.settings || {};
		Object.keys(this.defaultSettings).forEach(function (item) {
			this.state.settings[item] = this.state.settings[item] || this.defaultSettings[item];
		}.bind(this));
	}

	protected saveToLocalStorage() {
		this.state.history = this.history;
		this.state.fileSystem = this.fileSystem.toJSON();

		localStorage.setItem(this.localStorageKey, JSON.stringify(this.state));
	}

	protected cacheEls() {
		this.input = <HTMLInputElement> this.el.querySelector(".b-web-console__input");
		this.output = <HTMLElement> this.el.querySelector(".b-web-console__output");
	}

	protected bindEvents() {
		if (this.el.addEventListener) {
			this.el.addEventListener("click", this.onClick.bind(this));
			this.input.addEventListener("keydown", this.onInputKeyDown.bind(this));
			document.body.addEventListener("keydown", this.onBodyKeyDown.bind(this), false);
			document.body.addEventListener("mousemove", this.onBodyMouseMove.bind(this), false);
			document.body.addEventListener("mouseup", this.onBodyMouseUp.bind(this), false);

			this.el.querySelector(".b-web-console__settings-icon").addEventListener("click", this.onSettingsIconClick.bind(this));
			this.el.querySelector(".b-web-console__resize").addEventListener("mousedown", this.onResizeMouseDown.bind(this));
		}
	}

	protected show() {
		this.el.style.top = "0px";
		this.input.focus();
		this.showState = true;
	}

	protected hide() {
		this.el.style.top = -this.el.offsetHeight + "px";
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
		} else if (this.historyIndex === 1) {
			this.input.value = "";
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

	protected onInputKeyDown(event: KeyboardEvent) {
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

		if (event.keyCode === this.getSetting("hotkeys.c") && this.lastKeyDownKey === this.getSetting("hotkeys.ctrl")) {
			clearInterval(this.lokedInterval);
			this.input.removeAttribute("disabled");
			this.input.focus();
		}

		this.lastKeyDownKey = event.keyCode;
	}

	protected onBodyMouseMove(event: MouseEvent) {
		if (this.isResizeNow) {
			this.el.style.height = String(this.el.offsetHeight + (event.pageY - this.lastPageY)) + "px";
		}

		this.lastPageY = event.pageY;
	}

	protected onBodyMouseUp(event: MouseEvent) {
		this.isResizeNow = false;
	}

	protected onSettingsIconClick(event: KeyboardEvent) {
		this.settings = new Settings(this, {});
	}

	protected onResizeMouseDown(event: MouseEvent) {
		this.lastPageY = event.pageY;
		this.isResizeNow = true;
	}

	public processingInput(command: string) {
		var isNotFound: Boolean = true,
			commands: string[] = command.split(this.reroutingSymbol),
			output: string,
			lockedFn;

		if (command.length) {
			commands.forEach(function(item, index) {
				var commandItem: string = item.trim().split(" ");

				this.commands.forEach(function(item) {
					if (item.name === commandItem[0]) {
						isNotFound = false;
						if (!item.isLocked) {
							output = item.fn(output, commandItem.slice(1));
						} else {
							lockedFn = item.fn(output, commandItem.slice(1));
							output = lockedFn();

							this.lokedInterval = setInterval(function() {
								output = lockedFn();

								commands.slice(index + 1).forEach(function(item) {
									var commandItem: string[] = item.trim().split(" ");

									this.commands.forEach(function(item) {
										if (item.name === commandItem[0]) {
											output = item.fn(output, commandItem.slice(1));
										}
									}.bind(this));
								}.bind(this));

								if (output) {
									this.print(output, true);
								}
							}.bind(this), 1000);

							this.input.setAttribute("disabled", "disabled");
						}
					}
				}.bind(this));
			}.bind(this));

			if (isNotFound) {
				this.print(command + " - command not found");
			} else if (output) {
				this.print(command + "<br/>" + output);
			}

			if (this.history[this.history.length - 1] !== command) {
				this.history.push(command);
			}
			this.historyIndex = 0;
			this.saveToLocalStorage();
		} else {
			this.print("<br/>");
		}
	}

	public print(message: string, isSimpleText: boolean = false) {
		var line: HTMLElement = document.createElement("div");

		if (!isSimpleText) {
			line.innerHTML += this.start;
		}
		line.innerHTML += message;

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

	public registerCommand(command: Command) {
		this.commands.push(command);
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

	public getCommands() {
		return this.commands;
	}
}

export = WebConsole;
