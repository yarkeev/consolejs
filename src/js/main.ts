import Console = require("console");
import timing = require("timing");
import base = require("base");
import ajaxLog = require("ajaxLog");

declare var window: any;
var webConsole: Console;

webConsole = new Console();
window.webConsole = webConsole;

timing(webConsole);
base(webConsole);
ajaxLog(webConsole);
