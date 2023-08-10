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

@Component({
  selector: 'app-auth-component',
  providers: [ Globals ],
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
})
export class AuthComponentComponent implements OnInit {
  
  isLoading: boolean = false;

  constructor( 
    private auth:AuthService, 
    private globals: Globals, 
    private router: Router,
    private lang: LanguageService,
    private exception: ExceptionService,
    private input: InputService) 
  {
    
  }

  ngOnInit(){
    setTimeout(() => this.globals.setStarting(), 5000);
  }

  login(){
    var user = {
      "username": this.input.getFormData().get('username').value,
      "motDePasse": this.input.getFormData().get('password').value,
      "codeSecurite": this.input.getFormData().get('securityCode').value
    }
    
    if(this.input.getFormData().valid){
      this.isLoading = true

      this.auth.userLogin(user).subscribe((data:any)=>{
        console.log(data);
        if (data.connect){
          localStorage.setItem('code',data.code)
          localStorage.setItem('user',JSON.stringify(user))

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
