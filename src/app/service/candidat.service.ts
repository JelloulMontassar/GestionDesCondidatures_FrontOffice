import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../auth/login/storage.service';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { OffreService } from '../service/offre.service';



@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.StorageService.getUser().token })
  };
  constructor(

    private http: HttpClient,
    private StorageService: StorageService
  ) { }

  getData(): Observable<any> {


    //const idEntreprise = this.tokenStorageService.getUtilisateur().idEntrepriseEnCours
    const idEntreprise = 1
    const params = new HttpParams()
      .set('id', idEntreprise.toString());

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.StorageService.getUser().token
      })
    };


    return this.http.get(environment.apiURL + 'allCandidat',httpOptions);
  }


  deleteCandidat(idCandidat: any): Observable<any> {

    return this.http.delete(environment.apiURL +`Candidat/${idCandidat}`)

  }

  saveCandidat(candidateData: any): Observable<any> {
    return this.http.post(environment.apiURL + `Candidat`, candidateData, this.httpOptions);
  }

  saveImage(formData: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.StorageService.getUser().token })
    };
    return this.http.post<string[]>(environment.apiURL + 'saveImage', formData, httpOptions);
  }

  getCandidat(idCandidat: any): Observable<any> {
    return this.http.get(environment.apiURL + `Candidat/${idCandidat}`)
  }


  modifierCandidat(candidatData: any): Observable<any> {

    return this.http.put(environment.apiURL + `Candidat`, candidatData, this.httpOptions);
  }

  updateSuppression(idCandidat: number): Observable<any> {
    return this.http.put(environment.apiURL + `Candidat/${idCandidat}/suppression`, this.httpOptions);
  }

  modifierExistingCandidat(id: number, updatedCandidat: any): Observable<any> {
    return this.http.put(environment.apiURL + `candidat/${id}`, updatedCandidat);
  }

  verifierLibelle(libelle: string): Observable<any> {
    // construire les paramètres de requête
    const params = new HttpParams()
      .set('libelle', libelle)
      .set('idEntreprise', this.StorageService.getUtilisateur().idEntrepriseEnCours.toString());


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.StorageService.getUser().token
      }),
      params: params
    };

    // effectuer la requête HTTP GET avec les paramètres de requête inclus
    return this.http.get<any>(environment.apiURL + 'candidat/verifierLibelle', httpOptions);
  }

  
  verifierEmailId(email: string, id: number): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('id', id.toString());

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.StorageService.getUser().token
      }),
      params: params
    };
    return this.http.get<any>(environment.apiURL + 'candidat/verifierEmailId', httpOptions);
  }



  verifierEmail(email: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email);


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.StorageService.getUser().token
      }),
      params: params
    };
    return this.http.get<any>(environment.apiURL + 'candidat/verifierEmail', httpOptions);
  }




  verifierProfile(id: any): Observable<any> {
    const params = new HttpParams()
      .set('idProfile', id.toString());


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.StorageService.getUser().token
      }),
      params: params
    };
    return this.http.get<any>(environment.apiURL + 'candidat/verifierProfile', httpOptions);
  }
 

  rechercheCandidats(centreId: any, batimentId: any): Observable<any> {
    const params = {
      centreId: centreId ? centreId.toString() : null,
      batimentId: batimentId ? batimentId.toString() : null,
      idEntreprise: this.StorageService.getUtilisateur().idEntrepriseEnCours.toString()
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.StorageService.getUser().token
      }),
      params: params
    };
    return this.http.get<any>(environment.apiURL + 'candidats', httpOptions);
  }




  
  // verifierOffre(id: any): Observable<any> {
  //   // construire les paramètres de requête
  //   const params = new HttpParams()
  //     .set('idOffre', id.toString());


  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + this.StorageService.getUser().token
  //     }),
  //     params: params
  //   };

  //   // effectuer la requête HTTP GET avec les paramètres de requête inclus
  //   return this.http.get<any>(environment.apiURL + 'candidat/verifierOffre', httpOptions);
  // }


}


    
