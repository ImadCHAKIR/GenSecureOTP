import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  formData: FormGroup;
  formReset: FormGroup

  constructor(private fb:FormBuilder) { 
    this.formData = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
      securityCode: ['',[Validators.required]]
    });

    this.formReset= this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
      gsm: ['',[Validators.required]],
      idf: ['',[Validators.required]]
    });
  }


  getFormData(){ return this.formData}
  getFormReset(){ return this.formReset}

}
