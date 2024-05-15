import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from '../auth/login/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.storageService.getUser().token })
  };
  constructor( private storageService: StorageService,private http: HttpClient) {}


  getData() : Observable<any>{
    
    return this.http.get(environment.apiURL + 'allPrivilege',this.httpOptions);
  }

  deletePrivilege(idPrivilege: any) : Observable<any>{
   
      return this.http.delete(environment.apiURL + `privilege/${idPrivilege}`,this.httpOptions)
   
  }

  savePrivilege(PrivilegeData : any) : Observable<any>{ 
    return this.http.post(environment.apiURL + 'privilege', PrivilegeData , this.httpOptions);
  }

  getPrivilege(idPrivilege : any) : Observable<any>{ 
    return this.http.get(environment.apiURL + `privilege/${idPrivilege}`,this.httpOptions)
  }

  modifierPrivilege(PrivilegeData : any) : Observable<any>{ 

    return this.http.put(environment.apiURL + 'privilege', PrivilegeData , this.httpOptions);
  }

  saveAllPrivilege(PrivilegeData : any) : Observable<any>{ 

    return this.http.post(environment.apiURL + 'saveAllPrivilege', PrivilegeData , this.httpOptions);
  }

  verifierLibelleId(libelle: string, id: number): Observable<any> {
    // construire les paramètres de requête
    const params = new HttpParams()
      .set('libelle', libelle)
      .set('id', id.toString());
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };
  
    // effectuer la requête HTTP GET avec les paramètres de requête inclus
    return this.http.get<any>(environment.apiURL + 'privilege/verifierLibelleId', httpOptions);
  }



  verifierLibelle(libelle: string): Observable<any> {
    // construire les paramètres de requête
    const params = new HttpParams()
      .set('libelle', libelle);
     
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };
  
    // effectuer la requête HTTP GET avec les paramètres de requête inclus
    return this.http.get<any>(environment.apiURL + 'privilege/verifierLibelle', httpOptions);
  }


  ListePrivilegeByLibelleIdEntreprise( libelle: string, idEntreprise : number): Observable<any> {
    // construire les paramètres de requête
    const params = new HttpParams()
      .set('libelle', libelle)
      .set('idEntreprise', idEntreprise.toString());
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };
  
    // effectuer la requête HTTP GET avec les paramètres de requête inclus
    return this.http.get<any>(environment.apiURL + 'ListePrivilegeByLibelleIdEntreprise', httpOptions);
  }


  ListePrivilegeByModuleIdEntreprise( libelle: string, idEntreprise : number): Observable<any> {
    // construire les paramètres de requête
    const params = new HttpParams()
      .set('module', libelle)
      .set('idEntreprise', idEntreprise.toString());
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };
  
    // effectuer la requête HTTP GET avec les paramètres de requête inclus
    return this.http.get<any>(environment.apiURL + 'ListePrivilegeByModuleIdEntreprise', httpOptions);
  }

}


