#!/usr/bin/env node
///<reference path="./typings/main.d.ts" />

import _ = require("underscore");
import fs = require("fs");
import meow = require("meow");

const $0 = _.last(__filename.split('/'), 2)[0];

const cli = meow(
    `
    Usage
        $ ${$0} --in some.txt out.csv
        $ pbpaste | ${$0} out.csv

    Options:
        -i, --in    input file
        -h, --help  show this message
    `,
    {
        string:  ['in'],
        boolean: ['help'],
        alias: {
            i: 'in',
            h: 'help'
        }
    }
);

if (typeof cli.input[0] !== "string" || cli.flags["help"]) {
    cli.showHelp();
}

let historyData;
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
