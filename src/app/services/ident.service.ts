import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdentService {
  Ident_URL = environment.Ident_URL;
  constructor(private http:HttpClient) {}

  userIdent(req){
    return this.http.post(`${this.Ident_URL}`,req);
  }
}
