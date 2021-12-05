import { commands } from 'vscode';
import MarkdownIt from 'markdown-it';
import { camel2Kebab } from './utils'
import { config } from '../config';

export abstract class Plugin {
  private _name: string;
  private _package: string;

  constructor(name: string) {
    this._name = name;
    this._package = `markdown-it-${camel2Kebab(name)}`

    config.on([`markdownEnhanced.${this._name}`], () => {
      commands.executeCommand('markdown.api.reloadPlugins');
    });
  }

  get enable(): boolean {
    return config[`${this._name}Enable` as keyof typeof config] as boolean;
  }

  load(md: MarkdownIt) {
    if (this.enable) {
      md.use(require(this._package), this.options);
      this.extra(md)
    }
  }

  abstract get options(): Object;

  extra(md: MarkdownIt) {}
}
