"use strict";

module.exports = document => {
    let output = "";
    for (const pre of document.querySelectorAll("pre.grammar")) {
        const html = pre.textContent.replace(/("[^"]+")|([a-zA-Z]+)|(:)/g, m => {
            if (/^"/.test(m)) {
                return `<emu-t>${m.replace(/^"|"$/g, "")}</emu-t>`;
            }
            if (/^(integer|decimal|identifier|string|whitespace|comment|other)$/.test(m)) {
              return `<emu-t class="regex"><a href="#prod-${m}">${m}</a></emu-t>`;
            }
            if (m == ":") {
                return "::";
            }
            if (document.querySelector(`#prod-${m}`)) {
              return `<emu-nt><a href="#prod-${m}">${m}</a></emu-nt>`;
            }
            return `<emu-nt>${m}</emu-nt>`;
        });

        pre.innerHTML = html;

        const fillWith = document.querySelectorAll(`div[grammar-fill-with="${pre.id.replace("prod-", "")}"]`);
        for (const div of fillWith) {
            div.innerHTML = wrap(html);
        }

        if (!pre.classList.contains("no-index")) {
          output += html
            .replace(/<emu-nt>/, `<emu-nt id="${pre.id.replace("prod-", "index-prod-")}">`)
            .replace(/#prod-([^a-z])/g, "#index-prod-$1") + "\n";
        }
    }

    document.querySelector(`div[grammar-fill-with="index"]`).innerHTML = wrap(output);

    for (const el of document.querySelectorAll("[grammar-fill-with]")) {
      el.removeAttribute("grammar-fill-with");
    }
};

function wrap(s) {
    return `<pre class=grammar>${s}</pre>`;
}
