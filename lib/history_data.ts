///<reference path="../typings/main.d.ts" />

import fs = require("fs");
import moment = require("moment");

export interface History {
    amount: number;
    date:   moment.Moment;
    payee:  string;
}

export class HistoryParser {

    private data: string;

    constructor(private filename?: string) {

        this.readFile();
    }

    public parse(): History[] {

        return this.data.split(/\r?\n/).map(row => {
            const [dateString, payee, amountString] = row.split(/\t/);
            const date = moment(dateString);
            const amount = parseInt(amountString, 10);
            return {date, payee, amount};
        });
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
}
