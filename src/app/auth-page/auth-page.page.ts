import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { ExceptionService } from '../services/exception.service';
import { InputService } from '../services/input.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth-component',
  providers: [ Globals ],
  templateUrl: './auth-page.page.html',
  styleUrls: ['./auth-page.page.scss'],
})
export class AuthPagePage implements OnInit {
  isLoading: boolean = false;
  public authForm: FormGroup

  constructor( 
    private auth:AuthService, 
    private globals: Globals, 
    private router: Router,
    private lang: LanguageService,
    private exception: ExceptionService,
    private navCtrl: NavController,
    private fb: FormBuilder) 
  {
    this.authForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
      securityCode: ['',[Validators.required]]
    });
  }

  goToIdent() {
    this.navCtrl.navigateForward('ident');
  }

  ngOnInit(){
    setTimeout(() => this.globals.setStarting(), 4000);
  }

  login(){
    var user = {
      "username": this.authForm.get('username').value,
      "motDePasse": this.authForm.get('password').value,
      "codeSecurite": this.authForm.get('securityCode').value
    }
    
    if(this.authForm.valid){
      this.isLoading = true

      this.auth.userLogin(user).subscribe((data:any)=>{
        if (data.connect){
          sessionStorage.setItem('user',user.username)
          this.router.navigate(['otp'])
        }
      },
        error => this.exception.setMessage(this.lang.getLang()["Exceptions"]["incorrect"])
      );
      return
    }
    
    if (!(user["username"] && user["motDePasse"] && user["codeSecurite"])){
      this.exception.setMessage(this.lang.getLang()["Exceptions"]["empty"] )
      return      
    }
    
    this.exception.setMessage(this.lang.getLang()["Exceptions"]["invalid"] )
  }

}
