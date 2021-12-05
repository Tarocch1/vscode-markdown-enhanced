import { workspace, commands } from 'vscode';
import { TextEncoder } from 'util';
import MarkdownIt from 'markdown-it';
import { Plugin } from './Plugin';
import { config } from '../config';
import { getFileUri } from '../utils';

export class MarkdownItVar extends Plugin {
  constructor() {
    super('var');
    super._package = '';
  }

  get options() {
    const options = {};
    return options;
  }

  beforeLoad(md: MarkdownIt) {
    this.updateVar();
  }

  private async updateVar() {
    const scripts = `
    window.$markdownEnhanced = {
      theme: '${config.theme}'
    }
  `;
    const textEncoder = new TextEncoder();
    await workspace.fs.writeFile(
      getFileUri('scripts/var.js'),
      textEncoder.encode(scripts)
    );
    commands.executeCommand('markdown.preview.refresh');
  }
}
