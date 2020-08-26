'use strict';

import { markdownRenderer } from 'inkdrop';
import parseTitle from './title-parser';

module.exports = {
  activate() {
    markdownRenderer.remarkPlugins.push(parseTitle);
  },
};
