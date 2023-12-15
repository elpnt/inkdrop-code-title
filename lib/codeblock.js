"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTitledCodeBlock;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTitledCodeBlock(OrigCode) {
  const Code = props => {
    const {
      className
    } = props;
    const hasTitle = className && className.split(" ")[0] === "with-title";
    return hasTitle ? /*#__PURE__*/_react.default.createElement("div", {
      className: "with-title-block"
    }, /*#__PURE__*/_react.default.createElement(OrigCode, props, props.children)) : /*#__PURE__*/_react.default.createElement(OrigCode, props, props.children);
  };

  return Code;
}