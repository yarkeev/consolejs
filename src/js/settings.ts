import Tmpl = require("tmpl");
import WebConsole = require("console");

class Settings {

	private el: HTMLElement;
	private fade: HTMLElement;
	private toggleHotkeyInput: HTMLInputElement;
	private fileSizeLimitInput: HTMLInputElement;
	private options: any;
	private console: WebConsole;

	constructor(console: WebConsole, options: any) {
		this.options = options;
		this.console = console;

		this.render();
	}

	protected render() {
		var html: string = Tmpl.settings({
				toggleHotkey: this.console.getSetting("hotkeys.toggle"),
				limitFileSize: this.console.getSetting("fileSystem.linesLimit")
			}),
			el: HTMLElement;

		el = document.createElement("div");
		el.innerHTML = html;

		this.fade = <HTMLElement> el.querySelector(".b-web-console__settings-fade");
		this.el = <HTMLElement> el.querySelector(".b-web-console__settings");
		this.toggleHotkeyInput = <HTMLInputElement> el.querySelector(".b-web-console__settings__toggle-input");
		this.fileSizeLimitInput = <HTMLInputElement> el.querySelector(".b-web-console__settings__limit-file-size");

		this.bindEvents();

		document.body.appendChild(this.fade);
	}

	protected hide() {
		this.fade.style.display = "none";
	}

	protected bindEvents() {
		if (this.el.addEventListener) {
			this.toggleHotkeyInput.addEventListener("focus", this.onToggleHotkeyInputFocus.bind(this));
			this.toggleHotkeyInput.addEventListener("blur", this.onToggleHotkeyInputBlur.bind(this));
			this.toggleHotkeyInput.addEventListener("keydown", this.onToggleHotkeyInputKeyDown.bind(this));
			this.fileSizeLimitInput.addEventListener("change", this.onFileSizeLimitInputChange.bind(this));
			this.el.querySelector(".b-web-console__settings__close").addEventListener("click", this.onCloseClick.bind(this));
			this.fade.addEventListener("click", this.onFadeClick.bind(this));
		}
	}

	protected onToggleHotkeyInputFocus(event: Event) {
		this.toggleHotkeyInput.value = "";
	}

	protected onToggleHotkeyInputBlur(event: Event) {
		this.toggleHotkeyInput.value = this.console.getSetting("hotkeys.toggle");
	}

	protected onToggleHotkeyInputKeyDown(event: KeyboardEvent) {
		event.preventDefault();
		event.stopPropagation();

		this.toggleHotkeyInput.value = event.keyCode.toString();
		this.console.setSetting("hotkeys.toggle", event.keyCode);
	}

	protected onFileSizeLimitInputChange(event: Event) {
		var limit: number = parseInt(this.fileSizeLimitInput.value, 10);

		if (!isNaN(limit)) {
			this.console.setSetting("fileSystem.linesLimit", limit);
		}
	}

	protected onCloseClick(event: KeyboardEvent) {
		this.hide();
	}

	protected onFadeClick(event: KeyboardEvent) {
		event.stopPropagation();

		if (event.target === this.fade) {
			this.hide();
		}
	}
}


export = Settings;
