"use strict";

var _inkdrop = require("inkdrop");

var _titleParser = _interopRequireDefault(require("./title-parser"));

var _codeblock = _interopRequireDefault(require("./codeblock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  activate() {
    _inkdrop.markdownRenderer.remarkPlugins.push(_titleParser.default);

    const OrigCode = _inkdrop.markdownRenderer.remarkReactComponents.code;
    const TitledCode = (0, _codeblock.default)(OrigCode);
    _inkdrop.markdownRenderer.remarkReactComponents.code = TitledCode;
  }

};