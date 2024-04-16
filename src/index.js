import { markdownRenderer } from "inkdrop";

import parseTitle from "./title-parser";

module.exports = {
  activate() {
    markdownRenderer.remarkPlugins.push(parseTitle);

    markdownRenderer.remarkReactComponents.pre = (props) => {
      const codeClassName = props.className;
      const hasTitle =
        codeClassName && codeClassName.split(" ")[0] === "with-title";
      return hasTitle ? (
        <div className="with-title-block">
          <pre {...props} />
        </div>
      ) : (
        <pre {...props} />
      );
    };
  },
  deactivate() {
    markdownRenderer.remarkPlugins = markdownRenderer.remarkPlugins.filter(
      (plugin) => plugin !== parseTitle
    );
  },
};
