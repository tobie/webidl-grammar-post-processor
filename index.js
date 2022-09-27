"use strict";

const postProcess = require("./lib/process-doc.js");
const jsdom = require("jsdom");

module.exports = inputString => new Promise(resolve => {
    const dom = new jsdom.JSDOM(inputString);
    const { document } = dom.window;

    for (const el of document.querySelectorAll("script.remove")) {
        el.remove();
    }

    postProcess(document);

    const str = dom.serialize();
    dom.window.close();

    resolve(str);
});
