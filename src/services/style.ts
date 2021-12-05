import { join } from 'path';
import { Uri, workspace, commands } from 'vscode';
import { TextEncoder, TextDecoder } from 'util';
import { config } from '../config';

type File = {
  from: string;
  to: string;
  transfer: (code: string) => string;
  when: () => boolean;
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
      when: () => true,
    },
    {
      from: 'node_modules/highlight.js/styles/github.css',
      to: 'styles/highlight.css',
      transfer: defaultTransfer,
      when: () => config.highlight === 'highlight.js',
    },
    {
      from: 'node_modules/prismjs/themes/prism.css',
      to: 'styles/highlight.css',
      transfer: defaultTransfer,
      when: () => config.highlight === 'prism.js',
    },
  ],
  dark: [
    {
      from: 'node_modules/github-markdown-css/github-markdown-dark.css',
      to: 'styles/github-markdown.css',
      transfer: githubTransfer,
      when: () => true,
    },
    {
      from: 'node_modules/highlight.js/styles/github-dark.css',
      to: 'styles/highlight.css',
      transfer: defaultTransfer,
      when: () => config.highlight === 'highlight.js',
    },
    {
      from: 'node_modules/prismjs/themes/prism-okaidia.css',
      to: 'styles/highlight.css',
      transfer: defaultTransfer,
      when: () => config.highlight === 'prism.js',
    },
  ],
};

async function updateCSS() {
  const files = filesMap[config.theme];
  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();
  for (const file of files) {
    if (!file.when()) continue;
    const fileContents = textDecoder.decode(
      await workspace.fs.readFile(Uri.file(getCSSPath(file.from)))
    );
    const fileResult = textEncoder.encode(file.transfer(fileContents));
    workspace.fs.writeFile(Uri.file(getCSSPath(file.to)), fileResult);
  }
  commands.executeCommand('markdown.preview.refresh');
}

export async function initCSS() {
  await updateCSS();
  config.on(
    ['markdownEnhanced.theme', 'markdownEnhanced.highlight'],
    updateCSS
  );
}
