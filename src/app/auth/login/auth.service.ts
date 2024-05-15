import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
//const AUTH_API =   'http://102.164.112.99:8080/SmartBreeding/api/auth/'  ;
//const AUTH_API =   'http://102.164.112.102:8080/SmartWeighing/api/auth/'  ;


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 // pour prod 
  private AUTH_API_Extern =   'http://102.164.112.102:8080/SmartWeighing/api/auth/'  ;
  private AUTH_API_Intern ='http://192.168.161.21:8080/SmartWeighing/api/auth/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
   // en prod 
    // const currentUrl = window.location.href;
    // const isIp102 = currentUrl.includes('102.164.112.102');
    // const AUTH_API = isIp102 ? this.AUTH_API_Extern : this.AUTH_API_Intern;
    
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    // const currentUrl = window.location.href;
    // const isIp102 = currentUrl.includes('102.164.112.102');
    // const AUTH_API = isIp102 ? this.AUTH_API_Extern : this.AUTH_API_Intern;
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    // const currentUrl = window.location.href;
    // const isIp102 = currentUrl.includes('102.164.112.102');
    // const AUTH_API = isIp102 ? this.AUTH_API_Extern : this.AUTH_API_Intern;
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}