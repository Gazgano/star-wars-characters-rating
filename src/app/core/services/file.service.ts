import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  imageFromURL(url: string) {
    return new Observable<HTMLImageElement>((subscriber: Subscriber<HTMLImageElement>) => {
      const img = new Image();

      img.onload = () => {
        subscriber.next(img);
        subscriber.complete();
      };
      img.onerror = error => subscriber.error(error);

      img.src = url;
    });
  }
}
