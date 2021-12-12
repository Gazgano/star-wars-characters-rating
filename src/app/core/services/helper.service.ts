import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  randomNumber(min: number, max: number) { 
    return Math.floor(Math.random() * (max - min) + min);
} 
  
  getRandomIndex(array: any[]): number {
    return this.randomNumber(0, array.length);
  }
}
