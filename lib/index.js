'use strict';

var _inkdrop = require("inkdrop");

var _titleParser = _interopRequireDefault(require("./title-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  activate() {
    _inkdrop.markdownRenderer.remarkPlugins.push(_titleParser.default);
  }

};