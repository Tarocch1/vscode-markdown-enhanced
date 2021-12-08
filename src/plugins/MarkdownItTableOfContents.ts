import { Plugin } from './Plugin'
import { slugify } from './utils'
import { config } from '../config'

export class MarkdownItTableOfContents extends Plugin {
  constructor() {
    super('tableOfContents')
  }

  get options() {
    const options = {
      includeLevel: config.tableOfContentsIncludeLevel,
      slugify,
    }
    return options
  }
}
