import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  OTP_URL = environment.OTP_URL;
  constructor(private http:HttpClient) {}

  getOtp(req){
    return this.http.post(`${this.OTP_URL}`,{ 'Username': req});
  }
}
