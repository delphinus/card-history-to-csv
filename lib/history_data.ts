///<reference path="../typings/main.d.ts" />

import fs = require("fs");
import moment = require("moment");

import History = require("./history");

export class HistoryParser {

    private data: string;

    constructor(private filename?: string) {

        this.readFile();
    }

    parse(): History[] {

        const histories = [new History({header: true})];
        return histories.concat(this.data.split(/\r?\n/).map(row => {
            const [dateString, payee, amountString] = row.split(/\t/).filter((str: string) => ! str.match(/^\s*$/));
            const date = moment(new Date(dateString));
            const amount = parseInt(this.cleanUp(amountString), 10);
            return new History({date, payee, amount});
        }));
    }

    private readFile(): void {

        if (typeof this.filename === "string") {
            try {
                this.data = fs.readFileSync(this.filename, "utf8");
            } catch (e) {
                console.error(`file not found: ${e}`);
                process.exit(-1);
            }
        } else {
            this.data = fs.readFileSync("/dev/stdin", "utf8");
        }
    }

    private cleanUp(str: string): string {

        return str.replace(/[￥,]/g, "");
    }
}
