import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-component',
  providers: [ Globals ],
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
})
export class AuthComponentComponent implements OnInit {
  formData: FormGroup;
  isLoading: boolean = false;
  message: string = ''

  constructor(private fb:FormBuilder, private auth:AuthService, private globals: Globals, private router: Router) {
    this.formData = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
      securityCode: ['',[Validators.required]]
    });
  }

  ngOnInit(){
    setTimeout(() => this.globals.setStarting(), 5000);
  }

  login(){
    var user = {};
    
    if(this.formData.valid){
      this.isLoading = true

      user = {
        "username": this.formData.get('username').value,
        "motDePasse": this.formData.get('password').value,
        "codeSecurite": this.formData.get('securityCode').value
      }

      this.auth.userLogin(user).subscribe((data:any)=>{
        console.log(data);
        if (data.connect){
          localStorage.setItem('code',data.code)
          localStorage.setItem('user',JSON.stringify(user))

          this.router.navigate(['otp'])
        }
      },
          error => this.message = error.statusText + ' Access'
      );
    }else{
      this.message = 'Invalid Informations'  
    }
    
  }

}
