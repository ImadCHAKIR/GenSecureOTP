import { Injectable } from '@angular/core';
import * as lang from '../../assets/speech.json'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() {
    console.log(lang.ar.Forget)
  }

}
