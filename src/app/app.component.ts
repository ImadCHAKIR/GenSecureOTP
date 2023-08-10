import { Component } from '@angular/core';
import { LanguageService } from './services/language.service';
import { ExceptionService } from './services/exception.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private lang: LanguageService,
    private exception: ExceptionService) {}
  
  ngOnInit(){
    localStorage.clear()
  }

  
}
