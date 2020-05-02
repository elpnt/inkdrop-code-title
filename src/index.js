'use strict';

import visit from 'unist-util-visit';
import split from 'split-on-first';
import { markdownRenderer } from 'inkdrop';

const parseTitle = (options) => (tree) => {
  visit(
    tree,
    (node) => node.type === 'code',
    (node, index, parent) => {
      const [lang, title] = split(node.lang, ':');
      if (title || title === '') {
        node.lang = lang;
        const titleNode = {
          type: 'html',
          value: `<div className="code-title">${title}</div>`,
        };
        parent.children.splice(index, 0, titleNode);
      }
    }
  );
};

module.exports = {
  activate() {
    markdownRenderer.remarkPlugins.push(parseTitle);
  },
  deactivate() {},
};
