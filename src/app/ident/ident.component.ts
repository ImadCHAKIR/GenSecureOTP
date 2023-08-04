import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IdentService } from '../services/ident.service';

@Component({
  selector: 'app-ident',
  templateUrl: './ident.component.html',
  styleUrls: ['./ident.component.scss'],
})
export class IdentComponent implements OnInit {
  formReset: FormGroup;
  isLoading : boolean = false

  constructor(private fb:FormBuilder, private router: Router, private ident: IdentService) { 
    this.formReset = this.fb.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      GSM: ['',[Validators.required]],
      IdF: ['',[Validators.required]]
    });
  }

  ngOnInit() {}

  back(){
    this.router.navigate(['..'])
  }

  identify(){
    var user = {}
    if(this.formReset.valid){
      this.isLoading = true

      user = {
        "username": this.formReset.get('username').value,
        "motDePasse": this.formReset.get('password').value,
        "gsm": this.formReset.get('GSM').value,
        "idF": this.formReset.get('IdF').value
      }

      this.ident.userIdent(user).subscribe((data:any)=>{
        console.log(data);
      });
    }  
  }
}
