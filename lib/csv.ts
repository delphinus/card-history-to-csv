///<reference path="../typings/main.d.ts" />

import Q = require("q");
import fs = require("fs");
import iconv = require("iconv");
import stringify = require("csv-stringify");
import stream = require("stream");

import argParser = require("./arg_parser");
import history = require("./history");

class Csv {

    private stringifier = stringify({
        columns:    history.header,
        header:     true,
        lineBreaks: "windows",
        quoted:     true,
    });
    private iconv = iconv.Iconv("utf-8", "cp932");
    private csvData = "";
    private writeStream: fs.WriteStream;

    constructor(private cli: argParser.ParsedArgs, private data: history.History[]) { }

    generate(): Q.Promise<string> {

        const filename = this.cli.input[0];
        const deferred = Q.defer<string>();

        this.writeStream = fs.createWriteStream(filename)
            .on("error", (err: Error) => deferred.reject(err))
            .on("close", () => deferred.resolve(filename));
        this.stringifier.pipe(this.iconv).pipe(this.writeStream);
        this.data.forEach(row => this.stringifier.write(row.stringify()));
        this.stringifier.end();

        return deferred.promise;
    }
}

export = Csv;
