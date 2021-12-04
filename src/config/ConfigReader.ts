import {
  workspace,
  Disposable,
  WorkspaceConfiguration,
  ConfigurationChangeEvent,
} from 'vscode';

export abstract class ConfigReader extends Disposable {
  private _section: string;
  private _config: WorkspaceConfiguration;
  private _disposable: Disposable;

  constructor(section: string) {
    super(() => this.dispose());
    this._section = section;
    this._config = workspace.getConfiguration(this._section);
    this._disposable = workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(this._section)) {
        this._config = workspace.getConfiguration(this._section);
        this.onChange(e);
      }
    });
  }

  dispose() {
    this._disposable && this._disposable.dispose();
  }

  read<T>(key: string, defaultValue: T): T {
    return this._config.get<T>(key, defaultValue);
  }

  private getConfObjects() {
    //
  }

  abstract onChange(e: ConfigurationChangeEvent): void;
}
