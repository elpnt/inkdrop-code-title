'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _splitOnFirst = _interopRequireDefault(require("split-on-first"));

var _htmlEntities = require("html-entities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parseTitle = options => tree => {
  const entities = new _htmlEntities.AllHtmlEntities(); //
  // unist-util-visit fucntion parses the below code
  //
  //   ```js:This is a hello function
  //   fucntion hello() {
  //     console.log('hello');
  //   }
  //   ```
  //
  // and convert this to an Object
  //   {
  //     lang: "js:This",
  //     meta: "is a hello function",
  //     value: "function hello() {\n  console.log('hello');\n}",
  //     type: "code",
  //     position: ...
  //   }
  //

  (0, _unistUtilVisit.default)(tree, node => node.type === 'code', (node, index, parent) => {
    let [lang, title] = (0, _splitOnFirst.default)(node.lang || '', ':');
    let meta = node.meta || '';

    if (title || title === '') {
      node.lang = lang;
      title = entities.encode(title + ' ' + meta);
      const titleNode = {
        type: 'html',
        value: `<div className="code-title">${title}</div>`
      };
      parent.children.splice(index, 0, titleNode);
    }
  });
};

var _default = parseTitle;
exports.default = _default;