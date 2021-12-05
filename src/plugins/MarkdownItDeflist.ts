import { Plugin } from './Plugin';

export class MarkdownItDeflist extends Plugin {
  constructor() {
    super('deflist');
  }

  get options() {
    const options = {};
    return options;
  }
}
