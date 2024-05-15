import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../auth/login/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.storageService.getUser().token })
  };

  constructor(private storageService: StorageService, private http: HttpClient) { }



  getData(): Observable<any> {
    const idEntreprise = this.storageService.getUtilisateur().idEntrepriseEnCours
    const params = new HttpParams()
      .set('id', idEntreprise.toString());

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };
    return this.http.get(environment.apiURL + 'allUtilisateur', httpOptions);
  }

  deleteUtilisateur(idUtilisateur: any): Observable<any> {

    return this.http.delete(environment.apiURL + `utilisateur/${idUtilisateur}`, this.httpOptions)

  }

  saveUtilisateur(UtilisateurData: any): Observable<any> {
    return this.http.post(environment.apiURL + 'utilisateur', UtilisateurData, this.httpOptions);
  }


  saveImage(formData: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.storageService.getUser().token })
    };
    return this.http.post<string[]>(environment.apiURL + 'saveImage', formData, httpOptions);
  }


  getUtilisateur(idUtilisateur: any): Observable<any> {
    return this.http.get(environment.apiURL + `utilisateur/${idUtilisateur}`, this.httpOptions)
  }

  modifierUtilisateur(UtilisateurData: any): Observable<any> {

    return this.http.put(environment.apiURL + 'utilisateur', UtilisateurData, this.httpOptions);
  }


  verifierEmailId(email: string, id: number): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('id', id.toString());

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };
    return this.http.get<any>(environment.apiURL + 'utilisateur/verifierEmailId', httpOptions);
  }



  verifierEmail(email: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email);


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };
    return this.http.get<any>(environment.apiURL + 'utilisateur/verifierEmail', httpOptions);
  }



  verifierProfile(id: any): Observable<any> {
    const params = new HttpParams()
      .set('idProfile', id.toString());


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };
    return this.http.get<any>(environment.apiURL + 'utilisateur/verifierProfile', httpOptions);
  }


  verifierPoste(id: any): Observable<any> {
    // construire les paramètres de requête
    const params = new HttpParams()
      .set('idPoste', id.toString());


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };

    // effectuer la requête HTTP GET avec les paramètres de requête inclus
    return this.http.get<any>(environment.apiURL + 'utilisateur/verifierPoste', httpOptions);
  }


  rechercheUtilisateurs(profileId: any, posteId: any, email: any, statut: any): Observable<any> {
    const params = {
      profileId: profileId ? profileId.toString() : null,
      posteId: posteId ? posteId.toString() : null,
      email: email || null,
      statut: statut || null,
      idEntreprise : this.storageService.getUtilisateur().idEntrepriseEnCours.toString()

    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };
    return this.http.get<any>(environment.apiURL + 'utilisateurs', httpOptions);
  }

}


