"use strict";

const postProcess = require("./post-process");
const jsdom = require("jsdom");

module.exports = (inputString, options) => new Promise((resolve, reject) => {
    let dom = new jsdom.JSDOM(inputString);
    let document = dom.window.document;
    [].forEach.call(document.querySelectorAll("script.remove"), (element) => element.remove());
    postProcess(document);
    resolve(dom.serialize());
});
