import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { OtpService } from '../services/otp.service';

@Component({
  selector: 'app-otpgenerator',
  providers: [ Globals ],
  templateUrl: './otpgenerator.component.html',
  styleUrls: ['./otpgenerator.component.scss'],
})
export class OTPGeneratorComponent implements OnInit {
  otpCode: BehaviorSubject<string> = new BehaviorSubject<string>('');
  otpCodeotpCode: Observable<string> = this.otpCode.asObservable();
  code: string =''
  hide: string = "hide"

  constructor(private otp: OtpService) { }

  ngOnInit() {
    console.log("otp")
    this.otp.getOtp(sessionStorage.getItem('user')).subscribe((data:any)=>{
      if (data.code){
        sessionStorage.setItem('code', data.code)
        this.otpCode.next(data.code)
        this.code = this.otpCode.getValue()
      }
    });
  }

  copy(){
    navigator.clipboard.writeText(this.otpCode.getValue());
    this.code = "Copied!";
    setTimeout(() => (this.code = this.otpCode.getValue()), 1000);  
  }

  refresh(){
    this.otp.getOtp(sessionStorage.getItem('user')).subscribe((data:any)=>{
      if (data.code){
        sessionStorage.setItem('code', data.code)
        this.otpCode.next(data.code)
        this.code = this.otpCode.getValue()
      }
    });
  }

}
