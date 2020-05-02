'use strict';

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _splitOnFirst = _interopRequireDefault(require("split-on-first"));

var _inkdrop = require("inkdrop");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parseTitle = options => tree => {
  (0, _unistUtilVisit.default)(tree, node => node.type === 'code', (node, index, parent) => {
    const [lang, title] = (0, _splitOnFirst.default)(node.lang, ':');

    if (title || title === '') {
      node.lang = lang;
      const titleNode = {
        type: 'html',
        value: `<div className="code-title">${title}</div>`
      };
      parent.children.splice(index, 0, titleNode);
    }
  });
};

module.exports = {
  activate() {
    _inkdrop.markdownRenderer.remarkPlugins.push(parseTitle);
  },

  deactivate() {}

};