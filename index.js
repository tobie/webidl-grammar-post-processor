"use strict";

const postProcess = require("./lib/process-doc");
const jsdom = require("jsdom");

module.exports = (inputString, options) => new Promise((resolve, reject) => {
    let dom = new jsdom.JSDOM(inputString);
    let document = dom.window.document;
    [].forEach.call(document.querySelectorAll("script.remove"), (element) => element.remove());
    postProcess(document);
    let str = dom.serialize();
    dom.window.close();
    dom = null;
    resolve(str);
});
