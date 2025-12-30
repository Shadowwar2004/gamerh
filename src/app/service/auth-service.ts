import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserLoginDto} from '../DTOS/UserLoginDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/session`;

  constructor(private http: HttpClient) {
  }

  login(input: UserLoginDto) {
    return this.http.post(`${this.apiUrl}`, input,{withCredentials:true});
  }

  logout() {
    return this.http.delete(`${this.apiUrl}`,{withCredentials:true});
  }




}
