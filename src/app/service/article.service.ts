import { Injectable  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';
import { Observable } from 'rxjs';
import { StorageService } from '../auth/login/storage.service'

@Injectable({
  providedIn: 'root'
})
export class ArticleService{

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
  
  
      return this.http.get(environment.apiURL + 'allArticle',httpOptions);
    }
  
    deleteArticle(idArticle: any) : Observable<any>{
      
        return this.http.delete(environment.apiURL + `Article/${idArticle}`,this.httpOptions)
      
    }
  
    saveArticle(articleData : any) : Observable<any>{ 
      return this.http.post(environment.apiURL + 'Article', articleData , this.httpOptions);
    }
  
    getArticle(idArticle : any) : Observable<any>{ 
      return this.http.get(environment.apiURL + `Article/${idArticle}`,this.httpOptions)
    }
  
    modifierArticle(articleData : any) : Observable<any>{ 

      return this.http.put(environment.apiURL + 'Article', articleData , this.httpOptions);
    }

    updateSuppression(idArticle: number): Observable<any> {
      return this.http.put(environment.apiURL + `Article/${idArticle}/suppression`, this.httpOptions); 
    }

    modifierExistingArticle(id: number, updatedArticle: any): Observable<any> {
      return this.http.put(environment.apiURL +`article/${id}`, updatedArticle);
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
      return this.http.get<any>(environment.apiURL + 'article/verifierLibelle', httpOptions);
    }

    rechercheArticles(centreId: any, batimentId: any): Observable<any> {
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
      return this.http.get<any>(environment.apiURL + 'articles', httpOptions);
    }
  
    modifierArticleDetailCycleParam(oldLibelle: string, newLibelle: string): Observable<any> {
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
      return this.http.get<any>(environment.apiURL + 'Article/modifierDetailCycleParamArticle', httpOptions);
    }
  
}
