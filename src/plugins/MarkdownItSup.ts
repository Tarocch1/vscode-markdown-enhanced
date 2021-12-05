import { Plugin } from './Plugin';

export class MarkdownItSup extends Plugin {
  constructor() {
    super('sup');
  }

  get options() {
    const options = {};
    return options;
  }
}
