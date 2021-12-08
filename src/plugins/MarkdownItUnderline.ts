import { Plugin } from './Plugin'

export class MarkdownItUnderline extends Plugin {
  constructor() {
    super('underline')
  }

  get options() {
    const options = {}
    return options
  }
}
