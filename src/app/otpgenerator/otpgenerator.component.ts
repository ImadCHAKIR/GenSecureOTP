import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-otpgenerator',
  providers: [ Globals ],
  templateUrl: './otpgenerator.component.html',
  styleUrls: ['./otpgenerator.component.scss'],
})
export class OTPGeneratorComponent implements OnInit {
  otpCode: BehaviorSubject<string> = new BehaviorSubject<string>('');
  otpCodeotpCode: Observable<string> = this.otpCode.asObservable();

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.otpCode.next(localStorage.getItem('code'))
    
    setInterval(() =>{
      this.auth.userLogin(JSON.parse(localStorage.getItem('user'))).subscribe((data:any)=>{
        if (data.connect){
          localStorage.setItem('code', data.code)
          this.otpCode.next(data.code)
        }
      });
    }, 10000)
  }

}
