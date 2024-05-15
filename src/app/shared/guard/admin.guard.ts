import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { StorageService } from "src/app/auth/login/storage.service";
@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(public router: Router,private storageService: StorageService,) {}
    data : any;
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for user is login or not
     this.data = window.sessionStorage.getItem("auth-user")
   
    if (!this.data || this.data  === null) {

      this.router.navigate(["/auth/login"]);
      return true;
    } else if (this.data) {

      return true;
      }
    
   
  }
}
