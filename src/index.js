"use strict";

import { markdownRenderer } from "inkdrop";
import parseTitle from "./title-parser";
import createTitledCodeBlock from "./codeblock";

module.exports = {
  config: {
    isMonospaced: {
      title: "Monospaced Font",
      description: "Use a monospaced font in titles",
      type: "boolean",
      default: true,
    },
  },

  activate() {
    markdownRenderer.remarkPlugins.push(parseTitle);

    const OrigCode = markdownRenderer.remarkReactComponents.code;
    const TitledCode = createTitledCodeBlock(OrigCode);
    markdownRenderer.remarkReactComponents.code = TitledCode;
  },
};
