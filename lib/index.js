'use strict';

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _splitOnFirst = _interopRequireDefault(require("split-on-first"));

var _inkdrop = require("inkdrop");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

const parseTitle = options => tree => {
  (0, _unistUtilVisit.default)(tree, node => node.type === 'code', (node, index, parent) => {
    let [lang, title] = (0, _splitOnFirst.default)(node.lang || '', ':');
    console.log(title);

    if (title || title === '') {
      node.lang = lang;
      console.log(title);
      title = entities.encode(title);
      console.log(title);
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