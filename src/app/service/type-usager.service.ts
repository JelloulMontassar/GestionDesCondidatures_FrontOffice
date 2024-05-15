import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from '../auth/login/storage.service'

@Injectable({
  providedIn: 'root'
})
export class TypeUsagerService {
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
  
  
      return this.http.get(environment.apiURL + 'allTypeUsager',httpOptions);
    }
  
    deleteTypeUsager(idTypeUsager: any) : Observable<any>{
      
        return this.http.delete(environment.apiURL + `TypeUsager/${idTypeUsager}`,this.httpOptions)
      
    }

    updateSuppression(idTypeUsager: number): Observable<any> {
      return this.http.put(environment.apiURL + `TypeUsager/${idTypeUsager}/suppression`, this.httpOptions); 
    }
  
    saveTypeUsager(typeUsagerData : any) : Observable<any>{ 
      return this.http.post(environment.apiURL + 'TypeUsager', typeUsagerData , this.httpOptions);
    }
  
    getTypeUsager(idTypeUsager : any) : Observable<any>{ 
      return this.http.get(environment.apiURL + `TypeUsager/${idTypeUsager}`,this.httpOptions)
    }
  
    modifierTypeUsager(typeUsagerData : any) : Observable<any>{ 

      return this.http.put(environment.apiURL + 'TypeUsager', typeUsagerData , this.httpOptions);
    }

    rechercheTypeUsagers(centreId: any, batimentId: any): Observable<any> {
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
      return this.http.get<any>(environment.apiURL + 'typeUsagers', httpOptions);
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
      return this.http.get<any>(environment.apiURL + 'typeusager/verifierLibelle', httpOptions);
    }

  

  loadTypeUsagers(categorieId: number): Observable<any[]> {
    const idEntreprise = this.storageService.getUtilisateur().idEntrepriseEnCours;

    const params = new HttpParams().set('id', idEntreprise.toString())
                                   .set('idCategorie', categorieId.toString());

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getUser().token
      }),
      params: params
    };

    return this.http.get<any[]>(environment.apiURL + 'allTypeUsagerbycategorie', httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error loading TypeUsagers', error);
          return throwError(error);
        })
      );
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
    return this.http.get<any>(environment.apiURL + 'TypeUsager/verifierLibelleId', httpOptions);
  }

  modifierTypeUsagerCycleParam(oldLibelle: string, newLibelle: string): Observable<any> {
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
    return this.http.get<any>(environment.apiURL + 'TypeUsager/modifierCycleParamTypeUsager', httpOptions);
  }
}


