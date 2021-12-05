import { join } from 'path';
import { Uri } from 'vscode';

export function getFileUri(file: string) {
  return Uri.file(join(__dirname, '../', file));
}
