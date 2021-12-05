import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import { Plugin } from './Plugin';
import { slugify } from './utils';
import { config } from '../config';

export class MarkdownItAnchor extends Plugin {
  constructor() {
    super('anchor');
  }

  get options() {
    const options: anchor.AnchorOptions = {
      slugify,
      permalink: config.anchorPermalink
        ? anchor.permalink.linkInsideHeader({
            symbol: '#',
            space: false,
            placement: 'before',
            ariaHidden: true,
          })
        : undefined,
    };
    return options;
  }

  /**
   * reset header id
   *
   * https://github.com/microsoft/vscode/blob/d09289a2b6dd0e56b2a264a8e9380685498e10d6/extensions/markdown-language-features/src/markdownEngine.ts#L293
   *
   * @param md
   */
  extra(md: MarkdownIt) {
    md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const children = tokens[idx + 1].children;
      if (children && children[0] && children[0].type === 'link_open') {
        const id = (children[0].attrGet('href') || '').slice(1);
        token.attrSet('id', id);
      }
      return self.renderToken(tokens, idx, options);
    };
  }
}
