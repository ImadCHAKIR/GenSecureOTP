import { Injectable } from '@angular/core';
import lang from '../../assets/speech.json'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language: string = "fr" 

  constructor() {}

  setLanguage(language){
    this.language = language
  }

  getLang(){
    return lang[this.language]
  }

}
