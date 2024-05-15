import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';
import { Observable } from 'rxjs';
import { StorageService } from '../auth/login/storage.service'


@Injectable({
  providedIn: 'root'
})
export class CategorieArticleService {
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
  
  
      return this.http.get(environment.apiURL + 'allCategorieArticle',httpOptions);
    }
  
    deleteCategorieArticle(idCategorieArticle: any) : Observable<any>{
      
        return this.http.delete(environment.apiURL + `CategorieArticle/${idCategorieArticle}`,this.httpOptions)
      
    }

    updateSuppression(idCategorieArticle: number): Observable<any> {
      return this.http.put(environment.apiURL + `CategorieArticle/${idCategorieArticle}/suppression`, this.httpOptions); 
    }
  
    saveCategorieArticle(categoriearticleData : any) : Observable<any>{ 
      return this.http.post(environment.apiURL + 'CategorieArticle', categoriearticleData , this.httpOptions);
    }
  
    getCategorieArticle(idCategorieArticle : any) : Observable<any>{ 
      return this.http.get(environment.apiURL + `CategorieArticle/${idCategorieArticle}`,this.httpOptions)
    }
  
    modifierCategorieArticle(categoriearticleData : any) : Observable<any>{ 

      return this.http.put(environment.apiURL + 'CategorieArticle', categoriearticleData , this.httpOptions);
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
      return this.http.get<any>(environment.apiURL + 'CategorieArticle/verifierLibelle', httpOptions);
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
      return this.http.get<any>(environment.apiURL + 'centre/verifierLibelleId', httpOptions);
    }
  
  
    modifierCategorieArticleDetailCycleParam(oldLibelle: string, newLibelle: string): Observable<any> {
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
      return this.http.get<any>(environment.apiURL + 'CategorieArticle/modifierDetailCycleParamCategorieArticle', httpOptions);
    }
}
