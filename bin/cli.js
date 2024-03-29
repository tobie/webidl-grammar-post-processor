#!/usr/bin/env node
const fs = require("fs");
const postProcess = require("..");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { argv } = yargs(hideBin(process.argv))
    .usage("Usage: $0 --input [string] --output [string]")
    .option("input", {
        alias: "i",
        describe: "Path to input file",
        demandOption: true,
        type: "string",
        normalize: true,
        requiresArg: true
    })
    .option("output", {
        alias: "o",
        describe: "Path to output file. Defaults to overwriting input",
        demandOption: false,
        type: "string",
        normalize: true,
        requiresArg: true
    })
    .strict();

const buffer = fs.readFileSync(argv.input);
const result = postProcess(buffer);
fs.writeFileSync(argv.output || argv.input, result);
