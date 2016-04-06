///<reference path="../typings/main.d.ts" />

import Csv = require("./csv");
import argParser = require("./arg_parser");
import historyData = require("./history_data");

class App {

    start(cli: argParser.ParsedArgs) {

        const data = new historyData.HistoryParser(cli.flags.in).parse();
        new Csv(cli, data)
            .generate()
            .then(
                filename => console.log(`file created: ${filename}`),
                (err: Error) => this.error(err)
            );
    }

    private error(err: Error) {
        console.error(err);
        process.exit(-1);
    }
}

export = new App;
