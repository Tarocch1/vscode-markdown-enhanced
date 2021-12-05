import mermaid from 'mermaid';

function init() {
  mermaid.initialize({
    startOnLoad: true,
    theme: window.$markdownEnhanced.theme === 'dark' ? 'dark' : 'default',
    class: {
      useMaxWidth: false,
    },
    er: {
      useMaxWidth: false,
    },
    flowchart: {
      useMaxWidth: false,
    },
    gantt: {
      useMaxWidth: false,
    },
    git: {
      useMaxWidth: false,
    },
    journey: {
      useMaxWidth: false,
    },
    pie: {
      useMaxWidth: false,
    },
    requirement: {
      useMaxWidth: false,
    },
    sequence: {
      useMaxWidth: false,
    },
    state: {
      useMaxWidth: false,
    },
  });
}

init();
