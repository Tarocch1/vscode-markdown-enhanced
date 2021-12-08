import {
  workspace,
  Disposable,
  WorkspaceConfiguration,
  ConfigurationChangeEvent,
} from 'vscode'

export class ConfigReader extends Disposable {
  private _section: string
  private _config: WorkspaceConfiguration
  private _disposable: Disposable
  private _events: Map<string[], (e: ConfigurationChangeEvent) => void>

  constructor(section: string) {
    super(() => this.dispose())
    this._section = section
    this._config = workspace.getConfiguration(this._section)
    this._disposable = workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(this._section)) {
        this._config = workspace.getConfiguration(this._section)
        this.emit(e)
      }
    })
    this._events = new Map()
  }

  dispose() {
    this._disposable && this._disposable.dispose()
  }

  read<T>(key: string, defaultValue: T): T {
    return this._config.get<T>(key, defaultValue)
  }

  emit(e: ConfigurationChangeEvent) {
    for (const [sections, handler] of this._events) {
      if (sections.some((section) => e.affectsConfiguration(section))) {
        handler(e)
      }
    }
  }

  on(sections: string[], handler: (e: ConfigurationChangeEvent) => void) {
    this._events.set(sections, handler)
  }
}
