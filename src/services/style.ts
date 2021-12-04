import { Uri, workspace } from 'vscode';
import { TextEncoder, TextDecoder } from 'util';
import { join } from 'path';

type File = {
  from: string;
  to: string;
  transfer: (code: string) => string;
};

type Files = {
  light: File[];
  dark: File[];
};

const getCSSPath = (file: string) => join(__dirname, '../../', file);

const defaultTransfer = (code: string) => code;
const githubTransfer = (code: string) =>
  code.replace(/\.markdown-body/g, '.vscode-body');

const filesMap: Files = {
  light: [
    {
      from: 'node_modules/github-markdown-css/github-markdown-light.css',
      to: 'styles/github-markdown.css',
      transfer: githubTransfer,
    },
    {
      from: 'node_modules/highlight.js/styles/github.css',
      to: 'styles/github-highlight.css',
      transfer: defaultTransfer,
    },
  ],
  dark: [
    {
      from: 'node_modules/github-markdown-css/github-markdown-dark.css',
      to: 'styles/github-markdown.css',
      transfer: githubTransfer,
    },
    {
      from: 'node_modules/highlight.js/styles/github-dark.css',
      to: 'styles/github-highlight.css',
      transfer: defaultTransfer,
    },
  ],
};

export async function updateCSS() {
  const configuration = workspace.getConfiguration('markdownEnhanced');
  let theme = configuration.get<keyof Files>('theme');
  if (!theme) theme = 'light';
  const files = filesMap[theme];
  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();
  for (const file of files) {
    const fileContents = textDecoder.decode(
      await workspace.fs.readFile(Uri.file(getCSSPath(file.from)))
    );
    const fileResult = textEncoder.encode(file.transfer(fileContents));
    workspace.fs.writeFile(Uri.file(getCSSPath(file.to)), fileResult);
  }
}
