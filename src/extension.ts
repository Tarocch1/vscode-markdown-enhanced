import { workspace, ExtensionContext } from 'vscode';
import { updateCSS } from './services/style';

export async function activate(context: ExtensionContext) {
  try {
    updateCSS();

    workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('markdownEnhanced')) {
        updateCSS();
      }
    });
  } catch (error) {
    console.log(error);
  }
}
