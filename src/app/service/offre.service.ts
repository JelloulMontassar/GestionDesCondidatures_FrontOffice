import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../auth/login/storage.service';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  apply(offre: any, candidat: any):Observable<any>{
      return this.http.post('http://localhost:8080/Candidature',
          {offre, candidat}
      );
  }
  private apiUrl = 'http://localhost:8080/allCandidature';

  searchOffres(libelle: string, localisation: string, description: string): Observable<any[]> {
    let params = new HttpParams();
    if (libelle) params = params.set('libelle', libelle);
    if (localisation) params = params.set('localisation', localisation);
    if (description) params = params.set('description', description);
    return this.http.get<any[]>(`http://localhost:8080/searchOffres`, { params });
  }
  getAllCandidatures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  ChangeStatus(id: number, status: number): Observable<any> {
    return this.http.put(`http://localhost:8080/Candidature/${id}/${status}`, null);
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.storageService.getUser().token })
  };
  constructor( private storageService: StorageService,private http: HttpClient) {}

  saveCalendrier(calendrier: any): Observable<any> {
    return this.http.post(`http://localhost:8080/Calendrier`, calendrier);
  }




  getData() : Observable<any>{

    return this.http.get(environment.apiURL + 'allOffre');
  }

  deleteOffre(idOffre: any) : Observable<any>{
   
      return this.http.delete(environment.apiURL + `Offre/${idOffre}`,this.httpOptions)
   
  }

  saveOffre(OffreData : any) : Observable<any>{ 
    return this.http.post(environment.apiURL + 'Offre', OffreData , this.httpOptions);
  }

  getOffre(idOffre : any) : Observable<any>{ 
    return this.http.get(environment.apiURL + `Offre/${idOffre}`,this.httpOptions)
  }

  modifierOffre(OffreData : any) : Observable<any>{ 

    return this.http.put(environment.apiURL + 'Offre', OffreData , this.httpOptions);
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
    return this.http.get<any>(environment.apiURL + 'Offre/verifierLibelleId', httpOptions);
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
    return this.http.get<any>(environment.apiURL + 'Offre/verifierLibelle', httpOptions);
  }

}


