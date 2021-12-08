import { Plugin } from './Plugin'

export class MarkdownItAbbr extends Plugin {
  constructor() {
    super('abbr')
  }

  get options() {
    const options = {}
    return options
  }
}
