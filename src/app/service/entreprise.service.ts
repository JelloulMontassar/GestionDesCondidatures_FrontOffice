import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from '../auth/login/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

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
    return this.http.get(environment.apiURL + 'allEntreprise',httpOptions);
  }

  deleteEntreprise(idEntreprise: any) : Observable<any>{
   
      return this.http.delete(environment.apiURL + `entreprise/${idEntreprise}`,this.httpOptions)
    
  }

  saveEntreprise(EntrepriseData : any) : Observable<any>{ 
    return this.http.post(environment.apiURL + 'entreprise', EntrepriseData , this.httpOptions);
  }

  getEntreprise(idEntreprise : any) : Observable<any>{ 
    return this.http.get(environment.apiURL + `entreprise/${idEntreprise}`,this.httpOptions)
  }

  getAllEntreprise() : Observable<any>{ 
    
    return this.http.get(environment.apiURL + `entreprise/all`,this.httpOptions)
  }

  modifierEntreprise(EntrepriseData : any) : Observable<any>{ 

    return this.http.put(environment.apiURL + 'entreprise', EntrepriseData , this.httpOptions);
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
    return this.http.get<any>(environment.apiURL + 'entreprise/verifierLibelleId', httpOptions);
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
    return this.http.get<any>(environment.apiURL + 'entreprise/verifierLibelle', httpOptions);
  }





}
