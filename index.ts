#!/usr/bin/env node
///<reference path="./typings/main.d.ts" />

import _ = require("underscore");

import app = require("./lib/app");
import argParser = require("./lib/arg_parser");

const $0 = _.last(__filename.split('/'), 2)[0];
const cli = new argParser.ArgParser($0).parse();

app.start(cli);
