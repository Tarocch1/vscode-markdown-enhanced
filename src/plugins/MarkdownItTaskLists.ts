import { Plugin } from './Plugin';
import { config } from '../config';

export class MarkdownItTaskLists extends Plugin {
  constructor() {
    super('taskLists');
  }

  get options() {
    const options = {
      enabled: !config.taskListsReadonly,
      label: config.taskListsLabel,
    };
    return options;
  }
}
