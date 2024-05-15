import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';
import { Observable } from 'rxjs';
import { StorageService } from '../auth/login/storage.service'

@Injectable({
  providedIn: 'root'
})
export class DetailTypeUsagerService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.storageService.getUser().token })
  };
  constructor(
    private storageService: StorageService, 
    private http: HttpClient
    ) { }
  
  
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
  
  
      return this.http.get(environment.apiURL + 'allCategorieTypeUsage',httpOptions);
    }
  
    deleteCategorieTypeUsage(idCategorieTypeUsage: any) : Observable<any>{
      
        return this.http.delete(environment.apiURL + `CategorieTypeUsage/${idCategorieTypeUsage}`,this.httpOptions)
      
    }

    updateSuppression(idCategorieTypeUsage: number): Observable<any> {
      return this.http.put(environment.apiURL + `CategorieTypeUsage/${idCategorieTypeUsage}/suppression`, this.httpOptions); 
    }
  
    saveCategorieTypeUsage(categorietypeUsageData : any) : Observable<any>{ 
      return this.http.post(environment.apiURL + 'CategorieTypeUsage', categorietypeUsageData , this.httpOptions);
    }
  
    getCategorieTypeUsage(idCategorieTypeUsage : any) : Observable<any>{ 
      return this.http.get(environment.apiURL + `CategorieTypeUsage/${idCategorieTypeUsage}`,this.httpOptions)
    }
  
    modifierCategorieTypeUsage(categorietypeUsageData : any) : Observable<any>{ 

      return this.http.put(environment.apiURL + 'CategorieTypeUsage', categorietypeUsageData , this.httpOptions);
    }

    rechercheCategorieTypeUsages(centreId: any, batimentId: any): Observable<any> {
      const params = {
        centreId: centreId ? centreId.toString() : null,
        batimentId: batimentId ? batimentId.toString() : null,
        idEntreprise : this.storageService.getUtilisateur().idEntrepriseEnCours.toString()
      };
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.storageService.getUser().token
        }),
        params: params
      };
      return this.http.get<any>(environment.apiURL + 'CategorietypeUsages', httpOptions);
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
      return this.http.get<any>(environment.apiURL + 'categorieusage/verifierLibelle', httpOptions);
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
      return this.http.get<any>(environment.apiURL + 'CategorieTypeUsage/verifierLibelleId', httpOptions);
    }

    modifierCategorieTypeUsagerCycleParam(oldLibelle: string, newLibelle: string): Observable<any> {
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
      return this.http.get<any>(environment.apiURL + 'CategorieTypeUsage/modifierCycleParamCategorieTypeUsage', httpOptions);
    }
  
  }