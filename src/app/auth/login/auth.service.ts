import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
const CANDIDAT_API = 'http://localhost:8080/Candidat';
const CANDIDATURE_API = 'http://localhost:8080/Candidature';


//const AUTH_API =   'http://102.164.112.99:8080/SmartBreeding/api/auth/'  ;
//const AUTH_API =   'http://102.164.112.102:8080/SmartWeighing/api/auth/'  ;


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    uploadCV(formData: FormData): Observable<any>  {
        return this.http.post(`${CANDIDATURE_API}/uploadCv`, formData);
    }
    getCandidat(id: number): Observable<any> {
        return this.http.get(`${CANDIDAT_API}/${id}`);
    }

    updateCandidat(id: number, formData: any): Observable<any> {
        return this.http.put(`${CANDIDAT_API}/${id}`, formData);
    }

    private signupData: any;
    setSignupData(data: any) {
        this.signupData = data;
    }

    getSignupData() {
        return this.signupData;
    }
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

  register(username: string, email: string, password: string,candidatData:any): Observable<any> {
    // const currentUrl = window.location.href;
    // const isIp102 = currentUrl.includes('102.164.112.102');
    // const AUTH_API = isIp102 ? this.AUTH_API_Extern : this.AUTH_API_Intern;
    return this.http.post(
      AUTH_API + 'signup',
      {
        "username":username,
        "email" : email,
        "password" : password,
          "profile":"Candidat",
          "candidat" : candidatData
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
