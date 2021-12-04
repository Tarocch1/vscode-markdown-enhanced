import { ConfigurationChangeEvent } from 'vscode';
import { ConfigReader } from './ConfigReader';
import { updateCSS } from '../services/style';

class Config extends ConfigReader {
  constructor() {
    super('markdownEnhanced');
  }

  init() {
    updateCSS();
  }

  onChange(e: ConfigurationChangeEvent) {
    if (e.affectsConfiguration('markdownEnhanced.theme')) {
      updateCSS();
    }
  }

  get theme(): 'light' | 'dark' {
    return this.read<'light' | 'dark'>('theme', 'light');
  }
}

export const config = new Config();
