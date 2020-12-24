"use strict";

import visit from "unist-util-visit";
import split from "split-on-first";
import { AllHtmlEntities as Entities } from "html-entities";

//
// unist-util-visit fucntion parses the below code
//
//   ```js:This is a hello function
//   fucntion hello() {
//     console.log('hello');
//   }
//   ```
//
// then yields a Node object
//   {
//     lang: "js:This",
//     meta: "is a hello function",
//     value: "function hello() {\n  console.log('hello');\n}",
//     type: "code",
//     position: ...
//   }
//

const parseTitle = (options) => (tree) => {
  const entities = new Entities();
  const tag = inkdrop.config.get("code-title.isMonospaced") ? "code" : "span";

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
        if (meta) title += " " + meta;
        title = entities.encode(title);
        const titleNode = {
          type: "html",
          value: `<${tag} class="code-title">${title}</${tag}>`,
        };
        parent.children.splice(index, 0, titleNode);

        let langClass = "";
        if (lang) langClass = "language-" + lang;
        node.data.hProperties.className = node.data.hProperties.className || [];
        node.data.hProperties.className.push(langClass);
        node.data.hProperties.className.unshift("with-title");
      }
    }
  );
};

export default parseTitle;
