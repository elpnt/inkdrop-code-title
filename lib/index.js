"use strict";

var _inkdrop = require("inkdrop");

var _titleParser = _interopRequireDefault(require("./title-parser"));

var _codeblock = _interopRequireDefault(require("./codeblock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function switchPosition() {
  const enums = ["Inside", "Top"];

  for (let i = 0; i < 2; i++) {
    if (inkdrop.config.get("code-title.titlePosition") === enums[i]) {
      const prev = enums[1 - i].toLowerCase();
      const now = enums[i].toLowerCase(); // change the class of the titles

      document.querySelectorAll(".code-title." + prev).forEach(e => {
        e.setAttribute("class", "code-title " + now);
      }); // change the class of the code blocks

      document.querySelectorAll(".with-title-" + prev).forEach(e => {
        e.setAttribute("class", "with-title-" + now);
      });
    }
  }
}

module.exports = {
  config: {
    titlePosition: {
      title: "Title Position",
      description: "The position of a title relative to a code block",
      type: "string",
      default: "Inside",
      enum: ["Inside", "Top"]
    }
  },

  activate() {
    _inkdrop.markdownRenderer.remarkPlugins.push(_titleParser.default);

    const OrigCode = _inkdrop.markdownRenderer.remarkReactComponents.code;
    const TitledCode = (0, _codeblock.default)(OrigCode);
    _inkdrop.markdownRenderer.remarkReactComponents.code = TitledCode;
    inkdrop.config.observe("code-title.titlePosition", () => {
      switchPosition();
    });
  }

};