#!/usr/bin/env node
///<reference path="./typings/main.d.ts" />

import _ = require("underscore");
import meow = require("meow");

import app = require("./lib/app");

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

app.start(cli);
