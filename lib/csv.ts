///<reference path="../typings/main.d.ts" />

import Q = require("q");
import fs = require("fs");
import stringify = require("csv-stringify");

import argParser = require("./arg_parser");
import History = require("./history");

class Csv {

    private stringifier = stringify({
        lineBreaks: "windows",
        quoted:     true,
    });

    private csvData = "";
    private writeStream: fs.WriteStream;

    constructor(private cli: argParser.ParsedArgs, private data: History[]) { }

    generate(): Q.Promise<string> {

        const filename = this.cli.input[0];
        const deferred = Q.defer<string>();

        this.writeStream = fs.createWriteStream(filename)
            .on("error", (err: Error) => deferred.reject(err))
            .on("close", () => deferred.resolve(filename));

        this.stringifier
            .on("readable", () => {
                let row: string;
                while(row = <string> this.stringifier.read()) {
                    this.writeStream.write(row);
                }
            })
            .on("error", (err: Error) => deferred.reject(err))
            .on("finish", () => this.writeStream.end());

        this.data.forEach(row => this.stringifier.write(row.stringify()));
        this.stringifier.end();

        return deferred.promise;
    }
}

export = Csv;
