///<reference path="../typings/main.d.ts" />

import historyData = require("./history_data");

class App {

    start(cli: Meow.ParsedArgs) {

        const historyParser = new historyData.HistoryParser(cli.flags["in"]);
    }
}

export = new App;
