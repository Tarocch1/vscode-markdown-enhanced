import anchor from 'markdown-it-anchor';
import { Plugin } from './Plugin';
import { slugify } from './utils';
import { config } from '../config';

export class MarkdownItAnchor extends Plugin {
  constructor() {
    super('anchor', 'markdown-it-anchor');
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
}
