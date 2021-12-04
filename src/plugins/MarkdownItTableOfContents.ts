import { Plugin } from './Plugin';
import { slugify } from './utils';
import { config } from '../config';

export class MarkdownItTableOfContents extends Plugin {
  constructor() {
    super('toc', 'markdown-it-table-of-contents');
  }

  get options() {
    const options = {
      includeLevel: config.tocIncludeLevel,
      slugify,
    };
    return options;
  }
}
