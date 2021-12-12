import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';

export enum LogLevel {
  Off = 0,
  Error,
  Warn,
  Info,
  Debug
}

interface LoggerConfig {
  readonly level: LogLevel;
  readonly includeTimestamp: boolean;
}

const GLOBAL_CONFIG: { [key: string]: LoggerConfig; } = {
  production: {
    level: LogLevel.Warn,
    includeTimestamp: true
  },
  dev: {
    level: LogLevel.Debug,
    includeTimestamp: false
  }
};

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private config = environment.production? GLOBAL_CONFIG.production : GLOBAL_CONFIG.dev;

  constructor() { }

  public error(...objects: any[]) {
    this.log(console.error, LogLevel.Error, objects);
  }

  public warn(...objects: any[]) {
    this.log(console.warn, LogLevel.Warn, objects);
  }

  public info(...objects: any[]) {
    this.log(console.info, LogLevel.Info, objects);
  }

  public debug(...objects: any[]) {
    this.log(console.log, LogLevel.Debug, objects);
  }

  private log(func: (...args: any[]) => void, level: LogLevel, objects: any[]): void {
    if (this.config.level >= level) { // we print messages of the level and also more serious ones as well
      let output: any[] = [];

      if (this.config.includeTimestamp) {
        output = [moment().format('YYYYMMDD HH:mm:ss.SSS')];
      }

      output = output.concat(objects);
      func(...output);
    }
  }
}
