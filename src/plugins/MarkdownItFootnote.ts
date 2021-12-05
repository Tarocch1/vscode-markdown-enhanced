import { Plugin } from './Plugin';

export class MarkdownItFootnote extends Plugin {
  constructor() {
    super('footnote', 'markdown-it-footnote');
  }

  get options() {
    const options = {};
    return options;
  }
}
