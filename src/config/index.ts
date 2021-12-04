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
}

export const config = new Config();
