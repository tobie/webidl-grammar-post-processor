"use strict";

const process = require("./process");
const jsdom = require("jsdom");
const fs = require("fs");
const getStdin = require("get-stdin");

module.exports = (inputString, options) => new Promise((resolve, reject) => {
    let dom = new jsdom.JSDOM(inputString);
    let document = dom.window.document;
    [].forEach.call(document.querySelectorAll("script.remove"), (element) => element.remove());
    process(document);
    resolve(dom.serialize());
});

if (require.main === module) {
    getStdin.buffer()
        .then(module.exports)
        .then(str => console.log(str))
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}