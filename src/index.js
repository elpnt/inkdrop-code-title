import { markdownRenderer } from "inkdrop";

import parseTitle from "./title-parser";
import createTitledPreBlock from "./createTitledPreBlock";

let origPre = null;

module.exports = {
  activate() {
    markdownRenderer.remarkPlugins.push(parseTitle);
    origPre = markdownRenderer.remarkReactComponents.pre;
    markdownRenderer.remarkReactComponents.pre = createTitledPreBlock(origPre);
  },
  deactivate() {
    markdownRenderer.remarkPlugins = markdownRenderer.remarkPlugins.filter(
      (plugin) => plugin !== parseTitle
    );
    if (origPre) {
      markdownRenderer.remarkReactComponents.pre = origPre;
    } else {
      delete markdownRenderer.remarkReactComponents.pre;
    }
  },
};
