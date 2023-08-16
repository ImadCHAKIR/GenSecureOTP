import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Auth_URL = environment.Auth_URL;
  constructor(private http:HttpClient) {}

  userLogin(req){
    return this.http.post(this.Auth_URL,req);
  }

  isLoggedIn() {
    if (sessionStorage.getItem('user')){
      return true
    }

    return false
  }
}
