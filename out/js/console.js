define(["require", "exports", "tmpl"], function (require, exports, Tmpl) {
    var WebConsole = (function () {
        function WebConsole() {
            this.commands = [];
            this.start = "$ ";
            this.showState = false;
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", this.onDocumentReady.bind(this));
            }
        }
        WebConsole.prototype.cacheEls = function () {
            this.input = this.el.querySelector(".b-web-console__input");
            this.output = this.el.querySelector(".b-web-console__output");
        };
        WebConsole.prototype.bindEvents = function () {
            if (this.el.addEventListener) {
                this.el.addEventListener("click", this.onClick.bind(this));
                this.input.addEventListener("keydown", this.onInputKeydown.bind(this));
                document.body.addEventListener("keydown", this.onBodyKeyDown.bind(this), false);
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
            if (event.keyCode === 13) {
                this.processingInput(this.input.value);
                this.input.value = "";
            }
        };
        WebConsole.prototype.onBodyKeyDown = function (event) {
            if (event.keyCode === 192) {
                event.preventDefault();
                this.toggle();
            }
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
