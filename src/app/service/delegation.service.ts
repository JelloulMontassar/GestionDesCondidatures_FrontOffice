import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../auth/login/storage.service';
import { environment } from './../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class DelegationService {
  tableItem: any;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.storageService.getUser().token })
  };

  constructor(private storageService: StorageService ,private http: HttpClient) { }


  getData() : Observable<any>{
    return this.http.get(environment.apiURL + 'allDelegation',this.httpOptions);
  }
}
