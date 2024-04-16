"use strict";

import visit from "unist-util-visit";
import split from "split-on-first";

const { fontFamily: defaultFontFamily } = inkdrop.config.defaultSettings.editor;
const { fontFamily: customFontFamily } = inkdrop.config.settings.editor;
const fontFamily = customFontFamily || defaultFontFamily;

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// unist-util-visit fucntion parses the below code
//
//   ```js:This is a hello function
//   fucntion hello() {
//     console.log('hello');
//   }
//   ```
//
// then yields a Node object like below
//
//   {
//     lang: "js:This",
//     meta: "is a hello function",
//     value: "function hello() {\n  console.log('hello');\n}",
//     type: "code",
//     position: ...
//   }

export default function parseTitle() {
  return (tree) => {
    visit(
      tree,
      (node) => node.type === "code",
      (node, index, parent) => {
        let [lang, title] = split(node.lang || "", ":");
        const meta = node.meta || "";

        // preserve mdast-node info in data field
        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};

        if (title || title === "") {
          node.lang = lang;
          if (meta) title += " " + meta; // Allow for a space in the title
          title = escapeHtml(title);
          if (title === "") title = lang; // If title is empty, fallbak to lang

          const titleNode = {
            type: "html",
            value: fontFamily
              ? `<div class="code-title" style="font-family: ${fontFamily};">${title}</div>`
              : `<div class="code-title">${title}</div>`,
          };
          parent.children.splice(index, 0, titleNode);

          let langClass = "";
          if (lang) langClass = "language-" + lang;
          node.data.hProperties.className =
            node.data.hProperties.className || [];
          node.data.hProperties.className.push(langClass);
          node.data.hProperties.className.unshift("with-title");
        }
      }
    );
  };
}
