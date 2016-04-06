///<reference path="../typings/main.d.ts" />

import argParser = require("./arg_parser");
import historyData = require("./history_data");

class App {

    start(cli: argParser.ParsedArgs) {

        const historyParser = new historyData.HistoryParser(cli.flags.in);
    }
}

export = new App;
