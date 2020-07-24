'use strict';

import visit from 'unist-util-visit';
import split from 'split-on-first';
import { markdownRenderer } from 'inkdrop';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const parseTitle = (options) => (tree) => {
  visit(
    tree,
    (node) => node.type === 'code',
    (node, index, parent) => {
      let [lang, title] = split(node.lang || '', ':');
      if (title || title === '') {
        node.lang = lang;
        title = entities.encode(title);
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
