import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentService } from '../services/ident.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { ExceptionService } from '../services/exception.service';

@Component({
  selector: 'app-ident-page',
  templateUrl: './ident-page.page.html',
  styleUrls: ['./ident-page.page.scss'],
})
export class IdentPagePage implements OnInit {
  formReset: FormGroup;
  isLoading : boolean = false

  constructor(
    private fb:FormBuilder, 
    private router: Router, 
    private ident: IdentService,
    private lang: LanguageService,
    private exception: ExceptionService) 
  { 
    this.formReset = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
      gsm: ['',[Validators.required]],
      idf: ['',[Validators.required]]
    });
  }

  ngOnInit() {}

  back(){
    this.router.navigate(['..'])
  }

  identify(){
    var user = {
      "username": this.formReset.get('username').value,
      "motDePasse": this.formReset.get('password').value,
      "gsm": this.formReset.get('gsm').value,
      "idF": this.formReset.get('idf').value
    }

    console.log(user)

    if(this.formReset.valid){
      this.isLoading = true

      this.ident.userIdent(user).subscribe((data:any)=>{
        console.log(data);
      },
        error => this.exception.setMessage(this.lang.getLang()["Exceptions"]["incorrect"])
      )
    }  
    
    if (!(user["username"] && user["motDePasse"] && user["codeSecurite"])){
      this.exception.setMessage(this.lang.getLang()["Exceptions"]["empty"])  
      return      
    }
    
    this.exception.setMessage(this.lang.getLang()["Exceptions"]["invalid"] ) 
  }
}
