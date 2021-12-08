import hljs from 'highlight.js'
import { languages, highlight as prismHighlight } from 'prismjs'
import loadLanguages from 'prismjs/components/'
import MarkdownIt from 'markdown-it'
import { Plugin } from './Plugin'
import { config } from '../config'

export class MarkdownItHighlight extends Plugin {
  constructor() {
    super('highlight')
    super._package = ''
  }

  get options() {
    const options = {}
    return options
  }

  extra(md: MarkdownIt) {
    let highlighter: typeof md.options.highlight
    if (config.highlight === 'highlight.js') {
      highlighter = this.hljsHighlighter
    } else {
      loadLanguages()
      highlighter = this.prismHighlighter
    }
    md.set({ highlight: highlighter })
  }

  hljsHighlighter(str: string, lang: string): string {
    let html = str
    if (lang && hljs.getLanguage(lang)) {
      html = hljs.highlight(str, {
        language: lang,
        ignoreIllegals: true,
      }).value
    }
    return html
  }

  prismHighlighter(str: string, lang: string): string {
    let html = str
    if (lang && languages[lang]) {
      html = prismHighlight(str, languages[lang], lang)
    }
    return html
  }
}
