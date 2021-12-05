import { ConfigReader } from './ConfigReader';

class Config extends ConfigReader {
  constructor() {
    super('markdownEnhanced');
  }

  get varEnable(): boolean {
    return true;
  }

  get highlightEnable(): boolean {
    return true;
  }
  get highlight(): 'prism.js' | 'highlight.js' {
    return this.read<'prism.js' | 'highlight.js'>('highlight', 'prism.js');
  }

  get theme(): 'light' | 'dark' {
    return this.read<'light' | 'dark'>('theme', 'light');
  }

  get abbrEnable(): boolean {
    return this.read<boolean>('abbr.enable', true);
  }

  get anchorEnable(): boolean {
    return this.read<boolean>('anchor.enable', true);
  }
  get anchorPermalink(): boolean {
    return this.read<boolean>('anchor.permalink', true);
  }

  get attrsEnable(): boolean {
    return this.read<boolean>('attrs.enable', true);
  }

  get deflistEnable(): boolean {
    return this.read<boolean>('deflist.enable', true);
  }

  get footnoteEnable(): boolean {
    return this.read<boolean>('footnote.enable', true);
  }

  get markEnable(): boolean {
    return this.read<boolean>('mark.enable', true);
  }

  get mermaidEnable(): boolean {
    return this.read<boolean>('mermaid.enable', true);
  }

  get subEnable(): boolean {
    return this.read<boolean>('sub.enable', true);
  }

  get supEnable(): boolean {
    return this.read<boolean>('sup.enable', true);
  }

  get tableOfContentsEnable(): boolean {
    return this.read<boolean>('tableOfContents.enable', true);
  }
  get tableOfContentsIncludeLevel(): number[] {
    return this.read<number[]>('tableOfContents.includeLevel', [2, 3, 4]);
  }

  get taskListsEnable(): boolean {
    return this.read<boolean>('taskLists.enable', true);
  }
  get taskListsReadonly(): boolean {
    return this.read<boolean>('taskLists.readonly', true);
  }
  get taskListsLabel(): boolean {
    return this.read<boolean>('taskLists.label', true);
  }

  get underlineEnable(): boolean {
    return this.read<boolean>('underline.enable', true);
  }
}

export const config = new Config();
