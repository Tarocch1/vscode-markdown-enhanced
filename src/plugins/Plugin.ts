import { commands } from 'vscode';
import MarkdownIt from 'markdown-it';
import { camel2Kebab } from './utils';
import { config } from '../config';

export abstract class Plugin {
  _package: string;

  constructor(private _name: string) {
    this._package = `markdown-it-${camel2Kebab(this._name)}`;

    config.on([`markdownEnhanced.${this._name}`], () => {
      commands.executeCommand('markdown.api.reloadPlugins');
    });
  }

  get enable(): boolean {
    return config[`${this._name}Enable` as keyof typeof config] as boolean;
  }

  load(md: MarkdownIt) {
    if (this.enable) {
      if (this._package) md.use(require(this._package), this.options);
      this.extra(md);
    }
  }

  abstract get options(): Object;

  extra(md: MarkdownIt) {}
}
