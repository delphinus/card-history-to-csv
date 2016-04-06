///<reference path="../typings/main.d.ts" />

import fs = require("fs");

class App {

    start(cli: Meow.ParsedArgs) {

        let historyData: string;
        const filename = cli.flags["in"];
        if (typeof filename === "string") {
            try {
                historyData = fs.readFileSync(filename, "utf8");
            } catch (e) {
                console.error(`file not found: ${e}`);
                process.exit(-1);
            }
        } else {
            historyData = fs.readFileSync("/dev/stdin", "utf8");
        }
    }
}

export = new App;
