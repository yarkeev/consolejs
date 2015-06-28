define(["require", "exports", "tmpl"], function (require, exports, Tmpl) {
    var Settings = (function () {
        function Settings(console, options) {
            this.options = options;
            this.console = console;
            this.render();
        }
        Settings.prototype.render = function () {
            var html = Tmpl.settings({
                toggleHotkey: this.console.getSetting("hotkeys.toggle"),
                limitFileSize: this.console.getSetting("fileSystem.linesLimit")
            }), el;
            el = document.createElement("div");
            el.innerHTML = html;
            this.fade = el.querySelector(".b-web-console__settings-fade");
            this.el = el.querySelector(".b-web-console__settings");
            this.toggleHotkeyInput = el.querySelector(".b-web-console__settings__toggle-input");
            this.fileSizeLimitInput = el.querySelector(".b-web-console__settings__limit-file-size");
            this.bindEvents();
            document.body.appendChild(this.fade);
        };
        Settings.prototype.hide = function () {
            this.fade.style.display = "none";
        };
        Settings.prototype.bindEvents = function () {
            if (this.el.addEventListener) {
                this.toggleHotkeyInput.addEventListener("focus", this.onToggleHotkeyInputFocus.bind(this));
                this.toggleHotkeyInput.addEventListener("blur", this.onToggleHotkeyInputBlur.bind(this));
                this.toggleHotkeyInput.addEventListener("keydown", this.onToggleHotkeyInputKeyDown.bind(this));
                this.fileSizeLimitInput.addEventListener("change", this.onFileSizeLimitInputChange.bind(this));
                this.el.querySelector(".b-web-console__settings__close").addEventListener("click", this.onCloseClick.bind(this));
                this.fade.addEventListener("click", this.onFadeClick.bind(this));
            }
        };
        Settings.prototype.onToggleHotkeyInputFocus = function (event) {
            this.toggleHotkeyInput.value = "";
        };
        Settings.prototype.onToggleHotkeyInputBlur = function (event) {
            this.toggleHotkeyInput.value = this.console.getSetting("hotkeys.toggle");
        };
        Settings.prototype.onToggleHotkeyInputKeyDown = function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.toggleHotkeyInput.value = event.keyCode.toString();
            this.console.setSetting("hotkeys.toggle", event.keyCode);
        };
        Settings.prototype.onFileSizeLimitInputChange = function (event) {
            var limit = parseInt(this.fileSizeLimitInput.value, 10);
            if (!isNaN(limit)) {
                this.console.setSetting("fileSystem.linesLimit", limit);
            }
        };
        Settings.prototype.onCloseClick = function (event) {
            this.hide();
        };
        Settings.prototype.onFadeClick = function (event) {
            event.stopPropagation();
            if (event.target === this.fade) {
                this.hide();
            }
        };
        return Settings;
    })();
    return Settings;
});
