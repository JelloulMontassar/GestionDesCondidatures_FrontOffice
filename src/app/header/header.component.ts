import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { getUserIdFromToken } from '../../../jwt-utils'
import { StorageService } from '../auth/login/storage.service';
import { AuthService } from '../auth/login/auth.service';
@Component({
  selector: 'app-header-home',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loggedIn = false;

  constructor(public router: Router,private storageService: StorageService,private authService: AuthService){
  }
  getUserIdFromToken(token: string): string | null {
    return getUserIdFromToken(token);
  }
  ngOnInit() {
    console.log(this.storageService.getUser()["utilisateur"].id)
      if (sessionStorage.getItem("auth-user")) {
      this.loggedIn = true;
      }
  }
  signUp() {
    this.router.navigate(["/SignUp"]);
  }
  navigateToProfile() {
    this.router.navigate(["/user/candidat/", this.storageService.getUser()["utilisateur"].id]);
  }

  logout() {
    this.authService.logout().subscribe(
        data => {
            sessionStorage.clear()
            console.log(data);
            this.router.navigate(["/home"]);
        },
        error => {
            console.log(error);
        }
    )
    this.loggedIn = false;
  }
}
