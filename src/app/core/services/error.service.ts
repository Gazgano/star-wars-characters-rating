import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private loggerService: LoggerService) { }

  handleError(error: any, defaultMessage: string) {
    this.loggerService.error(error);

    const resultError = {...error};
    if (!resultError.message) {
      resultError.message = defaultMessage;
    }
    if (resultError.code && resultError.statusText) {
      resultError.message += ` (code ${resultError.code}, ${resultError.statusText})`;
    } else if (resultError.code) {
      resultError.message += ` (code ${resultError.code})`;
    } else if (resultError.statusText) {
      resultError.message += ` (${resultError.statusText})`;
    }

    return resultError;
  }
}
