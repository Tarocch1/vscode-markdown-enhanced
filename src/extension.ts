import { ExtensionContext } from 'vscode';
import MarkdownIt from 'markdown-it';
import { config } from './config';
import { plugins } from './plugins';

export async function activate(context: ExtensionContext) {
  context.subscriptions.push(config);
  return {
    extendMarkdownIt(md: MarkdownIt) {
      plugins.forEach((plugin) => {
        const p = new plugin();
        p.load(md);
      });
      return md;
    },
  };
}
