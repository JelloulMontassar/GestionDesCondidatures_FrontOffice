import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/login/auth.service";
import { StorageService } from "src/app/auth/login/storage.service";
import { ProfileService } from 'src/app/service/profile.service';
import { NavService } from 'src/app/shared/services/nav.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {


  public show: boolean = false
  public errorMessage: any;
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  currentUser: any;

  constructor(private profileService: ProfileService, private navService: NavService, public router: Router, private authService: AuthService, private storageService: StorageService, private http: HttpClient) {
    this.currentUser = this.storageService.getUser();
  }


  ngOnInit() {
    if (this.currentUser) {
      this.router.navigate(["/admin"]);
    }
  }

  login() {
    this.authService.login(this.form.username, this.form.password).subscribe({
      next: data => {
        if (data.utilisateur.profile.libelle==="Super Admin") {
          console.log(data.utilisateur.profile.libelle)
          if (data.utilisateur.idEntrepriseEnCours != data.utilisateur.entreprise.id) {
          let user = data;
          const idEntrepriseEnCours = user.utilisateur.idEntrepriseEnCours;
          this.profileService.getSuperProfile(idEntrepriseEnCours).subscribe((dataProfile: any) => {
            user.utilisateur.profile = dataProfile;
            this.storageService.saveUser(user);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            if (data) {
              this.navService.updateMenuItems();
              this.router.navigate(["/admin/Utilisateur"]);
              //window.location.reload();
            }



          });

        } else {
            this.storageService.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
          }

          if (data) {
            this.navService.updateMenuItems();
            this.router.navigate(["/admin/Utilisateur"]);
          }
        }
        else if (data.utilisateur.profile.libelle==="Candidat") {
          this.router.navigate(["/home"]);
          this.storageService.saveUser(data);
        }




      },
      error: err => {
        console.error('Erreur de connexion:', err);
        this.isLoginFailed = true;
        if (err && err.status === 401) {
          this.errorMessage = 'Coordonnées de connexion incorrectes.';
        } else {
          this.errorMessage = 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.';
        }
      }
    });
}

  showPassword() {
    this.show = !this.show
  }

  /*reloadPage(): void {
    window.location.reload();
  }*/

}
