import hljs from 'highlight.js';
import prism from 'prismjs';
import loadLanguages from 'prismjs/components/';
import MarkdownIt from 'markdown-it';
import { Plugin } from './Plugin';
import { config } from '../config';

export class MarkdownItHighlight extends Plugin {
  constructor() {
    super('highlight');
    super._package = '';
  }

  get options() {
    const options = {};
    return options;
  }

  extra(md: MarkdownIt) {
    let highlighter: typeof md.options.highlight;
    if (config.highlight === 'highlight.js') {
      highlighter = hljsHighlight;
    } else {
      loadLanguages();
      highlighter = prismHighlight;
    }
    md.set({ highlight: highlighter });
  }
}

function hljsHighlight(str: string, lang: string, attrs: string): string {
  let html = str;
  if (lang && hljs.getLanguage(lang)) {
    try {
      html = hljs.highlight(str, {
        language: lang,
        ignoreIllegals: true,
      }).value;
    } catch (error) {}
  }
  return html;
}

function prismHighlight(str: string, lang: string, attrs: string): string {
  let html = str;
  if (lang && prism.languages[lang]) {
    html = prism.highlight(str, prism.languages[lang], lang);
  }
  return html;
}
