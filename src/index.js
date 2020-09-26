"use strict";

import { markdownRenderer } from "inkdrop";
import parseTitle from "./title-parser";
import createTitledCodeBlock from "./codeblock";

function switchPosition() {
  const enums = ["Inside", "Top"];
  for (let i = 0; i < 2; i++) {
    if (inkdrop.config.get("code-title.titlePosition") === enums[i]) {
      const prev = enums[1 - i].toLowerCase();
      const now = enums[i].toLowerCase();
      // change the class of the titles
      document.querySelectorAll(".code-title." + prev).forEach((e) => {
        e.setAttribute("class", "code-title " + now);
      });
      // change the class of the code blocks
      document.querySelectorAll(".with-title-" + prev).forEach((e) => {
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
      enum: ["Inside", "Top"],
    },
  },

  activate() {
    markdownRenderer.remarkPlugins.push(parseTitle);

    const OrigCode = markdownRenderer.remarkReactComponents.code;
    const TitledCode = createTitledCodeBlock(OrigCode);
    markdownRenderer.remarkReactComponents.code = TitledCode;

    inkdrop.config.observe("code-title.titlePosition", () => {
      switchPosition();
    });
  },
};
