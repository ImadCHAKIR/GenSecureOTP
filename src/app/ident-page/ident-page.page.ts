import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentService } from '../services/ident.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { ExceptionService } from '../services/exception.service';
import { InputService } from '../services/input.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ident-page',
  templateUrl: './ident-page.page.html',
  styleUrls: ['./ident-page.page.scss'],
})
export class IdentPagePage implements OnInit {
  isLoading : boolean = false
  msg : string = 'error'

  constructor(
    private router: Router, 
    private ident: IdentService,
    private lang: LanguageService,
    private exception: ExceptionService,
    private input: InputService,
    private navCtrl: NavController) 
  { 
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.pop();
  }

  identify(){
    this.msg = "error"

    var user = {
      "username": this.input.getFormReset().get('username').value,
      "motDePasse": this.input.getFormReset().get('password').value,
      "gsm": this.input.getFormReset().get('gsm').value,
      "idF": this.input.getFormReset().get('idf').value
    }

    if(this.input.getFormReset().valid){
      this.isLoading = true

      this.ident.userIdent(user).subscribe(
        (data :any) => {this.exception.setMessage(this.lang.getLang()["securityChanged"]);this.msg = "success"},
        (error:any) => this.exception.setMessage(this.lang.getLang()["Exceptions"]["incorrect"])
      )
      return
    }  
    
    if (!(user["username"] && user["motDePasse"] && user["codeSecurite"])){
      this.exception.setMessage(this.lang.getLang()["Exceptions"]["empty"])  
      return      
    }
    
    this.exception.setMessage(this.lang.getLang()["Exceptions"]["invalid"] ) 
  }
}
