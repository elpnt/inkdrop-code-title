'use strict';

import visit from 'unist-util-visit';
import split from 'split-on-first';
import { AllHtmlEntities as Entities } from 'html-entities';

const parseTitle = (options) => (tree) => {
  const entities = new Entities();

  //
  // unist-util-visit fucntion parses the below code
  //
  //   ```js:This is a hello function
  //   fucntion hello() {
  //     console.log('hello');
  //   }
  //   ```
  //
  // and convert this to an Object
  //   {
  //     lang: "js:This",
  //     meta: "is a hello function",
  //     value: "function hello() {\n  console.log('hello');\n}",
  //     type: "code",
  //     position: ...
  //   }
  //

  visit(
    tree,
    (node) => node.type === 'code',
    (node, index, parent) => {
      let [lang, title] = split(node.lang || '', ':');
      let meta = node.meta || '';
      if (title || title === '') {
        node.lang = lang;
        title = entities.encode(title + ' ' + meta);
        const titleNode = {
          type: 'html',
          value: `<div className="code-title">${title}</div>`,
        };
        //parent.children.splice(index, 0, titleNode);
        console.log('parent:', parent);
        parent.children.splice(index, 0, titleNode);
      }
    }
  );
};

export default parseTitle;
