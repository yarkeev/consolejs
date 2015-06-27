define(["require", "exports", "tmpl", "settings"], function (require, exports, Tmpl, Settings) {
    var WebConsole = (function () {
        function WebConsole() {
            this.state = {};
            this.commands = [];
            this.start = "$ ";
            this.showState = false;
            this.history = [];
            this.historyIndex = 0;
            this.localStorageKey = "webConsole";
            this.defaultSettings = {
                "hotkeys.toggle": 192
            };
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", this.onDocumentReady.bind(this));
            }
            this.loadFromLocalStorage();
        }
        WebConsole.prototype.loadFromLocalStorage = function () {
            if (localStorage[this.localStorageKey]) {
                this.state = JSON.parse(localStorage[this.localStorageKey]);
                this.history = this.state.history;
            }
            this.state.settings = this.state.settings || this.defaultSettings;
        };
        WebConsole.prototype.saveToLocalStorage = function () {
            this.state.history = this.history;
            localStorage[this.localStorageKey] = JSON.stringify(this.state);
        };
        WebConsole.prototype.cacheEls = function () {
            this.input = this.el.querySelector(".b-web-console__input");
            this.output = this.el.querySelector(".b-web-console__output");
        };
        WebConsole.prototype.bindEvents = function () {
            if (this.el.addEventListener) {
                this.el.addEventListener("click", this.onClick.bind(this));
                this.input.addEventListener("keydown", this.onInputKeydown.bind(this));
                document.body.addEventListener("keydown", this.onBodyKeyDown.bind(this), false);
                this.el.querySelector(".b-web-console__settings-icon").addEventListener("click", this.onSettingsIconClick.bind(this));
            }
        };
        WebConsole.prototype.show = function () {
            this.el.classList.remove("hide");
            this.input.focus();
            this.showState = true;
        };
        WebConsole.prototype.hide = function () {
            this.el.classList.add("hide");
            this.showState = false;
        };
        WebConsole.prototype.toggle = function () {
            if (this.showState) {
                this.hide();
            }
            else {
                this.show();
            }
        };
        WebConsole.prototype.historyBack = function () {
            if (this.historyIndex < this.history.length) {
                this.historyIndex++;
                this.input.value = this.history[this.history.length - this.historyIndex];
            }
        };
        WebConsole.prototype.historyForward = function () {
            if (this.historyIndex > 1) {
                this.historyIndex--;
                this.input.value = this.history[this.history.length - this.historyIndex];
            }
        };
        WebConsole.prototype.onDocumentReady = function (event) {
            var html = Tmpl.console({});
            this.el = document.createElement("div");
            this.el.innerHTML = html;
            this.el = this.el.children[0];
            document.body.appendChild(this.el);
            this.cacheEls();
            this.bindEvents();
        };
        WebConsole.prototype.onClick = function (event) {
            this.input.focus();
        };
        WebConsole.prototype.onInputKeydown = function (event) {
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
        };
        WebConsole.prototype.onBodyKeyDown = function (event) {
            if (event.keyCode === this.getSetting("hotkeys.toggle")) {
                event.preventDefault();
                this.toggle();
            }
        };
        WebConsole.prototype.onSettingsIconClick = function (event) {
            this.settings = new Settings(this, {});
        };
        WebConsole.prototype.processingInput = function (command) {
            var isNotFound = true;
            this.commands.forEach(function (item) {
                var output;
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
            this.history.push(command);
            this.historyIndex = 0;
            this.saveToLocalStorage();
        };
        WebConsole.prototype.print = function (message) {
            var line = document.createElement("div");
            line.innerHTML = this.start + message;
            if (this.output) {
                this.output.appendChild(line);
                this.output.scrollTop = this.output.scrollHeight;
            }
        };
        WebConsole.prototype.clear = function () {
            this.output.innerHTML = "";
        };
        WebConsole.prototype.getSetting = function (settingId) {
            if (this.state && this.state.settings) {
                return this.state.settings[settingId];
            }
            else {
                return null;
            }
        };
        WebConsole.prototype.setSetting = function (settingId, value) {
            if (this.state && this.state.settings) {
                this.state.settings[settingId] = value;
                this.saveToLocalStorage();
            }
        };
        WebConsole.prototype.registerCommand = function (command, callback) {
            this.commands.push({
                name: command,
                fn: callback
            });
        };
        WebConsole.prototype.registerApi = function (command, callback) {
            try {
                Object.defineProperty(this, command, {
                    value: callback
                });
            }
            catch (ignore) {
            }
        };
        return WebConsole;
    })();
    return WebConsole;
});
