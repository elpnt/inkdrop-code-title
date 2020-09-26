"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTitledCodeBlock;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTitledCodeBlock(OrigCode) {
  const Code = props => {
    // e.g.) className: ["language-javascript position"]
    const {
      className
    } = props;
    let splitted = [];
    let position = "";

    if (className) {
      splitted = className.split(" ");
      position = splitted[0];
    }

    return splitted.length ? /*#__PURE__*/_react.default.createElement("div", {
      className: position
    }, /*#__PURE__*/_react.default.createElement(OrigCode, props, props.children)) : /*#__PURE__*/_react.default.createElement(OrigCode, props, props.children);
  };

  return Code;
}