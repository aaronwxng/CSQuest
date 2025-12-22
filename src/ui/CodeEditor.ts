import * as monaco from 'monaco-editor';

export class CodeEditor {
  private editor: monaco.editor.IStandaloneCodeEditor | null = null;
  private container: HTMLElement;
  private isVisible: boolean = false;

  constructor(containerId: string = 'code-editor-container') {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    this.container = container;

    // Initially hide the editor
    this.container.style.display = 'none';
  }

  initialize(defaultCode: string = '') {
    this.editor = monaco.editor.create(this.container, {
      value: defaultCode,
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: true },
      fontSize: 14,
      wordWrap: 'on',
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
    });

    return this.editor;
  }

  show() {
    if (this.container) {
      this.container.style.display = 'block';
      this.isVisible = true;
      // Focus the editor when shown
      setTimeout(() => {
        this.editor?.focus();
      }, 100);
    }
  }

  hide() {
    if (this.container) {
      this.container.style.display = 'none';
      this.isVisible = false;
    }
  }

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  getCode(): string {
    return this.editor?.getValue() || '';
  }

  setCode(code: string) {
    this.editor?.setValue(code);
  }

  setLanguage(language: string) {
    monaco.editor.setModelLanguage(this.editor?.getModel()!, language);
  }

  getEditor() {
    return this.editor;
  }

  destroy() {
    this.editor?.dispose();
    this.editor = null;
  }
}

