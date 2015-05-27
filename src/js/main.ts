import Console = require("console");
import timing = require("timing");

declare var window: any;
var webConsole: Console;

webConsole = new Console();
window.webConsole = webConsole;

timing(webConsole);
