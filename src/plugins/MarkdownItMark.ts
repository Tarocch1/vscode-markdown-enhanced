import { Plugin } from './Plugin'

export class MarkdownItMark extends Plugin {
  constructor() {
    super('mark')
  }

  get options() {
    const options = {}
    return options
  }
}
