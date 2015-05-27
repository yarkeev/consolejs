import Console = require("console");
import timing = require("timing");
import base = require("base");

declare var window: any;
var webConsole: Console;

webConsole = new Console();
window.webConsole = webConsole;

timing(webConsole);
base(webConsole);
