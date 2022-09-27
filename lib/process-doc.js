"use strict";
module.exports = function(document) {
    function wrap(s) { return "<pre class=grammar>" + s + "</pre>"; }
    var output = "";
    [].forEach.call(document.querySelectorAll("pre.grammar"), pre => {
        var html = pre.textContent.replace(/("[^"]+")|([a-zA-Z]+)|(:)/g, m => {
            if (/^"/.test(m)) { return "<emu-t>" + m.replace(/^"|"$/g, "") + "</emu-t>"; }
            if (/^(integer|float|identifier|string|whitespace|comment|other)$/.test(m)) {
              return "<emu-t class=\"regex\"><a href=\"#prod-" + m + "\">" + m + "</a></emu-t>";
            }
            if (m == ":") { return "::"; }
            if (document.querySelector("#prod-" + m)) {
              return "<emu-nt><a href=\"#prod-" + m + "\">" + m + "</a></emu-nt>";
            }
            return "<emu-nt>" + m + "</emu-nt>"
        });

        pre.innerHTML = html;
        var fillWith = document.querySelectorAll("div[grammar-fill-with=\"" + pre.id.replace("prod-", "") + "\"]");
        [].forEach.call(fillWith, div => div.innerHTML = wrap(html));

        if (!(/\bno-index\b/).test(pre.className)) {
          output += html.replace(/<emu-nt>/, "<emu-nt id=\"" + pre.id.replace("prod-", "index-prod-") + "\">")
            .replace(/#prod-([^a-z])/g, "#index-prod-$1") + "\n";
        }
    });
    document.querySelector("div[grammar-fill-with=\"index\"]").innerHTML = wrap(output);

    for (const el of document.querySelectorAll("[grammar-fill-with]")) {
      el.removeAttribute("grammar-fill-with");
    }
};
