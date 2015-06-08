import Tmpl = require("tmpl");

interface Command {
	name: String;
	fn: Function;
}

class WebConsole {

	private el: HTMLElement;
	private input: HTMLInputElement;
	private output: HTMLElement;
	private commands: Command[] = [];
	private start: String = "$ ";
	private showState: boolean = false;

	constructor() {
		var html: string = Tmpl.console({});

		this.el = document.createElement("div");
		this.el.innerHTML = html;
		this.el = <HTMLElement> this.el.children[0];
		document.body.appendChild(this.el);

		this.cacheEls();
		this.bindEvents();
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

	protected onClick(event: Event) {
		this.input.focus();
	}

	protected onInputKeydown(event: KeyboardEvent) {
		if (event.keyCode === 13) {
			this.processingInput(this.input.value);
			this.input.value = "";
		}
	}

	protected onBodyKeyDown(event: KeyboardEvent) {
		if (event.keyCode === 192) {
			event.preventDefault();
			this.toggle();
		}
	}

	public processingInput(command: string) {
		var isNotFound: Boolean = true;

		this.commands.forEach(function(item) {
			var output: any;

			if (item.name === command) {
				isNotFound = false;
				output = item.fn();
				if (output) {
					this.print(output);
				}
			}
		}.bind(this));

		if (isNotFound) {
			this.print(command + " - command not found");
		}
	}

	public print(message: string) {
		var line: HTMLElement = document.createElement("div");

		line.innerHTML = this.start + message;
		this.output.appendChild(line);
		this.output.scrollTop = this.output.scrollHeight;
	}

	public clear() {
		this.output.innerHTML = "";
	}

	public registerCommand(command: String, callback: Function) {
		this.commands.push({
			name: command,
			fn: callback
		});
	}

	public registerApi(command: string, callback: Function) {
		if (Object.defineProperty) {
			Object.defineProperty(this, command, {
				value: callback
			});
		}
	}
}

export = WebConsole;
