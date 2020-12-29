"use strict";

import { markdownRenderer } from "inkdrop";
import parseTitle from "./title-parser";
import createTitledCodeBlock from "./codeblock";

module.exports = {
  activate() {
    markdownRenderer.remarkPlugins.push(parseTitle);

    const OrigCode = markdownRenderer.remarkReactComponents.code;
    const TitledCode = createTitledCodeBlock(OrigCode);
    markdownRenderer.remarkReactComponents.code = TitledCode;
  },
};
