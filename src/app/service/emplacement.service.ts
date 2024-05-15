import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from '../auth/login/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmplacementService {

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
    return this.http.get(environment.apiURL + 'allEmplacement',httpOptions);
  }

  deleteEmplacement(idEmplacement: any) : Observable<any>{
      return this.http.delete(environment.apiURL + `emplacement/${idEmplacement}`,this.httpOptions)
    
  }

  saveEmplacement(emplacementData : any) : Observable<any>{ 
    return this.http.post(environment.apiURL + 'emplacement', emplacementData , this.httpOptions);
  }

  getEmplacement(idEmplacement : any) : Observable<any>{ 
    return this.http.get(environment.apiURL + `emplacement/${idEmplacement}`,this.httpOptions)
  }

  modifierEmplacement(emplacementData : any) : Observable<any>{ 

    return this.http.put(environment.apiURL + 'emplacement', emplacementData , this.httpOptions);
  }

  verifierLibelleId(libelle: string, id: number, idEntreprise : number): Observable<any> {
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
    return this.http.get<any>(environment.apiURL + 'emplacement/verifierLibelleId', httpOptions);
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
    return this.http.get<any>(environment.apiURL + 'emplacement/verifierLibelle', httpOptions);
  }

  modifierLibelleEmplacement(oldLibelle: string, newLibelle: string): Observable<any> {
    // construire les paramètres de requête
    const params = new HttpParams()
      .set('oldLibelle', oldLibelle)
      .set('newLibelle', newLibelle);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };

    // effectuer la requête HTTP GET avec les paramètres de requête inclus
    return this.http.get<any>(environment.apiURL + 'emplacement/modifierLibelleEmplacement', httpOptions);
  }


  verifierDetail(libelleEmplacement: any): Observable<any> {
    return this.http.get(environment.apiURL + `emplacement/verifierDetail/${libelleEmplacement}`, this.httpOptions)
  }


}
