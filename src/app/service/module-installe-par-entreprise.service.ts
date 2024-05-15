import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from '../auth/login/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleInstalleParEntrepriseService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.storageService.getUser().token })
  };
  constructor( private storageService: StorageService,private http: HttpClient) {}






  getData() : Observable<any>{
    
    return this.http.get(environment.apiURL + 'allModule',this.httpOptions);
  }

  deleteModule(idModule: any) : Observable<any>{
   
      return this.http.delete(environment.apiURL + `module/${idModule}`,this.httpOptions)
  
  }

  saveModule(ModuleData : any) : Observable<any>{ 
    return this.http.post(environment.apiURL + 'module', ModuleData , this.httpOptions);
  }

  getModule(idModule : any) : Observable<any>{ 
    return this.http.get(environment.apiURL + `module/${idModule}`,this.httpOptions)
  }

  modifierModule(ModuleData : any) : Observable<any>{ 

    return this.http.put(environment.apiURL + 'module', ModuleData , this.httpOptions);
  }


  saveAllModule(ModuleData : any) : Observable<any>{ 

    return this.http.post(environment.apiURL + 'saveAllModule', ModuleData , this.httpOptions);
  }


  saveAllDetailModule(detailModuleData : any) : Observable<any>{ 

    return this.http.post(environment.apiURL + 'saveAllDetailModule', detailModuleData , this.httpOptions);
  }

}

 
