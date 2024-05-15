import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../auth/login/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.storageService.getUser().token })
  };
  constructor( private storageService: StorageService,private http: HttpClient) {}






  getData() : Observable<any>{
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

    return this.http.get(environment.apiURL + 'allDomaine',httpOptions);
  }

  deleteDomaine(idDomaine: any) : Observable<any>{
      return this.http.delete(environment.apiURL + `domaine/${idDomaine}`,this.httpOptions)
    
  }

  saveDomaine(DomaineData : any) : Observable<any>{ 
    return this.http.post(environment.apiURL + 'domaine', DomaineData , this.httpOptions);
  }

  getDomaine(idDomaine : any) : Observable<any>{ 
    return this.http.get(environment.apiURL + `domaine/${idDomaine}`,this.httpOptions)
  }

  modifierDomaine(DomaineData : any) : Observable<any>{ 

    return this.http.put(environment.apiURL + 'domaine', DomaineData , this.httpOptions);
  }

  verifierLibelleId(libelle: string, id: number , idEntreprise : number): Observable<any> {
    // construire les paramètres de requête
    const params = new HttpParams()
      .set('libelle', libelle)
      .set('idEntreprise', idEntreprise.toString())
      .set('id', id.toString());
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };
  
    // effectuer la requête HTTP GET avec les paramètres de requête inclus
    return this.http.get<any>(environment.apiURL + 'domaine/verifierLibelleId', httpOptions);
  }



  verifierLibelle(libelle: string): Observable<any> {
    // construire les paramètres de requête
    const params = new HttpParams()
      .set('libelle', libelle)
      .set('idEntreprise', this.storageService.getUtilisateur().idEntrepriseEnCours.toString());
     
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };
  
    // effectuer la requête HTTP GET avec les paramètres de requête inclus
    return this.http.get<any>(environment.apiURL + 'domaine/verifierLibelle', httpOptions);
  }


}
