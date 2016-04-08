///<reference path="../typings/main.d.ts" />

import _ = require("underscore");
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
        return histories.concat(
            this.data
                .split(/\r?\n/)
                .reduce(
                    (prev: History[], curr: string) => {
                        const values = curr.split(/\t/).filter(str => ! str.match(/^\s*$/));
                        if (this.validate(values)) {
                            const [dateString, payee, amountString] = values;
                            const date = moment(new Date(dateString));
                            const amount = parseInt(this.cleanUp(amountString), 10);
                            prev.push(new History({date, payee, amount}));
                        }
                        return prev;
                    },
                    []
                )
        );
    }

    private readFile(): void {

        if (typeof this.filename === "string") {
            try {
                this.data = fs.readFileSync(this.filename, "utf8");
            } catch (e) {
                this.error(`file not found: ${e}`);
            }
        } else {
            this.data = fs.readFileSync("/dev/stdin", "utf8");
        }
    }

    private validate(values: string[]): boolean {

        return values.length === 3 && values.every(v => _.isString(v) && v.length > 0);
    }

    private error(str: string): void {

        console.log(str);
        process.exit(-1);
    }

    private cleanUp(str: string): string {

        return str.replace(/[￥,]/g, "");
    }
}
