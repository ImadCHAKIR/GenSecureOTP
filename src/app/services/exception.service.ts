import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExceptionService {
  message : string = ''

  setMessage(message){this.message = message}
  getMessage(){ return this.message}

  constructor() { }
}
