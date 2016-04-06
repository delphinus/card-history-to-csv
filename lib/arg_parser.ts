///<reference path="../typings/main.d.ts" />

import meow = require("meow");

interface Flags extends Meow.Flags {
    in:   string;
    help: boolean;
}

export interface ParsedArgs extends Meow.ParsedArgs {
    flags: Flags;
}

export class ArgParser {

    constructor(private pkgName: string) { }

    parse(): ParsedArgs {

        const cli = <ParsedArgs> meow(
            `
            Usage:
                $ ${this.pkgName} --in some.txt out.csv
                $ pbpaste | ${this.pkgName} out.csv

            Options:
                -i, --in    input file
                -h, --help  show this message
            `,
            {
                string:  ["in"],
                boolean: ["help"],
                alias: {
                    i: "in",
                    h: "help",
                }
            }
        );

        if (typeof cli.input[0] !== "string" || cli.flags.help) {
            cli.showHelp();
        }

        return cli;
    }
}
