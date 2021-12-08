import { Plugin } from './Plugin'

export class MarkdownItFootnote extends Plugin {
  constructor() {
    super('footnote')
  }

  get options() {
    const options = {}
    return options
  }
}
