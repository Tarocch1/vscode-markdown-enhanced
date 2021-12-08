import { workspace, commands } from 'vscode'
import { TextEncoder } from 'util'
import MarkdownIt from 'markdown-it'
import { Plugin } from './Plugin'
import { config } from '../config'
import { getFileUri } from '../utils'

export class MarkdownItMermaid extends Plugin {
  constructor() {
    super('mermaid')
    super._package = ''
  }

  get options() {
    const options = {}
    return options
  }

  origin: (str: string, lang: string, attrs: string) => string = (str) => str

  beforeLoad() {
    if (config.mermaidEnable) {
      this.addScript()
    } else {
      this.removeScript()
    }
  }

  private async addScript() {
    const content = await workspace.fs.readFile(
      getFileUri('scripts/_mermaid.js')
    )
    await workspace.fs.writeFile(getFileUri('scripts/mermaid.js'), content)
    commands.executeCommand('markdown.preview.refresh')
  }

  private async removeScript() {
    const textEncoder = new TextEncoder()
    await workspace.fs.writeFile(
      getFileUri('scripts/mermaid.js'),
      textEncoder.encode('')
    )
    commands.executeCommand('markdown.preview.refresh')
  }

  extra(md: MarkdownIt) {
    this.origin = md.options.highlight || this.origin
    md.set({ highlight: this.mermaidRender.bind(this) })
  }

  mermaidRender(str: string, lang: string, attrs: string): string {
    if (lang !== 'mermaid') return this.origin(str, lang, attrs)
    return `<pre><div class="mermaid">${this.preProcess(str)}</div></pre>`
  }

  private preProcess(str: string): string {
    return str.replace(/</g, '&lt;').replace(/>g/, '&gt;')
  }
}
