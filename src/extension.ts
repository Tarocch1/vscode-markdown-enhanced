import { ExtensionContext } from 'vscode';
import { config } from './config';

export async function activate(context: ExtensionContext) {
  config.init();
  context.subscriptions.push(config);
}
