import { ConfigReader } from './ConfigReader';

class Config extends ConfigReader {
  constructor() {
    super('markdownEnhanced');
  }

  get theme(): 'light' | 'dark' {
    return this.read<'light' | 'dark'>('theme', 'light');
  }

  get anchorEnable(): boolean {
    return this.read<boolean>('anchor.enable', true);
  }

  get anchorPermalink(): boolean {
    return this.read<boolean>('anchor.permalink', true);
  }

  get tocEnable(): boolean {
    return this.read<boolean>('toc.enable', true);
  }

  get tocIncludeLevel(): number[] {
    return this.read<number[]>('toc.includeLevel', [2, 3, 4]);
  }

  get footnoteEnable(): boolean {
    return this.read<boolean>('footnote.enable', true);
  }
}

export const config = new Config();
