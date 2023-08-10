import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentService } from '../services/ident.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ident-page',
  templateUrl: './ident-page.page.html',
  styleUrls: ['./ident-page.page.scss'],
})
export class IdentPagePage implements OnInit {
  formReset: FormGroup;
  isLoading : boolean = false
  message : string = ''

  constructor(private fb:FormBuilder, private router: Router, private ident: IdentService) { 
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
    var user = {}
    console.log(this.formReset.get('username').value)

    if(this.formReset.valid){
      this.isLoading = true

      user = {
        "username": this.formReset.get('username').value,
        "motDePasse": this.formReset.get('password').value,
        "gsm": this.formReset.get('gsm').value,
        "idF": this.formReset.get('idf').value
      }

      this.ident.userIdent(user).subscribe((data:any)=>{
        console.log(data);
      },
        error => this.message = error.statusText + ' Access');
    } else{
      debugger
      user = {
        "username": this.formReset.controls['username'].value,
        "motDePasse": this.formReset.get('password').value,
        "gsm": this.formReset.get('gsm').value,
        "idF": this.formReset.get('idf').value
      }
      console.log(user)
      this.message = 'Invalid Informations'  
    } 
  }
}
