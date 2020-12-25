"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _splitOnFirst = _interopRequireDefault(require("split-on-first"));

var _htmlEntities = require("html-entities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
const parseTitle = options => tree => {
  const entities = new _htmlEntities.AllHtmlEntities();
  (0, _unistUtilVisit.default)(tree, node => node.type === "code", (node, index, parent) => {
    let [lang, title] = (0, _splitOnFirst.default)(node.lang || "", ":");
    const meta = node.meta || ""; // preserve mdast-node info in data field

    node.data = node.data || {};
    node.data.hProperties = node.data.hProperties || {};
    console.log(title);

    if (title || title === "") {
      node.lang = lang;
      if (meta) title += " " + meta;
      title = entities.encode(title);
      const titleNode = {
        type: "html",
        value: `<span class="code-title">${title}</span>`
      };
      parent.children.splice(index, 0, titleNode);
      let langClass = "";
      if (lang) langClass = "language-" + lang;
      node.data.hProperties.className = node.data.hProperties.className || [];
      node.data.hProperties.className.push(langClass);
      node.data.hProperties.className.unshift("with-title");
    }
  });
};

var _default = parseTitle;
exports.default = _default;